"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollReportService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ExcelJS = require("exceljs");
const moment = require("moment");
const mongoose_2 = require("mongoose");
const constants_1 = require("../../../../common/constants");
const pagination_response_dto_1 = require("../../../../common/dto/pagination-response.dto");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const camel_pascal_case_util_1 = require("../../../../common/utils/camel-pascal-case.util");
const get_years_in_range_util_1 = require("../../../../common/utils/get-years-in-range.util");
const is_empty_object_util_1 = require("../../../../common/utils/is-empty-object.util");
const database_1 = require("../../../../core/database");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const payroll_group_type_enum_1 = require("../payroll-group/enums/payroll-group-type.enum");
const prtrx_hdr_service_1 = require("../prtrx-hdr/prtrx-hdr.service");
const payroll_report_helper_1 = require("./helpers/payroll-report.helper");
let PayrollReportService = class PayrollReportService {
    constructor(payrollReportModel, payrollReportHelper, prtrxHdrService, employeeService) {
        this.payrollReportModel = payrollReportModel;
        this.payrollReportHelper = payrollReportHelper;
        this.prtrxHdrService = prtrxHdrService;
        this.employeeService = employeeService;
    }
    async getReportReviewAndApproval(args) {
        const { companyId, query } = args;
        if (query?.sort) {
            const sortCopied = (0, utils_1.capitalized)(query.sort).replace(':', '.');
            query.sort = sortCopied;
        }
        const { page, take, sort = 'EmployeeRef', order = enums_1.EOrder.ASC, noCount = 'false', } = query;
        const matchQuery = this.payrollReportHelper.matchQueryPayrollReport(companyId, query);
        const sortPipelineStage = this.payrollReportHelper.sortReportPipelineStage('review', { sort, order });
        const aggregatePipeline = [
            { $match: matchQuery },
            ...sortPipelineStage,
            { $skip: (page - 1) * take },
            { $limit: take },
        ];
        const [payrollReports, itemCount] = await Promise.all([
            this.payrollReportModel.aggregate(aggregatePipeline).exec(),
            noCount === 'true'
                ? 1
                : this.payrollReportModel.countDocuments(matchQuery),
        ]);
        return {
            ...new pagination_response_dto_1.PaginationResponseDto({
                paginationDto: query,
                data: await this.assignPayCalcMetForPayrollReport(payrollReports),
                itemCount,
            }),
        };
    }
    async getReportReconciliation(args) {
        const { companyId, query } = args;
        if (query?.sort) {
            const sortCopied = (0, utils_1.capitalized)(query.sort).replace(':', '.');
            query.sort = sortCopied;
        }
        const { payrollHeaderId, byPercentage, sort = 'EmployeeRef', order = enums_1.EOrder.ASC, page, take, noCount = 'false', } = query;
        const { id: prevPayrollHeaderId, cyclePeriodDetail } = await this.prtrxHdrService.getLatestPreviousPayrollTrxHeader(payrollHeaderId, query?.prevPayrollHeaderId);
        const matchQuery = this.payrollReportHelper.matchQueryPayrollReport(companyId, { ...query, prevPayrollHeaderId });
        const groupPipelineStage = this.payrollReportHelper.groupReportByEmployeePipelineStage();
        const sortPipelineStage = this.payrollReportHelper.sortReportPipelineStage('reconciliation', { sort, order, payrollHeaderId, prevPayrollHeaderId });
        const listEmployeeIdAggregatePipeLine = [
            { $match: matchQuery },
            { $project: { PayrollHeaderId: 1, EmployeeId: 1, [sort]: 1 } },
            ...groupPipelineStage,
            ...sortPipelineStage,
            { $skip: (page - 1) * take },
            { $limit: take },
            { $project: { _id: { $toInt: '$_id' } } },
        ];
        const [listEmployeeIds, aggItemCount, payrollReport, prevPayrollReport] = await Promise.all([
            this.payrollReportModel
                .aggregate(listEmployeeIdAggregatePipeLine)
                .exec(),
            noCount === 'true'
                ? [{ itemCount: 1 }]
                : this.payrollReportModel
                    .aggregate([
                    { $match: matchQuery },
                    { $project: { PayrollHeaderId: 1, EmployeeId: 1 } },
                    ...groupPipelineStage,
                    { $count: 'itemCount' },
                ])
                    .exec(),
            this.payrollReportModel
                .findOne({ PayrollHeaderId: payrollHeaderId }, { PayCategories: 1 })
                .lean()
                .exec(),
            this.payrollReportModel
                .findOne({ PayrollHeaderId: prevPayrollHeaderId }, { PayCategories: 1 })
                .lean()
                .exec(),
        ]);
        let itemCount = 0;
        if (aggItemCount.length) {
            itemCount = aggItemCount[0]['itemCount'] || 0;
        }
        const pagination = {
            prevPayrollHeader: { id: prevPayrollHeaderId, cyclePeriodDetail },
            ...new pagination_response_dto_1.PaginationResponseDto({
                paginationDto: query,
                data: [],
                itemCount,
            }),
            isAllEmpSameContractCurrency: true,
        };
        if (!itemCount || !listEmployeeIds.length)
            return pagination;
        const currentCategoryElementCodeKeys = this.payrollReportHelper.getCategoryElementCodeKeys(payrollReport?.PayCategories);
        const prevCategoryElementCodeKeys = this.payrollReportHelper.getCategoryElementCodeKeys(prevPayrollReport?.PayCategories);
        const employeeIds = listEmployeeIds.map(({ _id }) => _id);
        const payrollReports = await this.payrollReportModel
            .aggregate([
            { $match: { ...matchQuery, EmployeeId: { $in: employeeIds } } },
            ...groupPipelineStage,
            ...sortPipelineStage,
        ])
            .exec();
        const replaceDocuments = (index, data) => {
            Object.assign(payrollReports[index], data);
            delete payrollReports[index]['documents'];
        };
        for (let i = 0; i < payrollReports.length; i++) {
            const { documents } = payrollReports[i];
            let payrollReportToReplace = documents[payrollHeaderId] || {};
            let payrollReportToCompare = documents[prevPayrollHeaderId] || {};
            let categoryElementCodeKeys = currentCategoryElementCodeKeys;
            const missingCurrent = !payrollReportToReplace?.PayCategories &&
                payrollReportToCompare.PayCategories;
            if (missingCurrent) {
                payrollReportToReplace = payrollReportToCompare;
                payrollReportToCompare = { PayCategories: {} };
                categoryElementCodeKeys = prevCategoryElementCodeKeys;
            }
            for (const categoryElementCodeKey of categoryElementCodeKeys) {
                const [category, elementCode] = categoryElementCodeKey.split(':');
                if (!payrollReportToReplace.PayCategories) {
                    payrollReportToReplace.PayCategories = {};
                }
                if (!payrollReportToReplace.PayCategories[category]) {
                    payrollReportToReplace.PayCategories[category] = {
                        PayElementSets: {},
                    };
                }
                if (!payrollReportToReplace.PayCategories[category].PayElementSets) {
                    payrollReportToReplace.PayCategories[category].PayElementSets = {};
                }
                if (!payrollReportToReplace.PayCategories[category].PayElementSets[elementCode]) {
                    payrollReportToReplace.PayCategories[category].PayElementSets[elementCode] = {
                        Amount: '0',
                    };
                }
                const currAmount = payrollReportToReplace.PayCategories?.[category]?.PayElementSets?.[elementCode]?.Amount || '0';
                const prevAmount = payrollReportToCompare.PayCategories?.[category]?.PayElementSets?.[elementCode]?.Amount || '0';
                payrollReportToReplace.PayCategories[category].PayElementSets[elementCode].Amount = this.payrollReportHelper.differentTotal({
                    currAmount: missingCurrent ? '0' : currAmount,
                    prevAmount: missingCurrent ? currAmount : prevAmount,
                    byPercentage,
                });
            }
            replaceDocuments(i, payrollReportToReplace);
        }
        return {
            ...pagination,
            data: await this.assignPayCalcMetForPayrollReport(payrollReports),
        };
    }
    async getReportReviewAndApprovalDetail(params) {
        const { companyId, employeeId, payrollHeaderId } = params;
        const payrollReport = await this.payrollReportModel
            .findOne({
            CompanyId: companyId,
            EmployeeId: employeeId,
            PayrollHeaderId: payrollHeaderId,
        })
            .lean()
            .exec();
        if (!payrollReport) {
            throw new common_1.NotFoundException(`Payroll report not found`);
        }
        const assignedPayCalcMetPayrollReports = await this.assignPayCalcMetForPayrollReport([payrollReport]);
        return assignedPayCalcMetPayrollReports[0];
    }
    async getReportReconciliationDetail(args) {
        const { companyId, country, currPayrollHeaderId, employeeId } = args;
        const payrollReportFilter = {
            CompanyId: companyId,
            PayrollHeaderId: currPayrollHeaderId,
            'PayrollHeader.CountryCode': country,
            EmployeeId: employeeId,
        };
        const payrollReportProjection = {
            PayrollHeader: 1,
            PayCategories: 1,
            EmployeeRef: 1,
            FullNameLocal: 1,
        };
        const [payrollReport, prevPayrollHeader] = await Promise.all([
            this.payrollReportModel
                .findOne(payrollReportFilter, payrollReportProjection)
                .lean()
                .exec(),
            this.prtrxHdrService.getLatestPreviousPayrollTrxHeader(currPayrollHeaderId, args?.prevPayrollHeaderId || undefined),
        ]);
        payrollReportFilter.PayrollHeaderId = prevPayrollHeader.id;
        const prevPayrollReport = await this.payrollReportModel
            .findOne(payrollReportFilter, payrollReportProjection)
            .lean()
            .exec();
        if (payrollReport && prevPayrollReport) {
            return { current: payrollReport, previous: prevPayrollReport };
        }
        if (payrollReport && !prevPayrollReport) {
            return {
                current: payrollReport,
                previous: this.generateDefaultPayCategories(payrollReport),
            };
        }
        if (!payrollReport && prevPayrollReport) {
            return {
                current: this.generateDefaultPayCategories(prevPayrollReport),
                previous: prevPayrollReport,
            };
        }
        throw new common_1.NotFoundException(`Not found payroll ${currPayrollHeaderId} and their previous payroll $${prevPayrollHeader.id}`);
    }
    generateDefaultPayCategories(existingReport) {
        if ((0, is_empty_object_util_1.isEmptyObject)(existingReport?.PayCategories))
            return existingReport;
        const cloneReport = structuredClone(existingReport);
        const categories = Object.keys(cloneReport.PayCategories);
        for (const category of categories) {
            const payElementCodes = Object.keys(cloneReport.PayCategories?.[category]?.PayElementSets || {});
            cloneReport.PayCategories[category].Total = '0';
            for (const payElementCode of payElementCodes) {
                cloneReport.PayCategories[category].PayElementSets[payElementCode].Amount = '0';
            }
        }
        return cloneReport;
    }
    async exportPayrollReport(dataMode, args, { columnCustomizes }) {
        const { companyId, response, query, authInfo } = args;
        const { payrollHeaderId, dateFrom, dateTo } = query;
        const utcOffset = authInfo.utcOffset;
        let filterRandomPayrollReport = {
            CompanyId: companyId,
        };
        if (payrollHeaderId) {
            filterRandomPayrollReport = { PayrollHeaderId: query.payrollHeaderId };
        }
        const [randomPayrollReport, itemCount] = await Promise.all([
            this.payrollReportModel
                .findOne(filterRandomPayrollReport, {
                PayCategories: 1,
                'Company.Name': 1,
                'Company.ShortName': 1,
                'PayrollHeader.DateFrom': 1,
                'PayrollHeader.DateTo': 1,
                'PayrollHeader.PayrollNo': 1,
            })
                .lean(),
            this.payrollReportModel.countDocuments(this.payrollReportHelper.matchQueryPayrollReport(companyId, query)),
        ]);
        if (!randomPayrollReport || !itemCount) {
            throw new common_1.BadRequestException('Data is empty');
        }
        const company = randomPayrollReport['Company'];
        const payrollHeader = randomPayrollReport['PayrollHeader'];
        const fileNamePayrollNoPart = payrollHeaderId
            ? `${payrollHeader['PayrollNo']}-`
            : '';
        const fileName = `${company['ShortName']}-` +
            fileNamePayrollNoPart +
            `${moment
                .utc()
                .utcOffset(utcOffset)
                .format(constants_1.DATE_STRING)}.${enums_1.EExcelFileType.XLSX}`;
        response.attachment(fileName);
        response.contentType(constants_1.CONTENT_TYPE.XLSX);
        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
            stream: response,
            useStyles: true,
        });
        const worksheet = workbook.addWorksheet('PE');
        this.payrollReportHelper.labelHeaderPayrollReport({
            companyName: company['Name'],
            dateFrom: dateFrom ||
                moment
                    .utc(payrollHeader['DateFrom'])
                    .utcOffset(utcOffset)
                    .format(constants_1.DATE_STRING),
            dateTo: dateTo ||
                moment
                    .utc(payrollHeader['DateTo'])
                    .utcOffset(utcOffset)
                    .format(constants_1.DATE_STRING),
            payrollNo: payrollHeaderId ? payrollHeader['PayrollNo'] : '',
            worksheet,
        });
        const { columns, mergeColumnKeys } = columnCustomizes?.length
            ? this.payrollReportHelper.columnCustomizes(columnCustomizes)
            : this.payrollReportHelper.columnDefaults(randomPayrollReport);
        for (let i = 0; i < columns.length; i++) {
            const { key } = columns[i];
            if (key && key === 'Employee:ContractCurrencyId') {
                columns[i].key = 'Employee:ContractCurrencyCode';
            }
        }
        worksheet.columns = columns;
        const categoryRow = worksheet.getRow(6);
        categoryRow.height = 30;
        const categoryRowNumber = categoryRow.number;
        const headerRowNumber = worksheet.getRow(7).number;
        for (const mergeKey of mergeColumnKeys) {
            const [type, colKey, start, end] = mergeKey.split('|');
            switch (type) {
                case 'category': {
                    const startCol = worksheet.getColumnKey(`${colKey}:${start}`).number;
                    const endCol = worksheet.getColumnKey(`${colKey}:${end}`).number;
                    const rowToMerge = categoryRowNumber;
                    worksheet.mergeCells({
                        top: rowToMerge,
                        bottom: rowToMerge,
                        left: startCol,
                        right: endCol,
                    });
                    break;
                }
                case 'total': {
                    const colNumber = worksheet.getColumnKey(colKey).number;
                    worksheet.mergeCells({
                        top: categoryRowNumber,
                        bottom: categoryRowNumber + 1,
                        left: colNumber,
                        right: colNumber,
                    });
                    break;
                }
                default:
                    break;
            }
        }
        for (let index = 0; index < columns.length; index++) {
            const col = columns[index];
            const colKeys = col.key?.split(':') || [];
            if (!colKeys.length)
                continue;
            const prField = colKeys[0];
            const prSubField = colKeys[1] || '';
            const elementCode = colKeys[2] || '';
            const isTotal = colKeys[3] === 'total' ? true : false;
            const isAggCategory = prSubField === 'X-100' ? true : false;
            const headerName = col?.headerName ?? '';
            let categoryValue = '';
            let headerValue = '';
            if (prSubField) {
                if (prField === 'PayCategories') {
                    const payCategory = randomPayrollReport.PayCategories[prSubField];
                    if (isTotal) {
                        headerValue = 'TOTAL';
                    }
                    else if (isAggCategory) {
                        categoryValue =
                            payCategory['PayElementSets']?.[elementCode]?.Name || '';
                    }
                    else {
                        categoryValue = payCategory.Name || '';
                        headerValue =
                            payCategory['PayElementSets']?.[elementCode]?.Name || '';
                    }
                }
                else {
                    headerValue = (0, camel_pascal_case_util_1.camelToPascalCase)(prSubField, { withSpaces: true });
                }
            }
            else {
                headerValue = (0, camel_pascal_case_util_1.camelToPascalCase)(prField, { withSpaces: true });
            }
            const categoryCell = worksheet.getCell(categoryRowNumber, index + 1);
            categoryCell.value = categoryValue;
            categoryCell.border = this.payrollReportHelper.fullBorderCell();
            categoryCell.fill = this.payrollReportHelper.fillColorBy(prSubField);
            categoryCell.alignment = {
                horizontal: 'center',
                vertical: 'middle',
                shrinkToFit: true,
                wrapText: true,
            };
            categoryCell.font = { bold: true, color: { argb: '0000FF' } };
            const headerCell = worksheet.getCell(headerRowNumber, index + 1);
            headerCell.value = headerName || headerValue;
            headerCell.border = categoryCell.border;
            headerCell.fill = categoryCell.fill;
            headerCell.alignment = {
                ...categoryCell.alignment,
                horizontal: isTotal ? 'center' : 'left',
            };
            headerCell.font = {
                color: { argb: isAggCategory ? '0000FF' : 'FF0000' },
                bold: true,
            };
        }
        await this.batchesInsertPayrollReportToExcel({
            worksheet,
            columns,
            companyId,
            dataMode,
            itemCount,
            query,
        });
        this.payrollReportHelper.totalRowOfEveryColumn({
            worksheet,
            columns,
        });
        const lastRow = worksheet.lastRow?.number ?? 0;
        worksheet.autoFilter = {
            from: { row: 7, column: 1 },
            to: { row: lastRow, column: columns.length ?? 0 },
        };
        this.payrollReportHelper.calculateTotalPaidAndNonUnpaidCell({
            worksheet,
            lastRow,
        });
        await workbook.commit();
    }
    async batchesInsertPayrollReportToExcel(args) {
        const { companyId, dataMode, itemCount, query, worksheet, columns } = args;
        const batchSize = 500;
        const totalBatches = Math.ceil(itemCount / batchSize);
        const promiseBatches = [];
        const commonArgs = {
            companyId,
            query: { ...query, noCount: constants_1.BOOL.TRUE },
        };
        if (query.isSelectAll === true) {
            for (let page = 1; page <= totalBatches; page++) {
                const newArgs = {
                    companyId,
                    query: { ...commonArgs.query, page, take: batchSize },
                };
                dataMode === 'reviewAndApproval'
                    ? promiseBatches.push(this.getReportReviewAndApproval(newArgs))
                    : promiseBatches.push(this.getReportReconciliation(newArgs));
            }
        }
        else {
            dataMode === 'reviewAndApproval'
                ? promiseBatches.push(this.getReportReviewAndApproval(commonArgs))
                : promiseBatches.push(this.getReportReconciliation(commonArgs));
        }
        const payrollReportPromiseResults = await Promise.all(promiseBatches);
        let dataRowNumber = 8;
        for (const { data: payrollReports } of payrollReportPromiseResults) {
            this.payrollReportHelper.insertPayrollReportToWorkSheet({
                worksheet,
                payrollReports,
                dataRowNumber,
                columns,
            });
            dataRowNumber += payrollReports.length;
        }
    }
    async getTotalCategoriesBy(args) {
        const { companyId, payrollHeaderId, dataMode, query } = args;
        const { prevPayrollHeaderId = 0, byPercentage } = query;
        return dataMode === 'reviewAndApproval'
            ? this.getTotalCategoriesReviewStep({
                payrollHeaderId,
                companyId,
            })
            : this.getTotalCategoriesReconciliationStep({
                companyId,
                payrollHeaderId,
                prevPayrollHeaderId,
                byPercentage,
            });
    }
    async getTotalCategoriesReviewStep(args) {
        const { companyId: CompanyId, payrollHeaderId: PayrollHeaderId } = args;
        const payCategoriesPipeline = this.payrollReportHelper.calculateCategoriesTotalPipelineStage('normal', {
            CompanyId,
            PayrollHeaderId,
        });
        const aggregateCategoriesPipeline = this.payrollReportHelper.calculateCategoriesTotalPipelineStage('aggregate', { CompanyId, PayrollHeaderId });
        const [payCategoriesTotal, aggregateCategoriesTotal] = await Promise.all([
            this.payrollReportModel.aggregate(payCategoriesPipeline),
            this.payrollReportModel.aggregate(aggregateCategoriesPipeline),
        ]);
        return {
            payCategoriesTotal: payCategoriesTotal[0] ?? {},
            aggregateCategoriesTotal: aggregateCategoriesTotal[0] ?? {},
        };
    }
    async getTotalCategoriesReconciliationStep(args) {
        const { companyId: CompanyId, payrollHeaderId, prevPayrollHeaderId, byPercentage = 'false', } = args;
        const categoriesTotal = {
            payCategoriesTotal: {},
            aggregateCategoriesTotal: {},
        };
        const currPipeline = this.payrollReportHelper.calculateCategoriesTotalPipelineStage('normal', {
            CompanyId,
            PayrollHeaderId: payrollHeaderId,
        });
        const prevPipeline = this.payrollReportHelper.calculateCategoriesTotalPipelineStage('normal', {
            CompanyId,
            PayrollHeaderId: prevPayrollHeaderId,
        });
        const currAggPipeline = this.payrollReportHelper.calculateCategoriesTotalPipelineStage('aggregate', { CompanyId, PayrollHeaderId: payrollHeaderId });
        const prevAggPipeline = this.payrollReportHelper.calculateCategoriesTotalPipelineStage('aggregate', { CompanyId, PayrollHeaderId: prevPayrollHeaderId });
        const result = await Promise.all([
            this.payrollReportModel.aggregate(currPipeline).exec(),
            this.payrollReportModel.aggregate(prevPipeline).exec(),
            this.payrollReportModel.aggregate(currAggPipeline).exec(),
            this.payrollReportModel.aggregate(prevAggPipeline).exec(),
        ]);
        const currCateTotal = result[0][0] ?? {};
        const prevCateTotal = result[1][0] ?? {};
        const currCategories = Object.keys(currCateTotal);
        for (const category of currCategories) {
            categoriesTotal.payCategoriesTotal[category] =
                this.payrollReportHelper.differentTotal({
                    currAmount: currCateTotal[category] || '0',
                    prevAmount: prevCateTotal[category] || '0',
                    byPercentage,
                });
        }
        const currAggTotal = result[2][0] ?? {};
        const prevAggTotal = result[3][0] ?? {};
        const currAggCategories = Object.keys(currAggTotal);
        for (const aggCategory of currAggCategories) {
            categoriesTotal.aggregateCategoriesTotal[aggCategory] =
                this.payrollReportHelper.differentTotal({
                    currAmount: currAggTotal[aggCategory] || '0',
                    prevAmount: prevAggTotal[aggCategory] || '0',
                    byPercentage,
                });
        }
        return categoriesTotal;
    }
    async getTotalPayCategories(args) {
        const { categoryType, input, specificCategoryForAggregate, employeeIds } = args;
        const { categories = [] } = input;
        const matchStage = this.buildMatchStage(input, employeeIds);
        const projectStage = this.buildProjectStage({
            categories,
            categoryType,
            specificCategoryForAggregate,
        });
        const pipeline = this.payrollReportHelper.calculateCategoriesTotalPipelineStage('normal', {}, {
            match: matchStage,
            project: projectStage,
            project2: categoryType === 'normal'
                ? this.payrollReportHelper.convertPayCategoriesToObjectCodeTotal(false)
                : undefined,
        });
        const result = await this.payrollReportModel.aggregate(pipeline);
        return result[0] || {};
    }
    buildMatchStage(input, employeeIds = []) {
        const { companyIds = [], countryCodes = [], payrollCyclesFrom, payrollCyclesTo, } = input;
        const matchStage = [];
        if (companyIds.length)
            matchStage.push({ CompanyId: { $in: companyIds } });
        if (countryCodes.length) {
            matchStage.push({ 'Company.CountryCode': { $in: countryCodes } });
        }
        if (payrollCyclesFrom || payrollCyclesTo) {
            const defaultRange = moment.utc().format('YYYY-MM');
            const [cyclePeriodFromYear, cyclePeriodFromMonth] = (payrollCyclesFrom || defaultRange).split('-');
            const [cyclePeriodToYear, cyclePeriodToMonth] = (payrollCyclesTo || defaultRange).split('-');
            const yearsInRange = (0, get_years_in_range_util_1.getYearsInRange)(cyclePeriodFromYear, cyclePeriodToYear);
            const dateFrom = moment
                .utc({ year: +cyclePeriodFromYear, month: +cyclePeriodFromMonth - 1 })
                .startOf('month')
                .subtract(1, 'month')
                .add(1, 'millisecond');
            const dateTo = moment
                .utc({ year: +cyclePeriodToYear, month: +cyclePeriodToMonth - 1 })
                .endOf('month');
            matchStage.push({
                'PayrollHeader.DateFrom': { $gte: dateFrom.toDate() },
            });
            matchStage.push({ 'PayrollHeader.DateTo': { $lte: dateTo.toDate() } });
            matchStage.push({ 'PayrollHeader.Year': { $in: yearsInRange } });
        }
        if (employeeIds.length) {
            matchStage.push({ EmployeeId: { $in: employeeIds } });
        }
        return matchStage.length
            ? matchStage.reduce((query, curr) => {
                for (const [key, value] of Object.entries(curr)) {
                    Object.assign(query, { [key]: value });
                }
                return query;
            }, {})
            : undefined;
    }
    buildProjectStage(args) {
        const { categories, categoryType, specificCategoryForAggregate = 'X-100', } = args;
        if (!categories.length)
            return undefined;
        let stage = undefined;
        switch (categoryType) {
            case 'normal':
                stage = {};
                for (const category of categories) {
                    stage[`${category}.Total`] = 1;
                }
                break;
            case 'aggregate':
                stage = {
                    PayCategories: {
                        $map: {
                            input: {
                                $filter: {
                                    input: {
                                        $objectToArray: `$PayCategories.${specificCategoryForAggregate}.PayElementSets`,
                                    },
                                    as: 'elementSets',
                                    cond: { $in: ['$$elementSets.v.Code', categories] },
                                },
                            },
                            as: 'element',
                            in: { code: '$$element.v.Code', total: '$$element.v.Amount' },
                        },
                    },
                };
                break;
            default:
                break;
        }
        return stage;
    }
    async batchDeleteAllOldPayrollReports() {
        const totalPayrollIsDeleted = await this.prtrxHdrService.getTotalPayrollIsDeleted();
        const batchSize = 200;
        const totalBatches = Math.ceil(totalPayrollIsDeleted / batchSize);
        const promises = [];
        for (let i = 0; i < totalBatches; i++) {
            const skip = i * batchSize;
            promises.push(this.deleteAllOldPayrollReports({ skip, take: batchSize }));
        }
        return Promise.all(promises);
    }
    async deleteAllOldPayrollReports(args) {
        const listPayrollReportIsDeleted = await this.prtrxHdrService.getAllPayrollReportIsDeleted(args);
        if (!listPayrollReportIsDeleted.length)
            return;
        await this.payrollReportModel
            .deleteMany({ PayrollHeaderId: { $in: listPayrollReportIsDeleted } })
            .exec();
        return;
    }
    async deleteOldReportsDeleted(payrollHeaderIds) {
        if (!payrollHeaderIds.length)
            return;
        return this.payrollReportModel
            .deleteMany({ PayrollHeaderId: { $in: payrollHeaderIds } })
            .exec();
    }
    async assignPayCalcMetForPayrollReport(payrollReports) {
        if (!payrollReports.length)
            return [];
        const employeeIds = [];
        const employeesIndexTable = payrollReports.reduce((table, report, i) => {
            const employeeId = report.EmployeeId;
            if (employeeId) {
                table[Number(employeeId)] = i;
                employeeIds.push(Number(employeeId));
            }
            return table;
        }, {});
        const empAlias = 'employee';
        const pgAlias = database_1.ETableName.PAYROLL_GROUP;
        const employees = (await this.employeeService.repository
            .createQueryBuilder(empAlias)
            .andWhere(`${empAlias}.id IN (:...employeeIds)`, { employeeIds })
            .leftJoin(`${empAlias}.payrollGroups`, pgAlias)
            .select([`${empAlias}.id`, `${empAlias}.payCalcMet`, `${pgAlias}.pgType`])
            .getRawMany());
        if (employees.length) {
            for (const emp of employees) {
                const { employee_id: employeeId, employee_pay_calc_met: empPgType, payroll_group_pg_type: pgType, } = emp;
                let payCalcMet = pgType;
                if (!payCalcMet)
                    payCalcMet = empPgType;
                if (!payCalcMet)
                    payCalcMet = payroll_group_type_enum_1.EPayrollGroupType.MONTHLY_OR_DAILY;
                const payrollReportIndex = employeesIndexTable[Number(employeeId)];
                const payrollReport = payrollReports[payrollReportIndex];
                if (payrollReport) {
                    Object.assign(payrollReports[payrollReportIndex], { payCalcMet });
                }
            }
        }
        return payrollReports;
    }
};
exports.PayrollReportService = PayrollReportService;
exports.PayrollReportService = PayrollReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('PayrollReport')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        payroll_report_helper_1.PayrollReportHelper,
        prtrx_hdr_service_1.PrtrxHdrService,
        employee_service_1.EmployeeService])
], PayrollReportService);
//# sourceMappingURL=payroll-report.service.js.map
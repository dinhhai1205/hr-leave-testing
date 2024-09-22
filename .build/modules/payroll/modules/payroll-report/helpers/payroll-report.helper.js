"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollReportHelper = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../../../common/enums");
const is_empty_object_util_1 = require("../../../../../common/utils/is-empty-object.util");
const payroll_group_type_enum_1 = require("../../payroll-group/enums/payroll-group-type.enum");
const constants_1 = require("../constants");
let PayrollReportHelper = class PayrollReportHelper {
    matchQueryPayrollReport(companyId, query = {}) {
        const { keyword = '', payrollHeaderId = 0, prevPayrollHeaderId = 0, country, employeeIds = [], dateFrom, dateTo, } = query;
        const matchQuery = {
            CompanyId: companyId,
        };
        if (payrollHeaderId) {
            matchQuery['PayrollHeaderId'] = { $in: [payrollHeaderId] };
        }
        if (country) {
            matchQuery['PayrollHeader.CountryCode'] = country;
        }
        if (keyword) {
            matchQuery.$or = [
                { EmployeeRef: { $regex: keyword, $options: 'i' } },
                { FullNameLocal: { $regex: keyword, $options: 'i' } },
                { 'Employee.FullNameEn': { $regex: keyword, $options: 'i' } },
            ];
        }
        if (employeeIds.length)
            matchQuery.EmployeeId = { $in: employeeIds };
        if (prevPayrollHeaderId) {
            matchQuery.PayrollHeaderId.$in.push(prevPayrollHeaderId);
        }
        if (dateFrom && dateTo) {
            const dateStringFrom = `${dateFrom}T00:00:00.000Z`;
            const dateStringTo = `${dateTo}T00:00:00.000Z`;
            if (!(0, class_validator_1.isDateString)(dateStringFrom) || !(0, class_validator_1.isDateString)(dateStringTo)) {
                throw new common_1.BadRequestException('Invalid date string');
            }
            Object.assign(matchQuery, {
                'PayrollHeader.DateTo': {
                    $gte: new Date(dateStringFrom),
                    $lte: new Date(dateStringTo),
                },
            });
        }
        return matchQuery;
    }
    groupReportByEmployeePipelineStage() {
        return [
            {
                $group: {
                    _id: '$EmployeeId',
                    documents: {
                        $push: { k: { $toString: '$PayrollHeaderId' }, v: '$$ROOT' },
                    },
                },
            },
            { $addFields: { documents: { $arrayToObject: '$documents' } } },
        ];
    }
    calculateCategoriesTotalPipelineStage(categoryType, { CompanyId, PayrollHeaderId, } = {}, customCondition) {
        const isAggCategory = categoryType === 'aggregate';
        const pipelineStage = [];
        if (customCondition?.match) {
            pipelineStage.push({ $match: { ...customCondition.match } });
        }
        else {
            pipelineStage.push({ $match: { CompanyId, PayrollHeaderId } });
        }
        if (customCondition?.project) {
            pipelineStage.push({ $project: { ...customCondition.project } });
        }
        else {
            pipelineStage.push({
                $project: this.convertPayCategoriesToObjectCodeTotal(isAggCategory),
            });
        }
        if (customCondition?.project2) {
            pipelineStage.push({ $project: customCondition.project2 });
        }
        pipelineStage.push(...[
            { $unwind: '$PayCategories' },
            {
                $group: {
                    _id: '$PayCategories.code',
                    total: { $sum: { $toDecimal: '$PayCategories.total' } },
                },
            },
        ]);
        if (!customCondition?.transformOutput) {
            pipelineStage.push({
                $group: {
                    _id: null,
                    result: {
                        $push: {
                            k: '$_id',
                            v: { $toString: { $round: ['$total', 2] } },
                        },
                    },
                },
            }, { $replaceRoot: { newRoot: { $arrayToObject: '$result' } } });
        }
        return pipelineStage;
    }
    convertPayCategoriesToObjectCodeTotal(isAggCategory) {
        return {
            PayCategories: {
                $map: {
                    input: {
                        $objectToArray: `$PayCategories${isAggCategory ? '.X-100.PayElementSets' : ''}`,
                    },
                    as: 'elementSets',
                    in: {
                        code: '$$elementSets.k',
                        total: `$$elementSets.v.${isAggCategory ? 'Amount' : 'Total'}`,
                    },
                },
            },
        };
    }
    sortReportPipelineStage(by, args) {
        const { order = enums_1.EOrder.ASC, sort = 'EmployeeRef', payrollHeaderId = 0, prevPayrollHeaderId = 0, } = args;
        if (by === 'reconciliation' && !payrollHeaderId && !prevPayrollHeaderId) {
            throw new common_1.InternalServerErrorException('Payroll header ID is missing during the sorting of the payroll report');
        }
        const orderNumber = enums_1.EOrderNumber[order];
        const sortField = 'tempSortField';
        const containsAmountOrTotal = /\.Amount\b|\.Total\b/.test(sort);
        if (containsAmountOrTotal) {
            const addTempSortField = {
                review: { [sortField]: { $toDecimal: `$${sort}` } },
                reconciliation: {
                    [sortField]: {
                        $subtract: [
                            {
                                $toDecimal: {
                                    $ifNull: [`$documents.${payrollHeaderId}.${sort}`, 0],
                                },
                            },
                            {
                                $toDecimal: {
                                    $ifNull: [`$documents.${prevPayrollHeaderId}.${sort}`, 0],
                                },
                            },
                        ],
                    },
                },
            };
            return [
                { $addFields: addTempSortField[by] },
                { $sort: { [sortField]: orderNumber } },
            ];
        }
        return by === 'review'
            ? [{ $sort: { [sort]: orderNumber } }]
            : [
                {
                    $addFields: {
                        [sortField]: {
                            $ifNull: [
                                `$documents.${payrollHeaderId}.${sort}`,
                                `$documents.${prevPayrollHeaderId}.${sort}`,
                                ` `,
                            ],
                        },
                    },
                },
                { $sort: { [sortField]: orderNumber } },
            ];
    }
    getCategoryElementCodeKeys(payCategories) {
        if (!payCategories)
            return [];
        if ((0, is_empty_object_util_1.isEmptyObject)(payCategories))
            return [];
        const result = [];
        const categories = Object.keys(payCategories);
        for (const category of categories) {
            if (!payCategories?.[category]?.PayElementSets)
                continue;
            if ((0, is_empty_object_util_1.isEmptyObject)(payCategories[category].PayElementSets)) {
                continue;
            }
            const payElementCodes = Object.keys(payCategories[category]?.PayElementSets || {});
            for (const elementCode of payElementCodes) {
                result.push(`${category}:${elementCode}`);
            }
        }
        return result;
    }
    fillColorBy(categoryCode) {
        return {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
                argb: constants_1.PAY_CATEGORY_COLOR[categoryCode.toUpperCase()] || 'ffffff',
            },
        };
    }
    fullBorderCell() {
        return {
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' },
            top: { style: 'thin' },
        };
    }
    labelHeaderPayrollReport(args) {
        const { companyName, dateFrom, dateTo, payrollNo, worksheet } = args;
        const cellA1 = worksheet.getCell(1, 1);
        cellA1.value = 'Company Name';
        cellA1.border = this.fullBorderCell();
        const cellA2 = worksheet.getCell(2, 1);
        cellA2.value = 'Payroll No';
        cellA2.border = this.fullBorderCell();
        const cellA3 = worksheet.getCell(3, 1);
        cellA3.value = 'Date Range';
        cellA3.border = this.fullBorderCell();
        const cellB1 = worksheet.getCell(1, 2);
        cellB1.value = companyName;
        cellB1.border = this.fullBorderCell();
        const cellB2 = worksheet.getCell(2, 2);
        cellB2.value = `${payrollNo}`;
        cellB2.border = this.fullBorderCell();
        const cell32 = worksheet.getCell(3, 2);
        cell32.value = `${dateFrom} - ${dateTo}`;
        cell32.border = this.fullBorderCell();
        worksheet.mergeCells(1, 2, 1, 3);
        worksheet.mergeCells(2, 2, 2, 3);
        worksheet.mergeCells(3, 2, 3, 3);
    }
    columnDefaults(payrollReport) {
        const { PayCategories: payCategories = {} } = payrollReport;
        if (!payCategories || (0, is_empty_object_util_1.isEmptyObject)(payCategories)) {
            return { columns: [], mergeColumnKeys: [] };
        }
        const categoriesHaveTotalColumn = [
            'A-100',
            'A-110',
            'B-200',
            'B-210',
            'C-100',
            'C-110',
        ];
        const defaultColumnStyle = { width: 20, style: { numFmt: '#,##0.00' } };
        const columns = [
            { key: 'EmployeeRef', ...defaultColumnStyle },
            { key: 'FullNameLocal', ...defaultColumnStyle },
            { key: 'Employee:FullNameEn', ...defaultColumnStyle },
            { key: 'Employee:PaidDays', ...defaultColumnStyle },
            { key: 'Employee:NonPaidDay', ...defaultColumnStyle },
        ];
        const categories = Object.keys(payCategories);
        const mergeColumnKeys = [];
        const addTotalColumn = (args) => {
            const { cateCode, colKey } = args;
            if (categoriesHaveTotalColumn.includes(cateCode)) {
                columns.push({ key: colKey + `::total`, ...defaultColumnStyle });
                mergeColumnKeys.push(`total|${colKey}::total`);
            }
        };
        for (const category of categories) {
            const payElementCodes = Object.keys(payCategories[category]['PayElementSets'] ?? {});
            const totalElementCodes = payElementCodes.length;
            if (!totalElementCodes)
                continue;
            const defaultKey = `PayCategories:${category}`;
            for (let index = 0; index < totalElementCodes; index++) {
                columns.push({
                    key: defaultKey + `:${payElementCodes[index]}`,
                    ...defaultColumnStyle,
                });
                if (index === totalElementCodes - 1) {
                    addTotalColumn({ cateCode: category, colKey: defaultKey });
                }
            }
            if (category === 'X-100')
                continue;
            const firstElementCode = payElementCodes[0];
            const lastElementCode = payElementCodes[totalElementCodes - 1];
            mergeColumnKeys.push(`category|${defaultKey}|${firstElementCode}|${lastElementCode}`);
        }
        return { columns, mergeColumnKeys };
    }
    columnCustomizes(columnCustomizes) {
        const categoriesHaveTotalColumn = [
            'A-100',
            'A-110',
            'B-200',
            'B-210',
            'C-100',
            'C-110',
        ];
        const columns = [];
        const mergeColumnKeys = [];
        const defaultColumnStyle = { width: 20, style: { numFmt: '#,##0.00' } };
        const addTotalColumn = (args) => {
            const { cateCode, colKey } = args;
            if (categoriesHaveTotalColumn.includes(cateCode)) {
                columns.push({ key: colKey + `::total`, ...defaultColumnStyle });
                mergeColumnKeys.push(`total|${colKey}::total`);
            }
        };
        for (const { id: colKey = '', children = [], name = '', } of columnCustomizes) {
            if (!colKey)
                continue;
            const isCategoryCol = colKey.startsWith('PayCategories');
            const isAggCate = colKey.startsWith('PayCategories:X-100');
            const totalChildren = children.length;
            if (isCategoryCol && !isAggCate && !children.length) {
                columns.push({ ...defaultColumnStyle, key: colKey });
                continue;
            }
            if (isCategoryCol && !isAggCate) {
                const [, cateCode] = colKey.split(':');
                for (let index = 0; index < totalChildren; index++) {
                    const { id: childId, name: headerName = '' } = children[index];
                    if (!childId)
                        continue;
                    columns.push({
                        ...defaultColumnStyle,
                        key: colKey + `:${childId}`,
                        headerName,
                    });
                    if (index === totalChildren - 1) {
                        addTotalColumn({ cateCode, colKey });
                    }
                }
            }
            else {
                columns.push({ ...defaultColumnStyle, key: colKey, headerName: name });
            }
            if (isAggCate || !isCategoryCol) {
                if (isAggCate) {
                    mergeColumnKeys.push(`total|${colKey}`);
                }
                continue;
            }
            const firstElementCode = children[0].id;
            const lastElementCode = children[totalChildren - 1].id;
            mergeColumnKeys.push(`category|${colKey}|${firstElementCode}|${lastElementCode}`);
        }
        return { columns, mergeColumnKeys };
    }
    totalColumn(args) {
        const categoriesHaveTotalColumn = [
            'A-100',
            'A-110',
            'B-200',
            'B-210',
            'C-100',
            'C-110',
        ];
        const { cateCode, colKey } = args;
        if (categoriesHaveTotalColumn.includes(cateCode)) {
            return {
                columns: [
                    { key: colKey + `::total`, width: 20, style: { numFmt: '#,##0.00' } },
                ],
                mergeColumnKeys: [`total|${colKey}::total`],
            };
        }
        return { columns: [], mergeColumnKeys: [] };
    }
    totalRowOfEveryColumn(args) {
        const { worksheet, columns } = args;
        const latestRow = worksheet.lastRow;
        if (!latestRow || latestRow?.number < 8)
            return;
        const startRowData = 8;
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            const columnNumber = index + 1;
            const totalCell = worksheet.getCell(latestRow.number + 1, columnNumber);
            totalCell.border = this.fullBorderCell();
            if (!column.key?.startsWith('PayCategories')) {
                continue;
            }
            const [, categoryCode] = column.key.split(':');
            const { address: startAddress } = worksheet.getCell(startRowData, columnNumber);
            const { address: endAddress } = worksheet.getCell(latestRow.number, columnNumber);
            totalCell.value = {
                formula: `SUM(${startAddress}:${endAddress})`,
                date1904: false,
            };
            totalCell.style.font = { bold: true };
            totalCell.fill = this.fillColorBy(categoryCode);
        }
    }
    insertPayrollReportToWorkSheet(args) {
        const { payrollReports, columns, worksheet } = args;
        let dataRowNumber = Number(args.dataRowNumber).valueOf();
        for (const report of payrollReports) {
            const payCalcMet = report['payCalcMet'] === payroll_group_type_enum_1.EPayrollGroupType.MONTHLY_OR_DAILY
                ? 'Days'
                : 'Hours';
            for (let colNumber = 0; colNumber < columns.length; colNumber++) {
                const col = columns[colNumber];
                const colKeys = col.key?.split(':') || [];
                if (!colKeys.length)
                    continue;
                const prField = colKeys[0];
                const prSubField = (colKeys[1] || '');
                const elementCode = colKeys[2] || '';
                const isTotal = colKeys[3] === 'total' ? true : false;
                let cellValue = '';
                if (prSubField) {
                    if (prField === 'PayCategories') {
                        cellValue = isTotal
                            ? report['PayCategories'][prSubField]?.Total || 0
                            : report['PayCategories'][prSubField]['PayElementSets'][elementCode]?.Amount || 0;
                        cellValue = Number(cellValue) || 0;
                    }
                    else {
                        cellValue = report[prField][prSubField];
                    }
                }
                else {
                    cellValue = report[prField];
                }
                const dataCell = worksheet.getCell(dataRowNumber, colNumber + 1);
                dataCell.border = this.fullBorderCell();
                dataCell.fill = this.fillColorBy(prSubField);
                const isPaidOrNonUnpaidCol = prSubField === 'PaidDays' || prSubField === 'NonPaidDay';
                if (isPaidOrNonUnpaidCol) {
                    const paidOrUnPaidValue = (0, class_validator_1.isDecimal)(String(cellValue))
                        ? String(cellValue).replace('.', ',')
                        : cellValue;
                    dataCell.value = paidOrUnPaidValue + ` ${payCalcMet}`;
                }
                else {
                    dataCell.value = cellValue;
                }
            }
            dataRowNumber++;
        }
    }
    differentTotal(args) {
        const { currAmount = '0', prevAmount = '0', byPercentage = 'false' } = args;
        let diffValue = Number(currAmount) - Number(prevAmount);
        if (byPercentage === 'true') {
            if (prevAmount === '0') {
                diffValue = 100;
            }
            else {
                diffValue = (Number(currAmount) / Number(prevAmount)) * 100;
            }
        }
        return Number.isInteger(diffValue)
            ? diffValue.toString()
            : diffValue.toFixed(2);
    }
    getNumberInTextFormula(cellAddress, textToSearch) {
        return `VALUE(IF(ISNUMBER(SEARCH("${textToSearch}", ${cellAddress})), LEFT(${cellAddress},SEARCH(" ", ${cellAddress})-1),0))`;
    }
    convertHoursToDaysFormula(fromCellAddr, toCellAddr) {
        return `MOD(
          VALUE(SUM(${fromCellAddr}:${toCellAddr}) / 24), 
          24
        )`;
    }
    convertDaysToHoursFormula(fromCellAddr, toCellAddr) {
        return `SUM(${fromCellAddr}:${toCellAddr}) * 24`;
    }
    getNumWithTwoDecPlaces(addr) {
        return `IF(TEXT(${addr}, "0,00")=",", 0, TEXT(${addr}, "0,00"))`;
    }
    calculateTotalPaidAndNonUnpaidCell(params) {
        const { worksheet, lastRow } = params;
        const lastColumn = worksheet.columns.length;
        const startRowData = 8;
        const paidDaysColumn = worksheet.getColumn('Employee:PaidDays').number;
        const nonPaidDaysColumn = worksheet.getColumn('Employee:NonPaidDay').number;
        const totalPaidDaysCol = lastColumn + 10;
        const totalPaidHoursCol = lastColumn + 11;
        const totalNonPaidDaysCol = lastColumn + 12;
        const totalNonPaidHoursCol = lastColumn + 13;
        for (let row = 8; row < lastRow; row++) {
            const paidDayCell = worksheet.getCell(row, paidDaysColumn).address;
            const nonPaidDayCell = worksheet.getCell(row, nonPaidDaysColumn).address;
            worksheet.getCell(row, totalPaidDaysCol).value = {
                formula: this.getNumberInTextFormula(paidDayCell, 'Day'),
            };
            worksheet.getCell(row, totalPaidHoursCol).value = {
                formula: this.getNumberInTextFormula(paidDayCell, 'Hour'),
            };
            worksheet.getCell(row, totalNonPaidDaysCol).value = {
                formula: this.getNumberInTextFormula(nonPaidDayCell, 'Day'),
            };
            worksheet.getCell(row, totalNonPaidHoursCol).value = {
                formula: this.getNumberInTextFormula(nonPaidDayCell, 'Hour'),
            };
        }
        const startTotalPaidDaysCell = worksheet.getCell(startRowData, totalPaidDaysCol).address;
        const startTotalPaidHoursCell = worksheet.getCell(startRowData, totalPaidHoursCol).address;
        const startTotalNonPaidDaysCell = worksheet.getCell(startRowData, totalNonPaidDaysCol).address;
        const startTotalNonPaidHoursCell = worksheet.getCell(startRowData, totalNonPaidHoursCol).address;
        const endTotalPaidDaysCell = worksheet.getCell(lastRow - 1, totalPaidDaysCol).address;
        const endTotalPaidHoursCell = worksheet.getCell(lastRow - 1, totalPaidHoursCol).address;
        const endTotalNonPaidDaysCell = worksheet.getCell(lastRow - 1, totalNonPaidDaysCol).address;
        const endTotalNonPaidHoursCell = worksheet.getCell(lastRow - 1, totalNonPaidHoursCol).address;
        worksheet.getCell(lastRow, totalPaidDaysCol).value = {
            formula: `SUM(
        SUM(${startTotalPaidDaysCell}:${endTotalPaidDaysCell}), 
        ${this.convertHoursToDaysFormula(startTotalPaidHoursCell, endTotalPaidHoursCell)}
      )`,
        };
        worksheet.getCell(lastRow, totalPaidHoursCol).value = {
            formula: `SUM(
        SUM(${startTotalPaidHoursCell}:${endTotalPaidHoursCell}), 
        ${this.convertDaysToHoursFormula(startTotalPaidDaysCell, endTotalPaidDaysCell)}
      )`,
        };
        worksheet.getCell(lastRow, totalNonPaidDaysCol).value = {
            formula: `SUM(
        SUM(${startTotalNonPaidDaysCell}:${endTotalNonPaidDaysCell}),
        ${this.convertHoursToDaysFormula(startTotalNonPaidHoursCell, endTotalNonPaidHoursCell)}
      )`,
        };
        worksheet.getCell(lastRow, totalNonPaidHoursCol).value = {
            formula: `SUM(
        SUM(${startTotalNonPaidHoursCell}:${endTotalNonPaidHoursCell}), 
        ${this.convertDaysToHoursFormula(startTotalNonPaidDaysCell, endTotalNonPaidDaysCell)}
      )`,
        };
        const totalPaidDays = worksheet.getCell(lastRow, totalPaidDaysCol);
        const totalPaidHours = worksheet.getCell(lastRow, totalPaidHoursCol);
        const totalNonPaidDays = worksheet.getCell(lastRow, totalNonPaidDaysCol);
        const totalNonPaidHours = worksheet.getCell(lastRow, totalNonPaidHoursCol);
        worksheet.getCell(lastRow, paidDaysColumn).value = {
            formula: `SUBSTITUTE( 
        SUBSTITUTE("Days: " & ${this.getNumWithTwoDecPlaces(totalPaidDays.address)} & " | Hours: " & ${this.getNumWithTwoDecPlaces(totalPaidHours.address)}, "%day", ${totalPaidDays.address}),
        "%hour",
        ${totalPaidHours.address}
      )`,
        };
        worksheet.getCell(lastRow, nonPaidDaysColumn).value = {
            formula: `SUBSTITUTE( 
        SUBSTITUTE("Days: " & ${this.getNumWithTwoDecPlaces(totalNonPaidDays.address)} & " | Hours: " & ${this.getNumWithTwoDecPlaces(totalNonPaidHours.address)}, "%day", ${totalNonPaidDays.address}),
        "%hour",
        ${totalNonPaidHours.address}
      )`,
        };
    }
};
exports.PayrollReportHelper = PayrollReportHelper;
exports.PayrollReportHelper = PayrollReportHelper = __decorate([
    (0, common_1.Injectable)()
], PayrollReportHelper);
//# sourceMappingURL=payroll-report.helper.js.map
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
exports.ImportExportTimeSheetAdjustmentExcelFileService = void 0;
const common_1 = require("@nestjs/common");
const exceljs_1 = require("exceljs");
const constants_1 = require("../constants");
const employee_service_1 = require("../../../../user/modules/employee/employee.service");
const moment = require("moment");
const timesheet_adjustment_service_1 = require("./timesheet-adjustment.service");
const database_1 = require("../../../../../core/database");
const pay_element_mapping_service_1 = require("../../pay-element-mapping/pay-element-mapping.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ImportExportTimeSheetAdjustmentExcelFileService = class ImportExportTimeSheetAdjustmentExcelFileService {
    constructor(timeSheetAdjustmentRepository, timeSheetAdjustmentService, employeeService, payElementMappingService) {
        this.timeSheetAdjustmentRepository = timeSheetAdjustmentRepository;
        this.timeSheetAdjustmentService = timeSheetAdjustmentService;
        this.employeeService = employeeService;
        this.payElementMappingService = payElementMappingService;
    }
    handleCreateRawFile(payrollHeaderId) {
        const workbook = new exceljs_1.Workbook();
        const currentTime = moment().utc().format('YYYYDDMMhhmm');
        const fileName = payrollHeaderId
            ? constants_1.TIME_SHEET_ADJUSTMENT_FILE_NAME + `-${payrollHeaderId}-${currentTime}`
            : constants_1.TIME_SHEET_ADJUSTMENT_FILE_NAME + `-${currentTime}`;
        const worksheet = workbook.addWorksheet(fileName);
        const headers = constants_1.TIME_SHEET_ADJUSTMENT_FILE_HEADER;
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell(cell => {
            cell.font = { bold: true };
        });
        worksheet.columns = constants_1.TIME_SHEET_ADJUSTMENT_FILE_CONFIG.map(col => ({
            header: col.name,
            key: col.key,
            width: col.width,
        }));
        return { workbook, worksheet, fileName };
    }
    async handleGenerateExampleFile(companyId, payrollHeaderId, query) {
        const { workbook, worksheet, fileName } = this.handleCreateRawFile();
        const sampleData = await this.timeSheetAdjustmentService.getTimesheetAdjustmentByPayrollHeaderId(payrollHeaderId, companyId, query, query.adjustmentType);
        if (sampleData && sampleData.length > 0) {
            sampleData.forEach(data => {
                const newData = {
                    fullNameLocal: data.fullNameLocal,
                    fullNameEnglish: data.fullNameEn,
                    employeeRef: data.employeeRef,
                    orgElements: data.orgElements,
                    costCenter: data.costCenter,
                    payrollGroup: data.payrollGroup,
                    adjustmentType: data.timeSheetType,
                    payElementMapping: data.payElementMapping?.name,
                    payElementMappingCode: data.payElementMapping?.code,
                    date: data.date,
                    hours: data.hour,
                };
                worksheet.addRow(Object.values(newData));
            });
            const buffer = await workbook.xlsx.writeBuffer();
            return { buffer, fileName };
        }
        constants_1.TIME_SHEET_ADJUSTMENT_SAMPLE_DATA.forEach(data => {
            worksheet.addRow(Object.values(data));
        });
        const buffer = await workbook.xlsx.writeBuffer();
        return { buffer, fileName };
    }
    async handleValidateHeader(actualHeaders) {
        const isValidHeader = constants_1.TIME_SHEET_ADJUSTMENT_FILE_CONFIG.every((header, index) => {
            return header.name === actualHeaders[index];
        });
        if (!isValidHeader) {
            throw new common_1.BadRequestException('Invalid header format');
        }
    }
    async handleValidateAndFormatData(companyId, payrollHeaderId, data) {
        const listEmployeeRef = data.map(itemData => {
            return itemData[constants_1.EMPLOYEE_REF];
        });
        const employees = await this.employeeService.getEmployeeByEmployeeRef(companyId, listEmployeeRef);
        const result = [];
        const listErrorRows = [];
        for (let index = 0; index < data.length; index++) {
            const itemData = data[index];
            const employeeRef = itemData[constants_1.EMPLOYEE_REF] ?? '';
            const adjustmentTypes = itemData[constants_1.ADDJUSTMENT_TYPES] ?? '';
            const payElementMapping = itemData[constants_1.PAY_ELEMENT_MAPPING] ?? '';
            const payElementMappingName = payElementMapping.toLowerCase();
            const payElementMappingCode = itemData[constants_1.PAY_ELEMENT_MAPPING_CODE] ?? '';
            const date = itemData[constants_1.DATE] ?? '';
            const hour = itemData[constants_1.HOURS];
            const foundEmployee = employees.find(item => {
                return item.employeeRef === employeeRef;
            });
            if (!foundEmployee) {
                listErrorRows.push(`Not found Employee with Employee Ref: ${employeeRef} at row ${index + 2}`);
                continue;
            }
            switch (adjustmentTypes) {
                case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition: {
                    if (payElementMappingName.toLowerCase() !==
                        constants_1.PAY_ELEMENT_MAPPING_NAME.adjAdditionPrevMonth.toLowerCase()) {
                        listErrorRows.push(`Adjustment Type and Pay Element Mapping does not match at row ${index + 2}`);
                        continue;
                    }
                    break;
                }
                case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction: {
                    if (payElementMappingName !==
                        constants_1.PAY_ELEMENT_MAPPING_NAME.adjDeductionPrevMonth.toLowerCase()) {
                        listErrorRows.push(`Adjustment Type and Pay Element Mapping does not match at row ${index + 2}`);
                        continue;
                    }
                    break;
                }
                case database_1.TimeSheetAdjustmentType.Unpaid: {
                    if (payElementMappingName !==
                        constants_1.PAY_ELEMENT_MAPPING_NAME.unpaidDaysCC.toLowerCase()) {
                        listErrorRows.push(`Adjustment Type and Pay Element Mapping does not match at row ${index + 2}`);
                        continue;
                    }
                    break;
                }
                default: {
                    listErrorRows.push(`Adjustment Type is incorrect at row ${index + 2}`);
                    continue;
                }
            }
            const payElementMappingEntity = await this.payElementMappingService.getPayElementMappingByCode(payElementMappingCode, companyId);
            if (payElementMappingEntity.length === 0) {
                listErrorRows.push(`Pay Element Mapping is incorrect at row ${index + 2}`);
                continue;
            }
            if (payElementMappingEntity[0].name.toLowerCase() !== payElementMappingName) {
                listErrorRows.push(`Pay element Mapping Name and Pay Element Mapping Code does not match at row ${index + 2}`);
                continue;
            }
            if (date !== '' && !moment(date, 'YYYY-MM-DD', true).isValid()) {
                listErrorRows.push(`Date format is incorrect format YYYY-MM-DD at row ${index + 2}`);
                continue;
            }
            if (hour !== '' && hour !== undefined && hour !== null && isNaN(hour)) {
                listErrorRows.push(`Hour is incorrect at row ${index + 2}`);
                continue;
            }
            if (foundEmployee.payrollTimeSheets.length === 0) {
                listErrorRows.push(`Not found Payroll Timesheet at row ${index + 2}`);
                continue;
            }
            const payrollTimesheet = foundEmployee.payrollTimeSheets.find(item => {
                return item.prtrxHdrId === payrollHeaderId;
            });
            if (!payrollTimesheet) {
                listErrorRows.push(`Not found prtrxHdrId at row ${index + 2}`);
                continue;
            }
            if (payrollTimesheet) {
                const prtrxEmps = payrollTimesheet?.prtrxHdr?.prtrxEmps.find(prtrxEmp => prtrxEmp.included === false &&
                    prtrxEmp.employeeId === foundEmployee.id);
                if (prtrxEmps) {
                    listErrorRows.push(`Employee does not belong to prtrxHdrId at row ${index + 2}`);
                    continue;
                }
            }
            result.push({
                timeSheetType: adjustmentTypes,
                status: database_1.AdjustmentStatus.Manual,
                payElementMappingId: payElementMappingEntity[0].id,
                startDate: date,
                endDate: date,
                hour: hour,
                payrollTimesheetId: payrollTimesheet.id,
                adjustmentType: hour !== '' ? database_1.TimeAdjustmentType.Hour : database_1.TimeAdjustmentType.Date,
            });
        }
        if (listErrorRows.length !== 0) {
            throw new common_1.BadRequestException(listErrorRows);
        }
        return result;
    }
    async handleImportTimeSheetAdjustmentFile(companyId, payrollHeaderId, file, userEmail) {
        if (!file?.buffer) {
            throw new common_1.BadRequestException('Do not find any file sent');
        }
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.load(file.buffer);
        const worksheet = workbook.worksheets[0];
        const data = [];
        const actualHeaders = [];
        worksheet.getRow(1).eachCell((cell, colNumber) => {
            actualHeaders.push(cell.value);
        });
        await this.handleValidateHeader(actualHeaders);
        worksheet.eachRow((row, rowNumber) => {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const header = worksheet.getRow(1).getCell(colNumber).value;
                rowData[header] = cell.value;
            });
            data.push(rowData);
        });
        data.shift();
        const formatData = await this.handleValidateAndFormatData(companyId, payrollHeaderId, data);
        const result = await this.timeSheetAdjustmentService.createAdjustmentWithDtos(formatData, companyId, userEmail);
        const updatedResults = [];
        for (const entity of result) {
            const updatedResult = this.timeSheetAdjustmentService.getAdjustmentById(entity.id, companyId);
            updatedResults.push(updatedResult);
        }
        return Promise.all(updatedResults);
    }
    async handleExportTimeSheetAdjustmentFile(companyId, query, payrollHeaderId) {
        const { workbook, worksheet, fileName } = this.handleCreateRawFile();
        const adjustmentDatas = await this.timeSheetAdjustmentService.getTimesheetAdjustmentByPayrollHeaderId(payrollHeaderId, companyId, query, query.adjustmentType);
        const listData = adjustmentDatas.map(adjustmentData => {
            const fullNameLocal = adjustmentData?.fullNameLocal;
            const fullNameEn = adjustmentData?.fullNameEn;
            const employeeRef = adjustmentData?.employeeRef;
            const orgElements = adjustmentData?.orgElements;
            const costCenter = adjustmentData?.costCenter;
            const payrollGroup = adjustmentData?.payrollGroup;
            const adjustmentType = adjustmentData?.timeSheetType;
            const payElementMapping = adjustmentData.payElementMapping?.name;
            const payElementMappingCode = adjustmentData.payElementMapping?.code;
            const date = adjustmentData?.date;
            const hour = adjustmentData?.hour;
            return {
                fullNameLocal,
                fullNameEn,
                employeeRef,
                orgElements,
                costCenter,
                payrollGroup,
                adjustmentType,
                payElementMapping,
                payElementMappingCode,
                date,
                hour,
            };
        });
        listData.forEach(data => {
            const row = constants_1.TIME_SHEET_ADJUSTMENT_FILE_CONFIG.map(config => data[config.key]);
            worksheet.addRow(row);
        });
        const buffer = await workbook.xlsx.writeBuffer();
        return { buffer, fileName };
    }
};
exports.ImportExportTimeSheetAdjustmentExcelFileService = ImportExportTimeSheetAdjustmentExcelFileService;
exports.ImportExportTimeSheetAdjustmentExcelFileService = ImportExportTimeSheetAdjustmentExcelFileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.TimeSheetAdjustmentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        timesheet_adjustment_service_1.TimeSheetAdjustmentService,
        employee_service_1.EmployeeService,
        pay_element_mapping_service_1.PayElementMappingService])
], ImportExportTimeSheetAdjustmentExcelFileService);
//# sourceMappingURL=import-export-timesheet-adjustment-file.service.js.map
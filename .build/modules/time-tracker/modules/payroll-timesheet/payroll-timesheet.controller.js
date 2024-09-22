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
exports.PayrollTimeSheetController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../common");
const common_2 = require("@nestjs/common");
const payroll_timesheet_service_1 = require("./payroll-timesheet.service");
const iam_1 = require("../../../../core/iam");
const enums_1 = require("../../../../common/enums");
const dtos_1 = require("./dtos");
const payroll_timesheet_entity_1 = require("../../../../core/database/entities/payroll-timesheet.entity");
const decorators_1 = require("../../../../common/decorators");
const utils_1 = require("../../../../common/utils");
const constants_1 = require("../timesheet-adjustment/constants");
const database_1 = require("../../../../core/database");
const payroll_timesheet_v2_service_1 = require("./payroll-timesheet-v2.service");
let PayrollTimeSheetController = class PayrollTimeSheetController {
    constructor(payrollTimeSheetService, payrollTimeSheetServiceV2) {
        this.payrollTimeSheetService = payrollTimeSheetService;
        this.payrollTimeSheetServiceV2 = payrollTimeSheetServiceV2;
    }
    async generateExampleFile(type, companyId, headerId) {
        const { buffer, fileName } = await this.payrollTimeSheetService.handleGeneratePayrollTimesheetExcelFile(type, companyId, headerId);
        return new common_2.StreamableFile(Buffer.from(buffer), {
            disposition: `attachment; filename="${fileName}.xlsx"`,
        });
    }
    async exportPayrollTimesheetExcelFile(companyId, headerId, query) {
        const { buffer, fileName } = await this.payrollTimeSheetService.handleExportFilePayrollTimesheet(companyId, headerId, query.payrollCalculationMethod ?? database_1.PayCalculationMethod.Daily, query);
        return new common_2.StreamableFile(Buffer.from(buffer), {
            disposition: `attachment; filename="${fileName}.xlsx"`,
        });
    }
    importPayrollTimesheetExcelFile(companyId, headerId, file, userEmail, type) {
        return this.payrollTimeSheetService.handleImportFilePayrollTimesheetFile(companyId, headerId, file, userEmail, type);
    }
    getPayrollsByHeaderId(companyId, headerId, query) {
        return this.payrollTimeSheetServiceV2.getPayrollsByHeaderId(headerId, companyId, query.payrollCalculationMethod, query);
    }
    getAllPayrollsInPrtrxHdr(companyId, headerId, query) {
        return this.payrollTimeSheetServiceV2.getAllPayrollsByHeaderId(headerId, companyId, query);
    }
    createPayrollsForEmployeesInPrtrxHdr(companyId, headerId, updateRegularWorkDays, userEmail, query) {
        return this.payrollTimeSheetServiceV2.createPayrollsForEmployeesInPrtrxHdr(query, headerId, companyId, userEmail, updateRegularWorkDays);
    }
    getAllPayrollsOfEmployee(companyId, employeeId, query) {
        return this.payrollTimeSheetServiceV2.getAllPayrollsOfEmployee(employeeId, companyId, query.payrollCalculationMethod, query);
    }
    getAllPayrollsOfCompany(companyId, query) {
        return this.payrollTimeSheetServiceV2.getAllPayrollsOfCompany(companyId, query.payrollCalculationMethod, query);
    }
    createMultiPayroll(companyId, userEmail, createDtos) {
        return this.payrollTimeSheetServiceV2.createMultiPayrolls(createDtos, companyId, userEmail);
    }
    createPayroll(companyId, userEmail, createDto) {
        return this.payrollTimeSheetServiceV2.createPayroll(createDto, companyId, userEmail);
    }
    updatePayrollsWorksheduledDays(headerId, companyId, userEmail) {
        return this.payrollTimeSheetServiceV2.updatePayrollsWorksheduledDays(headerId, companyId, userEmail);
    }
    restorePayroll(payrollId, userEmail) {
        return this.payrollTimeSheetServiceV2.restorePayroll(payrollId, userEmail);
    }
    updatePayroll(payrollId, totalScheduledWorkDays, totalScheduledWorkHours, userEmail) {
        return this.payrollTimeSheetServiceV2.updatePayroll(payrollId, {
            totalScheduledWorkDays,
            totalScheduledWorkHours,
        }, userEmail);
    }
    archiveAllPayroll(companyId, headerId, userEmail) {
        return this.payrollTimeSheetServiceV2.archiveAllPayrollTimesheets(headerId, companyId, userEmail);
    }
    archiveMultiPayroll(companyId, headerId, employeeIds, userEmail) {
        return this.payrollTimeSheetServiceV2.archiveMultiPayrollTimesheet(employeeIds, headerId, companyId, userEmail);
    }
    archivePayroll(payrollId, userEmail) {
        return this.payrollTimeSheetServiceV2.archivePayroll(payrollId, userEmail);
    }
};
exports.PayrollTimeSheetController = PayrollTimeSheetController;
__decorate([
    (0, common_2.Get)('/headers/:headerId/payroll/generate-excel'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Generate excel file',
    }),
    __param(0, (0, common_2.Query)('type')),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PayrollTimeSheetController.prototype, "generateExampleFile", null);
__decorate([
    (0, common_2.Get)('/headers/:headerId/payroll/export-excel'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Export payroll timesheet excel file',
        description: 'Export payroll timesheet excel file',
    }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", Promise)
], PayrollTimeSheetController.prototype, "exportPayrollTimesheetExcelFile", null);
__decorate([
    (0, common_2.Patch)('/headers/:headerId/payroll/import-excel'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Import payroll timesheet excel file',
        description: 'Import payroll timesheet excel file',
    }),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)([constants_1.TIMESHEET_ADJUSTMENT_FILE_SUPPORT]),
        },
    }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.UploadedFile)('file')),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __param(4, (0, common_2.Query)('type', new common_2.ParseEnumPipe(database_1.PayCalculationMethod))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, String, String]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "importPayrollTimesheetExcelFile", null);
__decorate([
    (0, common_2.Get)('/headers/:headerId/payroll'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get payrolls by header id',
        description: 'Get payrolls by header id',
    }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "getPayrollsByHeaderId", null);
__decorate([
    (0, common_2.Get)('/all/headers/:headerId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all payrolls by header id',
        description: 'Get all payrolls by header id',
    }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "getAllPayrollsInPrtrxHdr", null);
__decorate([
    (0, common_2.Get)('/headers/:headerId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get payrolls by header id',
        description: 'Get payrolls by header id',
    }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Param)('updateRegularWorkDays')),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __param(4, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Boolean, String, dtos_1.CreatePayrollByPrtrxHdrDto]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "createPayrollsForEmployeesInPrtrxHdr", null);
__decorate([
    (0, common_2.Get)('/employee/:employeeId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all time sheet payrolls of employee',
        description: 'Get all time sheet payrolls of employee',
    }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('employeeId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "getAllPayrollsOfEmployee", null);
__decorate([
    (0, common_2.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all time sheet payrolls of company',
        description: 'Get all time sheet payrolls of company',
    }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "getAllPayrollsOfCompany", null);
__decorate([
    (0, common_2.Post)('/multiple'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({ summary: 'Create multiple new payroll time sheet' }),
    (0, swagger_1.ApiResponse)({ type: [payroll_timesheet_entity_1.PayrollTimeSheetEntity] }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, dtos_1.CreateMultiPayrollTimeSheetDto]),
    __metadata("design:returntype", Promise)
], PayrollTimeSheetController.prototype, "createMultiPayroll", null);
__decorate([
    (0, common_2.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new payroll time sheet' }),
    (0, swagger_1.ApiResponse)({ type: payroll_timesheet_entity_1.PayrollTimeSheetEntity }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, dtos_1.CreatePayrollTimeSheetDto]),
    __metadata("design:returntype", Promise)
], PayrollTimeSheetController.prototype, "createPayroll", null);
__decorate([
    (0, common_2.Patch)('/headers/:headerId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update payroll time sheet work scheduled days and proration work days',
        description: 'Update payroll time sheet work scheduled days and proration work days',
    }),
    __param(0, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "updatePayrollsWorksheduledDays", null);
__decorate([
    (0, common_2.Patch)('/restore/:payrollId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore a payroll time sheet',
        description: 'Restore a payroll time sheet',
    }),
    (0, swagger_1.ApiResponse)({ type: payroll_timesheet_entity_1.PayrollTimeSheetEntity }),
    __param(0, (0, common_2.Param)('payrollId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PayrollTimeSheetController.prototype, "restorePayroll", null);
__decorate([
    (0, common_2.Patch)('/:payrollId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update proration work in payroll time sheet',
        description: 'Update proration work in payroll time sheet',
    }),
    (0, swagger_1.ApiResponse)({ type: payroll_timesheet_entity_1.PayrollTimeSheetEntity }),
    __param(0, (0, common_2.Param)('payrollId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Body)('totalScheduledWorkDays')),
    __param(2, (0, common_2.Body)('totalScheduledWorkHours')),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], PayrollTimeSheetController.prototype, "updatePayroll", null);
__decorate([
    (0, common_2.Delete)('/all/headers/:headerId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete multiple time sheet adjustments',
        description: 'Delete multiple time sheet adjustments',
    }),
    (0, swagger_1.ApiResponse)({ type: payroll_timesheet_entity_1.PayrollTimeSheetEntity }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(2, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "archiveAllPayroll", null);
__decorate([
    (0, common_2.Delete)('/headers/:headerId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete multiple time sheet adjustments',
        description: 'Delete multiple time sheet adjustments',
    }),
    (0, swagger_1.ApiResponse)({ type: payroll_timesheet_entity_1.PayrollTimeSheetEntity }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Body)('employeeIds')),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, String]),
    __metadata("design:returntype", void 0)
], PayrollTimeSheetController.prototype, "archiveMultiPayroll", null);
__decorate([
    (0, common_2.Delete)('/:payrollId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a time sheet adjustment',
        description: 'Delete a time sheet adjustment',
    }),
    (0, swagger_1.ApiResponse)({ type: payroll_timesheet_entity_1.PayrollTimeSheetEntity }),
    __param(0, (0, common_2.Param)('payrollId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PayrollTimeSheetController.prototype, "archivePayroll", null);
exports.PayrollTimeSheetController = PayrollTimeSheetController = __decorate([
    (0, swagger_1.ApiTags)(common_1.PAYROLL_TIME_SHEET_API_TAG),
    (0, common_2.Controller)({ path: common_1.PAYROLL_TIME_SHEET_API_PATH }),
    __metadata("design:paramtypes", [payroll_timesheet_service_1.PayrollTimeSheetService,
        payroll_timesheet_v2_service_1.PayrollTimeSheetServiceV2])
], PayrollTimeSheetController);
//# sourceMappingURL=payroll-timesheet.controller.js.map
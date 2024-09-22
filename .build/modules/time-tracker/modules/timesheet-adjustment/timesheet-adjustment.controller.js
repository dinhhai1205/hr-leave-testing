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
exports.TimeSheetAdjustmentController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../common");
const common_2 = require("@nestjs/common");
const iam_1 = require("../../../../core/iam");
const enums_1 = require("../../../../common/enums");
const dto_1 = require("../../../../common/dto");
const decorators_1 = require("../../../../common/decorators");
const utils_1 = require("../../../../common/utils");
const constants_1 = require("./constants");
const services_1 = require("./services");
const dtos_1 = require("./dtos");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
let TimeSheetAdjustmentController = class TimeSheetAdjustmentController {
    constructor(timeSheetAdjustmentService, importExportTimeSheet) {
        this.timeSheetAdjustmentService = timeSheetAdjustmentService;
        this.importExportTimeSheet = importExportTimeSheet;
    }
    async recomputeFromLeave({ companyId }, payrollHeaderId, userEmail) {
        const result = await this.timeSheetAdjustmentService.handleRecomputeFromLeave(companyId, userEmail, payrollHeaderId);
        return result;
    }
    async importFile(file, companyId, payrollHeaderId, userEmail) {
        const result = await this.importExportTimeSheet.handleImportTimeSheetAdjustmentFile(companyId, payrollHeaderId, file, userEmail);
        return result;
    }
    async exportFile(companyId, payrollHeaderId, query) {
        const { buffer, fileName } = await this.importExportTimeSheet.handleExportTimeSheetAdjustmentFile(companyId, query, payrollHeaderId);
        return new common_2.StreamableFile(Buffer.from(buffer), {
            disposition: `attachment; filename="${fileName}.xlsx"`,
        });
    }
    getAdjustmentsByHeaderId(headerId, { companyId }, timeTrackerEmployeeInfo, userEmail, query) {
        return this.timeSheetAdjustmentService.getAdjustmentsByPayrollHeaderId(headerId, companyId, query, userEmail, timeTrackerEmployeeInfo?.timeTrackerCompanyId, query.adjustmentType);
    }
    async generateExampleFile(companyId, payrollHeaderId, query) {
        const { buffer, fileName } = await this.importExportTimeSheet.handleGenerateExampleFile(companyId, payrollHeaderId, query);
        return new common_2.StreamableFile(Buffer.from(buffer), {
            disposition: `attachment; filename="${fileName}.xlsx"`,
        });
    }
    getAdjustmentById(adjustmentId, companyId) {
        return this.timeSheetAdjustmentService.getAdjustmentById(adjustmentId, companyId);
    }
    getAllAdjustments(companyId, query) {
        return this.timeSheetAdjustmentService.getAllAdjustments(companyId, query);
    }
    createMultiAdjustment(companyId, userEmail, createAdjustmentDtos) {
        return this.timeSheetAdjustmentService.createMultiAdjustments(createAdjustmentDtos, companyId, userEmail);
    }
    createAdjustment(companyId, userEmail, createAdjustmentDto) {
        return this.timeSheetAdjustmentService.createAdjustment(createAdjustmentDto, companyId, userEmail);
    }
    restoreAdjustment(adjustmentId, userEmail) {
        return this.timeSheetAdjustmentService.restoreAdjustment(adjustmentId, userEmail);
    }
    updateAdjustment(adjustmentId, userEmail, updateAdjustmentDto) {
        return this.timeSheetAdjustmentService.updateAdjustment(adjustmentId, updateAdjustmentDto, userEmail);
    }
    deleteAdjustments(adjustmentIds, userEmail) {
        return this.timeSheetAdjustmentService.archiveMultiAdjustment(adjustmentIds, userEmail);
    }
    deleteAdjustment(adjustmentId, userEmail) {
        return this.timeSheetAdjustmentService.archiveAdjustment(adjustmentId, userEmail);
    }
};
exports.TimeSheetAdjustmentController = TimeSheetAdjustmentController;
__decorate([
    (0, common_2.Post)('/recompute-leave/payroll-header/:payrollHeaderId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Recompute sync from leave',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    __param(0, (0, common_2.Param)()),
    __param(1, (0, common_2.Param)('payrollHeaderId')),
    __param(2, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number, String]),
    __metadata("design:returntype", Promise)
], TimeSheetAdjustmentController.prototype, "recomputeFromLeave", null);
__decorate([
    (0, common_2.Post)('/import-file/payroll-header/:payrollHeaderId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'Import excel file',
    }),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 25 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)([constants_1.TIMESHEET_ADJUSTMENT_FILE_SUPPORT]),
        },
    }),
    __param(0, (0, common_2.UploadedFile)('file')),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(2, (0, common_2.Param)('payrollHeaderId')),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String]),
    __metadata("design:returntype", Promise)
], TimeSheetAdjustmentController.prototype, "importFile", null);
__decorate([
    (0, common_2.Get)('/export-file/payroll-header/:payrollHeaderId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Export excel file',
    }),
    __param(0, (0, common_2.Param)('companyId')),
    __param(1, (0, common_2.Param)('payrollHeaderId')),
    __param(2, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", Promise)
], TimeSheetAdjustmentController.prototype, "exportFile", null);
__decorate([
    (0, common_2.Get)('/headers/:headerId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time sheet adjustments with payroll header id',
        description: 'Get time sheet adjustments with payroll header id',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TimeSheetAdjustmentDto }),
    __param(0, (0, common_2.Param)('headerId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)()),
    __param(2, (0, common_1.TimeTrackerEmpInfo)()),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __param(4, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object, String, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", void 0)
], TimeSheetAdjustmentController.prototype, "getAdjustmentsByHeaderId", null);
__decorate([
    (0, common_2.Get)('/generate-file/payroll-header/:payrollHeaderId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Generate excel file',
    }),
    __param(0, (0, common_2.Param)('companyId')),
    __param(1, (0, common_2.Param)('payrollHeaderId')),
    __param(2, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", Promise)
], TimeSheetAdjustmentController.prototype, "generateExampleFile", null);
__decorate([
    (0, common_2.Get)('/:adjustmentId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get a time sheet adjustment with id',
        description: 'Get a time sheet adjustment with id',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TimeSheetAdjustmentDto }),
    __param(0, (0, common_2.Param)('adjustmentId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TimeSheetAdjustmentController.prototype, "getAdjustmentById", null);
__decorate([
    (0, common_2.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all time sheet adjustments',
        description: 'Get all time sheet adjustments',
    }),
    (0, swagger_1.ApiResponse)({ type: (dto_1.PaginationResponseDto) }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.QueryWithPaginationDto]),
    __metadata("design:returntype", void 0)
], TimeSheetAdjustmentController.prototype, "getAllAdjustments", null);
__decorate([
    (0, common_2.Post)('/multiple'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({ summary: 'Create multiple new time sheet adjustment' }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, dtos_1.CreateMultiTimeSheetAdjustmentDto]),
    __metadata("design:returntype", Promise)
], TimeSheetAdjustmentController.prototype, "createMultiAdjustment", null);
__decorate([
    (0, common_2.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new time sheet adjustment' }),
    __param(0, (0, common_2.Param)('companyId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, dtos_1.CreateTimeSheetAdjustmentDto]),
    __metadata("design:returntype", void 0)
], TimeSheetAdjustmentController.prototype, "createAdjustment", null);
__decorate([
    (0, common_2.Patch)('/restore/:adjustmentId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Restore a time sheet adjustment',
        description: 'Restore a time sheet adjustment',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TimeSheetAdjustmentDto }),
    __param(0, (0, common_2.Param)('adjustmentId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TimeSheetAdjustmentController.prototype, "restoreAdjustment", null);
__decorate([
    (0, common_2.Patch)('/:adjustmentId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update a time sheet adjustment',
        description: 'Update a time sheet adjustment',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TimeSheetAdjustmentDto }),
    __param(0, (0, common_2.Param)('adjustmentId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __param(2, (0, common_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, dtos_1.UpdateTimeSheetAdjustmentDto]),
    __metadata("design:returntype", void 0)
], TimeSheetAdjustmentController.prototype, "updateAdjustment", null);
__decorate([
    (0, common_2.Delete)('/multiple'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a time sheet adjustment',
        description: 'Delete a time sheet adjustment',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TimeSheetAdjustmentDto }),
    __param(0, (0, common_2.Body)('adjustmentIds')),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], TimeSheetAdjustmentController.prototype, "deleteAdjustments", null);
__decorate([
    (0, common_2.Delete)('/:adjustmentId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete a time sheet adjustment',
        description: 'Delete a time sheet adjustment',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.TimeSheetAdjustmentDto }),
    __param(0, (0, common_2.Param)('adjustmentId', common_2.ParseIntPipe)),
    __param(1, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], TimeSheetAdjustmentController.prototype, "deleteAdjustment", null);
exports.TimeSheetAdjustmentController = TimeSheetAdjustmentController = __decorate([
    (0, common_2.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, swagger_1.ApiTags)(common_1.TIME_SHEET_ADJUSTMENT_API_TAG),
    (0, common_2.Controller)({ path: common_1.TIME_SHEET_ADJUSTMENT_API_PATH }),
    __metadata("design:paramtypes", [services_1.TimeSheetAdjustmentService,
        services_1.ImportExportTimeSheetAdjustmentExcelFileService])
], TimeSheetAdjustmentController);
//# sourceMappingURL=timesheet-adjustment.controller.js.map
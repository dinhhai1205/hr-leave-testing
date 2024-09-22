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
exports.LeaveTypeBalanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("../../../../common/constants");
const decorators_1 = require("../../../../common/decorators");
const auth_info_decorator_1 = require("../../../../common/decorators/auth-info.decorator");
const set_authorize_decorator_1 = require("../../../../common/decorators/set-authorize.decorator");
const enums_1 = require("../../../../common/enums");
const leave_type_service_1 = require("../leave-type/leave-type.service");
const leave_type_balance_pagination_dto_1 = require("./dto/leave-type-balance-pagination.dto");
const leave_type_balance_service_1 = require("./leave-type-balance.service");
let LeaveTypeBalanceController = class LeaveTypeBalanceController {
    constructor(leaveTypeBalanceService, leaveTypeService) {
        this.leaveTypeBalanceService = leaveTypeBalanceService;
        this.leaveTypeService = leaveTypeService;
    }
    async manualUpdateLeaveTypeBalance(companyId, body, authInfo) {
        return this.leaveTypeBalanceService.manualUpdateLeaveTypeBalance(companyId, body, authInfo.authEmail);
    }
    async getLeaveTypeBalanceByLeaveType(companyId, authInfo) {
        return this.leaveTypeService.getAndGenerateMissingLeaveTypeBalance(companyId, authInfo);
    }
    async exportLeaveTypeBalanceToExcel(response, companyId, fileType = enums_1.EExcelFileType.XLSX, authInfo, query) {
        return this.leaveTypeService.exportLeaveTypeBalance(response, {
            companyId,
            authInfo,
            query,
            excelFileType: fileType,
        });
    }
    async importLeaveTypeBalanceFromExcel(companyId, fileType = enums_1.EExcelFileType.XLSX, file, authInfo) {
        return this.leaveTypeService.importLeaveTypeBalanceFromExcel({
            companyId,
            file,
            authInfo,
            excelFileType: fileType,
        });
    }
};
exports.LeaveTypeBalanceController = LeaveTypeBalanceController;
__decorate([
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({
        summary: 'Update Leave Type Balance Record',
    }),
    (0, common_1.Put)(':companyId'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeBalanceController.prototype, "manualUpdateLeaveTypeBalance", null);
__decorate([
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get Leave Type Balance Records',
    }),
    (0, common_1.Get)(':companyId'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeBalanceController.prototype, "getLeaveTypeBalanceByLeaveType", null);
__decorate([
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EXPORT, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'Export Leave Type Balance Records' }),
    (0, common_1.Get)(':companyId/export/:fileType'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('fileType')),
    __param(3, (0, auth_info_decorator_1.AuthInfo)()),
    __param(4, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, String, Object, leave_type_balance_pagination_dto_1.LeaveTypeBalancePaginationDto]),
    __metadata("design:returntype", Promise)
], LeaveTypeBalanceController.prototype, "exportLeaveTypeBalanceToExcel", null);
__decorate([
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ADMIN] }),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        summary: 'Import Leave Type Balance Records',
        multerOptions: {
            fileFilter: (_, file, callback) => {
                if (!file.originalname.match(/\.(csv|xlsx|xls)$/)) {
                    return callback(new common_1.BadRequestException(constants_1.ERR_MSG.INVALID(file.originalname)), false);
                }
                callback(null, true);
            },
        },
    }),
    (0, common_1.Post)(':companyId/import/:fileType'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('fileType')),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeBalanceController.prototype, "importLeaveTypeBalanceFromExcel", null);
exports.LeaveTypeBalanceController = LeaveTypeBalanceController = __decorate([
    (0, swagger_1.ApiTags)('leave-type-balance'),
    (0, common_1.Controller)('leave-type-balance'),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => leave_type_service_1.LeaveTypeService))),
    __metadata("design:paramtypes", [leave_type_balance_service_1.LeaveTypeBalanceService,
        leave_type_service_1.LeaveTypeService])
], LeaveTypeBalanceController);
//# sourceMappingURL=leave-type-balance.controller.js.map
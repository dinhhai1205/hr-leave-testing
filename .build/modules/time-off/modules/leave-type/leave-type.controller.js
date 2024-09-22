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
exports.LeaveTypeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const entities_1 = require("../../../../core/database/entities");
const iam_1 = require("../../../../core/iam");
const leave_type_balance_pagination_dto_1 = require("../leave-type-balance/dto/leave-type-balance-pagination.dto");
const leave_type_balance_dto_1 = require("../leave-type-balance/dto/leave-type-balance.dto");
const leave_type_creation_dto_1 = require("./dto/leave-type-creation.dto");
const leave_type_pagination_dto_1 = require("./dto/leave-type-pagination.dto");
const leave_type_update_multiple_active_status_dto_1 = require("./dto/leave-type-update-multiple-active-status.dto");
const leave_type_updating_dto_1 = require("./dto/leave-type-updating.dto");
const leave_type_dto_1 = require("./dto/leave-type.dto");
const leave_type_service_1 = require("./leave-type.service");
const update_sub_leave_type_body_dto_1 = require("./sub-leave-type/dto/update-sub-leave-type-body.dto");
const sub_leave_type_service_1 = require("./sub-leave-type/sub-leave-type.service");
let LeaveTypeController = class LeaveTypeController {
    constructor(leaveTypeService, subLeaveTypeService) {
        this.leaveTypeService = leaveTypeService;
        this.subLeaveTypeService = subLeaveTypeService;
    }
    async getDashBoardLeaveType(companyId, authInfo) {
        return this.leaveTypeService.dashboardLeaveType(companyId, authInfo);
    }
    async getAllAvailableSubLeaveTypes(companyId) {
        return this.subLeaveTypeService.getAllAvailableSubLeaveTypes(companyId);
    }
    async getLeaveTypeBalancesByQuery(companyId, query, authInfo) {
        return this.leaveTypeService.getLeaveTypeBalancesByQuery({
            companyId,
            query,
            authInfo,
        });
    }
    async getLeaveTypeBalancesByQueryV2(companyId, query, authInfo) {
        return this.leaveTypeService.getLeaveBalancesForWeb({
            companyId,
            query,
            authInfo,
        });
    }
    async createLeaveType(companyId, body, authInfo) {
        return this.leaveTypeService.createLeaveType(companyId, body, authInfo);
    }
    async getLeaveTypeDetail(companyId, leaveId, authInfo, isParent = enums_1.EBoolean.TRUE) {
        return this.leaveTypeService.getLeaveTypeDetail(leaveId, authInfo, isParent);
    }
    async getLeaveTypesByQuery(companyId, query, authInfo) {
        return this.leaveTypeService.getLeaveTypesByQuery(companyId, query, authInfo);
    }
    async updateMultipleActiveStatusLeaveType(companyId, body, authInfo) {
        return this.leaveTypeService.updateMultipleActiveStatusLeaveType(body, authInfo);
    }
    updateSubLeaveType(companyId, parentLeaveTypeId, body, userEmail) {
        return this.subLeaveTypeService.updateSubLeaveType({
            companyId,
            userEmail,
            parentLeaveTypeId,
            bodyDto: body,
        });
    }
    async updateLeaveType(companyId, leaveTypeId, body, authInfo) {
        return this.leaveTypeService.updateLeaveType(companyId, leaveTypeId, body, authInfo);
    }
    async deleteLeaveType(companyId, ids, authInfo) {
        return this.leaveTypeService.deleteLeaveType(companyId, ids, authInfo);
    }
    async checkLeaveTypeCodeExist(companyId = undefined, code = undefined) {
        return this.leaveTypeService.checkLeaveTypeCodeExist({ companyId, code });
    }
};
exports.LeaveTypeController = LeaveTypeController;
__decorate([
    (0, common_1.Get)(':companyId/dashboard'),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "getDashBoardLeaveType", null);
__decorate([
    (0, common_1.Get)(':companyId/available-subtypes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available sub leave typess' }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "getAllAvailableSubLeaveTypes", null);
__decorate([
    (0, common_1.Get)('balance/:companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave type balances by query' }),
    (0, decorators_1.ApiOkResponsePaginated)(leave_type_balance_dto_1.LeaveTypeBalanceDto),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_type_balance_pagination_dto_1.LeaveTypeBalancePaginationDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "getLeaveTypeBalancesByQuery", null);
__decorate([
    (0, common_1.Get)('balance-v2/:companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave type balances by query' }),
    (0, decorators_1.ApiOkResponsePaginated)(leave_type_balance_dto_1.LeaveTypeBalanceDto),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_type_balance_pagination_dto_1.LeaveTypeBalancePaginationDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "getLeaveTypeBalancesByQueryV2", null);
__decorate([
    (0, common_1.Post)(':companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Create leave type' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Create leave type successfully',
        type: leave_type_dto_1.LeaveTypeDto,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.CREATE, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_type_creation_dto_1.LeaveTypeCreationDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "createLeaveType", null);
__decorate([
    (0, common_1.Get)(':companyId/:leaveId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave type via companyId and leaveId' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get leave type successfully',
        type: leave_type_dto_1.LeaveTypeDto,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveId')),
    __param(2, (0, decorators_1.AuthInfo)()),
    __param(3, (0, common_1.Query)('isParent', new common_1.ParseEnumPipe(enums_1.EBoolean, { optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "getLeaveTypeDetail", null);
__decorate([
    (0, common_1.Get)(':companyId'),
    (0, swagger_1.ApiOperation)({ summary: "Get leave's type via companyId and query" }),
    (0, decorators_1.ApiOkResponsePaginated)(leave_type_dto_1.LeaveTypeDto),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_type_pagination_dto_1.LeaveTypePagination, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "getLeaveTypesByQuery", null);
__decorate([
    (0, common_1.Put)(':companyId/multi-active-status'),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'Update multiple active status leave type' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_type_update_multiple_active_status_dto_1.LeaveTypeUpdateMultipleActiveStatusDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "updateMultipleActiveStatusLeaveType", null);
__decorate([
    (0, common_1.Put)(':companyId/:parentLeaveTypeId/subtypes'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('parentLeaveTypeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_sub_leave_type_body_dto_1.UpdateSubLeaveTypeBodyDto, String]),
    __metadata("design:returntype", void 0)
], LeaveTypeController.prototype, "updateSubLeaveType", null);
__decorate([
    (0, common_1.Put)(':companyId/:leaveTypeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update leave type status' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Update leave type status successfully',
        type: entities_1.LeaveTypeEntity,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveTypeId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, leave_type_updating_dto_1.LeaveTypeUpdatingDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "updateLeaveType", null);
__decorate([
    (0, common_1.Delete)(':companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete leave type via companyId and leaveId' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Delete leave type successfully',
        type: Boolean,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.DELETE, roles: [enums_1.ERole.ADMIN] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('ids')),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "deleteLeaveType", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check if a leave type code exist' }),
    (0, common_1.Get)(':companyId/code-check/:code'),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeController.prototype, "checkLeaveTypeCodeExist", null);
exports.LeaveTypeController = LeaveTypeController = __decorate([
    (0, swagger_1.ApiTags)('leave-type'),
    (0, common_1.Controller)('leave-type'),
    (0, iam_1.ModuleMode)(enums_1.EApiModuleMode.Leave),
    __metadata("design:paramtypes", [leave_type_service_1.LeaveTypeService,
        sub_leave_type_service_1.SubLeaveTypeService])
], LeaveTypeController);
//# sourceMappingURL=leave-type.controller.js.map
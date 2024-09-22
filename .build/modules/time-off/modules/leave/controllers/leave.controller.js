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
exports.LeaveController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../../common/decorators");
const enums_1 = require("../../../../../common/enums");
const employee_service_1 = require("../../../../user/modules/employee/employee.service");
const leave_trx_pagination_dto_1 = require("../../leave-trx/dto/leave-trx-pagination.dto");
const leave_trx_dto_1 = require("../../leave-trx/dto/leave-trx.dto");
const leave_creation_dto_1 = require("../dto/leave-creation.dto");
const leave_delete_dto_1 = require("../dto/leave-delete.dto");
const leave_group_by_leave_type_dto_1 = require("../dto/leave-group-by-leave-type.dto");
const leave_pagination_dto_1 = require("../dto/leave-pagination.dto");
const leave_update_record_1 = require("../dto/leave-update-record");
const leave_update_status_response_dto_1 = require("../dto/leave-update-status-response.dto");
const leave_update_status_dto_1 = require("../dto/leave-update-status.dto");
const leave_dto_1 = require("../dto/leave.dto");
const leave_service_1 = require("../services/leave.service");
let LeaveController = class LeaveController {
    constructor(_service, employeeService) {
        this._service = _service;
        this.employeeService = employeeService;
    }
    healthCheck() {
        return 'Ok';
    }
    async getLeaveDashboard(companyId, authInfo) {
        return this._service.getLeaveDashboard(companyId, authInfo);
    }
    async getLeaveHistoriesByQuery(companyId, query, authInfo) {
        return this._service.getLeaveHistoriesByQuery({
            companyId,
            query,
            authInfo,
        });
    }
    async groupByLeaveRecordByLeaveType(companyId, query, authInfo) {
        return this._service.groupByLeaveRecordByLeaveType(companyId, query, authInfo);
    }
    async createLeaveRecord(companyId, body, authInfo) {
        return this._service.createLeaveRecord(companyId, authInfo, body);
    }
    async getLeaveRecordsByQuery(companyId, query, authInfo) {
        return this._service.getLeaveRecordsByQuery(companyId, query, authInfo, enums_1.EPermissionActions.VIEW);
    }
    async exportLeaveRecord(companyId, query, authInfo) {
        return this._service.getLeaveRecordsByQuery(companyId, query, authInfo, enums_1.EPermissionActions.EXPORT);
    }
    async getLeaveRecordDetail(companyId, leaveId, authInfo) {
        return this._service.getLeaveRecordDetail(companyId, leaveId, authInfo);
    }
    async updateLeaveRecord(companyId, leaveId, body, authInfo) {
        return this._service.updateLeaveRecord({
            companyId,
            leaveId,
            body,
            authInfo,
        });
    }
    async updateLeaveRecordStatus(companyId, action, body, authInfo) {
        return this._service.updateLeaveRecordStatus({
            companyId,
            action,
            body,
            authInfo,
        });
    }
    async deleteLeaveRecords(companyId, body, authInfo) {
        return this._service.deleteLeaveRecord({
            companyId,
            body,
            authInfo,
        });
    }
    async getWorkingDayOfAnEmployee(companyId, employeeId) {
        return this.employeeService.getWorkingDayOfAnEmployee({
            companyId,
            employeeId,
        });
    }
};
exports.LeaveController = LeaveController;
__decorate([
    (0, common_1.Get)('health-check'),
    (0, decorators_1.SkipFlag)(enums_1.ESkipFlag.AUTHORIZATION, enums_1.ESkipFlag.API_LOG),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], LeaveController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Get)('dashboard/:companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave dashboard information' }),
    (0, decorators_1.ApiOkResponsePaginated)(leave_trx_dto_1.LeaveTrxDto),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "getLeaveDashboard", null);
__decorate([
    (0, common_1.Get)('history/:companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave histories by query' }),
    (0, decorators_1.ApiOkResponsePaginated)(leave_trx_dto_1.LeaveTrxDto),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_trx_pagination_dto_1.LeaveTrxPaginationDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "getLeaveHistoriesByQuery", null);
__decorate([
    (0, common_1.Get)(':companyId/group-by-leave-type'),
    (0, swagger_1.ApiOperation)({ summary: "Get leave's records via companyId and query" }),
    (0, decorators_1.ApiOkResponsePaginated)(leave_dto_1.LeaveDto),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_group_by_leave_type_dto_1.LeaveGroupByLeaveTypeDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "groupByLeaveRecordByLeaveType", null);
__decorate([
    (0, common_1.Post)(':companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Create leave record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Create leave record successfully',
        type: leave_dto_1.LeaveDto,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.CREATE, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_creation_dto_1.LeaveCreationDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "createLeaveRecord", null);
__decorate([
    (0, common_1.Get)(':companyId'),
    (0, swagger_1.ApiOperation)({ summary: "Get leave's records via companyId and query" }),
    (0, decorators_1.ApiOkResponsePaginated)(leave_dto_1.LeaveDto),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_pagination_dto_1.LeavePaginationDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "getLeaveRecordsByQuery", null);
__decorate([
    (0, common_1.Get)(':companyId/export-data'),
    (0, swagger_1.ApiOperation)({ summary: "Get leave's records via companyId and query" }),
    (0, decorators_1.ApiOkResponsePaginated)(leave_dto_1.LeaveDto),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EXPORT, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_pagination_dto_1.LeavePaginationDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "exportLeaveRecord", null);
__decorate([
    (0, common_1.Get)(':companyId/:leaveId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get leave record via companyId and leaveId' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Get leave record successfully',
        type: leave_dto_1.LeaveDto,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveId')),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "getLeaveRecordDetail", null);
__decorate([
    (0, common_1.Put)(':companyId/:leaveId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update leave record status' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Update leave record status successfully',
        type: leave_dto_1.LeaveDto,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, leave_update_record_1.LeaveUpdateRecordDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "updateLeaveRecord", null);
__decorate([
    (0, common_1.Put)(':companyId/approval/:action'),
    (0, swagger_1.ApiOperation)({ summary: 'Update leave record status' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Update leave record status successfully',
        type: leave_update_status_response_dto_1.leaveUpdateStatusResponseDto,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('action')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, leave_update_status_dto_1.LeaveUpdateStatusDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "updateLeaveRecordStatus", null);
__decorate([
    (0, common_1.Delete)(':companyId'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete leave record via companyId and leaveId' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Delete leave record successfully',
        type: leave_delete_dto_1.LeaveDeleteDto,
    }),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.DELETE, roles: [enums_1.ERole.ESS] }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_delete_dto_1.LeaveDeleteDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "deleteLeaveRecords", null);
__decorate([
    (0, common_1.Get)(':companyId/employee-workday/:employeeId'),
    (0, decorators_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ESS] }),
    (0, swagger_1.ApiOperation)({ summary: 'Get working day of a single employee' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "getWorkingDayOfAnEmployee", null);
exports.LeaveController = LeaveController = __decorate([
    (0, swagger_1.ApiTags)('leave'),
    (0, common_1.Controller)('leave'),
    __metadata("design:paramtypes", [leave_service_1.LeaveService,
        employee_service_1.EmployeeService])
], LeaveController);
//# sourceMappingURL=leave.controller.js.map
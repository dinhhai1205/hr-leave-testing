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
exports.LeaveTypeAssignmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_info_decorator_1 = require("../../../../common/decorators/auth-info.decorator");
const set_authorize_decorator_1 = require("../../../../common/decorators/set-authorize.decorator");
const enums_1 = require("../../../../common/enums");
const leave_type_assigment_update_dto_1 = require("./dto/leave-type-assigment-update.dto");
const leave_type_assigment_service_1 = require("./leave-type-assigment.service");
let LeaveTypeAssignmentController = class LeaveTypeAssignmentController {
    constructor(leaveTypeAssignmentService) {
        this.leaveTypeAssignmentService = leaveTypeAssignmentService;
    }
    async updateLeaveTypeAssignment(companyId, leaveTypeId, body, authInfo) {
        return this.leaveTypeAssignmentService.updateLeaveTypeAssignment(companyId, body, authInfo);
    }
    async getLeaveTypeAssignment(companyId, leaveTypeId, authInfo) {
        return this.leaveTypeAssignmentService.getLeaveTypeAssignment({ companyId, leaveTypeId }, authInfo);
    }
};
exports.LeaveTypeAssignmentController = LeaveTypeAssignmentController;
__decorate([
    (0, common_1.Put)(':companyId/leave-type/:leaveTypeId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'Update Leave Type assignment' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveTypeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, leave_type_assigment_update_dto_1.LeaveTypeAssignmentUpdate, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeAssignmentController.prototype, "updateLeaveTypeAssignment", null);
__decorate([
    (0, common_1.Get)(':companyId/leave-type/:leaveTypeId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'Get a particular Leave Type Policy record by id' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveTypeId', common_1.ParseIntPipe)),
    __param(2, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypeAssignmentController.prototype, "getLeaveTypeAssignment", null);
exports.LeaveTypeAssignmentController = LeaveTypeAssignmentController = __decorate([
    (0, swagger_1.ApiTags)('leave-type-assignment'),
    (0, common_1.Controller)('leave-type-assignment'),
    __metadata("design:paramtypes", [leave_type_assigment_service_1.LeaveTypeAssignmentService])
], LeaveTypeAssignmentController);
//# sourceMappingURL=leave-type-assigment.controller.js.map
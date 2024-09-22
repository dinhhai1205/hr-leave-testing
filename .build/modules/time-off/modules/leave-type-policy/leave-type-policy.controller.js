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
exports.LeaveTypePolicyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_info_decorator_1 = require("../../../../common/decorators/auth-info.decorator");
const set_authorize_decorator_1 = require("../../../../common/decorators/set-authorize.decorator");
const enums_1 = require("../../../../common/enums");
const leave_type_policy_creation_dto_1 = require("./dto/leave-type-policy-creation.dto");
const leave_type_policy_credit_body_dto_1 = require("./dto/leave-type-policy-credit-body.dto");
const leave_type_policy_update_dto_1 = require("./dto/leave-type-policy-update.dto");
const leave_type_policy_service_1 = require("./leave-type-policy.service");
let LeaveTypePolicyController = class LeaveTypePolicyController {
    constructor(leaveTypePolicyService) {
        this.leaveTypePolicyService = leaveTypePolicyService;
    }
    async createLeaveTypePolicy(companyId, leaveTypeId, body, authInfo) {
        body.createdBy = authInfo.authEmail;
        body.companyId = companyId;
        body.ltId = leaveTypeId;
        return this.leaveTypePolicyService.createLeaveTypePolicy(body);
    }
    async updateLeaveTypePolicy(companyId, leaveTypeId, body, authInfo) {
        return this.leaveTypePolicyService.updateLeaveTypePolicy({ companyId, leaveTypeId, updatedBy: authInfo.authEmail }, body);
    }
    async deleteLeaveTypePolicy(companyId, leaveTypeId, ids, authInfo) {
        return this.leaveTypePolicyService.deleteLeaveTypePolicy({
            companyId,
            leaveTypeId,
            updatedBy: authInfo.authEmail,
            ids,
        });
    }
    async getLeaveTypePolicy(companyId, leaveTypeId, id) {
        return (await this.leaveTypePolicyService.getLeaveTypePolicies({
            companyId,
            id,
            ltId: leaveTypeId,
        }))[0];
    }
    async getLeaveTypePolicies(companyId, leaveTypeId) {
        return this.leaveTypePolicyService.getLeaveTypePolicies({ companyId, ltId: leaveTypeId }, { effAfterUOM: 'ASC', effAfterUnit: 'ASC' });
    }
    async reComputingLeaveTypePolicyCredit(companyId, body, authInfo) {
        return this.leaveTypePolicyService.leaveTypePolicyCreditAlgorithm({
            ...body,
            authMail: authInfo.authEmail,
            companyId,
        });
    }
};
exports.LeaveTypePolicyController = LeaveTypePolicyController;
__decorate([
    (0, common_1.Post)(':companyId/leave-type/:leaveTypeId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.CREATE, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'Create a New Leave Type Policy record' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveTypeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, leave_type_policy_creation_dto_1.LeaveTypePolicyCreationBody, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypePolicyController.prototype, "createLeaveTypePolicy", null);
__decorate([
    (0, common_1.Put)(':companyId/leave-type/:leaveTypeId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'Update an Leave Type Policy Record' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveTypeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, leave_type_policy_update_dto_1.LeaveTypePolicyUpdateBody, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypePolicyController.prototype, "updateLeaveTypePolicy", null);
__decorate([
    (0, common_1.Delete)(':companyId/leave-type/:leaveTypeId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.DELETE, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete LeaveType record(s) by array of Id.',
    }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveTypeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: Number, skipMissingProperties: false }))),
    __param(3, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypePolicyController.prototype, "deleteLeaveTypePolicy", null);
__decorate([
    (0, common_1.Get)(':companyId/leave-type/:leaveTypeId/:id'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'Get a particular Leave Type Policy record by id' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveTypeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], LeaveTypePolicyController.prototype, "getLeaveTypePolicy", null);
__decorate([
    (0, common_1.Get)(':companyId/leave-type/:leaveTypeId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'List all Leave Type Policy records' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('leaveTypeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], LeaveTypePolicyController.prototype, "getLeaveTypePolicies", null);
__decorate([
    (0, common_1.Put)(':companyId/re-computing-credit'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.EDIT, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({
        summary: 'Re-computing Leave Type Policy Credit',
        description: `
    Re-computing Leave Type Policy Credit Mechanism
    - No fields provided: credit for all employee in a company
    - Just leaveTypeId: credit for all employee in a company and in a leave type
    - employeeIds or payrollGroupIds: filter employee will credited
    `,
    }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_info_decorator_1.AuthInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_type_policy_credit_body_dto_1.ReComputingCreditBody, Object]),
    __metadata("design:returntype", Promise)
], LeaveTypePolicyController.prototype, "reComputingLeaveTypePolicyCredit", null);
exports.LeaveTypePolicyController = LeaveTypePolicyController = __decorate([
    (0, swagger_1.ApiTags)('leave-type-policy'),
    (0, common_1.Controller)('leave-type-policy'),
    __metadata("design:paramtypes", [leave_type_policy_service_1.LeaveTypePolicyService])
], LeaveTypePolicyController);
//# sourceMappingURL=leave-type-policy.controller.js.map
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
exports.LeaveTypePolicyCreditTrxController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const set_authorize_decorator_1 = require("../../../../common/decorators/set-authorize.decorator");
const enums_1 = require("../../../../common/enums");
const leave_type_policy_credit_trx_pagination_dto_1 = require("./dto/leave-type-policy-credit-trx-pagination.dto");
const leave_type_policy_credit_trx_service_1 = require("./leave-type-policy-credit-trx.service");
let LeaveTypePolicyCreditTrxController = class LeaveTypePolicyCreditTrxController {
    constructor(leaveTypePolicyCreditTrxService) {
        this.leaveTypePolicyCreditTrxService = leaveTypePolicyCreditTrxService;
    }
    async getLeaveTypesPolicyCreditTrxByQuery(companyId, query) {
        return this.leaveTypePolicyCreditTrxService.getLeaveTypesPolicyCreditTrxByQuery(companyId, query);
    }
};
exports.LeaveTypePolicyCreditTrxController = LeaveTypePolicyCreditTrxController;
__decorate([
    (0, common_1.Get)(':companyId'),
    (0, set_authorize_decorator_1.SetAuthorize)({ permission: enums_1.EPermissionActions.VIEW, roles: [enums_1.ERole.ADMIN] }),
    (0, swagger_1.ApiOperation)({ summary: 'Get Leave Type Policy History record by query' }),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, leave_type_policy_credit_trx_pagination_dto_1.LeaveTypePolicyCreditTrxPagination]),
    __metadata("design:returntype", Promise)
], LeaveTypePolicyCreditTrxController.prototype, "getLeaveTypesPolicyCreditTrxByQuery", null);
exports.LeaveTypePolicyCreditTrxController = LeaveTypePolicyCreditTrxController = __decorate([
    (0, swagger_1.ApiTags)('leave-type-policy-credit-trx'),
    (0, common_1.Controller)('leave-type-policy-credit-trx'),
    __metadata("design:paramtypes", [leave_type_policy_credit_trx_service_1.LeaveTypePolicyCreditTrxService])
], LeaveTypePolicyCreditTrxController);
//# sourceMappingURL=leave-type-policy-credit-trx.controller.js.map
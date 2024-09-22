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
exports.PolicyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const time_tracker_path_constant_1 = require("../../common/constants/time-tracker-path.constant");
const policy_service_1 = require("./policy.service");
const dtos_1 = require("./dtos");
const iam_1 = require("../../../../core/iam");
const common_2 = require("../../common");
const dto_1 = require("../../../../common/dto");
const enums_1 = require("../../../../common/enums");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
let PolicyController = class PolicyController {
    constructor(policyService) {
        this.policyService = policyService;
    }
    create(createPolicyDto, { companyId }, { timeTrackerCompanyId }) {
        return this.policyService.createPolicy(createPolicyDto, timeTrackerCompanyId);
    }
    update(updatePolicy, { companyId }, { timeTrackerCompanyId }) {
        return this.policyService.updatePolicy(updatePolicy, timeTrackerCompanyId);
    }
    get({ companyId }, { timeTrackerCompanyId }) {
        return this.policyService.getPolicyByCompanyId(timeTrackerCompanyId);
    }
};
exports.PolicyController = PolicyController;
__decorate([
    (0, common_1.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.FULL_ACCESS),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new policy',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.CreatePolicyDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], PolicyController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.FULL_ACCESS),
    (0, swagger_1.ApiOperation)({
        summary: 'Update policy',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdatePolicyDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], PolicyController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.FULL_ACCESS),
    (0, swagger_1.ApiOperation)({
        summary: 'Get policy of company',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], PolicyController.prototype, "get", null);
exports.PolicyController = PolicyController = __decorate([
    (0, swagger_1.ApiTags)(time_tracker_path_constant_1.POLICY_API_TAG),
    (0, common_1.Controller)({ path: time_tracker_path_constant_1.POLICY_API_PATH }),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    __metadata("design:paramtypes", [policy_service_1.PolicyService])
], PolicyController);
//# sourceMappingURL=policy.controller.js.map
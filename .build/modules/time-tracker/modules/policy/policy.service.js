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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../../libs/api/api.service");
let PolicyService = class PolicyService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async createPolicy(createPolicyDto, ttCompanyId) {
        const { data } = await this.apiService.request({
            type: 'CREATE_POLICY',
            data: createPolicyDto,
            segments: { companyId: ttCompanyId },
        });
        return data;
    }
    async getPolicyByCompanyId(companyId) {
        const { data } = await this.apiService.request({
            type: 'GET_POLICY',
            segments: { companyId: companyId },
        });
        return data;
    }
    async updatePolicy(updatePolicyDto, ttCompanyId) {
        const { data } = await this.apiService.request({
            type: 'UPDATE_POLICY',
            data: updatePolicyDto,
            segments: { companyId: ttCompanyId },
        });
        return data;
    }
};
exports.PolicyService = PolicyService;
exports.PolicyService = PolicyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService])
], PolicyService);
//# sourceMappingURL=policy.service.js.map
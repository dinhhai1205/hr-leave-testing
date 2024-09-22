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
exports.OctoCompanyRequestService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("../../../../config");
const company_1 = require("../../../general/modules/company");
let OctoCompanyRequestService = class OctoCompanyRequestService {
    constructor(companyService, httpService, hrforteApiConfig, request) {
        this.companyService = companyService;
        this.httpService = httpService;
        this.hrforteApiConfig = hrforteApiConfig;
        this.request = request;
    }
    getJwtToken() {
        const token = this.request.headers?.authorization;
        if (!token)
            throw new common_1.NotFoundException(`Token not found`);
        return token;
    }
    async syncDataToMongo(octoCompanyCode) {
        if (!octoCompanyCode)
            throw new common_1.BadRequestException();
        const clients = await this.companyService.getAllClientWithPayroll(octoCompanyCode);
        if (!clients) {
            throw new common_1.NotFoundException(`Client of #${octoCompanyCode} not found`);
        }
        const promises = clients.map(({ companyId, payrollHeaderId }) => this.fetchSyncDataPayroll({ companyId, payrollHeaderId }));
        return Promise.allSettled(promises);
    }
    async fetchSyncDataPayroll(args) {
        const { companyId, payrollHeaderId } = args;
        const apiUrl = `${this.hrforteApiConfig.apiUrl}/v2/PayrollCompute/${companyId}/headers/${payrollHeaderId}/w-mongo`;
        const axiosConfig = {
            headers: {
                'content-type': 'application/json',
                authorization: this.getJwtToken(),
            },
        };
        const response = await this.httpService.axiosRef.post(apiUrl, undefined, axiosConfig);
        return response.data;
    }
};
exports.OctoCompanyRequestService = OctoCompanyRequestService;
exports.OctoCompanyRequestService = OctoCompanyRequestService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(2, (0, config_1.InjectHrforteApiConfig)()),
    __param(3, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [company_1.CompanyService,
        axios_1.HttpService, Object, Object])
], OctoCompanyRequestService);
//# sourceMappingURL=octo-company-request.service.js.map
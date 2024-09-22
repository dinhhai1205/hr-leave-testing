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
exports.TawiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const utils_1 = require("../../../../common/utils");
const config_1 = require("../../../../config");
const tawi_tax_certificate_template_util_1 = require("./utils/tawi-tax-certificate-template.util");
let TawiService = class TawiService {
    constructor(hrforteApiConfig, pdfTemplateService, httpService) {
        this.hrforteApiConfig = hrforteApiConfig;
        this.pdfTemplateService = pdfTemplateService;
        this.httpService = httpService;
    }
    async getStatutoryPdfReport(args) {
        const { companyId, lang, req, year } = args;
        const token = (0, utils_1.extractTokenFromHeader)(req);
        const statutoriesTawiData = await this.getStatutoryTawi(companyId, token, year);
        if (!statutoriesTawiData.length) {
            return null;
        }
        const { pdfBuffer, pdfLength, pdfType } = await this.pdfTemplateService.generateWithholdingTaxCertificate(statutoriesTawiData, lang, year);
        const { companyNameLocal } = statutoriesTawiData[0];
        const companyName = companyNameLocal.split(' ').join('-');
        return new common_1.StreamableFile(pdfBuffer, {
            disposition: `attachment; filename="${companyName}-statutory-report-${lang}-${year}.pdf"`,
            length: pdfLength,
            type: pdfType,
        });
    }
    async getStatutoryTawi(companyId, token, year) {
        const statutoryTawiEndpoint = `v1/report/th/Statutory/${companyId}/tawi`;
        const apiUrl = `${this.hrforteApiConfig.apiUrl}/${statutoryTawiEndpoint}?year=${year}`;
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.post(apiUrl, {}, { headers: { Authorization: `Bearer ${token}` } }));
        return data;
    }
};
exports.TawiService = TawiService;
exports.TawiService = TawiService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectHrforteApiConfig)()),
    __metadata("design:paramtypes", [Object, tawi_tax_certificate_template_util_1.TawiTaxCertificateTemplateUtil,
        axios_1.HttpService])
], TawiService);
//# sourceMappingURL=tawi.service.js.map
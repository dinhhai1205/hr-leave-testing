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
exports.AzureSSOController = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../common/enums");
const config_1 = require("../../config");
const authentication_1 = require("../../core/iam/authentication");
const decorators_1 = require("../../core/iam/decorators");
const enums_2 = require("../../core/iam/enums");
const azure_sso_service_1 = require("./azure-sso.service");
const SSO_TOKEN_ID = 'SSO_TOKEN';
let AzureSSOController = class AzureSSOController {
    constructor(azureSSOService, appConfig) {
        this.azureSSOService = azureSSOService;
        this.appConfig = appConfig;
    }
    async getSSOConfig(companyId) {
        return this.azureSSOService.getAzureSSOByCompany(companyId);
    }
    async updateSSOConfig(request, companyId, { userEmail }) {
        const { body } = request;
        const data = await this.azureSSOService.updateAzureSSO({
            ...body,
            companyId,
            createdBy: userEmail,
            updatedBy: userEmail,
        });
        return data;
    }
    async verifySAML(body, response) {
        const { tokenId, redirectUrl } = await this.azureSSOService.verifySAML(body.SAMLResponse);
        const { nodeEnv, appType } = this.appConfig;
        const mapping = {
            [`${enums_1.ENodeEnv.STAGING}:${enums_1.EAppType.HRFORTE}`]: 'MIA',
            [`${enums_1.ENodeEnv.PRODUCTION}:${enums_1.EAppType.HRFORTE}`]: 'EVA',
            [`${enums_1.ENodeEnv.STAGING}:${enums_1.EAppType.MAP_HRFORTE}`]: 'MAP_STAG',
            [`${enums_1.ENodeEnv.PRODUCTION}:${enums_1.EAppType.MAP_HRFORTE}`]: 'MAP_PROD',
            [`${enums_1.ENodeEnv.LOCAL}:${enums_1.EAppType.HRFORTE}`]: 'MIA',
        };
        const cookieOptions = {
            secure: true,
            sameSite: 'none',
            domain: 'hrforte.com',
        };
        response
            .cookie(`${mapping[`${nodeEnv}:${appType}`]}_${SSO_TOKEN_ID}`, tokenId, nodeEnv === 'local' ? {} : cookieOptions)
            .redirect(redirectUrl);
    }
};
exports.AzureSSOController = AzureSSOController;
__decorate([
    (0, common_1.Get)(':companyId/config'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer),
    __param(0, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AzureSSOController.prototype, "getSSOConfig", null);
__decorate([
    (0, common_1.Post)(':companyId/config'),
    (0, authentication_1.Auth)(enums_2.AuthType.Bearer),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('companyId', common_1.ParseIntPipe)),
    __param(2, (0, decorators_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], AzureSSOController.prototype, "updateSSOConfig", null);
__decorate([
    (0, common_1.Post)('saml2'),
    (0, authentication_1.Auth)(enums_2.AuthType.None),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AzureSSOController.prototype, "verifySAML", null);
exports.AzureSSOController = AzureSSOController = __decorate([
    (0, common_1.Controller)('azure-sso'),
    __param(1, (0, config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [azure_sso_service_1.AzureSSOService, Object])
], AzureSSOController);
//# sourceMappingURL=azure-sso.controller.js.map
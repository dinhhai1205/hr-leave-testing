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
exports.OctoCompanyController = void 0;
const common_1 = require("@nestjs/common");
const authentication_1 = require("../../../../core/iam/authentication");
const enums_1 = require("../../../../core/iam/enums");
const octo_company_request_service_1 = require("./octo-company-request.service");
let OctoCompanyController = class OctoCompanyController {
    constructor(octoCompanyRequestService) {
        this.octoCompanyRequestService = octoCompanyRequestService;
    }
    async syncDataToMongo(octoCompanyCode) {
        return this.octoCompanyRequestService.syncDataToMongo(octoCompanyCode);
    }
};
exports.OctoCompanyController = OctoCompanyController;
__decorate([
    (0, common_1.Post)('w-mongo'),
    (0, authentication_1.Auth)(enums_1.AuthType.ApiKey),
    __param(0, (0, common_1.Query)('octoCompanyCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OctoCompanyController.prototype, "syncDataToMongo", null);
exports.OctoCompanyController = OctoCompanyController = __decorate([
    (0, common_1.Controller)('octo-company'),
    __metadata("design:paramtypes", [octo_company_request_service_1.OctoCompanyRequestService])
], OctoCompanyController);
//# sourceMappingURL=octo-company.controller.js.map
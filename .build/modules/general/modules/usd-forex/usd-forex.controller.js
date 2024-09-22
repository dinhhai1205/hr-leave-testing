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
exports.UsdForexController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const authentication_1 = require("../../../../core/iam/authentication");
const enums_1 = require("../../../../core/iam/enums");
const usd_forex_service_1 = require("./usd-forex.service");
let UsdForexController = class UsdForexController {
    constructor(usdForexService) {
        this.usdForexService = usdForexService;
    }
    async getExchangeRate(currencyCode) {
        return this.usdForexService.getExchangeRate(currencyCode);
    }
};
exports.UsdForexController = UsdForexController;
__decorate([
    (0, common_1.Get)(':currencyCode'),
    (0, authentication_1.Auth)(enums_1.AuthType.ApiKey),
    __param(0, (0, common_1.Param)('currencyCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsdForexController.prototype, "getExchangeRate", null);
exports.UsdForexController = UsdForexController = __decorate([
    (0, swagger_1.ApiTags)('usd-forex'),
    (0, common_1.Controller)('usd-forex'),
    __metadata("design:paramtypes", [usd_forex_service_1.UsdForexService])
], UsdForexController);
//# sourceMappingURL=usd-forex.controller.js.map
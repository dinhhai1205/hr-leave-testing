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
exports.ZohoWebhookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../../common/enums");
const authentication_1 = require("../../../../core/iam/authentication");
const decorators_1 = require("../../../../core/iam/decorators");
const enums_2 = require("../../../../core/iam/enums");
const constants_1 = require("../../constants");
const zoho_1 = require("../../libs/zoho");
const zoho_webhook_service_1 = require("./zoho-webhook.service");
let ZohoWebhookController = class ZohoWebhookController {
    constructor(zohoWebhookService) {
        this.zohoWebhookService = zohoWebhookService;
    }
    async receiveMessage(body) {
        return this.zohoWebhookService.receiveMessage(body);
    }
};
exports.ZohoWebhookController = ZohoWebhookController;
__decorate([
    (0, common_1.Post)('webhook'),
    (0, authentication_1.Auth)(enums_2.AuthType.ZohoWebhook),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [zoho_1.ZohoWebHooKPayload]),
    __metadata("design:returntype", Promise)
], ZohoWebhookController.prototype, "receiveMessage", null);
exports.ZohoWebhookController = ZohoWebhookController = __decorate([
    (0, swagger_1.ApiTags)(constants_1.ZOHO_API_TAG_V1),
    (0, common_1.Controller)(constants_1.ZOHO_API_PATH_V1),
    (0, decorators_1.ModuleMode)(enums_1.EApiModuleMode.ESign),
    __metadata("design:paramtypes", [zoho_webhook_service_1.ZohoWebhookService])
], ZohoWebhookController);
//# sourceMappingURL=zoho-webhook.controller.js.map
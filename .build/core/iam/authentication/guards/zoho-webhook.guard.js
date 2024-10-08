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
exports.ZohoWebHookGuard = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const config_1 = require("../../../../config");
let ZohoWebHookGuard = class ZohoWebHookGuard {
    constructor(zohoConfig) {
        this.zohoConfig = zohoConfig;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const hmacHash = request.headers['x-zs-webhook-signature'];
        if (!hmacHash) {
            throw new common_1.BadRequestException(`Missing hmac signature`);
        }
        if (Array.isArray(hmacHash)) {
            throw new common_1.BadRequestException('Invalid hash hmac');
        }
        const payload = request.rawBody;
        if (!payload) {
            throw new common_1.BadRequestException('Missing request body payload');
        }
        const macAlgoName = 'sha256';
        const hmac = (0, crypto_1.createHmac)(macAlgoName, this.zohoConfig.webhookSecretKey);
        hmac.update(payload.toString('utf8'), 'utf8');
        const calculatedHmac = hmac.digest('base64');
        if ((0, crypto_1.timingSafeEqual)(Buffer.from(hmacHash, 'utf8'), Buffer.from(calculatedHmac, 'utf8'))) {
            return true;
        }
        throw new common_1.UnauthorizedException(`Hashes don't match`);
    }
};
exports.ZohoWebHookGuard = ZohoWebHookGuard;
exports.ZohoWebHookGuard = ZohoWebHookGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectZohoConfig)()),
    __metadata("design:paramtypes", [Object])
], ZohoWebHookGuard);
//# sourceMappingURL=zoho-webhook.guard.js.map
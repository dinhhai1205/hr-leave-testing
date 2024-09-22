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
exports.SlackBotGuard = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const enums_1 = require("../../../../common/enums");
const config_1 = require("../../../../config");
const redis_1 = require("../../../redis");
const SLACK_BOT_HMAC_HASH_KEY = 'x-zigvy-slack-bot-hmac-hash';
const SLACK_BOT_TIMESTAMP_KEY = 'x-zigvy-slack-bot-timestamp';
const SLACK_BOT_NONCE_KEY = 'x-zigvy-slack-bot-nonce';
const TTL_5_MINS_IN_MILLISECOND = 5 * enums_1.ETimeInMillisecond.OneMinute;
let SlackBotGuard = class SlackBotGuard {
    constructor(appConfig, redisService) {
        this.appConfig = appConfig;
        this.redisService = redisService;
        this.apiKey = this.appConfig.apiKey;
        this.cacheManager = this.redisService.cacheManager;
    }
    nonceKey(nonce) {
        return `slack_bot_nonce_${nonce}`;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        const hmacHash = headers[SLACK_BOT_HMAC_HASH_KEY];
        const timestamp = headers[SLACK_BOT_TIMESTAMP_KEY];
        const nonce = headers[SLACK_BOT_NONCE_KEY];
        if (!hmacHash || !timestamp || !nonce) {
            throw new common_1.BadRequestException(`Missing hmacHash, timestamp, or nonce`);
        }
        if (Array.isArray(hmacHash) ||
            Array.isArray(timestamp) ||
            Array.isArray(nonce)) {
            throw new common_1.BadRequestException('Invalid headers');
        }
        const payload = JSON.stringify(request.body);
        if (!payload) {
            throw new common_1.BadRequestException('Missing request body payload');
        }
        const currentTime = Date.now();
        if (Math.abs(currentTime - parseInt(timestamp, 10)) >
            TTL_5_MINS_IN_MILLISECOND) {
            throw new common_1.UnauthorizedException('Timestamp is too old');
        }
        const nonceExists = await this.cacheManager.get(this.nonceKey(nonce));
        if (nonceExists) {
            throw new common_1.UnauthorizedException('Nonce has already been used');
        }
        await this.cacheManager.set(this.nonceKey(nonce), 'used', TTL_5_MINS_IN_MILLISECOND);
        const dataToSign = `${payload}.${timestamp}.${nonce}`;
        const hmac = (0, crypto_1.createHmac)('sha256', this.apiKey);
        hmac.update(dataToSign, 'utf8');
        const calculatedHmac = hmac.digest('base64');
        if ((0, crypto_1.timingSafeEqual)(Buffer.from(hmacHash, 'utf8'), Buffer.from(calculatedHmac, 'utf8'))) {
            return true;
        }
        throw new common_1.UnauthorizedException(`Hashes don't match`);
    }
};
exports.SlackBotGuard = SlackBotGuard;
exports.SlackBotGuard = SlackBotGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [Object, redis_1.RedisService])
], SlackBotGuard);
//# sourceMappingURL=slack-bot.guard.js.map
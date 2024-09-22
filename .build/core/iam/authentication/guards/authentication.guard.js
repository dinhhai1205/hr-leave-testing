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
var AuthenticationGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const enums_1 = require("../../enums");
const iam_constant_1 = require("../../iam.constant");
const auth_decorator_1 = require("../decorators/auth.decorator");
const access_token_guard_1 = require("./access-token.guard");
const api_key_guard_1 = require("./api-key.guard");
const legacy_access_token_guard_1 = require("./legacy-access-token.guard");
const legacy_permission_guard_1 = require("./legacy-permission.guard");
const permission_guard_1 = require("./permission.guard");
const slack_bot_guard_1 = require("./slack-bot.guard");
const zoho_webhook_guard_1 = require("./zoho-webhook.guard");
let AuthenticationGuard = AuthenticationGuard_1 = class AuthenticationGuard {
    constructor(reflector, accessTokenGuard, apiKeyGuard, zohoWebhookGuard, permissionGuard, slackBotGuard, legacyAccessTokenGuard, legacyPermissionGuard) {
        this.reflector = reflector;
        this.accessTokenGuard = accessTokenGuard;
        this.apiKeyGuard = apiKeyGuard;
        this.zohoWebhookGuard = zohoWebhookGuard;
        this.permissionGuard = permissionGuard;
        this.slackBotGuard = slackBotGuard;
        this.legacyAccessTokenGuard = legacyAccessTokenGuard;
        this.legacyPermissionGuard = legacyPermissionGuard;
        this.authTypeGuardMap = {
            [enums_1.AuthType.LegacyBearer]: this.legacyAccessTokenGuard,
            [enums_1.AuthType.LegacyPermission]: this.legacyPermissionGuard,
            [enums_1.AuthType.Bearer]: this.accessTokenGuard,
            [enums_1.AuthType.Permission]: this.permissionGuard,
            [enums_1.AuthType.ApiKey]: this.apiKeyGuard,
            [enums_1.AuthType.ZohoWebhook]: this.zohoWebhookGuard,
            [enums_1.AuthType.None]: { canActivate: () => true },
            [enums_1.AuthType.SlackBot]: this.slackBotGuard,
        };
    }
    async canActivate(context) {
        const ctxClass = context.getClass();
        const ctxHandler = context.getHandler();
        const request = context.switchToHttp().getRequest();
        Object.assign(request, {
            [iam_constant_1.REQ_CURRENT_CONTEXT_KEY]: {
                class: ctxClass.name,
                handler: ctxHandler.name,
            },
        });
        const authTypes = this.reflector.getAllAndOverride(auth_decorator_1.AUTH_TYPE_KEY, [
            ctxHandler,
            ctxClass,
        ]) ?? AuthenticationGuard_1.defaultAuthTypes;
        const guards = authTypes.map(type => this.authTypeGuardMap[type]).flat();
        const error = new common_1.UnauthorizedException();
        for (const guard of guards) {
            const canActive = await Promise.resolve(guard.canActivate(context)).catch(err => {
                throw err;
            });
            if (canActive)
                return true;
        }
        throw error;
    }
};
exports.AuthenticationGuard = AuthenticationGuard;
AuthenticationGuard.defaultAuthTypes = [enums_1.AuthType.LegacyBearer];
exports.AuthenticationGuard = AuthenticationGuard = AuthenticationGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        access_token_guard_1.AccessTokenGuard,
        api_key_guard_1.ApiKeyGuard,
        zoho_webhook_guard_1.ZohoWebHookGuard,
        permission_guard_1.PermissionGuard,
        slack_bot_guard_1.SlackBotGuard,
        legacy_access_token_guard_1.LegacyAccessTokenGuard,
        legacy_permission_guard_1.LegacyPermissionGuard])
], AuthenticationGuard);
//# sourceMappingURL=authentication.guard.js.map
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from './access-token.guard';
import { ApiKeyGuard } from './api-key.guard';
import { LegacyAccessTokenGuard } from './legacy-access-token.guard';
import { LegacyPermissionGuard } from './legacy-permission.guard';
import { PermissionGuard } from './permission.guard';
import { SlackBotGuard } from './slack-bot.guard';
import { ZohoWebHookGuard } from './zoho-webhook.guard';
export declare class AuthenticationGuard implements CanActivate {
    private readonly reflector;
    private readonly accessTokenGuard;
    private readonly apiKeyGuard;
    private readonly zohoWebhookGuard;
    private readonly permissionGuard;
    private readonly slackBotGuard;
    private readonly legacyAccessTokenGuard;
    private readonly legacyPermissionGuard;
    private static readonly defaultAuthTypes;
    private readonly authTypeGuardMap;
    constructor(reflector: Reflector, accessTokenGuard: AccessTokenGuard, apiKeyGuard: ApiKeyGuard, zohoWebhookGuard: ZohoWebHookGuard, permissionGuard: PermissionGuard, slackBotGuard: SlackBotGuard, legacyAccessTokenGuard: LegacyAccessTokenGuard, legacyPermissionGuard: LegacyPermissionGuard);
    canActivate(context: ExecutionContext): Promise<boolean>;
}

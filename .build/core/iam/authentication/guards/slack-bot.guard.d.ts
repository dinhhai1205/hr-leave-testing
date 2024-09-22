import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AppConfig } from '../../../../config';
import { RedisService } from '../../../redis';
export declare class SlackBotGuard implements CanActivate {
    private readonly appConfig;
    private readonly redisService;
    private readonly apiKey;
    private readonly cacheManager;
    constructor(appConfig: AppConfig, redisService: RedisService);
    private nonceKey;
    canActivate(context: ExecutionContext): Promise<boolean>;
}

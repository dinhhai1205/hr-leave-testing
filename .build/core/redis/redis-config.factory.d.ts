import { CacheOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Config, StoreConfig } from 'cache-manager';
import { RedisConfig } from '../../config/redis.config';
export declare class RedisConfigFactory implements CacheOptionsFactory<StoreConfig> {
    private readonly redisConfig;
    private retries;
    private readonly logger;
    constructor(redisConfig: RedisConfig);
    createCacheOptions(): Promise<CacheOptions<Config>>;
}

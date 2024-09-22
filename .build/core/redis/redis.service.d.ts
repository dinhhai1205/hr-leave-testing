import { Cache } from 'cache-manager';
export declare class RedisService {
    readonly cacheManager: Cache;
    constructor(cacheManager: Cache);
}

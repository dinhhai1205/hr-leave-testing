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
var RedisConfigFactory_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConfigFactory = void 0;
const common_1 = require("@nestjs/common");
const cacheManagerIoredis = require("cache-manager-ioredis-yet");
const redis_config_1 = require("../../config/redis.config");
let RedisConfigFactory = RedisConfigFactory_1 = class RedisConfigFactory {
    constructor(redisConfig) {
        this.redisConfig = redisConfig;
        this.retries = 0;
        this.logger = new common_1.Logger(RedisConfigFactory_1.name);
    }
    async createCacheOptions() {
        const ioredisStore = await cacheManagerIoredis.redisStore({
            host: this.redisConfig.host,
            port: this.redisConfig.port,
            password: this.redisConfig.password,
            retryStrategy: (times) => {
                this.retries = times;
                this.logger.warn(`Retries connect to redis (${times})`);
                return Math.max(Math.min(Math.exp(times), 20000), 1000);
            },
        });
        const redisClient = ioredisStore.client;
        redisClient.on('error', err => {
            this.logger.error(err.message);
        });
        redisClient.on('connect', () => {
            this.logger.log(`Successfully connecting to Redis on port ${this.redisConfig.port}`);
            this.retries = 0;
        });
        process.on('SIGINT', async () => {
            this.logger.warn(`Received SIGINT, closing redisClient...`);
            await redisClient.quit();
            process.exit(0);
        });
        return {
            store: ioredisStore,
        };
    }
};
exports.RedisConfigFactory = RedisConfigFactory;
exports.RedisConfigFactory = RedisConfigFactory = RedisConfigFactory_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, redis_config_1.InjectRedisConfig)()),
    __metadata("design:paramtypes", [Object])
], RedisConfigFactory);
//# sourceMappingURL=redis-config.factory.js.map
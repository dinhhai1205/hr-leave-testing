"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis_config_1 = require("../../config/redis.config");
const redis_config_factory_1 = require("../redis/redis-config.factory");
const redis_service_1 = require("./redis.service");
let RedisModule = RedisModule_1 = class RedisModule {
    static forRoot(options = {}) {
        return {
            module: RedisModule_1,
            global: options.isGlobal,
            imports: [
                cache_manager_1.CacheModule.registerAsync({
                    isGlobal: true,
                    imports: [config_1.ConfigModule.forFeature(redis_config_1.redisConfig)],
                    useClass: redis_config_factory_1.RedisConfigFactory,
                }),
            ],
        };
    }
};
exports.RedisModule = RedisModule;
exports.RedisModule = RedisModule = RedisModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [redis_service_1.RedisService],
        exports: [redis_service_1.RedisService],
    })
], RedisModule);
//# sourceMappingURL=redis.module.js.map
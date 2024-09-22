"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectRedisConfig = exports.redisConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("../common/enums");
const enums_2 = require("./enums");
const utils_1 = require("./utils");
exports.redisConfig = (0, config_1.registerAs)(enums_2.EConfigToken.Redis, () => {
    const configs = utils_1.JoiUtil.validate({
        host: {
            key: 'REDIS_HOST',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        port: {
            key: 'REDIS_PORT',
            joi: utils_1.JoiUtil.numberRequire().port(),
        },
        password: {
            key: 'REDIS_PASSWORD',
            joi: utils_1.JoiUtil.stringOptional(),
        },
        ttl: {
            key: 'REDIS_TTL_MILLISECOND',
            joi: utils_1.JoiUtil.numberOptional().default(enums_1.ETimeInMillisecond.OneMinute),
        },
    });
    return configs;
});
const InjectRedisConfig = () => (0, common_1.Inject)(exports.redisConfig.KEY);
exports.InjectRedisConfig = InjectRedisConfig;
//# sourceMappingURL=redis.config.js.map
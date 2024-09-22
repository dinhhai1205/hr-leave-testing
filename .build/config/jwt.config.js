"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectJwtConfig = exports.jwtConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("../common/enums");
const enums_2 = require("./enums");
const utils_1 = require("./utils");
exports.jwtConfig = (0, config_1.registerAs)(enums_2.EConfigToken.Jwt, () => {
    const configs = utils_1.JoiUtil.validate({
        secret: {
            key: 'JWT_SECRET',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        expiresIn: {
            key: 'JWT_EXPIRED_IN',
            joi: utils_1.JoiUtil.numberOptional().default(enums_1.ETimeInMillisecond.OneMinute),
        },
    });
    return configs;
});
const InjectJwtConfig = () => (0, common_1.Inject)(exports.jwtConfig.KEY);
exports.InjectJwtConfig = InjectJwtConfig;
//# sourceMappingURL=jwt.config.js.map
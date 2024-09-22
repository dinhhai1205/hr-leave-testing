"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMongoDbConfig = exports.mongoDbConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("./enums");
const utils_1 = require("./utils");
exports.mongoDbConfig = (0, config_1.registerAs)(enums_1.EConfigToken.Mongodb, () => {
    const configs = utils_1.JoiUtil.validate({
        host: {
            key: 'MONGO_DB_HOST',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        port: {
            key: 'MONGO_DB_PORT',
            joi: utils_1.JoiUtil.numberOptional().port(),
        },
        dbName: {
            key: 'MONGO_DB_NAME',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        username: {
            key: 'MONGO_DB_USERNAME',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        password: {
            key: 'MONGO_DB_PASSWORD',
            joi: utils_1.JoiUtil.stringRequire(),
        },
    });
    return configs;
});
const InjectMongoDbConfig = () => (0, common_1.Inject)(exports.mongoDbConfig.KEY);
exports.InjectMongoDbConfig = InjectMongoDbConfig;
//# sourceMappingURL=mongodb.config.js.map
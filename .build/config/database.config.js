"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectDatabaseConfig = exports.databaseConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pem_format_util_1 = require("../common/utils/pem-format.util");
const config_token_enum_1 = require("./enums/config-token.enum");
const joi_util_1 = require("./utils/joi.util");
const dbSqlTypes = ['mssql', 'postgres'];
exports.databaseConfig = (0, config_1.registerAs)(config_token_enum_1.EConfigToken.Database, () => {
    const configs = joi_util_1.JoiUtil.validate({
        type: {
            key: 'DB_TYPE',
            joi: joi_util_1.JoiUtil.stringRequire().valid(...dbSqlTypes),
        },
        host: {
            key: 'DB_HOST',
            joi: joi_util_1.JoiUtil.stringRequire(),
        },
        port: {
            key: 'DB_PORT',
            joi: joi_util_1.JoiUtil.numberRequire().port(),
        },
        dbName: {
            key: 'DB_NAME',
            joi: joi_util_1.JoiUtil.stringRequire(),
        },
        username: {
            key: 'DB_USERNAME',
            joi: joi_util_1.JoiUtil.stringRequire(),
        },
        password: {
            key: 'DB_PASSWORD',
            joi: joi_util_1.JoiUtil.stringRequire(),
        },
        ca: {
            key: 'DB_CA',
            joi: joi_util_1.JoiUtil.stringOptional(),
        },
    });
    return {
        ...configs,
        ca: (0, pem_format_util_1.pemFormat)(configs.ca),
    };
});
const InjectDatabaseConfig = () => (0, common_1.Inject)(exports.databaseConfig.KEY);
exports.InjectDatabaseConfig = InjectDatabaseConfig;
//# sourceMappingURL=database.config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAwsConfig = exports.awsConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("./enums");
const utils_1 = require("./utils");
exports.awsConfig = (0, config_1.registerAs)(enums_1.EConfigToken.Aws, () => {
    const configs = utils_1.JoiUtil.validate({
        accessKeyId: {
            key: 'AWS_ACCESS_KEY_ID',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        secretAccessKey: {
            key: 'AWS_SECRET_ACCESS_KEY',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        region: {
            key: 'AWS_REGION',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        bucketPrefix: {
            key: 'AWS_BUCKET_PREFIX',
            joi: utils_1.JoiUtil.stringOptional(),
        },
    });
    return configs;
});
const InjectAwsConfig = () => (0, common_1.Inject)(exports.awsConfig.KEY);
exports.InjectAwsConfig = InjectAwsConfig;
//# sourceMappingURL=aws.config.js.map
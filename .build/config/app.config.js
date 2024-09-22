"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectAppConfig = exports.appConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const os = require("node:os");
const enums_1 = require("../common/enums");
const enums_2 = require("./enums");
const utils_1 = require("./utils");
exports.appConfig = (0, config_1.registerAs)(enums_2.EConfigToken.App, () => {
    const configs = utils_1.JoiUtil.validate({
        apiKey: {
            key: 'APP_API_KEY',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        appPort: {
            key: 'APP_PORT',
            joi: utils_1.JoiUtil.numberOptional().default(3000).port(),
        },
        appType: {
            key: 'APP_TYPE',
            joi: utils_1.JoiUtil.stringOptional()
                .default(enums_1.EAppType.HRFORTE)
                .valid(...Object.values(enums_1.EAppType)),
        },
        clientUrl: {
            key: 'APP_CLIENT_URL',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        octoClientUrl: {
            key: 'APP_OCTO_CLIENT_URL',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        nodeEnv: {
            key: 'NODE_ENV',
            joi: utils_1.JoiUtil.stringRequire().valid(...Object.values(enums_1.ENodeEnv)),
        },
        imageName: {
            key: 'IMAGE_NAME',
            joi: utils_1.JoiUtil.stringOptional().default('unknown'),
        },
        containerName: {
            key: 'CONTAINER_NAME',
            joi: utils_1.JoiUtil.stringOptional().default('unknown'),
        },
    });
    return {
        ...configs,
        containerId: os.hostname() || 'unknown',
        currentTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
});
const InjectAppConfig = () => (0, common_1.Inject)(exports.appConfig.KEY);
exports.InjectAppConfig = InjectAppConfig;
//# sourceMappingURL=app.config.js.map
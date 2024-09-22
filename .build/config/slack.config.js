"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectSlackConfig = exports.slackConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("./enums");
const utils_1 = require("./utils");
exports.slackConfig = (0, config_1.registerAs)(enums_1.EConfigToken.Slack, () => {
    const configs = utils_1.JoiUtil.validate({
        botToken: {
            key: 'SLACK_BOT_TOKEN',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        signingSecret: {
            key: 'SLACK_SIGNING_SECRET',
            joi: utils_1.JoiUtil.stringRequire(),
        },
    });
    return configs;
});
const InjectSlackConfig = () => (0, common_1.Inject)(exports.slackConfig.KEY);
exports.InjectSlackConfig = InjectSlackConfig;
//# sourceMappingURL=slack.config.js.map
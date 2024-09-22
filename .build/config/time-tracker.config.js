"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectTimeTrackerConfig = exports.timeTrackerConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("./enums");
const utils_1 = require("./utils");
exports.timeTrackerConfig = (0, config_1.registerAs)(enums_1.EConfigToken.TimeTracker, () => {
    const configs = utils_1.JoiUtil.validate({
        masterApiKey: {
            key: 'TIME_TRACKER_API_KEY',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        apiUrl: {
            key: 'TIME_TRACKER_API_URL',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        apiVersion: {
            key: 'TIME_TRACKER_API_VERSION',
            joi: utils_1.JoiUtil.stringRequire(),
        },
    });
    const apiVersion = configs.apiVersion ?? 'v1';
    const apiUrl = `${configs.apiUrl}/${apiVersion}`;
    return {
        apiUrl,
        apiVersion,
        masterApiKey: configs.masterApiKey,
    };
});
const InjectTimeTrackerConfig = () => (0, common_1.Inject)(exports.timeTrackerConfig.KEY);
exports.InjectTimeTrackerConfig = InjectTimeTrackerConfig;
//# sourceMappingURL=time-tracker.config.js.map
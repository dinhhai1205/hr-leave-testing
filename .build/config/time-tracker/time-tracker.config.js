"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerValidationSchema = exports.InjectTimeTrackerConfig = exports.timeTrackerConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
exports.timeTrackerConfig = (0, config_1.registerAs)('time-tracker', () => {
    const url = process.env.TIME_TRACKER_API_URL;
    const apiVersion = process.env.TIME_TRACKER_API_VERSION ?? 'v1';
    const apiUrl = `${url}/${apiVersion}`;
    return {
        apiUrl,
        masterApiKey: process.env.TIME_TRACKER_API_KEY,
    };
});
const InjectTimeTrackerConfig = () => (0, common_1.Inject)(exports.timeTrackerConfig.KEY);
exports.InjectTimeTrackerConfig = InjectTimeTrackerConfig;
exports.TimeTrackerValidationSchema = {
    TIME_TRACKER_API_KEY: Joi.string().required(),
    TIME_TRACKER_API_URL: Joi.string().required(),
    TIME_TRACKER_API_VERSION: Joi.string().required(),
};
//# sourceMappingURL=time-tracker.config.js.map
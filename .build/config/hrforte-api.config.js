"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectHrforteApiConfig = exports.hrforteApiConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("./enums");
const utils_1 = require("./utils");
exports.hrforteApiConfig = (0, config_1.registerAs)(enums_1.EConfigToken.HrforteApi, () => {
    const configs = utils_1.JoiUtil.validate({
        apiKey: {
            key: 'HR_FORTE_API_KEY',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        apiUrl: {
            key: 'HR_FORTE_API_URL',
            joi: utils_1.JoiUtil.stringRequire(),
        },
    });
    return configs;
});
const InjectHrforteApiConfig = () => (0, common_1.Inject)(exports.hrforteApiConfig.KEY);
exports.InjectHrforteApiConfig = InjectHrforteApiConfig;
//# sourceMappingURL=hrforte-api.config.js.map
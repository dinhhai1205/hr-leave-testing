"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectZohoConfig = exports.zohoConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const enums_1 = require("./enums");
const utils_1 = require("./utils");
var EZohoDataCenter;
(function (EZohoDataCenter) {
    EZohoDataCenter["UnitedStates"] = "com";
    EZohoDataCenter["Europe"] = "eu";
    EZohoDataCenter["India"] = "in";
    EZohoDataCenter["Japan"] = "jp";
    EZohoDataCenter["Australia"] = "com.au";
    EZohoDataCenter["Canada"] = "zohocloud.ca";
})(EZohoDataCenter || (EZohoDataCenter = {}));
exports.zohoConfig = (0, config_1.registerAs)(enums_1.EConfigToken.Zoho, () => {
    const configs = utils_1.JoiUtil.validate({
        webhookSecretKey: {
            key: 'ZOHO_WEBHOOK_SECRET_KEY',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        clientId: {
            key: 'ZOHO_CLIENT_ID',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        clientSecret: {
            key: 'ZOHO_CLIENT_SECRET',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        refreshToken: {
            key: 'ZOHO_REFRESH_TOKEN',
            joi: utils_1.JoiUtil.stringRequire(),
        },
        domain: {
            key: 'ZOHO_DOMAIN',
            joi: utils_1.JoiUtil.stringOptional()
                .default(EZohoDataCenter.UnitedStates)
                .valid(...Object.values(EZohoDataCenter)),
        },
        zohoSignVersion: {
            key: 'ZOHO_SIGN_VERSION',
            joi: utils_1.JoiUtil.stringOptional().default('v1'),
        },
    });
    const { domain, zohoSignVersion } = configs;
    const apiUrl = `https://sign.zoho.${domain}/api/${zohoSignVersion}`;
    const accountUrl = `https://accounts.zoho.${domain}`;
    return { ...configs, apiUrl, accountUrl };
});
const InjectZohoConfig = () => (0, common_1.Inject)(exports.zohoConfig.KEY);
exports.InjectZohoConfig = InjectZohoConfig;
//# sourceMappingURL=zoho.config.js.map
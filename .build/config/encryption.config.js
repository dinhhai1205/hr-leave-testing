"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectEncryptionConfig = exports.encryptionConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const utils_1 = require("../common/utils");
const enums_1 = require("./enums");
const utils_2 = require("./utils");
exports.encryptionConfig = (0, config_1.registerAs)(enums_1.EConfigToken.Encryption, () => {
    const configs = utils_2.JoiUtil.validate({
        key: {
            key: 'ENCRYPTION_KEY',
            joi: utils_2.JoiUtil.stringRequire(),
        },
        securityPrivateKey: {
            key: 'SECURITY_PRIVATE_KEY',
            joi: utils_2.JoiUtil.stringRequire(),
        },
        securityPublicKey: {
            key: 'SECURITY_PUBLIC_KEY',
            joi: utils_2.JoiUtil.stringRequire(),
        },
    });
    const { key, securityPrivateKey, securityPublicKey } = configs;
    return {
        ivLength: 16,
        algorithm: 'aes-256-gcm',
        key,
        securityPrivateKey: (0, utils_1.pemFormat)(securityPrivateKey),
        securityPublicKey: (0, utils_1.pemFormat)(securityPublicKey),
    };
});
const InjectEncryptionConfig = () => (0, common_1.Inject)(exports.encryptionConfig.KEY);
exports.InjectEncryptionConfig = InjectEncryptionConfig;
//# sourceMappingURL=encryption.config.js.map
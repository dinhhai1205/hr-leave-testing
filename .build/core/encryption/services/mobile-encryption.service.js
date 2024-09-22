"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileEncryptionService = void 0;
const common_1 = require("@nestjs/common");
const forge = require("node-forge");
const encryption_config_1 = require("../../../config/encryption.config");
let MobileEncryptionService = class MobileEncryptionService {
    constructor(encryptionConfig) {
        this.encryptionConfig = encryptionConfig;
    }
    encrypt(data) {
        const symmetricKey = forge.random.getBytesSync(32);
        const iv = forge.random.getBytesSync(16);
        const cipher = forge.cipher.createCipher('AES-CBC', symmetricKey);
        cipher.start({ iv });
        cipher.update(forge.util.createBuffer(data));
        cipher.finish();
        const encryptedFile = forge.util.encode64(cipher.output.getBytes());
        const publicKey = forge.pki.publicKeyFromPem(this.encryptionConfig.securityPublicKey);
        const encryptedSymmetricKey = forge.util.encode64(publicKey.encrypt(symmetricKey, 'RSAES-PKCS1-V1_5', {
            md: forge.md.sha256.create(),
        }));
        const encryptedIv = forge.util.encode64(publicKey.encrypt(iv, 'RSAES-PKCS1-V1_5', {
            md: forge.md.sha256.create(),
        }));
        return { encryptedFile, encryptedSymmetricKey, encryptedIv };
    }
    decrypt(fileBuffer, encryptedInfo) {
        const { encryptedIv, encryptedSymmetricKey } = encryptedInfo;
        const privateKey = forge.pki.privateKeyFromPem(this.encryptionConfig.securityPrivateKey);
        const symmetricKeyDecrypted = privateKey.decrypt(forge.util.decode64(encryptedSymmetricKey), 'RSAES-PKCS1-V1_5', { md: forge.md.sha256.create() });
        const ivDecrypted = privateKey.decrypt(forge.util.decode64(encryptedIv), 'RSAES-PKCS1-V1_5', { md: forge.md.sha256.create() });
        const decipher = forge.cipher.createDecipher('AES-CBC', symmetricKeyDecrypted);
        decipher.start({ iv: ivDecrypted });
        decipher.update(forge.util.createBuffer(forge.util.decode64(fileBuffer.toString('binary'))));
        decipher.finish();
        return Buffer.from(decipher.output.getBytes(), 'base64');
    }
};
exports.MobileEncryptionService = MobileEncryptionService;
exports.MobileEncryptionService = MobileEncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, encryption_config_1.InjectEncryptionConfig)()),
    __metadata("design:paramtypes", [Object])
], MobileEncryptionService);
//# sourceMappingURL=mobile-encryption.service.js.map
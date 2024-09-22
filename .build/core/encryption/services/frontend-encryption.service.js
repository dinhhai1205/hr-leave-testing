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
exports.FrontendEncryptionService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const forge = require("node-forge");
const encryption_config_1 = require("../../../config/encryption.config");
let FrontendEncryptionService = class FrontendEncryptionService {
    constructor(encryptionConfig) {
        this.encryptionConfig = encryptionConfig;
    }
    encrypt(data) {
        const algorithm = 'aes-256-cbc';
        const symmetricKey = (0, crypto_1.randomBytes)(32);
        const iv = (0, crypto_1.randomBytes)(16);
        const cipher = (0, crypto_1.createCipheriv)(algorithm, symmetricKey, iv);
        const encryptedFile = Buffer.concat([cipher.update(data), cipher.final()]);
        const publicKey = forge.pki.publicKeyFromPem(this.encryptionConfig.securityPublicKey);
        const [encryptedSymmetricKey, encryptedIv] = [
            publicKey.encrypt(symmetricKey.toString('hex'), 'RSAES-PKCS1-V1_5', {
                md: forge.md.sha256.create(),
            }),
            publicKey.encrypt(iv.toString('hex'), 'RSAES-PKCS1-V1_5', {
                md: forge.md.sha256.create(),
            }),
        ];
        return {
            encryptedFile,
            encryptedSymmetricKey: forge.util.encode64(encryptedSymmetricKey),
            encryptedIv: forge.util.encode64(encryptedIv),
        };
    }
    decrypt(fileBuffer, encryptedInfo) {
        const { encryptedIv, encryptedSymmetricKey } = encryptedInfo;
        const privateKey = forge.pki.privateKeyFromPem(this.encryptionConfig.securityPrivateKey);
        const [symmetricKeyDecrypted, ivDecrypted] = [
            privateKey.decrypt(forge.util.decode64(encryptedSymmetricKey), 'RSAES-PKCS1-V1_5', { md: forge.md.sha256.create() }),
            privateKey.decrypt(forge.util.decode64(encryptedIv), 'RSAES-PKCS1-V1_5', {
                md: forge.md.sha256.create(),
            }),
        ];
        const algorithm = 'aes-256-cbc';
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, Buffer.from(symmetricKeyDecrypted, 'hex'), Buffer.from(ivDecrypted, 'hex'));
        const decryptedData = Buffer.concat([
            decipher.update(fileBuffer),
            decipher.final(),
        ]);
        return decryptedData;
    }
};
exports.FrontendEncryptionService = FrontendEncryptionService;
exports.FrontendEncryptionService = FrontendEncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, encryption_config_1.InjectEncryptionConfig)()),
    __metadata("design:paramtypes", [Object])
], FrontendEncryptionService);
//# sourceMappingURL=frontend-encryption.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const constants_1 = require("../../../common/constants");
const frontend_encryption_service_1 = require("./frontend-encryption.service");
const mobile_encryption_service_1 = require("./mobile-encryption.service");
let EncryptionService = class EncryptionService {
    constructor(frontendEncryptionService, mobileEncryptionService) {
        this.frontendEncryptionService = frontendEncryptionService;
        this.mobileEncryptionService = mobileEncryptionService;
    }
    decrypt(file, encryptedFileInfo) {
        if (!this.isEnableEncrypt(encryptedFileInfo)) {
            return file;
        }
        const { mobileMode, encryptedIv, encryptedSymmetricKey } = encryptedFileInfo;
        if (!encryptedIv) {
            throw new common_1.BadRequestException(`Missing encryptedIv to decrypt file uploaded`);
        }
        if (!encryptedSymmetricKey) {
            throw new common_1.BadRequestException(`Missing encryptedSymmetricKey to decrypt file uploaded`);
        }
        const fileExtension = (0, path_1.extname)(file.originalname) || '.';
        const mimeType = constants_1.CONTENT_TYPE[fileExtension.slice(1).toUpperCase()];
        if (mimeType) {
            file.mimetype = mimeType;
        }
        file.buffer =
            mobileMode === 'yes'
                ? this.mobileEncryptionService.decrypt(file.buffer, {
                    encryptedIv,
                    encryptedSymmetricKey,
                })
                : this.frontendEncryptionService.decrypt(file.buffer, {
                    encryptedIv,
                    encryptedSymmetricKey,
                });
        file.size = file.buffer.byteLength;
        return file;
    }
    isEnableEncrypt(encryptedFileInfo) {
        if (!encryptedFileInfo)
            return false;
        const { encryptedIv, encryptedSymmetricKey } = encryptedFileInfo;
        if (!encryptedIv && !encryptedSymmetricKey)
            return false;
        return true;
    }
};
exports.EncryptionService = EncryptionService;
exports.EncryptionService = EncryptionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [frontend_encryption_service_1.FrontendEncryptionService,
        mobile_encryption_service_1.MobileEncryptionService])
], EncryptionService);
//# sourceMappingURL=encryption.service.js.map
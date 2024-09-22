"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const encryption_config_1 = require("../../config/encryption.config");
const services_1 = require("./services");
const frontend_encryption_service_1 = require("./services/frontend-encryption.service");
const mobile_encryption_service_1 = require("./services/mobile-encryption.service");
let EncryptionModule = class EncryptionModule {
};
exports.EncryptionModule = EncryptionModule;
exports.EncryptionModule = EncryptionModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forFeature(encryption_config_1.encryptionConfig)],
        providers: [
            services_1.EncryptionService,
            frontend_encryption_service_1.FrontendEncryptionService,
            mobile_encryption_service_1.MobileEncryptionService,
        ],
        exports: [services_1.EncryptionService],
    })
], EncryptionModule);
//# sourceMappingURL=encryption.module.js.map
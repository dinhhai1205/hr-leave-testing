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
exports.SecurityController = void 0;
const common_1 = require("@nestjs/common");
const skip_flag_decorator_1 = require("../../../../common/decorators/skip-flag.decorator");
const enums_1 = require("../../../../common/enums");
const encryption_config_1 = require("../../../../config/encryption.config");
let SecurityController = class SecurityController {
    constructor(encryptionConfig) {
        this.encryptionConfig = encryptionConfig;
    }
    getSecurityPublickey() {
        return this.encryptionConfig.securityPublicKey;
    }
};
exports.SecurityController = SecurityController;
__decorate([
    (0, common_1.Get)('file-tran-pub-key'),
    (0, skip_flag_decorator_1.SkipFlag)(enums_1.ESkipFlag.COMPANY_ID),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SecurityController.prototype, "getSecurityPublickey", null);
exports.SecurityController = SecurityController = __decorate([
    (0, common_1.Controller)('security'),
    __param(0, (0, encryption_config_1.InjectEncryptionConfig)()),
    __metadata("design:paramtypes", [Object])
], SecurityController);
//# sourceMappingURL=security.controller.js.map
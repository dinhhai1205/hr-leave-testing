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
exports.DecryptFileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../../core/encryption/services");
let DecryptFileInterceptor = class DecryptFileInterceptor {
    constructor(encryptionService) {
        this.encryptionService = encryptionService;
    }
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const encryptedFileInfo = request.body;
        let file = request.file;
        const files = request.files;
        if (!file && !files?.length)
            return next.handle();
        if (file) {
            file = this.encryptionService.decrypt(file, encryptedFileInfo);
        }
        if (files?.length) {
            for (let i = 0; i < files.length; i++) {
                files[i] = this.encryptionService.decrypt(files[i], encryptedFileInfo);
            }
        }
        return next.handle();
    }
};
exports.DecryptFileInterceptor = DecryptFileInterceptor;
exports.DecryptFileInterceptor = DecryptFileInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [services_1.EncryptionService])
], DecryptFileInterceptor);
//# sourceMappingURL=decrypt-file.interceptor.js.map
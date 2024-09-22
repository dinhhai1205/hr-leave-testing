"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfToImageService = void 0;
const common_1 = require("@nestjs/common");
const pdf2pic_1 = require("pdf2pic");
let PdfToImageService = class PdfToImageService {
    async convertToBase64(fileBuffer, options) {
        const defaultOptions = {
            density: 100,
            format: 'jpeg',
            width: 198,
            height: 280,
            quality: 60,
            compression: 'jpeg',
        };
        if (!options) {
            options = defaultOptions;
        }
        const { base64 } = await (0, pdf2pic_1.fromBuffer)(fileBuffer, defaultOptions)(1, {
            responseType: 'base64',
        });
        if (!base64) {
            throw new Error('Image string is empty');
        }
        return base64;
    }
    multiConvertToBase64(fileBuffers, options) {
        return Promise.all(fileBuffers.map(fileBuffer => this.convertToBase64(fileBuffer, options)));
    }
};
exports.PdfToImageService = PdfToImageService;
exports.PdfToImageService = PdfToImageService = __decorate([
    (0, common_1.Injectable)()
], PdfToImageService);
//# sourceMappingURL=pdf-to-image.service.js.map
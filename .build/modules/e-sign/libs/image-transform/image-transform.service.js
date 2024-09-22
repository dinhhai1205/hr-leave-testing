"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageTransformService = void 0;
const common_1 = require("@nestjs/common");
const PDFDocument = require("pdfkit");
const sharp = require("sharp");
const utils_1 = require("../../../../common/utils");
let ImageTransformService = class ImageTransformService {
    constructor() {
        this.PDF_SIZES = {
            A3: [841.89, 1190.55],
            A4: [595.28, 841.89],
            A5: [419.53, 595.28],
            LEGAL: [612.0, 1008.0],
            LETTER: [612.0, 792.0],
        };
    }
    async toBase64(fileBuffer) {
        const imageStringBuffer = await sharp(fileBuffer)
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .resize(170, 200, {
            fit: 'inside',
            withoutEnlargement: true,
        })
            .jpeg({ quality: 50 })
            .toBuffer();
        return imageStringBuffer.toString('base64');
    }
    multiToBase64(fileBuffers) {
        return Promise.all(fileBuffers.map(fileBuffer => this.toBase64(fileBuffer)));
    }
    async toPdf(fileBuffer) {
        const doc = new PDFDocument({
            size: this.PDF_SIZES.A4,
            margin: 56.69,
        });
        const leftPadding = 56.69;
        const rightPadding = 56.69;
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const availableWidth = pageWidth - leftPadding - rightPadding;
        doc.image(fileBuffer, leftPadding, 0, {
            fit: [availableWidth, pageHeight - 2 * doc.page.margins.top],
            valign: 'center',
        });
        doc.end();
        const buffer = await (0, utils_1.streamToBuffer)(doc);
        return buffer;
    }
};
exports.ImageTransformService = ImageTransformService;
exports.ImageTransformService = ImageTransformService = __decorate([
    (0, common_1.Injectable)()
], ImageTransformService);
//# sourceMappingURL=image-transform.service.js.map
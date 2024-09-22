"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocxToPdfService = void 0;
const common_1 = require("@nestjs/common");
const libre = require("libreoffice-convert");
const util_1 = require("util");
let DocxToPdfService = class DocxToPdfService {
    async convert(fileBuffer) {
        const convertAsync = (0, util_1.promisify)(libre.convert);
        const docx = await convertAsync(fileBuffer, '.pdf', undefined);
        return docx;
    }
};
exports.DocxToPdfService = DocxToPdfService;
exports.DocxToPdfService = DocxToPdfService = __decorate([
    (0, common_1.Injectable)()
], DocxToPdfService);
//# sourceMappingURL=docx-to-pdf.service.js.map
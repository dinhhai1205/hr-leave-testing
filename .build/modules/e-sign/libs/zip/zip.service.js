"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipService = void 0;
const common_1 = require("@nestjs/common");
const AdmZip = require("adm-zip");
let ZipService = class ZipService {
    createZip(files) {
        const zip = new AdmZip();
        for (const file of files) {
            zip.addFile(file.name, file.buffer);
        }
        return zip.toBuffer();
    }
    unzipToArrayBuffers(fileBuffer) {
        const arrBuffers = [];
        const zip = new AdmZip(fileBuffer);
        const zipEntries = zip.getEntries();
        for (const entry of zipEntries) {
            const entryData = entry.getData();
            arrBuffers.push(entryData);
        }
        return arrBuffers;
    }
};
exports.ZipService = ZipService;
exports.ZipService = ZipService = __decorate([
    (0, common_1.Injectable)()
], ZipService);
//# sourceMappingURL=zip.service.js.map
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
exports.FilesBodyDto = exports.FileBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FileBodyDto {
}
exports.FileBodyDto = FileBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'file' }),
    __metadata("design:type", Object)
], FileBodyDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FileBodyDto.prototype, "encryptedSymmetricKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FileBodyDto.prototype, "encryptedIv", void 0);
class FilesBodyDto {
}
exports.FilesBodyDto = FilesBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'files' }),
    __metadata("design:type", Array)
], FilesBodyDto.prototype, "files", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FilesBodyDto.prototype, "encryptedSymmetricKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FilesBodyDto.prototype, "encryptedIv", void 0);
//# sourceMappingURL=file-body.dto.js.map
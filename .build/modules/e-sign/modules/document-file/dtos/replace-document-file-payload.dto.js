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
exports.ReplaceDocumentFilePayloadDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_document_file_payload_dto_1 = require("./create-document-file-payload.dto");
const class_validator_1 = require("class-validator");
class ReplaceDocumentFilePayloadDto extends (0, swagger_1.OmitType)(create_document_file_payload_dto_1.CreateDocumentFilePayloadDto, ['order']) {
}
exports.ReplaceDocumentFilePayloadDto = ReplaceDocumentFilePayloadDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ReplaceDocumentFilePayloadDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ReplaceDocumentFilePayloadDto.prototype, "documentId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ReplaceDocumentFilePayloadDto.prototype, "documentFileId", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ReplaceDocumentFilePayloadDto.prototype, "userEmail", void 0);
//# sourceMappingURL=replace-document-file-payload.dto.js.map
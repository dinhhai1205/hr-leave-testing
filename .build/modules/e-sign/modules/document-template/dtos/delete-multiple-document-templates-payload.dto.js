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
exports.DeleteMultipleDocumentTemplatesPayloadDto = void 0;
const delete_multiple_document_templates_body_dto_1 = require("../../../modules/document-template/dtos/delete-multiple-document-templates-body.dto");
const class_validator_1 = require("class-validator");
class DeleteMultipleDocumentTemplatesPayloadDto extends delete_multiple_document_templates_body_dto_1.DeleteMultipleDocumentTemplatesBodyDto {
}
exports.DeleteMultipleDocumentTemplatesPayloadDto = DeleteMultipleDocumentTemplatesPayloadDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], DeleteMultipleDocumentTemplatesPayloadDto.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], DeleteMultipleDocumentTemplatesPayloadDto.prototype, "companyId", void 0);
//# sourceMappingURL=delete-multiple-document-templates-payload.dto.js.map
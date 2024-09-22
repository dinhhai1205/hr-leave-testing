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
exports.DocumentTemplateResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../../common/dto");
const document_action_response_dto_1 = require("../../document-action/dtos/document-action-response.dto");
const document_file_response_dto_1 = require("../../document-file/dtos/document-file-response.dto");
const document_type_response_dto_1 = require("../../document-type/dtos/document-type-response.dto");
const folder_response_dto_1 = require("../../folder/dtos/folder-response.dto");
class DocumentTemplateResponseDto extends dto_1.BaseEntityResponseDto {
}
exports.DocumentTemplateResponseDto = DocumentTemplateResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], DocumentTemplateResponseDto.prototype, "isSequential", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentTemplateResponseDto.prototype, "expirationDays", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentTemplateResponseDto.prototype, "validity", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], DocumentTemplateResponseDto.prototype, "emailReminders", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentTemplateResponseDto.prototype, "reminderPeriod", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentTemplateResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentTemplateResponseDto.prototype, "documentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentTemplateResponseDto.prototype, "folderId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: folder_response_dto_1.FolderResponseDto }),
    __metadata("design:type", folder_response_dto_1.FolderResponseDto)
], DocumentTemplateResponseDto.prototype, "folder", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: document_type_response_dto_1.DocumentTypeResponseDto }),
    __metadata("design:type", document_type_response_dto_1.DocumentTypeResponseDto)
], DocumentTemplateResponseDto.prototype, "documentType", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({
        type: document_action_response_dto_1.DocumentActionResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Array)
], DocumentTemplateResponseDto.prototype, "documentAction", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({
        type: document_file_response_dto_1.DocumentFileResponseDto,
        isArray: true,
    }),
    __metadata("design:type", Array)
], DocumentTemplateResponseDto.prototype, "documentFiles", void 0);
//# sourceMappingURL=document-template-response.dto.js.map
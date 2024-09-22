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
exports.UpdateDocumentSettingBodyDto = void 0;
const update_document_action_setting_dto_1 = require("../../../modules/document-action/dtos/update-document-action-setting.dto");
const update_document_file_setting_dto_1 = require("../../../modules/document-file/dtos/update-document-file-setting.dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
const bulk_action_dto_1 = require("../../../modules/document/dtos/bulk-action.dto");
class UpdateDocumentSettingBodyDto {
}
exports.UpdateDocumentSettingBodyDto = UpdateDocumentSettingBodyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Sample Document' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UpdateDocumentSettingBodyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'false' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDocumentSettingBodyDto.prototype, "isSequential", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(99),
    __metadata("design:type", Number)
], UpdateDocumentSettingBodyDto.prototype, "expirationDays", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '1782493200000',
        description: 'Timestamp in milliseconds. Should not less than today. Passing -1 if not set',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(-1),
    __metadata("design:type", Number)
], UpdateDocumentSettingBodyDto.prototype, "validity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Description for document' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDocumentSettingBodyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'false' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDocumentSettingBodyDto.prototype, "emailReminders", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateDocumentSettingBodyDto.prototype, "reminderPeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Notes for document' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDocumentSettingBodyDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateDocumentSettingBodyDto.prototype, "documentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateDocumentSettingBodyDto.prototype, "folderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'false' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDocumentSettingBodyDto.prototype, "isBulk", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: bulk_action_dto_1.BulkActionDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => bulk_action_dto_1.BulkActionDto),
    __metadata("design:type", Array)
], UpdateDocumentSettingBodyDto.prototype, "bulkActions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: update_document_file_setting_dto_1.UpdateDocumentFileSettingDto,
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_document_file_setting_dto_1.UpdateDocumentFileSettingDto),
    __metadata("design:type", Array)
], UpdateDocumentSettingBodyDto.prototype, "documentFileSettings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: update_document_action_setting_dto_1.UpdateDocumentActionSettingDto,
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => update_document_action_setting_dto_1.UpdateDocumentActionSettingDto),
    __metadata("design:type", Array)
], UpdateDocumentSettingBodyDto.prototype, "documentActionSettings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, isArray: true }),
    (0, decorators_1.TransformArrayStringToNumbers)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.Min)(1, { each: true }),
    __metadata("design:type", Array)
], UpdateDocumentSettingBodyDto.prototype, "deletedActions", void 0);
//# sourceMappingURL=update-document-setting-body.dto.js.map
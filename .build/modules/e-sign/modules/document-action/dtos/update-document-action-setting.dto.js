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
exports.UpdateDocumentActionSettingDto = void 0;
const enums_1 = require("../../../enums");
const dtos_1 = require("../../../modules/document-action-field/dtos");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class UpdateDocumentActionSettingDto {
}
exports.UpdateDocumentActionSettingDto = UpdateDocumentActionSettingDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateDocumentActionSettingDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateDocumentActionSettingDto.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "recipientName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "recipientEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateDocumentActionSettingDto.prototype, "signingOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateDocumentActionSettingDto.prototype, "recipientIndex", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.DocumentActionType,
        example: enums_1.DocumentActionType.Sign,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionType),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "inPersonName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "inPersonEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.DocumentActionStatus,
        example: enums_1.DocumentActionStatus.NoAction,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionStatus),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.DocumentActionDeliveryMode,
        example: enums_1.DocumentActionDeliveryMode.Email,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionDeliveryMode),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "deliveryMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "recipientCountrycode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "recipientCountrycodeIso", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "recipientPhonenumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "privateNote", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.DocumentActionLanguageCode,
        example: enums_1.DocumentActionLanguageCode.English,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionLanguageCode),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: enums_1.DocumentActionVerificationType,
        example: enums_1.DocumentActionVerificationType.None,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionVerificationType),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "verificationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDocumentActionSettingDto.prototype, "verifyRecipient", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'false' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDocumentActionSettingDto.prototype, "isBulk", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.ValidateIf)(o => o?.verificationType !== enums_1.DocumentActionVerificationType.None),
    __metadata("design:type", String)
], UpdateDocumentActionSettingDto.prototype, "verificationCode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: dtos_1.FieldSettingsDto,
        isArray: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_1.FieldSettingsDto),
    __metadata("design:type", Array)
], UpdateDocumentActionSettingDto.prototype, "fieldSettings", void 0);
//# sourceMappingURL=update-document-action-setting.dto.js.map
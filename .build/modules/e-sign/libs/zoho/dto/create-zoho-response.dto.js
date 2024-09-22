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
exports.ZohoResponseDto = exports.ZohoActionDto = exports.ZohoDocumentIdDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ZohoDocumentPageDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoDocumentPageDto.prototype, "image_string", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoDocumentPageDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoDocumentPageDto.prototype, "is_thumbnail", void 0);
class ZohoDocumentIdDto {
}
exports.ZohoDocumentIdDto = ZohoDocumentIdDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoDocumentIdDto.prototype, "image_string", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoDocumentIdDto.prototype, "document_name", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ZohoDocumentPageDto),
    __metadata("design:type", Array)
], ZohoDocumentIdDto.prototype, "pages", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoDocumentIdDto.prototype, "document_size", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoDocumentIdDto.prototype, "document_order", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoDocumentIdDto.prototype, "is_editable", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoDocumentIdDto.prototype, "total_pages", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoDocumentIdDto.prototype, "document_id", void 0);
class DocumentFieldDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocumentFieldDto.prototype, "document_id", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DocumentFieldDto.prototype, "fields", void 0);
class ZohoActionDto {
}
exports.ZohoActionDto = ZohoActionDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoActionDto.prototype, "verify_recipient", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "recipient_countrycode_iso", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "action_type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "private_notes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "cloud_provider_name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "recipient_email", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoActionDto.prototype, "send_completed_document", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "verification_type", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoActionDto.prototype, "allow_signing", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "recipient_phonenumber", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoActionDto.prototype, "is_bulk", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "action_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoActionDto.prototype, "cloud_provider_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoActionDto.prototype, "signing_order", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ZohoActionDto.prototype, "fields", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "recipient_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "delivery_mode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "action_status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "recipient_countrycode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "in_person_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoActionDto.prototype, "in_person_email", void 0);
class ZohoRequestsDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "request_status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoRequestsDto.prototype, "reminder_period", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "owner_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "request_name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoRequestsDto.prototype, "modified_time", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoRequestsDto.prototype, "is_deleted", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoRequestsDto.prototype, "expiration_days", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoRequestsDto.prototype, "is_sequential", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ZohoRequestsDto.prototype, "templates_used", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "owner_first_name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoRequestsDto.prototype, "sign_percentage", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "owner_email", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoRequestsDto.prototype, "created_time", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoRequestsDto.prototype, "email_reminders", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ZohoDocumentIdDto),
    __metadata("design:type", Array)
], ZohoRequestsDto.prototype, "document_ids", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoRequestsDto.prototype, "self_sign", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DocumentFieldDto),
    __metadata("design:type", Array)
], ZohoRequestsDto.prototype, "document_fields", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoRequestsDto.prototype, "in_process", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoRequestsDto.prototype, "validity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "request_type_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "request_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "request_type_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestsDto.prototype, "owner_last_name", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ZohoActionDto),
    __metadata("design:type", Array)
], ZohoRequestsDto.prototype, "actions", void 0);
class ZohoResponseDto {
}
exports.ZohoResponseDto = ZohoResponseDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ZohoResponseDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ZohoRequestsDto),
    __metadata("design:type", ZohoRequestsDto)
], ZohoResponseDto.prototype, "requests", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoResponseDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoResponseDto.prototype, "status", void 0);
//# sourceMappingURL=create-zoho-response.dto.js.map
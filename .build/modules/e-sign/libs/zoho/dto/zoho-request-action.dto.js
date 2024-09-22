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
exports.ZohoRequestActionDto = void 0;
const enums_1 = require("../../../enums");
const class_validator_1 = require("class-validator");
const zoho_request_action_field_dto_1 = require("./zoho-request-action-field.dto");
class ZohoRequestActionDto {
}
exports.ZohoRequestActionDto = ZohoRequestActionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionType),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "action_type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "recipient_email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "recipient_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ZohoRequestActionDto.prototype, "signing_order", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o?.action_type && o.action_type === enums_1.DocumentActionType.InPerson),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "in_person_name", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o?.action_type && o.action_type === enums_1.DocumentActionType.InPerson),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "in_person_email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionDeliveryMode),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "delivery_mode", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "private_notes", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => (o?.delivery_mode &&
        o.delivery_mode === enums_1.DocumentActionDeliveryMode.EmailAndPhone) ||
        (o?.verification_type &&
            o.verification_type === enums_1.DocumentActionVerificationType.Sms)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "recipient_countrycode", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => (o?.delivery_mode &&
        o.delivery_mode === enums_1.DocumentActionDeliveryMode.EmailAndPhone) ||
        (o?.verification_type &&
            o.verification_type === enums_1.DocumentActionVerificationType.Sms)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "recipient_countrycode_iso", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => (o?.delivery_mode &&
        o.delivery_mode === enums_1.DocumentActionDeliveryMode.EmailAndPhone) ||
        (o?.verification_type &&
            o.verification_type === enums_1.DocumentActionVerificationType.Sms)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "recipient_phonenumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoRequestActionDto.prototype, "verify_recipient", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.verify_recipient === true),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionVerificationType),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "verification_type", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.verify_recipient === true &&
        o.verification_type === enums_1.DocumentActionVerificationType.Offline),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "verification_code", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.verify_recipient === true),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionLanguageCode),
    __metadata("design:type", String)
], ZohoRequestActionDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", zoho_request_action_field_dto_1.ZohoRequestActionFieldDto)
], ZohoRequestActionDto.prototype, "fields", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ZohoRequestActionDto.prototype, "is_bulk", void 0);
//# sourceMappingURL=zoho-request-action.dto.js.map
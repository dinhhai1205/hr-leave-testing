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
exports.SubmitZohoRequestActionBodyDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const zoho_request_action_dto_1 = require("./zoho-request-action.dto");
class SubmitZohoRequestActionBodyDto extends (0, swagger_1.PickType)(zoho_request_action_dto_1.ZohoRequestActionDto, ['fields']) {
}
exports.SubmitZohoRequestActionBodyDto = SubmitZohoRequestActionBodyDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitZohoRequestActionBodyDto.prototype, "action_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.DocumentActionType),
    __metadata("design:type", String)
], SubmitZohoRequestActionBodyDto.prototype, "action_type", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitZohoRequestActionBodyDto.prototype, "recipient_name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SubmitZohoRequestActionBodyDto.prototype, "recipient_email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitZohoRequestActionBodyDto.prototype, "in_person_name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SubmitZohoRequestActionBodyDto.prototype, "in_person_email", void 0);
//# sourceMappingURL=submit-zoho-request-action-body.dto.js.map
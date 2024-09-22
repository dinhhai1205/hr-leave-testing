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
exports.UpdateDocumentActionTemplateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const update_document_action_setting_dto_1 = require("../../document-action/dtos/update-document-action-setting.dto");
class UpdateDocumentActionTemplateDto extends (0, swagger_1.PickType)(update_document_action_setting_dto_1.UpdateDocumentActionSettingDto, [
    'recipientName',
    'recipientEmail',
    'deliveryMode',
    'recipientCountrycode',
    'recipientCountrycodeIso',
    'recipientPhonenumber',
    'privateNote',
    'language',
    'verificationType',
    'verifyRecipient',
    'verificationCode',
]) {
}
exports.UpdateDocumentActionTemplateDto = UpdateDocumentActionTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateDocumentActionTemplateDto.prototype, "recipientIndex", void 0);
//# sourceMappingURL=update-documnet-action-template.dto.js.map
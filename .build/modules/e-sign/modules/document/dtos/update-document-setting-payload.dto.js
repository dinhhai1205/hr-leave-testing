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
exports.UpdateDocumentSettingPayloadDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../../../../common/dto");
const update_document_setting_body_dto_1 = require("./update-document-setting-body.dto");
class UpdateDocumentSettingPayloadDto extends (0, swagger_1.IntersectionType)(update_document_setting_body_dto_1.UpdateDocumentSettingBodyDto, dto_1.BaseParamDto) {
}
exports.UpdateDocumentSettingPayloadDto = UpdateDocumentSettingPayloadDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateDocumentSettingPayloadDto.prototype, "documentId", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateDocumentSettingPayloadDto.prototype, "userEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDocumentSettingPayloadDto.prototype, "status", void 0);
//# sourceMappingURL=update-document-setting-payload.dto.js.map
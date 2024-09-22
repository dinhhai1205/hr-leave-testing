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
exports.DocumentActionResponseDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../../common/dto");
class DocumentActionResponseDto extends dto_1.BaseEntityResponseDto {
}
exports.DocumentActionResponseDto = DocumentActionResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "recipientName", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "recipientEmail", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], DocumentActionResponseDto.prototype, "allowSigning", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "deliveryMode", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "privateNote", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], DocumentActionResponseDto.prototype, "sendCompletedDocument", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentActionResponseDto.prototype, "signingOrder", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], DocumentActionResponseDto.prototype, "verifyRecipient", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "verificationType", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentActionResponseDto.prototype, "verificationCode", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentActionResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentActionResponseDto.prototype, "documentId", void 0);
//# sourceMappingURL=document-action-response.dto.js.map
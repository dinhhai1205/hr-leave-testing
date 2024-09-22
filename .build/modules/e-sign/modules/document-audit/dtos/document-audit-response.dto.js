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
exports.DocumentAuditResponseDto = void 0;
const enums_1 = require("../../../enums");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../../common/dto");
class DocumentAuditResponseDto extends dto_1.BaseEntityResponseDto {
}
exports.DocumentAuditResponseDto = DocumentAuditResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentAuditResponseDto.prototype, "documentStatus", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentAuditResponseDto.prototype, "activity", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentAuditResponseDto.prototype, "operationType", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentAuditResponseDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentAuditResponseDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DocumentAuditResponseDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], DocumentAuditResponseDto.prototype, "documentId", void 0);
//# sourceMappingURL=document-audit-response.dto.js.map
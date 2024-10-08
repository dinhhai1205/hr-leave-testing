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
exports.BaseEntityResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseEntityResponseDto {
}
exports.BaseEntityResponseDto = BaseEntityResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], BaseEntityResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], BaseEntityResponseDto.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], BaseEntityResponseDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], BaseEntityResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Date)
], BaseEntityResponseDto.prototype, "createdOn", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], BaseEntityResponseDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Date)
], BaseEntityResponseDto.prototype, "updatedOn", void 0);
//# sourceMappingURL=base-entity-response.dto.js.map
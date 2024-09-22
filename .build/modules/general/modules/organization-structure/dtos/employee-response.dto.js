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
exports.EmployeeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EmployeeResponseDto {
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    __metadata("design:type", Number)
], EmployeeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ref' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeRef", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'name' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "fullNameLocal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EngName' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "fullNameEn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Emp No' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "employeeNo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], EmployeeResponseDto.prototype, "isEssEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], EmployeeResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "orgPath", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], EmployeeResponseDto.prototype, "organizationElementId", void 0);
//# sourceMappingURL=employee-response.dto.js.map
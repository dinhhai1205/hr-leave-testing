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
exports.DayToProrateResponse = exports.DayToProrateResponseDto = exports.DayToProratePayloadDto = exports.DayToProrateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DayToProrateDto {
}
exports.DayToProrateDto = DayToProrateDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DayToProrateDto.prototype, "overtimeDetailId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DayToProrateDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DayToProrateDto.prototype, "employeeId", void 0);
class DayToProratePayloadDto {
}
exports.DayToProratePayloadDto = DayToProratePayloadDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], DayToProratePayloadDto.prototype, "data", void 0);
class DayToProrateResponseDto {
}
exports.DayToProrateResponseDto = DayToProrateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DayToProrateResponseDto.prototype, "dayToProrate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DayToProrateResponseDto.prototype, "employeeId", void 0);
class DayToProrateResponse {
}
exports.DayToProrateResponse = DayToProrateResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], DayToProrateResponse.prototype, "data", void 0);
//# sourceMappingURL=day-to-prorate.dto.js.map
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
exports.CompanyResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../../common/dto");
const work_schedule_default_response_dto_1 = require("./work-schedule-default-response.dto");
class CompanyResponseDto extends dto_1.BaseEntityResponseDto {
}
exports.CompanyResponseDto = CompanyResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "timeZone", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], CompanyResponseDto.prototype, "ownerId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", work_schedule_default_response_dto_1.WorkScheduleDefaultResponseDto)
], CompanyResponseDto.prototype, "workScheduleDefault", void 0);
//# sourceMappingURL=company-response.dto.js.map
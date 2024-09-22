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
exports.WorkScheduleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("../../../common");
class WorkScheduleResponseDto extends common_1.BaseEntityResponseDto {
}
exports.WorkScheduleResponseDto = WorkScheduleResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], WorkScheduleResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], WorkScheduleResponseDto.prototype, "workArrangement", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], WorkScheduleResponseDto.prototype, "breakType", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], WorkScheduleResponseDto.prototype, "default", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], WorkScheduleResponseDto.prototype, "weeklyHours", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], WorkScheduleResponseDto.prototype, "unitTime", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], WorkScheduleResponseDto.prototype, "excludeEarlyClockIn", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], WorkScheduleResponseDto.prototype, "employees", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], WorkScheduleResponseDto.prototype, "groups", void 0);
//# sourceMappingURL=work-schedue-response.dto.js.map
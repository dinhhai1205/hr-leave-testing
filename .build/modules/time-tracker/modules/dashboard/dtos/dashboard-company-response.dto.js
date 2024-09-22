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
exports.DashboardCompanyResponseDto = exports.TrackedHour = void 0;
const swagger_1 = require("@nestjs/swagger");
class TrackedHour {
}
exports.TrackedHour = TrackedHour;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TrackedHour.prototype, "trackedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], TrackedHour.prototype, "sumBreakTimeById", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TrackedHour.prototype, "workedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TrackedHour.prototype, "breakHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], TrackedHour.prototype, "unitTime", void 0);
class DashboardCompanyResponseDto {
}
exports.DashboardCompanyResponseDto = DashboardCompanyResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], DashboardCompanyResponseDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", TrackedHour)
], DashboardCompanyResponseDto.prototype, "trackedHour", void 0);
//# sourceMappingURL=dashboard-company-response.dto.js.map
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
exports.EmployeeInfoForClockDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("../../work-schedule/dtos");
const base_entity_response_dto_1 = require("../../../common/dtos/base-entity-response.dto");
const dtos_2 = require("../../project/dtos");
class EmployeeInfoForClockDto extends base_entity_response_dto_1.BaseEntityResponseDto {
}
exports.EmployeeInfoForClockDto = EmployeeInfoForClockDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "workScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "roleId", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "roleName", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], EmployeeInfoForClockDto.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoForClockDto.prototype, "timezone", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Boolean)
], EmployeeInfoForClockDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", dtos_1.WorkScheduleResponseDto)
], EmployeeInfoForClockDto.prototype, "workSchedule", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], EmployeeInfoForClockDto.prototype, "members", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], EmployeeInfoForClockDto.prototype, "activities", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", dtos_2.ProjectResponseDto)
], EmployeeInfoForClockDto.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], EmployeeInfoForClockDto.prototype, "assigneeGroups", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], EmployeeInfoForClockDto.prototype, "projects", void 0);
//# sourceMappingURL=employee-info-for-clock.dto.js.map
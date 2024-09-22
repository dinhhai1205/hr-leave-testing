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
exports.TimeSheetAdjustmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const database_1 = require("../../../../../core/database");
class TimeSheetAdjustmentDto {
}
exports.TimeSheetAdjustmentDto = TimeSheetAdjustmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier of the time sheet adjustment',
    }),
    __metadata("design:type", Number)
], TimeSheetAdjustmentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TimeSheetAdjustmentDto.prototype, "uuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: database_1.TimeSheetAdjustmentType,
        description: 'The type of time sheet adjustment',
    }),
    __metadata("design:type", String)
], TimeSheetAdjustmentDto.prototype, "timeSheetType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: database_1.AdjustmentStatus,
        description: 'The status of the adjustment',
    }),
    __metadata("design:type", String)
], TimeSheetAdjustmentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentDto.prototype, "payElementMappingId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TimeSheetAdjustmentDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentDto.prototype, "hour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentDto.prototype, "payrollTimesheetId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TimeSheetAdjustmentDto.prototype, "leaveId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TimeSheetAdjustmentDto.prototype, "workScheduleSetting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: database_1.TimeAdjustmentType,
        description: 'The type of time adjustment',
    }),
    __metadata("design:type", String)
], TimeSheetAdjustmentDto.prototype, "adjustmentType", void 0);
//# sourceMappingURL=timesheet-adjustment.dto.js.map
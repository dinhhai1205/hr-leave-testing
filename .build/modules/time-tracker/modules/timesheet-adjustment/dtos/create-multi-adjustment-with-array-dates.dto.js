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
exports.CreateMultiAdjustmentsWithArrayDatesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const database_1 = require("../../../../../core/database");
class CreateMultiAdjustmentsWithArrayDatesDto {
}
exports.CreateMultiAdjustmentsWithArrayDatesDto = CreateMultiAdjustmentsWithArrayDatesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: database_1.TimeSheetAdjustmentType,
        description: 'The type of time sheet adjustment',
    }),
    (0, class_validator_1.IsEnum)(database_1.TimeSheetAdjustmentType, {
        message: 'timeSheetType must be a valid enum value',
    }),
    __metadata("design:type", String)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "timeSheetType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: database_1.AdjustmentStatus,
        description: 'The status of the adjustment',
    }),
    (0, class_validator_1.IsEnum)(database_1.AdjustmentStatus, {
        message: 'status must be a valid enum value',
    }),
    __metadata("design:type", String)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "payElementMappingId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "dates", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "hour", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "leaveId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "payrollIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "workScheduleSetting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: database_1.TimeAdjustmentType,
        description: 'The type of time adjustment',
    }),
    (0, class_validator_1.IsEnum)(database_1.TimeAdjustmentType, {
        message: 'adjustmentType must be a valid enum value',
    }),
    __metadata("design:type", String)
], CreateMultiAdjustmentsWithArrayDatesDto.prototype, "adjustmentType", void 0);
//# sourceMappingURL=create-multi-adjustment-with-array-dates.dto.js.map
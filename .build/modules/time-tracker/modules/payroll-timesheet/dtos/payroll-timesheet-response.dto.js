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
exports.PayrollTimeSheetResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PayrollTimeSheetResponseDto {
}
exports.PayrollTimeSheetResponseDto = PayrollTimeSheetResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the payroll time sheet record',
    }),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the company',
    }),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The ID of the employee',
    }),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of work days',
    }),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "totalScheduledWorkDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of work hours',
    }),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "totalScheduledWorkHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "adjustmentDaysAdditionDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "adjustmentDaysDeductionDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "unpaidDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PayrollTimeSheetResponseDto.prototype, "totalPayrollRegularWorkDays", void 0);
//# sourceMappingURL=payroll-timesheet-response.dto.js.map
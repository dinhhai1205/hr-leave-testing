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
exports.LeaveUpdateRecordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../../../common/enums");
class LeaveUpdateRecordDto {
}
exports.LeaveUpdateRecordDto = LeaveUpdateRecordDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeaveUpdateRecordDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeaveUpdateRecordDto.prototype, "leaveTypeId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Leave reason' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LeaveUpdateRecordDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], LeaveUpdateRecordDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeaveUpdateRecordDto.prototype, "fromFdHd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], LeaveUpdateRecordDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeaveUpdateRecordDto.prototype, "toFdHd", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LeaveUpdateRecordDto.prototype, "employeeId", void 0);
//# sourceMappingURL=leave-update-record.js.map
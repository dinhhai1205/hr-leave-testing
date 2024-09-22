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
exports.CreateWorkScheduleBodyDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("../../../common");
const dtos_1 = require("../../auto-deduction/dtos");
const dtos_2 = require("../../break-rule/dtos");
const dtos_3 = require("../../day-schedule/dtos");
const dtos_4 = require("../../overtime/dtos");
const work_schedule_state_enum_1 = require("../enums/work-schedule-state.enum");
class CreateWorkScheduleBodyDTO {
    constructor() {
        this.assignees = {};
        this.groupAssignees = {};
    }
}
exports.CreateWorkScheduleBodyDTO = CreateWorkScheduleBodyDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "ttWorkScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateWorkScheduleBodyDTO.prototype, "utcOffset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(common_1.WorkArrangement),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "workArrangement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(common_1.BreakType),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "breakType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateWorkScheduleBodyDTO.prototype, "default", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateWorkScheduleBodyDTO.prototype, "weeklyHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(common_1.UnitTime),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "unitTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateWorkScheduleBodyDTO.prototype, "excludeEarlyClockIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [dtos_1.CreateAutoDeductionDTO] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => dtos_1.CreateAutoDeductionDTO),
    __metadata("design:type", Array)
], CreateWorkScheduleBodyDTO.prototype, "autoDeductions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [dtos_2.CreateBreakRuleDTO] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => dtos_2.CreateBreakRuleDTO),
    __metadata("design:type", Array)
], CreateWorkScheduleBodyDTO.prototype, "breaks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [dtos_3.CreateDayScheduleDTO] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_3.CreateDayScheduleDTO),
    __metadata("design:type", Array)
], CreateWorkScheduleBodyDTO.prototype, "daySchedules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_4.CreateOvertimeDTO }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dtos_4.CreateOvertimeDTO),
    __metadata("design:type", dtos_4.CreateOvertimeDTO)
], CreateWorkScheduleBodyDTO.prototype, "overtime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateWorkScheduleBodyDTO.prototype, "locations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(work_schedule_state_enum_1.EWorkScheduleState),
    __metadata("design:type", String)
], CreateWorkScheduleBodyDTO.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateWorkScheduleBodyDTO.prototype, "threshold", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateWorkScheduleBodyDTO.prototype, "assigneeIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateWorkScheduleBodyDTO.prototype, "groupAssigneeIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateWorkScheduleBodyDTO.prototype, "assignees", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateWorkScheduleBodyDTO.prototype, "groupAssignees", void 0);
//# sourceMappingURL=create-work-schedule-body.dto.js.map
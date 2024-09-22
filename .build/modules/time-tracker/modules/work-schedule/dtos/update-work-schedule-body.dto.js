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
exports.UpdateWorkScheduleBodyDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_work_schedule_body_dto_1 = require("./create-work-schedule-body.dto");
const dtos_1 = require("../../auto-deduction/dtos");
const dtos_2 = require("../../break-rule/dtos");
const dtos_3 = require("../../day-schedule/dtos");
const dtos_4 = require("../../overtime/dtos");
const dtos_5 = require("../../location-work-schedule/dtos");
class UpdateWorkScheduleBodyDTO extends (0, swagger_1.PickType)(create_work_schedule_body_dto_1.CreateWorkScheduleBodyDTO, [
    'name',
    'workArrangement',
    'breakType',
    'default',
    'weeklyHours',
    'unitTime',
    'excludeEarlyClockIn',
    'utcOffset',
    'color',
]) {
}
exports.UpdateWorkScheduleBodyDTO = UpdateWorkScheduleBodyDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [dtos_1.UpdateAutoDeductionDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_1.UpdateAutoDeductionDto),
    __metadata("design:type", Array)
], UpdateWorkScheduleBodyDTO.prototype, "autoDeductions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [dtos_2.UpdateBreakRuleDTO] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_2.UpdateBreakRuleDTO),
    __metadata("design:type", Array)
], UpdateWorkScheduleBodyDTO.prototype, "breaks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [dtos_3.UpdateDayScheduleDTO] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_3.UpdateDayScheduleDTO),
    __metadata("design:type", Array)
], UpdateWorkScheduleBodyDTO.prototype, "daySchedules", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_4.UpdateOvertimeDTO }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dtos_4.UpdateOvertimeDTO),
    __metadata("design:type", dtos_4.UpdateOvertimeDTO)
], UpdateWorkScheduleBodyDTO.prototype, "overtime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [dtos_5.UpdateLocationWorkScheduleDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dtos_5.UpdateLocationWorkScheduleDto),
    __metadata("design:type", Array)
], UpdateWorkScheduleBodyDTO.prototype, "locations", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateWorkScheduleBodyDTO.prototype, "autoDeductionsDeleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateWorkScheduleBodyDTO.prototype, "breaksDeleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateWorkScheduleBodyDTO.prototype, "daySchedulesDeleted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateWorkScheduleBodyDTO.prototype, "locationsDeleted", void 0);
//# sourceMappingURL=update-work-schedule-body.dto.js.map
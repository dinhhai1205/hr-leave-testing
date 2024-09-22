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
exports.UnassignWorkScheduleToGroupsDto = exports.AssignWorkScheduleToGroupsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
const class_transformer_1 = require("class-transformer");
class AssignWorkScheduleToGroupsDto {
}
exports.AssignWorkScheduleToGroupsDto = AssignWorkScheduleToGroupsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.Min)(1, { each: true }),
    (0, decorators_1.IsNotEmptyArray)(),
    __metadata("design:type", Array)
], AssignWorkScheduleToGroupsDto.prototype, "orgIds", void 0);
class GroupWorkSchedulePairDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GroupWorkSchedulePairDto.prototype, "orgId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GroupWorkSchedulePairDto.prototype, "workScheduleId", void 0);
class UnassignWorkScheduleToGroupsDto {
}
exports.UnassignWorkScheduleToGroupsDto = UnassignWorkScheduleToGroupsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [GroupWorkSchedulePairDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GroupWorkSchedulePairDto),
    __metadata("design:type", Array)
], UnassignWorkScheduleToGroupsDto.prototype, "groupWorkSchedules", void 0);
//# sourceMappingURL=assign-work-schedule.dto.js.map
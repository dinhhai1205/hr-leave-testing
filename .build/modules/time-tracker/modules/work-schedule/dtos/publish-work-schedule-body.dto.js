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
exports.PublishWorkScheduleBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
const work_schedule_publish_type_enum_1 = require("../enums/work-schedule-publish-type.enum");
class PublishWorkScheduleBodyDto {
}
exports.PublishWorkScheduleBodyDto = PublishWorkScheduleBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01' }),
    (0, decorators_1.IsDateString)(),
    __metadata("design:type", String)
], PublishWorkScheduleBodyDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-01' }),
    (0, decorators_1.IsDateString)(),
    __metadata("design:type", String)
], PublishWorkScheduleBodyDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: work_schedule_publish_type_enum_1.EWorkSchedulePublishType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(work_schedule_publish_type_enum_1.EWorkSchedulePublishType),
    __metadata("design:type", String)
], PublishWorkScheduleBodyDto.prototype, "publishType", void 0);
//# sourceMappingURL=publish-work-schedule-body.dto.js.map
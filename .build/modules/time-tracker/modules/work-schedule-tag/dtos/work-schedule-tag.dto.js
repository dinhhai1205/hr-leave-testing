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
exports.WorkScheduleTagDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class WorkScheduleTagDto {
}
exports.WorkScheduleTagDto = WorkScheduleTagDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the company' }),
    __metadata("design:type", Number)
], WorkScheduleTagDto.prototype, "companyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the tag' }),
    __metadata("design:type", Number)
], WorkScheduleTagDto.prototype, "tagId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the Work Schedule' }),
    __metadata("design:type", Number)
], WorkScheduleTagDto.prototype, "workScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], WorkScheduleTagDto.prototype, "isDeleted", void 0);
//# sourceMappingURL=work-schedule-tag.dto.js.map
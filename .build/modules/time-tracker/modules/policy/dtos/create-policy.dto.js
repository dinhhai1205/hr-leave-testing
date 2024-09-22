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
exports.CreatePolicyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dtos_1 = require("../../time-tracking-setting/dtos");
const dtos_2 = require("../../schedule-setting/dtos");
class CreatePolicyDto {
}
exports.CreatePolicyDto = CreatePolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_2.CreateScheduleSettingDto }),
    (0, class_transformer_1.Type)(() => dtos_2.CreateScheduleSettingDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", dtos_2.CreateScheduleSettingDto)
], CreatePolicyDto.prototype, "scheduleSetting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: dtos_1.CreateTimeTrackingSettingDto }),
    (0, class_transformer_1.Type)(() => dtos_1.CreateTimeTrackingSettingDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", dtos_1.CreateTimeTrackingSettingDto)
], CreatePolicyDto.prototype, "timeTrackingSetting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePolicyDto.prototype, "userEmail", void 0);
//# sourceMappingURL=create-policy.dto.js.map
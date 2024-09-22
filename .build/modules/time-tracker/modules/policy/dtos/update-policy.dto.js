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
exports.UpdatePolicyDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_policy_dto_1 = require("./create-policy.dto");
const dtos_1 = require("../../schedule-setting/dtos");
const dtos_2 = require("../../time-tracking-setting/dtos");
class UpdatePolicyDto extends (0, swagger_1.PickType)(create_policy_dto_1.CreatePolicyDto, [
    'userEmail',
]) {
}
exports.UpdatePolicyDto = UpdatePolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePolicyDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: dtos_1.UpdateScheduleSettingDto }),
    (0, class_transformer_1.Type)(() => dtos_1.UpdateScheduleSettingDto),
    (0, class_validator_1.ValidateNested)(),
    (0, common_1.Optional)(),
    __metadata("design:type", dtos_1.UpdateScheduleSettingDto)
], UpdatePolicyDto.prototype, "scheduleSetting", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: dtos_2.UpdateTimeTrackingSettingDto }),
    (0, class_transformer_1.Type)(() => dtos_2.UpdateTimeTrackingSettingDto),
    (0, class_validator_1.ValidateNested)(),
    (0, common_1.Optional)(),
    __metadata("design:type", dtos_2.UpdateTimeTrackingSettingDto)
], UpdatePolicyDto.prototype, "timeTrackingSetting", void 0);
//# sourceMappingURL=update-policy.dto.js.map
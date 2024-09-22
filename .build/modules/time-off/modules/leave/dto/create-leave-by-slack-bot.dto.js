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
exports.CreateLeaveABySlackBotBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
const enums_1 = require("../../../../../common/enums");
class CreateLeaveABySlackBotBodyDto {
}
exports.CreateLeaveABySlackBotBodyDto = CreateLeaveABySlackBotBodyDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateLeaveABySlackBotBodyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLeaveABySlackBotBodyDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, decorators_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLeaveABySlackBotBodyDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, decorators_1.IsDateString)(),
    __metadata("design:type", String)
], CreateLeaveABySlackBotBodyDto.prototype, "dateTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ELeaveDuration }),
    (0, class_validator_1.IsEnum)(enums_1.ELeaveDuration),
    __metadata("design:type", Number)
], CreateLeaveABySlackBotBodyDto.prototype, "fromFdHd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ELeaveDuration }),
    (0, class_validator_1.IsEnum)(enums_1.ELeaveDuration),
    __metadata("design:type", Number)
], CreateLeaveABySlackBotBodyDto.prototype, "toFdHd", void 0);
//# sourceMappingURL=create-leave-by-slack-bot.dto.js.map
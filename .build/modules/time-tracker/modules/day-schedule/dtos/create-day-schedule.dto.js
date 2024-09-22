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
exports.CreateDayScheduleDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const common_1 = require("../../../common");
class CreateDayScheduleDTO {
}
exports.CreateDayScheduleDTO = CreateDayScheduleDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(common_1.DayType),
    __metadata("design:type", String)
], CreateDayScheduleDTO.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDayScheduleDTO.prototype, "ttDayScheduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d) ([+-](0[0-9]|1[0-3]):[0-5]\d|Z)$/, {
        message: 'from must be a valid time in HH:mm:ss ±hh:mm or HH:mm:ss Z format',
    }),
    __metadata("design:type", String)
], CreateDayScheduleDTO.prototype, "from", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Matches)(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d) ([+-](0[0-9]|1[0-3]):[0-5]\d|Z)$/, {
        message: 'to must be a valid time in HH:mm:ss ±hh:mm or HH:mm:ss Z format',
    }),
    __metadata("design:type", String)
], CreateDayScheduleDTO.prototype, "to", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateDayScheduleDTO.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(common_1.UnitTime),
    __metadata("design:type", String)
], CreateDayScheduleDTO.prototype, "unitTime", void 0);
//# sourceMappingURL=create-day-schedule.dto.js.map
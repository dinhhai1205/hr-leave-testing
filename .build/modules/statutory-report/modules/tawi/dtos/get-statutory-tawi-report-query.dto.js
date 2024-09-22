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
exports.GetStatutoryTawiReportQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../../common/decorators");
const enums_1 = require("../enums");
class GetStatutoryTawiReportQueryDto {
}
exports.GetStatutoryTawiReportQueryDto = GetStatutoryTawiReportQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ETawiReportLanguageSupported }),
    (0, class_validator_1.IsEnum)(enums_1.ETawiReportLanguageSupported),
    __metadata("design:type", String)
], GetStatutoryTawiReportQueryDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, decorators_1.TransformStringToNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.Min)(1800),
    (0, class_validator_1.Max)(2999),
    __metadata("design:type", Number)
], GetStatutoryTawiReportQueryDto.prototype, "year", void 0);
//# sourceMappingURL=get-statutory-tawi-report-query.dto.js.map
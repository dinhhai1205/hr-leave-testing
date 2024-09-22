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
exports.PayrollReportColumnCustomizeDto = exports.ColumnCustomizeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ColumnCustomizeDto {
    constructor() {
        this.children = [];
    }
}
exports.ColumnCustomizeDto = ColumnCustomizeDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ColumnCustomizeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ColumnCustomizeDto.prototype, "children", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ColumnCustomizeDto.prototype, "name", void 0);
class PayrollReportColumnCustomizeDto {
    constructor() {
        this.columnCustomizes = [];
    }
}
exports.PayrollReportColumnCustomizeDto = PayrollReportColumnCustomizeDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: ColumnCustomizeDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], PayrollReportColumnCustomizeDto.prototype, "columnCustomizes", void 0);
//# sourceMappingURL=payroll-report-column-customize.dto.js.map
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
exports.PaginationPayrollReportDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../../../common/constants");
const decorators_1 = require("../../../../../common/decorators");
const pagination_dto_1 = require("../../../../../common/dto/pagination.dto");
class PaginationPayrollReportDto extends (0, swagger_1.PickType)(pagination_dto_1.PaginationDto, [
    'page',
    'skip',
    'take',
    'page',
    'isSelectAll',
    'sort',
    'order',
]) {
    constructor() {
        super(...arguments);
        this.keyword = '';
        this.byPercentage = 'false';
        this.prevPayrollHeaderId = 0;
        this.noCount = 'false';
    }
}
exports.PaginationPayrollReportDto = PaginationPayrollReportDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], PaginationPayrollReportDto.prototype, "keyword", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Za-z]{2}$/, {
        message: 'Please enter a valid two-letter country code.',
    }),
    __metadata("design:type", String)
], PaginationPayrollReportDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['true', 'false'], { message: 'Type must be either "true" or "false"' }),
    __metadata("design:type", String)
], PaginationPayrollReportDto.prototype, "byPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, decorators_1.TransformStringToNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationPayrollReportDto.prototype, "payrollHeaderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, decorators_1.TransformStringToNumber)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], PaginationPayrollReportDto.prototype, "prevPayrollHeaderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(constants_1.BOOL), {
        message: 'Type must be either "true" or "false"',
    }),
    __metadata("design:type", Object)
], PaginationPayrollReportDto.prototype, "noCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, decorators_1.TransformArrayStringToNumbers)(),
    __metadata("design:type", Array)
], PaginationPayrollReportDto.prototype, "employeeIds", void 0);
//# sourceMappingURL=pagination-payroll-report.dto.js.map
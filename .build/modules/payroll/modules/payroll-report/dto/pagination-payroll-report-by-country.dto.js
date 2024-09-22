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
exports.PaginationPayrollReportByCountryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../../../common/dto/pagination.dto");
const pagination_payroll_report_dto_1 = require("./pagination-payroll-report.dto");
class PaginationPayrollReportByCountryDto extends (0, swagger_1.IntersectionType)((0, swagger_1.PickType)(pagination_dto_1.PaginationDto, [
    'page',
    'skip',
    'take',
    'page',
    'isSelectAll',
    'sort',
    'order',
]), (0, swagger_1.PickType)(pagination_payroll_report_dto_1.PaginationPayrollReportDto, ['keyword', 'employeeIds'])) {
}
exports.PaginationPayrollReportByCountryDto = PaginationPayrollReportByCountryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-08' }),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], PaginationPayrollReportByCountryDto.prototype, "dateFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-08' }),
    (0, class_validator_1.ValidateIf)(o => o.dateFrom !== undefined || o.dateFrom !== null),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], PaginationPayrollReportByCountryDto.prototype, "dateTo", void 0);
//# sourceMappingURL=pagination-payroll-report-by-country.dto.js.map
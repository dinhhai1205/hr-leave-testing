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
exports.OctoDashboardPayrollPayCategoriesDto = void 0;
const class_validator_1 = require("class-validator");
const payroll_report_dashboard_by_pay_categorories_dto_1 = require("../../../../payroll/modules/payroll-report/dto/payroll-report-dashboard-by-pay-categorories.dto");
class OctoDashboardPayrollPayCategoriesDto extends payroll_report_dashboard_by_pay_categorories_dto_1.PayrollReportDashboardByPayCategoriesDto {
}
exports.OctoDashboardPayrollPayCategoriesDto = OctoDashboardPayrollPayCategoriesDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OctoDashboardPayrollPayCategoriesDto.prototype, "currencyCode", void 0);
//# sourceMappingURL=octo-dashboard-payroll-pay-categories.dto.js.map
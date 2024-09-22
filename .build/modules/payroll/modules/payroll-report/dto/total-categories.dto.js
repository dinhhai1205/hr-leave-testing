"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalCategoriesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_payroll_report_dto_1 = require("./pagination-payroll-report.dto");
class TotalCategoriesDto extends (0, swagger_1.PickType)(pagination_payroll_report_dto_1.PaginationPayrollReportDto, [
    'prevPayrollHeaderId',
    'byPercentage',
]) {
}
exports.TotalCategoriesDto = TotalCategoriesDto;
//# sourceMappingURL=total-categories.dto.js.map
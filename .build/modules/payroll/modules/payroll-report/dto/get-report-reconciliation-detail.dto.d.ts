import { PaginationPayrollReportDto } from './pagination-payroll-report.dto';
declare const GetReportReconciliationDetailDto_base: import("@nestjs/common").Type<Pick<PaginationPayrollReportDto, "country" | "prevPayrollHeaderId">>;
export declare class GetReportReconciliationDetailDto extends GetReportReconciliationDetailDto_base {
    employeeId: number;
}
export {};

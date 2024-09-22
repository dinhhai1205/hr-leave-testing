import { PaginationDto } from '../../../../../common/dto/pagination.dto';
import { PaginationPayrollReportDto } from './pagination-payroll-report.dto';
declare const PaginationPayrollReportByCountryDto_base: import("@nestjs/common").Type<Pick<PaginationDto, "sort" | "order" | "page" | "take" | "isSelectAll" | "skip"> & Pick<PaginationPayrollReportDto, "employeeIds" | "keyword">>;
export declare class PaginationPayrollReportByCountryDto extends PaginationPayrollReportByCountryDto_base {
    dateFrom: string;
    dateTo: string;
}
export {};

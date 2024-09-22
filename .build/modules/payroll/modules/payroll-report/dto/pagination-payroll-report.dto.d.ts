import { BOOL } from '../../../../../common/constants';
import { PaginationDto } from '../../../../../common/dto/pagination.dto';
import { ObjectValues } from '../../../../../common/types';
declare const PaginationPayrollReportDto_base: import("@nestjs/common").Type<Pick<PaginationDto, "sort" | "order" | "page" | "take" | "isSelectAll" | "skip">>;
export declare class PaginationPayrollReportDto extends PaginationPayrollReportDto_base {
    keyword: string;
    country: string;
    byPercentage: 'true' | 'false';
    payrollHeaderId: number;
    prevPayrollHeaderId: number;
    noCount: ObjectValues<typeof BOOL>;
    employeeIds?: number[];
}
export {};

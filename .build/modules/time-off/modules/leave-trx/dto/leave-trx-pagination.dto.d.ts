import { PaginationDto } from '../../../../../common/dto/pagination.dto';
export declare class LeaveTrxPaginationDto extends PaginationDto {
    leaveTypeIds?: number[];
    employeeIds?: number[];
    policyIds?: number[];
    types?: string[];
    startDate: string;
    endDate: string;
}

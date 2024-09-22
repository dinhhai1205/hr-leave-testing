import { PaginationDto } from '../../../../../common/dto/pagination.dto';
export declare class LeaveTypeBalancePaginationDto extends PaginationDto {
    leaveTypeIds?: number[];
    employeeIds?: number[];
    active?: boolean;
    activeForEss?: boolean;
}

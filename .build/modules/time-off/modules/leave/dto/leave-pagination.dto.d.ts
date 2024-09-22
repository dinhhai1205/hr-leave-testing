import { PaginationDto } from '../../../../../common/dto/pagination.dto';
import { ELeaveSortFields, ELeaveStatusId } from '../../../../../common/enums';
export declare class LeavePaginationDto extends PaginationDto {
    leaveTypeIds?: number[];
    statusId?: ELeaveStatusId;
    statusIds?: ELeaveStatusId[];
    employeeIds?: number[];
    sort?: ELeaveSortFields;
    approveBy?: string;
    startDate: string;
    endDate: string;
}

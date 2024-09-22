import { PaginationDto } from '../../../../../common/dto/pagination.dto';
import { ELeaveStatusId } from '../../../../../common/enums';
export declare class LeaveGroupByLeaveTypeDto extends PaginationDto {
    leaveTypeIds?: number[];
    statusId?: ELeaveStatusId;
    statusIds?: ELeaveStatusId[];
    employeeIds?: number[];
    year: number;
}

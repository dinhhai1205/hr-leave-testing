import { PaginationDto } from '../../../../../common/dto/pagination.dto';
import { ESortLeaveTypePolicyCreditTrxFields } from '../../../../../common/enums';
export declare class LeaveTypePolicyCreditPagination extends PaginationDto {
    leavePolicyIds?: number[];
    employeeIds?: number[];
    sort?: ESortLeaveTypePolicyCreditTrxFields;
}

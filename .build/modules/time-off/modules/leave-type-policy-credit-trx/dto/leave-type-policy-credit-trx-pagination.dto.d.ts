import { PaginationDto } from '../../../../../common/dto/pagination.dto';
import { EHistoryType, ESortLeaveTypePolicyCreditTrxFields } from '../../../../../common/enums';
export declare class LeaveTypePolicyCreditTrxPagination extends PaginationDto {
    leaveTypePolicyCreditUUIDs?: string[];
    employeeIds?: number[];
    types?: EHistoryType[];
    sort?: ESortLeaveTypePolicyCreditTrxFields;
    runningBySystem?: boolean;
    startDate: string;
    endDate: string;
}

import { PaginationDto } from '../../../../../common/dto/pagination.dto';
import { EBoolean, ESortLeaveTypeFields } from '../../../../../common/enums';
export declare class LeaveTypePagination extends PaginationDto {
    sort?: ESortLeaveTypeFields;
    active?: boolean;
    calendarView?: boolean;
    isParent: EBoolean;
    isDropDownMode?: boolean;
    isSpecial?: boolean;
}

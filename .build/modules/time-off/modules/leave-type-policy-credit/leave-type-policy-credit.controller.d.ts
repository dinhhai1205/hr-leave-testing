import { LeaveTypePolicyCreditPagination } from './dto/leave-type-policy-credit-pagination.dto';
import { LeaveTypePolicyCreditService } from './leave-type-policy-credit.service';
export declare class LeaveTypePolicyCreditController {
    private readonly leaveTypePolicyCreditService;
    constructor(leaveTypePolicyCreditService: LeaveTypePolicyCreditService);
    getLeaveTypePolicyCreditByQuery(companyId: number, query: LeaveTypePolicyCreditPagination): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").LeaveTypePolicyCreditEntity>>;
}

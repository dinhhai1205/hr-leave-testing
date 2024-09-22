import { LeaveTypePolicyCreditTrxPagination } from './dto/leave-type-policy-credit-trx-pagination.dto';
import { LeaveTypePolicyCreditTrxService } from './leave-type-policy-credit-trx.service';
export declare class LeaveTypePolicyCreditTrxController {
    private readonly leaveTypePolicyCreditTrxService;
    constructor(leaveTypePolicyCreditTrxService: LeaveTypePolicyCreditTrxService);
    getLeaveTypesPolicyCreditTrxByQuery(companyId: number, query: LeaveTypePolicyCreditTrxPagination): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").LeaveTypePolicyCreditTrxEntity>>;
}

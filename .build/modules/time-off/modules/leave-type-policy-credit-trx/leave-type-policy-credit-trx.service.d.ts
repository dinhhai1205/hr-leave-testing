import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto';
import { EHistorySign, EHistoryType } from '../../../../common/enums';
import { LeaveTypePolicyCreditTrxEntity, LeaveTypePolicyEntity } from '../../../../core/database/entities';
import { LegacyBaseService } from '../../../../core/database/services';
import { LeaveTypePolicyCreditTrxPagination } from './dto/leave-type-policy-credit-trx-pagination.dto';
export declare class LeaveTypePolicyCreditTrxService extends LegacyBaseService<LeaveTypePolicyCreditTrxEntity> {
    readonly leaveTypePolicyCreditTrxRepository: Repository<LeaveTypePolicyCreditTrxEntity>;
    constructor(leaveTypePolicyCreditTrxRepository: Repository<LeaveTypePolicyCreditTrxEntity>);
    getLeaveTypesPolicyCreditTrxByQuery(companyId: number, query: LeaveTypePolicyCreditTrxPagination): Promise<PaginationResponseDto<LeaveTypePolicyCreditTrxEntity>>;
    initialTrx(args: {
        companyId: number;
        employeeId: number;
        authMail: string;
        currentDate: Date;
        leaveTypePolicyCreditUUID: string;
        type: EHistoryType;
        sign: EHistorySign;
        unit: number;
        creditRemaining: number;
        carryForwardRemaining: number;
        previousPolicySetting?: string;
        leaveTypePolicy?: LeaveTypePolicyEntity;
        leaveId?: number;
        leaveTypeId: number;
        leaveTypePolicyId: number;
    }): Omit<LeaveTypePolicyCreditTrxEntity, 'id' | 'updatedBy' | 'createdOn' | 'updatedOn' | 'isDeleted' | 'policyCredit'>;
}

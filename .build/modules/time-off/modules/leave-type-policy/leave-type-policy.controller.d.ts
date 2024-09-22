import { IAuthInfo } from '../../../../common/interfaces';
import { LeaveTypePolicyCreationBody } from './dto/leave-type-policy-creation.dto';
import { ReComputingCreditBody } from './dto/leave-type-policy-credit-body.dto';
import { LeaveTypePolicyUpdateBody } from './dto/leave-type-policy-update.dto';
import { LeaveTypePolicyService } from './leave-type-policy.service';
export declare class LeaveTypePolicyController {
    private readonly leaveTypePolicyService;
    constructor(leaveTypePolicyService: LeaveTypePolicyService);
    createLeaveTypePolicy(companyId: number, leaveTypeId: number, body: LeaveTypePolicyCreationBody, authInfo: IAuthInfo): Promise<import("../../../../core/database").LeaveTypePolicyEntity>;
    updateLeaveTypePolicy(companyId: number, leaveTypeId: number, body: LeaveTypePolicyUpdateBody, authInfo: IAuthInfo): Promise<import("../../../../core/database").LeaveTypePolicyEntity>;
    deleteLeaveTypePolicy(companyId: number, leaveTypeId: number, ids: number[], authInfo: IAuthInfo): Promise<import("typeorm").UpdateResult | undefined>;
    getLeaveTypePolicy(companyId: number, leaveTypeId: number, id: number): Promise<import("../../../../core/database").LeaveTypePolicyEntity>;
    getLeaveTypePolicies(companyId: number, leaveTypeId: number): Promise<[] | import("../../../../core/database").LeaveTypePolicyEntity[]>;
    reComputingLeaveTypePolicyCredit(companyId: number, body: ReComputingCreditBody, authInfo: IAuthInfo): Promise<{
        insertLeaveTrx: Partial<import("../../../../core/database").LeaveTrxEntity>[];
        insertLeaveTypePolicyCreditTrx: Omit<import("../../../../core/database").LeaveTypePolicyCreditTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "isDeleted" | "policyCredit">[];
        updateLeaveTypePolicyCredits: Partial<import("../../../../core/database").LeaveTypePolicyCreditEntity>[];
        updateLeaveTypeBalances: Partial<import("../../../../core/database").LeaveTypeBalanceEntity>[];
    } | undefined>;
}

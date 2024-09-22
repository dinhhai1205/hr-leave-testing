import { EHistorySign, EHistoryType } from '../../../common/enums';
import { AbstractEntity } from './abstract.entity';
import { LeaveTypePolicyCreditEntity } from './leave-type-policy-credit.entity';
export declare class LeaveTypePolicyCreditTrxEntity extends AbstractEntity {
    id: number;
    companyId: number;
    employeeId: number;
    leaveId?: number;
    leaveTypeId: number;
    leaveTypePolicyId: number;
    leaveTypePolicyCreditUUID: string;
    date: Date;
    type: EHistoryType;
    sign: EHistorySign;
    unit: number;
    creditRemaining: number;
    carryForwardRemaining: number;
    reason?: string;
    currentPolicySetting: string;
    previousPolicySetting: string;
    createdBy: string;
    updatedBy: string;
    policyCredit: LeaveTypePolicyCreditEntity;
}

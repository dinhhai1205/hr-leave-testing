import type { EHistorySign, EHistoryType } from '../../../../../common/enums';
export declare class LeaveTrxCreateDto {
    companyId: number;
    leaveTypeId?: number;
    policyId?: number;
    employeeId: number;
    date: Date;
    type: EHistoryType;
    sign: EHistorySign;
    unit: number;
    balance: number;
    currentPolicySetting?: string;
    previousPolicySetting?: string;
    createdBy?: string;
    updatedBy?: string;
}

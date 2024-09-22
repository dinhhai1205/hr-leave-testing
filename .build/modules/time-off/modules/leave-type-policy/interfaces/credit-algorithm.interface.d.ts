import type { Moment } from 'moment';
import type { LeaveTypeBalanceEntity, LeaveTypePolicyCreditEntity, LeaveTypePolicyEntity } from '../../../../../core/database/entities';
export interface ICreditAlgorithm {
    companyId: number;
    currentDate: Moment;
    effectiveDate: Moment;
    leaveTypePolicy: LeaveTypePolicyEntity;
    leaveTypePolicyCredit: LeaveTypePolicyCreditEntity;
    leaveTypeBalance: LeaveTypeBalanceEntity;
    employee: {
        id: number;
        employeeRef: string;
        joinDate?: Date | null;
        confirmDate?: Date | null;
    };
    authMail: string;
    utcOffset: number;
}

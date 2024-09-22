import type { Moment } from 'moment';
import type { EmployeeEntity, LeaveTypeBalanceEntity, LeaveTypePolicyCreditEntity, LeaveTypePolicyEntity } from '../../../../../core/database/entities';
export interface IExpiresAlgorithm {
    companyId: number;
    effectiveDate: Moment;
    currentDate: Moment;
    renewalMoment: Moment | null;
    leaveTypePolicy: LeaveTypePolicyEntity;
    leaveTypeBalance: LeaveTypeBalanceEntity;
    leaveTypePolicyCredit: LeaveTypePolicyCreditEntity;
    employee: EmployeeEntity;
    authMail: string;
    utcOffset: number;
}

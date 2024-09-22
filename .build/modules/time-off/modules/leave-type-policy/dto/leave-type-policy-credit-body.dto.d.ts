import { ICreditLeaveTypePolicy } from '../interfaces/leave-type-policy.interface';
export declare class ReComputingCreditBody implements ICreditLeaveTypePolicy {
    leaveTypeId?: number;
    leaveTypePolicyId?: number;
    employeeIds?: number[];
    payrollGroupIds?: number[];
    date?: string;
}

import { AbstractEntity } from './abstract.entity';
import { EmployeeEntity } from './employee.entity';
import { LeaveTypePolicyCreditTrxEntity } from './leave-type-policy-credit-trx.entity';
import { LeaveTypePolicyEntity } from './leave-type-policy.entity';
export declare class LeaveTypePolicyCreditEntity extends AbstractEntity {
    id: number;
    uuid: string;
    leaveTypeId: number;
    leavePolicyId: number;
    employeeId: number;
    companyId: number;
    credit: number;
    creditRemaining: number;
    creditedOn?: Date;
    carryForward: number;
    carryForwardRemaining: number;
    carryForwardOn?: Date;
    carryToLtId?: number | null;
    expiresOn?: Date;
    leavePolicy: LeaveTypePolicyEntity;
    employee: EmployeeEntity;
    employeePolicy: LeaveTypePolicyEntity;
    creditTrxs: LeaveTypePolicyCreditTrxEntity[];
}

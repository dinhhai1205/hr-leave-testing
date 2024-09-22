import { AbstractEntity } from './abstract.entity';
import { CompanyEntity } from './company.entity';
import { EmployeeEntity } from './employee.entity';
import { LeaveTrxEntity } from './leave-trx.entity';
import { LeaveTypeEntity } from './leave-type.entity';
export declare class LeaveTypeBalanceEntity extends AbstractEntity {
    id: number;
    companyId: number;
    employeeId: number;
    leaveTypeId: number;
    balance: number;
    createdBy: string;
    updatedBy: string;
    company: CompanyEntity;
    employee: EmployeeEntity;
    leaveType: LeaveTypeEntity;
    employeeLeaveType: LeaveTypeEntity;
    leaveTransactions: LeaveTrxEntity[];
}

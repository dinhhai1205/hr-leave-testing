import { Moment } from 'moment';
import { ApprovalUserEntity, AspNetUsersEntity, CompanyEntity, LeaveEntity, LeaveTypeBalanceEntity, LeaveTypeEntity, LeaveTypePolicyCreditEntity, LeaveTypePolicyEntity, OrganizationStructureEntity, PayrollGroupEntity } from '.';
import { EContractType } from '../../../common/enums/contract-type.enum';
import { EmptyObject } from '../../../common/types';
import { EPayrollGroupType } from '../../../modules/payroll/modules/payroll-group/enums/payroll-group-type.enum';
import { AbstractEntity } from './abstract.entity';
import { CostCenterEntity } from './cost-center.entity';
import { PayrollTimeSheetEntity } from './payroll-timesheet.entity';
import { PrtrxEmpEntity } from './prtrx-emp.entity';
import { WorkScheduleAssignmentEntity } from './work-schedule-assignment.entity';
import { WorkScheduleEntity } from './work-schedule.entity';
export declare class EmployeeEntity extends AbstractEntity {
    id: number;
    companyId: number;
    payrollGroupId: number;
    email: string;
    employeeRef: string;
    employeeNo: string;
    fullNameLocal: string;
    fullNameEn: string;
    organizationElementId: number;
    jobGradeId: number;
    gender: string;
    contractType: EContractType;
    contractDateFrom: Date;
    contractDateTo: Date;
    maritalStatusId: number;
    active: boolean;
    joinDate?: Date;
    confirmDate?: Date;
    seniorityDate?: Date;
    isEssEnabled: boolean;
    orgPath?: string;
    lastWorkingDate: Date;
    workScheduleId: number;
    payrollFrequencyId: number;
    costCenterId: number;
    payCalcMet: EPayrollGroupType;
    contractReferenceNo?: string;
    possiblePolicy?: {
        [leaveTypeId: string]: {
            closestEffectiveDate: Moment;
            closestPolicy: LeaveTypePolicyEntity;
            leaveTypePolicyCredit?: LeaveTypePolicyCreditEntity;
            leaveTypeBalance?: LeaveTypeBalanceEntity;
            cfLeaveTypeBalance?: LeaveTypeBalanceEntity;
        } | EmptyObject;
    } | EmptyObject;
    leaves: LeaveEntity[];
    leaveTypeBalances: LeaveTypeBalanceEntity[] | null;
    leaveTypePolicyCredits: LeaveTypePolicyCreditEntity[] | null;
    approvalUsers: ApprovalUserEntity;
    payrollGroups: PayrollGroupEntity;
    company: CompanyEntity;
    costCenter: CostCenterEntity;
    aspNetUsers: AspNetUsersEntity;
    leaveTypes: LeaveTypeEntity[];
    workSchedule: WorkScheduleEntity;
    orgStructure: OrganizationStructureEntity;
    payrollTimeSheets: PayrollTimeSheetEntity[];
    prtrxEmps: PrtrxEmpEntity[];
    workScheduleAssignments: WorkScheduleAssignmentEntity[];
}

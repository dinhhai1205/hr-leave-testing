import { AbstractEntity } from './abstract.entity';
import { CompanyEntity } from './company.entity';
import { LeaveTypeEntity } from './leave-type.entity';
export declare class LeaveTypeAssignmentEntity extends AbstractEntity {
    id: number;
    companyId: number;
    ltId: number;
    genderIds: string;
    mariStsIds: string;
    jobGradeIds: string;
    orgEleIds: string;
    contractTypeIds: string;
    employeeIds: string;
    createdBy: string;
    updatedBy: string;
    company: CompanyEntity;
    leaveType: LeaveTypeEntity;
}

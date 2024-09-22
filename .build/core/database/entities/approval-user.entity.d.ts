import { AbstractEntity } from './abstract.entity';
import { EmployeeEntity } from './employee.entity';
export declare class ApprovalUserEntity extends AbstractEntity {
    id: number;
    companyId: number;
    moduleId: number;
    orgEleId: number;
    userEmail1: string;
    userEmail2: string;
    userEmail3: string;
    allMustApprove: boolean;
    createdBy: string;
    updatedBy: string;
    employee: EmployeeEntity;
}

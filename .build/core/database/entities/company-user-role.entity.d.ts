import { AbstractEntity } from './abstract.entity';
import { RoleHeaderEntity } from './role-header.entity';
export declare class CompanyUserRoleEntity extends AbstractEntity {
    id: number;
    companyId: number;
    createdBy: string;
    roleHeaderId: number;
    updatedBy: string;
    email: string;
    active: boolean;
    isApprover: boolean;
    effDateFrom: string;
    effDateTo: string;
    orgElementListJson: string;
    roleHeader: RoleHeaderEntity;
}

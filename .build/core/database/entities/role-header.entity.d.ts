import { AbstractEntity } from './abstract.entity';
import { CompanyUserRoleEntity } from './company-user-role.entity';
import { RoleDetailEntity } from './role-detail.entity';
export declare class RoleHeaderEntity extends AbstractEntity {
    id: number;
    code: string;
    companyId: number;
    createdBy: string;
    name: string;
    updatedBy: string;
    deletable: boolean;
    leave: string;
    approval: string;
    payroll: string;
    esign: string;
    statRpt: string;
    companyUserRoles: CompanyUserRoleEntity[];
    roleDetails: RoleDetailEntity[];
}

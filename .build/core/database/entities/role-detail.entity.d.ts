import { AbstractEntity } from './abstract.entity';
import { RoleHeaderEntity } from './role-header.entity';
export declare class RoleDetailEntity extends AbstractEntity {
    id: number;
    code: string;
    companyId: number;
    createdBy: string;
    name: string;
    permission: number;
    roleHeaderId: number;
    updatedBy: string;
    roleHeader: RoleHeaderEntity;
}

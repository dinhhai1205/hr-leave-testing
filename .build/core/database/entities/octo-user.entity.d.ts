import { AbstractEntity } from './abstract.entity';
export declare class OctoUserEntity extends AbstractEntity {
    id: number;
    companyId: number;
    email: string;
    active: boolean;
    isAdmin: boolean;
}

import { AbstractEntity } from './abstract.entity';
export declare class OctoTaskEntity extends AbstractEntity {
    id: number;
    companyId: number;
    isCompleted: boolean;
    dueDate: Date;
}

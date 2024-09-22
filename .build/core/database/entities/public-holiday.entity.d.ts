import { AbstractEntity } from './abstract.entity';
export declare class PublicHolidayEntity extends AbstractEntity {
    id: number;
    companyId: number;
    name: string;
    createdBy: string;
    updatedBy: string;
    year: number;
    date: Date;
    active: boolean;
}

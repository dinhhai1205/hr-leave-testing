import { BaseTimeTrackerEntity } from '../../common/entities/base.entity';
export declare class CompanyEntity extends BaseTimeTrackerEntity {
    name: string;
    logo: string;
    address: string;
    timeZone: string;
    country: string;
    ownerId: string;
}

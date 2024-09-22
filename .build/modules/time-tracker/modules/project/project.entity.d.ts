import { BaseTimeTrackerEntity } from '../../common/entities/base.entity';
export declare class ProjectEntity extends BaseTimeTrackerEntity {
    companyId: string;
    name: string;
    logo: string;
    description: string;
    code: string;
    active: boolean;
    clientId: string;
    locationId: string;
}

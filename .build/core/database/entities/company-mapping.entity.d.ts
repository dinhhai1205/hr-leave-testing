import { BaseAppEntity } from './base-app.entity';
import { CompanyEntity } from './company.entity';
export declare class CompanyMappingEntity extends BaseAppEntity {
    id: number;
    companyId: number;
    timeTrackerCompanyId: string;
    apiKey: string;
    company: CompanyEntity;
}

import { BaseAppEntity } from './base-app.entity';
import { CompanyEntity } from './company.entity';
export declare class EmployeeMappingEntity extends BaseAppEntity {
    id: number;
    userEmail: string;
    employeeId: number;
    timeTrackerEmployeeId: string;
    companyId: number;
    company: CompanyEntity;
}

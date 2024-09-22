import { BaseAppEntity } from './base-app.entity';
import { EmployeeEntity } from './employee.entity';
export declare class CostCenterEntity extends BaseAppEntity {
    code: string;
    companyId: number;
    name: string;
    employees: EmployeeEntity[];
}

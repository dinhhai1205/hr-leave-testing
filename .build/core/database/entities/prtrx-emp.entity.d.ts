import { BaseAppEntity } from './base-app.entity';
import { PrtrxHdrEntity } from './prtrx-hdr.entity';
import { EmployeeEntity } from './employee.entity';
export declare class PrtrxEmpEntity extends BaseAppEntity {
    companyId: number;
    payrollTrxHeaderId: number;
    employeeId: number;
    included: boolean;
    hdr: PrtrxHdrEntity;
    employee: EmployeeEntity;
}

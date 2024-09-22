import { EEmployeeContractType } from '../../../common/enums';
import { AbstractEntity } from './abstract.entity';
export declare class EmployeeContractEntity extends AbstractEntity {
    id: number;
    companyId: number;
    dateFrom: Date;
    dateTo: Date;
    employeeId: number;
    contractType: EEmployeeContractType;
    active: boolean;
    referenceNo: string;
}

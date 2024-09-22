import { AbstractDto } from '../../../../../common/dto/abstract.dto';
export declare class LeaveTrxDto extends AbstractDto {
    id: number;
    companyId: number;
    leaveTypeId: number;
    policyId: number;
    employeeId: number;
    joinDate: string;
    effDate: string;
    date: string;
    type: string;
    sign: number;
    unit: number;
    balance: number;
    createdBy: string;
    updatedBy: string;
}

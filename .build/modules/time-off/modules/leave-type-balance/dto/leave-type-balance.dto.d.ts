import { AbstractDto } from '../../../../../common/dto/abstract.dto';
export declare class LeaveTypeBalanceDto extends AbstractDto {
    id: number;
    companyId: number;
    employeeId: number;
    leaveTypeId: number;
    balance: number;
    createdBy: string;
    updatedBy: string;
}

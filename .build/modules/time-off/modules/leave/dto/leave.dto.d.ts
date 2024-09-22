import { AbstractDto } from '../../../../../common/dto/abstract.dto';
import { ELeaveStatusId } from '../../../../../common/enums';
import { TrxApprovalUserDto } from '../../../../approval/modules/trx-approval-user/dto/trx-approval-user.dto';
import { CompanyDto } from '../../../../general/modules/company';
import { EmployeeDto } from '../../../../user/modules/employee/dto/employee.dto';
import { LeaveTypeDto } from '../../leave-type/dto/leave-type.dto';
export declare class LeaveDto extends AbstractDto {
    id: number;
    companyId: number;
    employeeId: number;
    leaveTypeId: number;
    updatedBy: string;
    reason: string;
    statusId: ELeaveStatusId;
    dateFrom: Date;
    dateTo: Date;
    company: CompanyDto;
    employee: EmployeeDto;
    leaveType: LeaveTypeDto;
    approverTrx: TrxApprovalUserDto[];
}

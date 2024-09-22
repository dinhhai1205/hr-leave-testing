import { Repository } from 'typeorm';
import { ELeaveStatusId } from '../../../../../common/enums';
import { LeaveEntity } from '../../../../../core/database/entities';
import { ApprovalUserService } from '../../../../approval/modules/approval-user/approval-user.service';
import { EmployeeService } from '../../../../user/modules/employee/employee.service';
import { LeaveTypeService } from '../../leave-type/leave-type.service';
import { CreateLeaveABySlackBotBodyDto } from '../dto';
import { LeaveService } from './leave.service';
export declare class LeaveV2Service {
    private readonly leaveRepository;
    private readonly leaveService;
    private readonly leaveTypeService;
    private readonly employeeService;
    private readonly approvalUserService;
    constructor(leaveRepository: Repository<LeaveEntity>, leaveService: LeaveService, leaveTypeService: LeaveTypeService, employeeService: EmployeeService, approvalUserService: ApprovalUserService);
    createLeaveBySlackBot(companyId: number, userEmail: string, payload: CreateLeaveABySlackBotBodyDto): Promise<{
        isDeleted: false;
        companyId: number;
        createdBy: string;
        createdOn: Date;
        allMustApprove: boolean;
        statusId: ELeaveStatusId.AWAIT_APPROVAL;
        effDayOfLeave: number;
        id?: number;
        employeeId: number;
        leaveTypeId: number;
        reason: string;
        dateFrom: Date;
        fromFdHd: import("../../../../../common/enums").ELeaveDuration;
        dateTo: Date;
        toFdHd: import("../../../../../common/enums").ELeaveDuration;
    } & LeaveEntity>;
}

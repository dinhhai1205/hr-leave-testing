import { CreateLeaveABySlackBotBodyDto } from '../dto';
import { LeaveV2Service } from '../services/leave-v2.service';
export declare class LeaveV2Controller {
    private readonly leaveV2Service;
    constructor(leaveV2Service: LeaveV2Service);
    createLeaveBySlackBot(companyId: number, body: CreateLeaveABySlackBotBodyDto): Promise<{
        isDeleted: false;
        companyId: number;
        createdBy: string;
        createdOn: Date;
        allMustApprove: boolean;
        statusId: import("../../../../../common/enums").ELeaveStatusId.AWAIT_APPROVAL;
        effDayOfLeave: number;
        id?: number;
        employeeId: number;
        leaveTypeId: number;
        reason: string;
        dateFrom: Date;
        fromFdHd: import("../../../../../common/enums").ELeaveDuration;
        dateTo: Date;
        toFdHd: import("../../../../../common/enums").ELeaveDuration;
    } & import("../../../../../core/database").LeaveEntity>;
}

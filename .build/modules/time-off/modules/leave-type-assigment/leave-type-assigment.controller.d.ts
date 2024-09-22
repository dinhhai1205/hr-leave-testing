import { IAuthInfo } from '../../../../common/interfaces';
import { LeaveTypeAssignmentUpdate } from './dto/leave-type-assigment-update.dto';
import { LeaveTypeAssignmentService } from './leave-type-assigment.service';
export declare class LeaveTypeAssignmentController {
    private readonly leaveTypeAssignmentService;
    constructor(leaveTypeAssignmentService: LeaveTypeAssignmentService);
    updateLeaveTypeAssignment(companyId: number, leaveTypeId: number, body: LeaveTypeAssignmentUpdate, authInfo: IAuthInfo): Promise<import("../../../../core/database").LeaveTypeAssignmentEntity>;
    getLeaveTypeAssignment(companyId: number, leaveTypeId: number, authInfo: IAuthInfo): Promise<import("../../../../core/database").LeaveTypeAssignmentEntity>;
}

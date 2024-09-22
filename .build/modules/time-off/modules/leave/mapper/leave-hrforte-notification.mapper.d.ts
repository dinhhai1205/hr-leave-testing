import type { ELeaveApprovalActions } from '../../../../../common/enums';
import type { LeaveEntity } from '../../../../../core/database';
import type { IHrforteNotificationParam } from '../../../../../libs/hrforte/modules';
export declare class LeaveHrforteNotificationMapper {
    static toParams(approvalAction: keyof typeof ELeaveApprovalActions, authEmail: string, leaveRecords: LeaveEntity[], clientUrl: string): IHrforteNotificationParam[];
    private static removeDuplicateApprover;
    private static getVerbNotification;
}

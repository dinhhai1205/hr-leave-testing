import { ELeaveStatusId } from '../../../common/enums';
import { AbstractEntity } from './abstract.entity';
import { LeaveEntity } from './leave.entity';
export declare class TrxApprovalUserEntity extends AbstractEntity {
    id: number;
    companyId: number;
    moduleId: number;
    recordId: number;
    approverLevel: ELeaveStatusId;
    userEmail: string;
    createdBy: string;
    updatedBy: string;
    leave: LeaveEntity;
}

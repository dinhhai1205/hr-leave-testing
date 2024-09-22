import { Repository } from 'typeorm';
import { EHistorySign, EHistoryType } from '../../../../common/enums';
import { LeaveTrxEntity, LeaveTypePolicyEntity } from '../../../../core/database/entities';
import { LegacyBaseService } from '../../../../core/database/services';
export declare class LeaveTrxService extends LegacyBaseService<LeaveTrxEntity> {
    readonly leaveTrxRepository: Repository<LeaveTrxEntity>;
    constructor(leaveTrxRepository: Repository<LeaveTrxEntity>);
    initialLeaveTrx(args: {
        companyId: number;
        employeeId: number;
        authMail: string;
        currentDate: Date;
        previousPolicySetting?: string;
        leaveTypePolicy?: LeaveTypePolicyEntity;
        leaveTypeId: number;
        leavePolicyId: number;
        effDate: Date;
        type: EHistoryType;
        sign: EHistorySign;
        unit: number;
        balance: number;
        employeeRef: string;
        joinDate: Date;
    }): Omit<LeaveTrxEntity, 'id' | 'leaveTypePolicy' | 'employee' | 'leaveTypeBalance' | 'updatedBy' | 'company' | 'leaveType' | 'createdOn' | 'updatedOn' | 'isDeleted'>;
}

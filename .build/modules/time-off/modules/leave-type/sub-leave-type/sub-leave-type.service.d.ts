import { Repository, SelectQueryBuilder } from 'typeorm';
import { EBoolean } from '../../../../../common/enums';
import { LeaveTypeEntity, TypeOrmBaseService } from '../../../../../core/database';
import { LeaveTrxService } from '../../leave-trx/leave-trx.service';
import { UpdateSubLeaveTypePayloadDto } from './dto/update-sub-leave-type-payload.dto';
export declare class SubLeaveTypeService extends TypeOrmBaseService<LeaveTypeEntity> {
    private readonly leaveTypeRepository;
    private readonly leaveTrxService;
    constructor(leaveTypeRepository: Repository<LeaveTypeEntity>, leaveTrxService: LeaveTrxService);
    joinAndSelectParentsOrSubLeaveType(queryBuilder: SelectQueryBuilder<LeaveTypeEntity>, opts?: Partial<{
        isParent: EBoolean;
        filterParentId: boolean;
        filterActive: boolean;
    }>): {
        queryBuilder: SelectQueryBuilder<LeaveTypeEntity>;
        parentLeaveTypeAlias: string;
        childLeaveTypeAlias: string;
    };
    checkSubLeaveTypeCanAttachToParentLeaveType(subLeaveType: LeaveTypeEntity): Promise<void>;
    checkValidParentLeaveType(parentLeaveTypeId: number): Promise<LeaveTypeEntity>;
    checkExistLeaveRecordUsedSubTypes(subLeaveTypeIds: number[]): Promise<void>;
    updateSubLeaveType(payload: UpdateSubLeaveTypePayloadDto): Promise<void>;
    getAllAvailableSubLeaveTypes(companyId: number): Promise<LeaveTypeEntity[]>;
    replaceConfigIfLeaveTypeHaveParent(leaveType: LeaveTypeEntity): Promise<LeaveTypeEntity>;
}

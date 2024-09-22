import { PaginationResponseDto } from '../../../../common/dto';
import { EBoolean } from '../../../../common/enums';
import { IAuthInfo } from '../../../../common/interfaces';
import { EmployeeEntity, LeaveTypeBalanceEntity, LeaveTypeEntity } from '../../../../core/database/entities';
import { LeaveTypeBalancePaginationDto } from '../leave-type-balance/dto/leave-type-balance-pagination.dto';
import { LeaveTypeCreationDto } from './dto/leave-type-creation.dto';
import { LeaveTypePagination } from './dto/leave-type-pagination.dto';
import { LeaveTypeUpdateMultipleActiveStatusDto } from './dto/leave-type-update-multiple-active-status.dto';
import { LeaveTypeUpdatingDto } from './dto/leave-type-updating.dto';
import { LeaveTypeService } from './leave-type.service';
import { UpdateSubLeaveTypeBodyDto } from './sub-leave-type/dto/update-sub-leave-type-body.dto';
import { SubLeaveTypeService } from './sub-leave-type/sub-leave-type.service';
export declare class LeaveTypeController {
    private readonly leaveTypeService;
    private readonly subLeaveTypeService;
    constructor(leaveTypeService: LeaveTypeService, subLeaveTypeService: SubLeaveTypeService);
    getDashBoardLeaveType(companyId: number, authInfo: IAuthInfo): Promise<{
        name: string;
        code: string;
        color: string;
        id: number;
        creditedThisYear: number;
        carriedForwardFromLastYear: number;
        maxEntitlement: number;
        balance: number;
    }[]>;
    getAllAvailableSubLeaveTypes(companyId: number): Promise<LeaveTypeEntity[]>;
    getLeaveTypeBalancesByQuery(companyId: number, query: LeaveTypeBalancePaginationDto, authInfo: IAuthInfo): Promise<PaginationResponseDto<LeaveTypeBalanceEntity>>;
    getLeaveTypeBalancesByQueryV2(companyId: number, query: LeaveTypeBalancePaginationDto, authInfo: IAuthInfo): Promise<PaginationResponseDto<EmployeeEntity>>;
    createLeaveType(companyId: number, body: LeaveTypeCreationDto, authInfo: IAuthInfo): Promise<LeaveTypeEntity>;
    getLeaveTypeDetail(companyId: number, leaveId: number, authInfo: IAuthInfo, isParent?: EBoolean): Promise<LeaveTypeEntity>;
    getLeaveTypesByQuery(companyId: number, query: LeaveTypePagination, authInfo: IAuthInfo): Promise<PaginationResponseDto<LeaveTypeEntity>>;
    updateMultipleActiveStatusLeaveType(companyId: number, body: LeaveTypeUpdateMultipleActiveStatusDto, authInfo: IAuthInfo): Promise<void>;
    updateSubLeaveType(companyId: number, parentLeaveTypeId: number, body: UpdateSubLeaveTypeBodyDto, userEmail: string): Promise<void>;
    updateLeaveType(companyId: number, leaveTypeId: number, body: LeaveTypeUpdatingDto, authInfo: IAuthInfo): Promise<LeaveTypeEntity>;
    deleteLeaveType(companyId: number, ids: number[], authInfo: IAuthInfo): Promise<boolean>;
    checkLeaveTypeCodeExist(companyId?: number | undefined, code?: string | undefined): Promise<{
        exist: boolean;
        leaveTypeId: number;
    }>;
}

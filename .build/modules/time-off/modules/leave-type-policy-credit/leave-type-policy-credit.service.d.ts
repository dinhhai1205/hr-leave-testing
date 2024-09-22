import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto/pagination-response.dto';
import { LeaveTypePolicyCreditEntity } from '../../../../core/database/entities/leave-type-policy-credit.entity';
import { LegacyBaseService } from '../../../../core/database/services';
import { LeaveTypePolicyCreditPagination } from './dto/leave-type-policy-credit-pagination.dto';
import { IInitialLeaveTypePolicyCreditParam } from './interfaces/initial-leave-type-policy-credit-param.interface';
export declare class LeaveTypePolicyCreditService extends LegacyBaseService<LeaveTypePolicyCreditEntity> {
    readonly leaveTypePolicyCreditRepository: Repository<LeaveTypePolicyCreditEntity>;
    constructor(leaveTypePolicyCreditRepository: Repository<LeaveTypePolicyCreditEntity>);
    getLeaveTypesPolicyCreditByQuery(companyId: number, query: LeaveTypePolicyCreditPagination): Promise<PaginationResponseDto<LeaveTypePolicyCreditEntity>>;
    initialSeedParam(param: IInitialLeaveTypePolicyCreditParam): {
        uuid: `${string}-${string}-${string}-${string}-${string}`;
        companyId: number;
        employeeId: number;
        leavePolicyId: number;
        credit: number;
        creditRemaining: number;
        carryForwardRemaining: number;
        createdBy: string;
    };
    initialNewRecords(params?: {
        companyId: number;
        employeeId: number;
        leavePolicyId: number;
        credit: number;
        creditRemaining: number;
        carryForwardRemaining: number;
        createdBy: string;
    }[]): Promise<LeaveTypePolicyCreditEntity[]>;
}

import { Repository } from 'typeorm';
import { IAuthInfo } from '../../../../common/interfaces';
import { LeaveTrxEntity, LeaveTypeBalanceEntity } from '../../../../core/database/entities';
import { LegacyBaseService } from '../../../../core/database/services';
import { LeaveTrxService } from '../leave-trx/leave-trx.service';
import { LeaveTypeBalanceUpdateDto } from './dto/leave-type-balance-update.dto';
import { IInitialLeaveTypeBalanceParam } from './interfaces/initial-leave-type-balance-param.interface';
export declare class LeaveTypeBalanceService extends LegacyBaseService<LeaveTypeBalanceEntity> {
    readonly leaveTypeBalanceRepository: Repository<LeaveTypeBalanceEntity>;
    private leaveTrxService;
    constructor(leaveTypeBalanceRepository: Repository<LeaveTypeBalanceEntity>, leaveTrxService: LeaveTrxService);
    getLeaveTypeBalanceOrInitial(companyId: number, employeeId: number, leaveTypeId: number, leaveTypeBalanceMemo: Record<string, Partial<LeaveTypeBalanceEntity>> | Record<string, never>, authMail: string): Promise<LeaveTypeBalanceEntity>;
    manualUpdateLeaveTypeBalance(companyId: number | undefined, inputs: LeaveTypeBalanceUpdateDto[] | undefined, authMail: string): Promise<void>;
    insertTrx(companyId: number, input: LeaveTypeBalanceUpdateDto, authMail: string): Promise<void>;
    calBalanceUpTo(filter: {
        employeeId: number;
        leaveTypeId: number;
        date: Date;
        authMail: string;
    }): Promise<{
        balance: number;
        transactions: LeaveTrxEntity[];
    }>;
    calBalanceFrom(filter: {
        employeeId: number;
        leaveTypeId: number;
        lastBalance: number;
        date: Date;
        authMail: string;
    }): Promise<{
        balance: number;
        transactions: LeaveTrxEntity[];
    }>;
    removeFirstMatch(str: string, word: string): string;
    private removeDuplicate;
    initialSeedParam(param: IInitialLeaveTypeBalanceParam): {
        companyId: number;
        employeeId: number;
        leaveTypeId: number;
        balance: number;
        createdBy: string;
    };
    initialNewRecords(params?: {
        companyId: number;
        employeeId: number;
        leaveTypeId: number;
        balance: number;
        createdBy: string;
    }[]): Promise<LeaveTypeBalanceEntity[]>;
    getLeaveTypeBalanceByLeaveType(companyId: number, authInfo: IAuthInfo): Promise<LeaveTypeBalanceEntity[]>;
    updateLeaveTypeBalanceImport(args: {
        companyId: number;
        authEmail: string;
        listLeaveTypeName: string[];
        listEmployeeRef: string[];
        hashTable: Record<string, number>;
        skip?: number;
        batchSizes?: number;
    }): Promise<void>;
}

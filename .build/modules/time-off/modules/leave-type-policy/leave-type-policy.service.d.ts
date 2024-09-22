import * as moment from 'moment';
import { Repository } from 'typeorm';
import { EHistoryType, EPolicyEffectiveType, EPolicyEffectiveUOM } from '../../../../common/enums';
import { LeaveTrxEntity, LeaveTypeBalanceEntity, LeaveTypePolicyCreditEntity, LeaveTypePolicyCreditTrxEntity, LeaveTypePolicyEntity } from '../../../../core/database/entities';
import { LegacyBaseService } from '../../../../core/database/services';
import { LeaveTypePolicyProducer } from '../../../../core/queue/producers';
import { EmployeeService } from '../../../user/modules/employee/employee.service';
import { LeaveTrxService } from '../leave-trx/leave-trx.service';
import { LeaveTypeBalanceService } from '../leave-type-balance/leave-type-balance.service';
import { LeaveTypePolicyCreditTrxService } from '../leave-type-policy-credit-trx/leave-type-policy-credit-trx.service';
import { LeaveTypePolicyCreditService } from '../leave-type-policy-credit/leave-type-policy-credit.service';
import { LeaveTypePolicyCreationBody } from './dto/leave-type-policy-creation.dto';
import { LeaveTypePolicyUpdateBody } from './dto/leave-type-policy-update.dto';
import { LeaveTypePolicyHelper } from './helpers/leave-type-policy.helper';
import { ICarryForwardAlgorithm } from './interfaces/carry-forward-algorithm.interface';
import { ICreditAlgorithm } from './interfaces/credit-algorithm.interface';
import { IExpiresAlgorithm } from './interfaces/expires-algorithm.interface';
import { ICreditLeaveTypePolicy, IFilterLeaveTypePolicy } from './interfaces/leave-type-policy.interface';
export declare class LeaveTypePolicyService extends LegacyBaseService<LeaveTypePolicyEntity> {
    readonly leaveTypePolicyRepository: Repository<LeaveTypePolicyEntity>;
    private readonly leaveBalanceService;
    private readonly leaveTypePolicyCreditService;
    private readonly employeeService;
    private readonly leaveTrxService;
    private readonly leaveTypePolicyCreditTrxService;
    private readonly leaveTypePolicyHelper;
    private readonly leaveTypePolicyProducer;
    constructor(leaveTypePolicyRepository: Repository<LeaveTypePolicyEntity>, leaveBalanceService: LeaveTypeBalanceService, leaveTypePolicyCreditService: LeaveTypePolicyCreditService, employeeService: EmployeeService, leaveTrxService: LeaveTrxService, leaveTypePolicyCreditTrxService: LeaveTypePolicyCreditTrxService, leaveTypePolicyHelper: LeaveTypePolicyHelper, leaveTypePolicyProducer: LeaveTypePolicyProducer);
    createLeaveTypePolicy(input: LeaveTypePolicyCreationBody): Promise<LeaveTypePolicyEntity>;
    updateLeaveTypePolicy(param: {
        leaveTypeId: number;
        companyId: number;
        updatedBy: string;
    }, input: LeaveTypePolicyUpdateBody): Promise<LeaveTypePolicyEntity>;
    existingLeaveTypePolicy(params: {
        id?: number;
        effAfterUnit: number;
        effAfterType: EPolicyEffectiveType;
        effAfterUOM: EPolicyEffectiveUOM;
        companyId: number;
        ltId: number;
    }): Promise<void>;
    deleteLeaveTypePolicy(params: {
        ids: number[];
        leaveTypeId: number;
        companyId: number;
        updatedBy: string;
    }): Promise<import("typeorm").UpdateResult | undefined>;
    getLeaveTypePolicies(filterLeaveTypePolicy?: IFilterLeaveTypePolicy, orderBy?: Partial<Record<keyof LeaveTypePolicyEntity, 'ASC' | 'DESC' | undefined>>, addWhere?: {
        where: string;
        parameter?: Record<string, any>;
    }, select?: string[], joinToAssignment?: boolean): Promise<LeaveTypePolicyEntity[] | []>;
    runCreditAlgorithmCronjobBatchEveryDay(): Promise<PromiseSettledResult<void>[]>;
    leaveTypePolicyCreditAlgorithm(filter?: ICreditLeaveTypePolicy, { batchSize, skip }?: {
        batchSize?: number;
        skip?: number;
    }): Promise<{
        insertLeaveTrx: Partial<LeaveTrxEntity>[];
        insertLeaveTypePolicyCreditTrx: Omit<LeaveTypePolicyCreditTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "isDeleted" | "policyCredit">[];
        updateLeaveTypePolicyCredits: Partial<LeaveTypePolicyCreditEntity>[];
        updateLeaveTypeBalances: Partial<LeaveTypeBalanceEntity>[];
    } | undefined>;
    creditAlgorithm({ companyId, currentDate, effectiveDate, leaveTypePolicy, leaveTypePolicyCredit, leaveTypeBalance, authMail, employee, utcOffset, }: ICreditAlgorithm): {
        leaveTypeBalance: LeaveTypeBalanceEntity;
        leaveTypePolicyCredit: LeaveTypePolicyCreditEntity;
        leaveTrx: Omit<LeaveTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "company" | "isDeleted" | "employee" | "leaveType" | "leaveTypePolicy" | "leaveTypeBalance">;
        leaveTypePolicyCreditTrx: Omit<LeaveTypePolicyCreditTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "isDeleted" | "policyCredit">;
    } | null;
    carryForwardAlgorithm({ companyId, renewalMoment, effectiveDate, currentDate, leaveTypePolicy, leaveTypeBalance, cfLeaveTypeBalance, leaveTypePolicyCredit, employee, authMail, utcOffset, }: ICarryForwardAlgorithm): {
        leaveTypeBalance: LeaveTypeBalanceEntity;
        leaveTypePolicyCredit: LeaveTypePolicyCreditEntity;
        leaveTrx: Omit<LeaveTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "company" | "isDeleted" | "employee" | "leaveType" | "leaveTypePolicy" | "leaveTypeBalance">;
        leaveTypePolicyCreditTrx: Omit<LeaveTypePolicyCreditTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "isDeleted" | "policyCredit">;
        detectedCfToNewLeaveType: boolean;
    } | null;
    expiresAlgorithm({ companyId, renewalMoment, effectiveDate, leaveTypePolicy, currentDate, leaveTypeBalance, leaveTypePolicyCredit, employee, authMail, utcOffset, }: IExpiresAlgorithm): {
        leaveTypeBalance: LeaveTypeBalanceEntity;
        leaveTypePolicyCredit: LeaveTypePolicyCreditEntity;
        leaveTrx: Omit<LeaveTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "company" | "isDeleted" | "employee" | "leaveType" | "leaveTypePolicy" | "leaveTypeBalance">;
        leaveTypePolicyCreditTrx: Omit<LeaveTypePolicyCreditTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "isDeleted" | "policyCredit">;
    } | null;
    renewalYearlyAlgorithm({ companyId, renewalMoment, effectiveDate, currentDate, leaveTypePolicy, leaveTypeBalance, leaveTypePolicyCredit, employee, authMail, utcOffset, }: ICarryForwardAlgorithm): {
        leaveTypeBalance: LeaveTypeBalanceEntity;
        leaveTrx: Omit<LeaveTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "company" | "isDeleted" | "employee" | "leaveType" | "leaveTypePolicy" | "leaveTypeBalance">;
        leaveTypePolicyCredit: LeaveTypePolicyCreditEntity;
        leaveTypePolicyCreditTrx: Omit<LeaveTypePolicyCreditTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "isDeleted" | "policyCredit">;
    } | null;
    generateTransactions(args: {
        authMail: string;
        companyId: number;
        currentDate: moment.Moment;
        effectiveDate: moment.Moment;
        leaveTypePolicy: LeaveTypePolicyEntity;
        type: EHistoryType;
        utcOffset: number;
        employee: {
            id: number;
            employeeRef: string;
            joinDate?: Date | null;
            confirmDate?: Date | null;
        };
        originalCredit: {
            creditRemaining: number;
            carryForwardRemaining: number;
        };
        leaveTypePolicyCredit: Pick<LeaveTypePolicyCreditEntity, 'uuid' | 'carryForwardRemaining' | 'creditRemaining'>;
        originalBalance: number;
        leaveTypeBalance: Pick<LeaveTypeBalanceEntity, 'leaveTypeId' | 'balance'>;
    }): {
        leaveTrx: Omit<LeaveTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "company" | "isDeleted" | "employee" | "leaveType" | "leaveTypePolicy" | "leaveTypeBalance">;
        leaveTypePolicyCreditTrx: Omit<LeaveTypePolicyCreditTrxEntity, "createdOn" | "updatedBy" | "updatedOn" | "id" | "isDeleted" | "policyCredit">;
    };
    deductLeaveTypePolicyCredit(filter: {
        leaveTypeId: number;
        leaveId: number;
        companyId: number;
        employeeId: number;
        amountLeaveDeduct: number;
        authMail: string;
    }): Promise<void>;
    revertLeaveTypePolicyCredit(filter: {
        leaveId: number;
        companyId: number;
        employeeId: number;
        authMail: string;
    }): Promise<void>;
}

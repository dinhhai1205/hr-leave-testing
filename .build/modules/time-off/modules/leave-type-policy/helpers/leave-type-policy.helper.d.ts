import type { Moment } from 'moment';
import * as moment from 'moment';
import { EPolicyCarryForwardType, EPolicyEffectiveType, EPolicyEffectiveUOM } from '../../../../../common/enums';
import { EContractType } from '../../../../../common/enums/contract-type.enum';
import { EmptyObject } from '../../../../../common/types';
import { EmployeeContractEntity, EmployeeEntity, LeaveTypeBalanceEntity, LeaveTypePolicyCreditEntity, LeaveTypePolicyEntity } from '../../../../../core/database/entities';
import { LeaveTypeAssignmentService } from '../../leave-type-assigment/leave-type-assigment.service';
import { EPolicyExpireFrom } from '../enums/policy-expire-from.enum';
import { EPolicyExpireType } from '../enums/policy-expire-type.enum';
import { EPolicyRenewType } from '../enums/policy-renew-type.enum';
export declare class LeaveTypePolicyHelper {
    private readonly leaveTypeAssignmentService;
    constructor(leaveTypeAssignmentService: LeaveTypeAssignmentService);
    isProratePolicyAndIsValid(policy: Pick<LeaveTypePolicyEntity, 'prorateEntitlement' | 'creditOnDay' | 'prorateUnit'>): boolean;
    calculateEffectiveDate(effective: {
        effAfterUnit: number;
        effAfterType: EPolicyEffectiveType;
        effAfterUOM: EPolicyEffectiveUOM;
        joinDate?: Date | null;
        contractDateFrom?: Date | null;
        seniorityDate?: Date | null;
        utcOffset?: number;
        contractType: EContractType;
        empContracts: EmployeeContractEntity[];
    }): moment.Moment | undefined;
    findPossiblePoliciesWithEmployee(args: {
        utcOffset: number;
        currentDate: moment.Moment;
        policies: LeaveTypePolicyEntity[];
        employee: Pick<EmployeeEntity, 'id' | 'companyId' | 'joinDate' | 'contractDateFrom' | 'possiblePolicy' | 'seniorityDate' | 'maritalStatusId' | 'jobGradeId' | 'organizationElementId' | 'contractType' | 'gender'>;
    }): {
        [leaveTypeId: string]: EmptyObject | {
            closestEffectiveDate: Moment;
            closestPolicy: LeaveTypePolicyEntity;
            leaveTypePolicyCredit?: LeaveTypePolicyCreditEntity;
            leaveTypeBalance?: LeaveTypeBalanceEntity;
            cfLeaveTypeBalance?: LeaveTypeBalanceEntity;
        };
    };
    policyHasCarryForwardSetting(policy: Pick<LeaveTypePolicyEntity, 'renewYearly' | 'cfLtId' | 'cfType' | 'cfUnit' | 'ltId'>): boolean;
    findBalanceAndCreditOfEmployeeForPossiblePolicy(args: {
        possiblePolicy: {
            [leaveTypeId: string]: EmptyObject | {
                closestEffectiveDate: moment.Moment;
                closestPolicy: LeaveTypePolicyEntity;
                leaveTypePolicyCredit?: LeaveTypePolicyCreditEntity;
                leaveTypeBalance?: LeaveTypeBalanceEntity;
                cfLeaveTypeBalance?: LeaveTypeBalanceEntity;
            };
        };
        employee: Pick<EmployeeEntity, 'id' | 'leaveTypeBalances' | 'leaveTypePolicyCredits' | 'companyId'>;
        authMail?: string;
    }): {
        possiblePolicy: {
            [leaveTypeId: string]: EmptyObject | {
                closestEffectiveDate: moment.Moment;
                closestPolicy: LeaveTypePolicyEntity;
                leaveTypePolicyCredit?: LeaveTypePolicyCreditEntity;
                leaveTypeBalance?: LeaveTypeBalanceEntity;
                cfLeaveTypeBalance?: LeaveTypeBalanceEntity;
            };
        };
        balanceNeedInitial: {
            companyId: number;
            employeeId: number;
            leaveTypeId: number;
            balance: number;
            createdBy: string;
        }[];
        creditNeedInitial: {
            uuid: string;
            companyId: number;
            employeeId: number;
            leavePolicyId: number;
            credit: number;
            creditRemaining: number;
            carryForwardRemaining: number;
            createdBy: string;
        }[];
    };
    reFindBalanceAndCredit(args: {
        leaveTypeBalance?: LeaveTypeBalanceEntity;
        cfLeaveTypeBalance?: LeaveTypeBalanceEntity;
        leaveTypePolicyCredit?: LeaveTypePolicyCreditEntity;
        employee: Pick<EmployeeEntity, 'id' | 'companyId'>;
        leaveTypePolicy: LeaveTypePolicyEntity;
        initiatedBalances: LeaveTypeBalanceEntity[];
        initiatedCredits: LeaveTypePolicyCreditEntity[];
    }): {
        leaveTypeBalance: LeaveTypeBalanceEntity | undefined;
        cfLeaveTypeBalance: LeaveTypeBalanceEntity | undefined;
        leaveTypePolicyCredit: LeaveTypePolicyCreditEntity | undefined;
    };
    isCreditThisMonth(args: {
        currentDate: moment.Moment;
        creditedOn?: Date;
        utcOffset: number;
    }): boolean;
    todayIsNotACreditDayYet(args: {
        creditOnDay: number;
        currentDate: moment.Moment;
        utcOffset: number;
    }): boolean;
    prorateLeaveMonthByMonth(args: {
        currentDate: moment.Moment;
        utcOffset: number;
        leaveTypePolicy: Pick<LeaveTypePolicyEntity, 'prorateUnit' | 'creditOnDay'>;
        leaveTypePolicyCredit: Pick<LeaveTypePolicyCreditEntity, 'creditedOn' | 'creditRemaining'>;
    }): number;
    getRenewalMoment(args: {
        currentYear: number;
        utcOffset?: number;
        renewYearly: boolean;
        renewType: EPolicyRenewType;
        renewOnDay: number;
        renewOnMonth: number;
        contractStartDate: Date | null;
    }): Moment | null;
    getExpiresMoment(args: {
        currentYear: number;
        utcOffset?: number;
        expireType: EPolicyExpireType;
        expireOnDay: number;
        expireOnMonth: number;
        expireInDays: number;
        expireInFrom: EPolicyExpireFrom;
        renewalMoment: Moment;
    }): Moment | null;
    getExpiresInMoment(expireInDays: number, momentFromInput: moment.Moment, utcOffset?: number): moment.Moment;
    getCarryForwardBalance(args: {
        unusedLeaves: number;
        maxEntitlement: number;
        cfUnit: number;
        cfType?: EPolicyCarryForwardType;
    }): number;
    deduction(remaining: number, amountDeduct: number): {
        remaining: number;
        amountDeduct: number;
    };
    validProratePolicy(policy: LeaveTypePolicyEntity): boolean;
}

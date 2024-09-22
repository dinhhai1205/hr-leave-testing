import { FindOptionsSelect, Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../../common/dto';
import { ELeaveApprovalActions, ELeaveDuration, ELeaveStatusId, EPermissionActions } from '../../../../../common/enums';
import { IAuthInfo } from '../../../../../common/interfaces';
import { AppConfig, DatabaseConfig } from '../../../../../config';
import { EmployeeEntity, LeaveEntity, LeaveTrxEntity, LeaveTypeBalanceEntity, LeaveTypeEntity, PayrollGroupEntity, PublicHolidayEntity, TrxApprovalUserEntity } from '../../../../../core/database/entities';
import { LegacyBaseService } from '../../../../../core/database/services';
import { HrforteNotificationProducer, LeaveTypePolicyProducer } from '../../../../../core/queue/producers';
import { AwsS3Service } from '../../../../../libs/aws';
import { TrxApprovalUserService } from '../../../../approval/modules/trx-approval-user/trx-approval-user.service';
import { PayRollGroupWorkDayService } from '../../../../payroll/modules/payroll-group-wd/payroll-group-wd.service';
import { PayRollGroupService } from '../../../../payroll/modules/payroll-group/payroll-group.service';
import { EmployeeService } from '../../../../user/modules/employee/employee.service';
import { LeaveTrxPaginationDto } from '../../leave-trx/dto/leave-trx-pagination.dto';
import { LeaveTrxService } from '../../leave-trx/leave-trx.service';
import { LeaveTypeAssignmentService } from '../../leave-type-assigment/leave-type-assigment.service';
import { LeaveTypeBalanceService } from '../../leave-type-balance/leave-type-balance.service';
import { LeaveTypeService } from '../../leave-type/leave-type.service';
import { SubLeaveTypeService } from '../../leave-type/sub-leave-type/sub-leave-type.service';
import { PublicHolidayService } from '../../public-holiday/public-holiday.service';
import { LeaveCreationDto } from '../dto/leave-creation.dto';
import { LeaveDeleteDto } from '../dto/leave-delete.dto';
import { LeaveGroupByLeaveTypeResponseDto } from '../dto/leave-group-by-leave-type-response.dto';
import { LeaveGroupByLeaveTypeDto } from '../dto/leave-group-by-leave-type.dto';
import { LeavePaginationDto } from '../dto/leave-pagination.dto';
import { LeaveUpdateRecordDto } from '../dto/leave-update-record';
import { leaveUpdateStatusResponseDto } from '../dto/leave-update-status-response.dto';
import { LeaveUpdateStatusDto } from '../dto/leave-update-status.dto';
import { LeaveHelper } from '../helpers/leave.helper';
export declare class LeaveService extends LegacyBaseService<LeaveEntity> {
    readonly leaveRepository: Repository<LeaveEntity>;
    readonly leaveHelper: LeaveHelper;
    readonly employeeService: EmployeeService;
    readonly payRollGroupService: PayRollGroupService;
    readonly payRollGroupWorkDayService: PayRollGroupWorkDayService;
    readonly trxApprovalUserService: TrxApprovalUserService;
    readonly publicHolidayService: PublicHolidayService;
    readonly awsS3Service: AwsS3Service;
    readonly leaveTypeService: LeaveTypeService;
    readonly subLeaveTypeService: SubLeaveTypeService;
    readonly leaveTypeBalanceService: LeaveTypeBalanceService;
    readonly leaveTrxService: LeaveTrxService;
    readonly leaveTypeAssignmentService: LeaveTypeAssignmentService;
    private readonly hrforteNotificationProducer;
    private readonly leaveTypePolicyProducer;
    private readonly appConfig;
    private dbConfig;
    constructor(leaveRepository: Repository<LeaveEntity>, leaveHelper: LeaveHelper, employeeService: EmployeeService, payRollGroupService: PayRollGroupService, payRollGroupWorkDayService: PayRollGroupWorkDayService, trxApprovalUserService: TrxApprovalUserService, publicHolidayService: PublicHolidayService, awsS3Service: AwsS3Service, leaveTypeService: LeaveTypeService, subLeaveTypeService: SubLeaveTypeService, leaveTypeBalanceService: LeaveTypeBalanceService, leaveTrxService: LeaveTrxService, leaveTypeAssignmentService: LeaveTypeAssignmentService, hrforteNotificationProducer: HrforteNotificationProducer, leaveTypePolicyProducer: LeaveTypePolicyProducer, appConfig: Pick<AppConfig, 'clientUrl'>, dbConfig: DatabaseConfig);
    createLeaveRecord(companyId: number, authInfo: IAuthInfo, body: LeaveCreationDto): Promise<LeaveEntity>;
    getLeaveRecordsByQuery(companyId: number, query: LeavePaginationDto, authInfo: IAuthInfo, action: EPermissionActions): Promise<PaginationResponseDto<LeaveEntity>>;
    getLeaveRecordDetail(companyId: number, leaveId: number, authInfo?: Pick<IAuthInfo, 'organizationPaths'>): Promise<LeaveEntity>;
    updateLeaveRecordStatus(payload: {
        companyId: number;
        action: keyof typeof ELeaveApprovalActions;
        body: LeaveUpdateStatusDto;
        authInfo: Pick<IAuthInfo, 'authEmployeeId' | 'authEmail' | 'appMode'>;
    }): Promise<leaveUpdateStatusResponseDto>;
    private sendNotifications;
    private deductCreditPolicy;
    private deduction;
    private reverting;
    updateLeaveRecord(payload: {
        companyId: number;
        leaveId: number;
        body: LeaveUpdateRecordDto;
        authInfo: IAuthInfo;
    }): Promise<LeaveEntity>;
    deleteLeaveRecord(payload: {
        companyId: number;
        body: LeaveDeleteDto;
        authInfo: IAuthInfo;
    }): Promise<boolean>;
    getLeaveDashboard(companyId: number, authInfo: IAuthInfo): Promise<{
        annualBalance: number;
        numPaidLeaveOnMonth: number;
        numUnPaidLeaveOnMonth: number;
        numAwaitApprovalPaidDays: number;
        numAwaitApprovalUnPaidDays: number;
    }>;
    getTotalEffectDayOfLeaveByKind(args: {
        kind: 'APPROVED_PAID' | 'APPROVED_UNPAID' | 'AWAIT_PAID' | 'AWAIT_UNPAID';
        companyId: number;
        employeeId: number;
    }): Promise<number>;
    getLeaveHistoriesByQuery(payload: {
        authInfo: IAuthInfo;
        companyId: number;
        query: LeaveTrxPaginationDto;
    }): Promise<PaginationResponseDto<LeaveTrxEntity>>;
    calculateBalanceAndUpdate(payload: {
        authEmail: string;
        leaveRecordId: number;
        newStatusId: number;
        approveBy: string;
        approveOn?: Date;
        leaveType: LeaveTypeEntity;
        cancelledBy?: string;
        cancelledOn?: Date;
        declinedBy?: string;
        declinedOn?: Date;
        leaveRecord?: LeaveEntity;
    }): Promise<(({
        statusId: ELeaveStatusId.APPROVED | ELeaveStatusId.CANCELLED;
        updatedBy: string;
        effDayOfLeave: number;
        approvedBy: string;
        approvedOn: Date | undefined;
        cancelledBy: string | undefined;
        cancelledOn: Date | undefined;
        declinedBy: string | undefined;
        declinedOn: Date | undefined;
        id: number;
        leaveNo: number;
        companyId: number;
        employeeId: number;
        leaveTypeId: number;
        createdBy: string;
        reason: string;
        dateFrom: Date;
        fromFdHd: ELeaveDuration;
        dateTo: Date;
        toFdHd: ELeaveDuration;
        allMustApprove: boolean;
        fileCount: number;
        parentLeaveTypeId?: number;
        remark?: string;
        company: import("../../../../../core/database").CompanyEntity;
        employee: EmployeeEntity;
        leaveType: LeaveTypeEntity;
        approverTrx?: TrxApprovalUserEntity[];
        createdOn: Date;
        updatedOn: Date;
        isDeleted: boolean;
    } & LeaveEntity) | ({
        balance: number;
        id: number;
        companyId: number;
        employeeId: number;
        leaveTypeId: number;
        createdBy: string;
        updatedBy: string;
        company: import("../../../../../core/database").CompanyEntity;
        employee: EmployeeEntity;
        leaveType: LeaveTypeEntity;
        employeeLeaveType: LeaveTypeEntity;
        leaveTransactions: LeaveTrxEntity[];
        createdOn: Date;
        updatedOn: Date;
        isDeleted: boolean;
    } & LeaveTypeBalanceEntity))[] | undefined>;
    calculateEffectiveDays(args: {
        companyId: number;
        leaveRecord: LeaveEntity | LeaveCreationDto | LeaveUpdateRecordDto;
        leaveType?: Pick<LeaveTypeEntity, 'id' | 'includeNonWorkingDay' | 'includePublicHoliday'>;
        employee?: Pick<EmployeeEntity, 'id' | 'payrollGroupId'>;
        payrollGroup?: Pick<PayrollGroupEntity, 'id' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'payrollGroupWorkDays'>;
        publicHolidays?: Array<Pick<PublicHolidayEntity, 'id' | 'date'>>;
    }): Promise<number>;
    groupByLeaveRecordByLeaveType(companyId: number, query: LeaveGroupByLeaveTypeDto, authInfo: IAuthInfo): Promise<LeaveGroupByLeaveTypeResponseDto>;
    checkValidateForCreateLeave({ currentDate, companyId, employee, leave, leaveType, payrollGroup, }: {
        currentDate: Date;
        leave: LeaveCreationDto | LeaveEntity | LeaveUpdateRecordDto;
        companyId: number;
        leaveType: LeaveTypeEntity;
        employee: EmployeeEntity;
        payrollGroup: PayrollGroupEntity;
    }): Promise<{
        efftiveDays: number;
        leaveTypeBalance: LeaveTypeBalanceEntity | null;
    }>;
    maximumConsecutiveDaysOfLeavesAllowed(leave: Partial<Pick<LeaveEntity, 'id'>> & Pick<LeaveEntity, 'companyId' | 'employeeId' | 'leaveTypeId' | 'fromFdHd' | 'toFdHd' | 'dateFrom' | 'dateTo' | 'reason'>, leaveType: Pick<LeaveTypeEntity, 'id' | 'includeNonWorkingDay' | 'includePublicHoliday' | 'maxConsecutive'>, employee: Pick<EmployeeEntity, 'id' | 'payrollGroupId'>, payrollGroup: Pick<PayrollGroupEntity, 'id' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'payrollGroupWorkDays' | 'pgType'>): Promise<void>;
    furthestDateLeaveByKind({ kind, leave, payrollGroup, }: {
        kind: 'From' | 'To';
        payrollGroup: Pick<PayrollGroupEntity, 'id' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'pgType' | 'payrollGroupWorkDays'>;
        leave: Partial<Pick<LeaveEntity, 'id'>> & Pick<LeaveEntity, 'companyId' | 'employeeId' | 'leaveTypeId' | 'fromFdHd' | 'toFdHd' | 'dateFrom' | 'dateTo' | 'reason'>;
    }): Promise<{
        leaveDuration: number;
        dateOut: Date;
    }>;
    getLeaveWithDateInputInRangeFromTo({ dateInput, idArr, selectInput, leave, }: {
        dateInput: Date;
        idArr: number[];
        selectInput: FindOptionsSelect<LeaveEntity>;
        leave: Pick<LeaveEntity, 'companyId' | 'employeeId' | 'leaveTypeId'>;
    }): Promise<LeaveEntity | null>;
    makeLeaveNo(companyId: number): Promise<number>;
    getTotalDayLeaves(companyId: number, leaveRecord: LeaveEntity | LeaveCreationDto | LeaveUpdateRecordDto, opts?: Partial<{
        leaveType: Pick<LeaveTypeEntity, 'id' | 'includeNonWorkingDay' | 'includePublicHoliday'>;
        employee: Pick<EmployeeEntity, 'id' | 'payrollGroupId'>;
        payrollGroup: Pick<PayrollGroupEntity, 'id' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'payrollGroupWorkDays' | 'pgType'>;
        publicHolidays: Array<Pick<PublicHolidayEntity, 'id' | 'date' | 'year'>>;
        isNotGetWorkDays: boolean;
    }>): Promise<{
        workingFullDay: string[];
        workingHalfDay: string[];
        daysOff: string[];
        totalDayLeaves: number;
    }>;
    getTotalUnpaidDays(payload: {
        companyId: number;
        employeeIds: number[];
        startDate: string;
        endDate: string;
        paidLeave?: boolean;
    }): Promise<{
        [employeeId: number]: {
            id: number;
            dateFrom: string;
            dateTo: string;
            effDayOfLeave: number;
            daysOff: string[];
            workingHalfDay: string[];
            workingFullDay: string[];
        }[];
    }>;
    private recalculateEffDayOfLeaveIfOutOfRange;
    private getAllDayOfYearWdDateRangeSelectFields;
}

import { StreamableFile } from '@nestjs/common';
import { BaseParamDto } from '../../../../common/dto';
import { TimeTrackerMapping } from '../../common/decorators/type';
import { CreateTimeEntryBodyDto, DeleteTimeEntryDto, ExportExcelFileTypeDto, GetDetailTimeEntryQueryDto, GetTimeEntriesCountDto, GetTimeEntriesOverviewQueryDto, GetTimeSheetQuery, TimeEntryResponseDTO, UpdateMultiTimeEntryDto } from './dtos';
import { TimeSheetService } from './services';
import { ExportTimeEntriesExcelFileService } from './services/export-time-entries-excel-file.service';
import { TimeEntryService } from './services/time-entry.service';
import { TimeEntryEntity } from './time-entry.entity';
export declare class TimeEntryController {
    private timeEntryService;
    private exportTimeEntriesExcel;
    private timeSheetService;
    constructor(timeEntryService: TimeEntryService, exportTimeEntriesExcel: ExportTimeEntriesExcelFileService, timeSheetService: TimeSheetService);
    create(createTimeEntryDto: CreateTimeEntryBodyDto, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<TimeEntryResponseDTO | TimeEntryResponseDTO[]>;
    getWeeklySummaryTrackedHour(employeeId: number, startDate: string, endDate: string, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    getTimeEntriesDetailInDateByUserId(employeeId: number, query: GetDetailTimeEntryQueryDto, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        workScheduleEntity: {
            id: number | undefined;
            ttWorkScheduleId?: string | undefined;
            name?: string | undefined;
            utcOffset?: number | undefined;
            workArrangement?: import("../../common").WorkArrangement | undefined;
            breakType?: import("../../common").BreakType | undefined;
            default?: boolean | undefined;
            weeklyHours?: number | undefined;
            unitTime?: import("../../common").UnitTime | undefined;
            excludeEarlyClockIn?: boolean | undefined;
            companyId?: number | undefined;
            overtimeId?: number | undefined;
            endWorkDayAt?: string | undefined;
            publishType?: import("../work-schedule/enums/work-schedule-publish-type.enum").EWorkSchedulePublishType | undefined;
            color?: string | undefined;
            startDate?: Date | undefined;
            endDate?: Date | undefined;
            state?: import("../work-schedule/enums/work-schedule-state.enum").EWorkScheduleState | undefined;
            threshold?: number | undefined;
            publishHistories?: import("../work-schedule/interfaces/work-schedule-publish-history.interface").IWorkSchedulePublishHistory[] | undefined;
            assignees?: import("../work-schedule/interfaces/work-schedule-assignee.interface").IWorkScheduleAssignee | undefined;
            groupAssignees?: import("../work-schedule/interfaces/work-schedule-group-assignee.interface").IWorkScheduleGroupAssignee | undefined;
            autoDeductions?: import("../../../../core/database").AutoDeductionEntity[] | undefined;
            breaks?: import("../../../../core/database").BreakRuleEntity[] | undefined;
            locationWorkSchedules?: import("../../../../core/database").LocationWorkScheduleEntity[] | undefined;
            daySchedules?: import("../../../../core/database").DayScheduleEntity[] | undefined;
            workScheduleAssignment?: import("../../../../core/database/entities/work-schedule-assignment.entity").WorkScheduleAssignmentEntity[] | undefined;
            employees?: import("../../../../core/database").EmployeeEntity[] | undefined;
            workScheduleTags?: import("../../../../core/database").WorkScheduleTagEntity[] | undefined;
            organizationStructures?: import("../../../../core/database").OrganizationStructureEntity[] | undefined;
            isDeleted?: boolean | undefined;
            createdBy?: string | undefined;
            createdOn?: Date | undefined;
            updatedBy?: string;
            updatedOn?: Date;
        };
        employeeInfo: {
            id: number;
            companyId?: number | undefined;
            payrollGroupId?: number | undefined;
            email?: string | undefined;
            employeeRef?: string | undefined;
            employeeNo?: string | undefined;
            fullNameLocal?: string | undefined;
            fullNameEn?: string | undefined;
            organizationElementId?: number | undefined;
            jobGradeId?: number | undefined;
            gender?: string | undefined;
            contractType?: import("../../../../common/enums/contract-type.enum").EContractType | undefined;
            contractDateFrom?: Date | undefined;
            contractDateTo?: Date | undefined;
            maritalStatusId?: number | undefined;
            active?: boolean | undefined;
            joinDate?: Date;
            confirmDate?: Date;
            seniorityDate?: Date;
            isEssEnabled?: boolean | undefined;
            orgPath?: string;
            lastWorkingDate?: Date | undefined;
            workScheduleId?: number | undefined;
            payrollFrequencyId?: number | undefined;
            costCenterId?: number | undefined;
            payCalcMet?: import("../../../payroll/modules/payroll-group/enums/payroll-group-type.enum").EPayrollGroupType | undefined;
            contractReferenceNo?: string;
            possiblePolicy?: {
                [leaveTypeId: string]: {
                    closestEffectiveDate: import("moment").Moment;
                    closestPolicy: import("../../../../core/database").LeaveTypePolicyEntity;
                    leaveTypePolicyCredit?: import("../../../../core/database").LeaveTypePolicyCreditEntity;
                    leaveTypeBalance?: import("../../../../core/database").LeaveTypeBalanceEntity;
                    cfLeaveTypeBalance?: import("../../../../core/database").LeaveTypeBalanceEntity;
                } | import("../../../../common/types").EmptyObject;
            } | import("../../../../common/types").EmptyObject;
            leaves?: import("../../../../core/database").LeaveEntity[] | undefined;
            leaveTypeBalances?: import("../../../../core/database").LeaveTypeBalanceEntity[] | null | undefined;
            leaveTypePolicyCredits?: import("../../../../core/database").LeaveTypePolicyCreditEntity[] | null | undefined;
            approvalUsers?: import("../../../../core/database").ApprovalUserEntity | undefined;
            payrollGroups?: import("../../../../core/database").PayrollGroupEntity | undefined;
            company?: import("../../../../core/database").CompanyEntity | undefined;
            costCenter?: import("../../../../core/database").CostCenterEntity | undefined;
            aspNetUsers?: import("../../../../core/database").AspNetUsersEntity | undefined;
            leaveTypes?: import("../../../../core/database").LeaveTypeEntity[] | undefined;
            workSchedule?: import("../../../../core/database").WorkScheduleEntity | undefined;
            orgStructure?: import("../../../../core/database").OrganizationStructureEntity | undefined;
            payrollTimeSheets?: import("../../../../core/database/entities/payroll-timesheet.entity").PayrollTimeSheetEntity[] | undefined;
            prtrxEmps?: import("../../../../core/database/entities/prtrx-emp.entity").PrtrxEmpEntity[] | undefined;
            workScheduleAssignments?: import("../../../../core/database/entities/work-schedule-assignment.entity").WorkScheduleAssignmentEntity[] | undefined;
            createdOn?: Date | undefined;
            updatedOn?: Date | undefined;
            isDeleted?: boolean | undefined;
            createdBy?: string | undefined;
            updatedBy?: string | undefined;
        };
        date: string;
        day: string;
        theLatestClockIn: boolean | null;
        firstIn: TimeEntryEntity | null;
        lastOut: TimeEntryEntity | null;
        timeEntries: TimeEntryEntity[];
        trackedHour: {
            trackedHour: number;
            sumBreakTimeById: {
                [key: string]: number;
            };
            workedHour: number;
            breakHour: number;
            unitTime: import("../../common").UnitTime;
        };
        payrollHour: {
            payrollHour: number;
            workedHour: number;
            overTime: {
                regular: number;
                dailyOvertime: number;
                dailyDoubleOvertime: number;
                weeklyOvertime: number;
                restDayOvertime: number;
                publicHolidayOvertime: number;
            };
            breakPaid: number;
            autoDeduction: number;
            unitTime: import("../../common").UnitTime;
        };
    }>;
    getListTimeEntriesInDate(employeeId: number, query: GetDetailTimeEntryQueryDto, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        data: any;
    }>;
    getDetailSummarizeInDate(employeeId: number, query: GetDetailTimeEntryQueryDto, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        workScheduleEntity: {
            id: number | undefined;
            ttWorkScheduleId?: string | undefined;
            name?: string | undefined;
            utcOffset?: number | undefined;
            workArrangement?: import("../../common").WorkArrangement | undefined;
            breakType?: import("../../common").BreakType | undefined;
            default?: boolean | undefined;
            weeklyHours?: number | undefined;
            unitTime?: import("../../common").UnitTime | undefined;
            excludeEarlyClockIn?: boolean | undefined;
            companyId?: number | undefined;
            overtimeId?: number | undefined;
            endWorkDayAt?: string | undefined;
            publishType?: import("../work-schedule/enums/work-schedule-publish-type.enum").EWorkSchedulePublishType | undefined;
            color?: string | undefined;
            startDate?: Date | undefined;
            endDate?: Date | undefined;
            state?: import("../work-schedule/enums/work-schedule-state.enum").EWorkScheduleState | undefined;
            threshold?: number | undefined;
            publishHistories?: import("../work-schedule/interfaces/work-schedule-publish-history.interface").IWorkSchedulePublishHistory[] | undefined;
            assignees?: import("../work-schedule/interfaces/work-schedule-assignee.interface").IWorkScheduleAssignee | undefined;
            groupAssignees?: import("../work-schedule/interfaces/work-schedule-group-assignee.interface").IWorkScheduleGroupAssignee | undefined;
            autoDeductions?: import("../../../../core/database").AutoDeductionEntity[] | undefined;
            breaks?: import("../../../../core/database").BreakRuleEntity[] | undefined;
            locationWorkSchedules?: import("../../../../core/database").LocationWorkScheduleEntity[] | undefined;
            daySchedules?: import("../../../../core/database").DayScheduleEntity[] | undefined;
            workScheduleAssignment?: import("../../../../core/database/entities/work-schedule-assignment.entity").WorkScheduleAssignmentEntity[] | undefined;
            employees?: import("../../../../core/database").EmployeeEntity[] | undefined;
            workScheduleTags?: import("../../../../core/database").WorkScheduleTagEntity[] | undefined;
            organizationStructures?: import("../../../../core/database").OrganizationStructureEntity[] | undefined;
            isDeleted?: boolean | undefined;
            createdBy?: string | undefined;
            createdOn?: Date | undefined;
            updatedBy?: string;
            updatedOn?: Date;
        };
        employeeInfo: {
            id: number;
            companyId?: number | undefined;
            payrollGroupId?: number | undefined;
            email?: string | undefined;
            employeeRef?: string | undefined;
            employeeNo?: string | undefined;
            fullNameLocal?: string | undefined;
            fullNameEn?: string | undefined;
            organizationElementId?: number | undefined;
            jobGradeId?: number | undefined;
            gender?: string | undefined;
            contractType?: import("../../../../common/enums/contract-type.enum").EContractType | undefined;
            contractDateFrom?: Date | undefined;
            contractDateTo?: Date | undefined;
            maritalStatusId?: number | undefined;
            active?: boolean | undefined;
            joinDate?: Date;
            confirmDate?: Date;
            seniorityDate?: Date;
            isEssEnabled?: boolean | undefined;
            orgPath?: string;
            lastWorkingDate?: Date | undefined;
            workScheduleId?: number | undefined;
            payrollFrequencyId?: number | undefined;
            costCenterId?: number | undefined;
            payCalcMet?: import("../../../payroll/modules/payroll-group/enums/payroll-group-type.enum").EPayrollGroupType | undefined;
            contractReferenceNo?: string;
            possiblePolicy?: {
                [leaveTypeId: string]: {
                    closestEffectiveDate: import("moment").Moment;
                    closestPolicy: import("../../../../core/database").LeaveTypePolicyEntity;
                    leaveTypePolicyCredit?: import("../../../../core/database").LeaveTypePolicyCreditEntity;
                    leaveTypeBalance?: import("../../../../core/database").LeaveTypeBalanceEntity;
                    cfLeaveTypeBalance?: import("../../../../core/database").LeaveTypeBalanceEntity;
                } | import("../../../../common/types").EmptyObject;
            } | import("../../../../common/types").EmptyObject;
            leaves?: import("../../../../core/database").LeaveEntity[] | undefined;
            leaveTypeBalances?: import("../../../../core/database").LeaveTypeBalanceEntity[] | null | undefined;
            leaveTypePolicyCredits?: import("../../../../core/database").LeaveTypePolicyCreditEntity[] | null | undefined;
            approvalUsers?: import("../../../../core/database").ApprovalUserEntity | undefined;
            payrollGroups?: import("../../../../core/database").PayrollGroupEntity | undefined;
            company?: import("../../../../core/database").CompanyEntity | undefined;
            costCenter?: import("../../../../core/database").CostCenterEntity | undefined;
            aspNetUsers?: import("../../../../core/database").AspNetUsersEntity | undefined;
            leaveTypes?: import("../../../../core/database").LeaveTypeEntity[] | undefined;
            workSchedule?: import("../../../../core/database").WorkScheduleEntity | undefined;
            orgStructure?: import("../../../../core/database").OrganizationStructureEntity | undefined;
            payrollTimeSheets?: import("../../../../core/database/entities/payroll-timesheet.entity").PayrollTimeSheetEntity[] | undefined;
            prtrxEmps?: import("../../../../core/database/entities/prtrx-emp.entity").PrtrxEmpEntity[] | undefined;
            workScheduleAssignments?: import("../../../../core/database/entities/work-schedule-assignment.entity").WorkScheduleAssignmentEntity[] | undefined;
            createdOn?: Date | undefined;
            updatedOn?: Date | undefined;
            isDeleted?: boolean | undefined;
            createdBy?: string | undefined;
            updatedBy?: string | undefined;
        };
        date: string;
        day: string;
        theLatestClockIn: boolean | null;
        firstIn: TimeEntryEntity | null;
        lastOut: TimeEntryEntity | null;
        timeEntries: TimeEntryEntity[];
        trackedHour: {
            trackedHour: number;
            sumBreakTimeById: {
                [key: string]: number;
            };
            workedHour: number;
            breakHour: number;
            unitTime: import("../../common").UnitTime;
        };
        payrollHour: {
            payrollHour: number;
            workedHour: number;
            overTime: {
                regular: number;
                dailyOvertime: number;
                dailyDoubleOvertime: number;
                weeklyOvertime: number;
                restDayOvertime: number;
                publicHolidayOvertime: number;
            };
            breakPaid: number;
            autoDeduction: number;
            unitTime: import("../../common").UnitTime;
        };
    }>;
    getTimeEntriesOverviewSummarize({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, query: GetTimeEntriesOverviewQueryDto): Promise<any>;
    getTimeEntriesOverview({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, query: GetTimeEntriesOverviewQueryDto): Promise<{
        data: (import("../../common/interfaces").ITimeEntryOverviewResponse | import("../../common/interfaces").ITimeEntryOverviewData)[];
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: false;
        hasNextPage: true;
    }>;
    getLastActivityByUserId(employeeId: number, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    deleteTimeEntry(deleteTimeEntryDto: DeleteTimeEntryDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<TimeEntryEntity>;
    updateTimeEntry(updateTimeEntryDto: UpdateMultiTimeEntryDto[], { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<TimeEntryEntity[]>;
    getExcelFile({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, query: ExportExcelFileTypeDto): Promise<StreamableFile>;
    getTimeSheetDetail({ companyId }: BaseParamDto, employeeId: number, query: GetTimeSheetQuery, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        data: any;
    }>;
    getTimeSheetOverview(query: GetTimeEntriesOverviewQueryDto, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    getCountTimeEntries(query: GetTimeEntriesCountDto, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        UnpaidInfo: Record<string, {
            day: string;
            unPaidDay: number;
            leaveId?: number;
        }[]>;
        LeaveInfo: {
            [employeeId: number]: {
                id: number;
                dateFrom: string;
                dateTo: string;
                effDayOfLeave: number;
                daysOff: string[];
                workingHalfDay: string[];
                workingFullDay: string[];
            }[];
        };
        trackedInfo: any;
    }>;
    recompute({ companyId }: BaseParamDto, payrollHeaderId: number, { timeTrackerCompanyId }: TimeTrackerMapping, userEmail: string): Promise<never[] | {
        result: import("../../../../core/database").TimeSheetAdjustmentEntity[];
    }>;
}

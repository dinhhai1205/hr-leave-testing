import { WorkScheduleService } from './work-schedule.service';
import { BaseParamDto, PaginationQueryDto } from '../../../../common/dto';
import { GetAllWorkScheduleInMultipleDateQueryDto, GetAssigneesQueryDto, PaginationQueryWithDateDto } from './dtos';
export declare class WorkScheduleESSController {
    private readonly workScheduleService;
    constructor(workScheduleService: WorkScheduleService);
    getAllWorkSchedulesFromToDate(companyId: number, startDate: string, endDate: string, query: GetAllWorkScheduleInMultipleDateQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<{
        date: string;
        workScheduleEntity: {
            id: number;
            name: string;
            daySchedules: {
                id: number;
                from: string;
                to: string;
            } | null;
            color: string;
            assignees: any;
            assigneesCount: number;
            groupAssignees: any;
            groupAssigneesCount: number;
        }[];
    }> | import("../../../../common/dto").PaginationResponseDto<{
        date: string;
        workScheduleEntity: import("../../../../core/database").WorkScheduleEntity[];
    }>>;
    getListBreaksOfWorkSchedule(employeeId: number, paginationQueryDto: PaginationQueryWithDateDto, { companyId }: BaseParamDto): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").BreakRuleEntity>>;
    getWorkScheduleOfEmployeeFromToDate(companyId: number, startDate: string, endDate: string, query: PaginationQueryDto, employeeId: number): Promise<import("../../../../common/dto").PaginationResponseDto<{
        date: string;
        workScheduleEntity: {
            id: number;
            name: string;
            color: string;
            daySchedules: {
                id: number;
                from: string;
                to: string;
            } | null;
            assignees: any;
            assigneesCount: number;
            groupAssignees: any;
            groupAssigneesCount: number;
        }[];
    }>>;
    getAssigneesOfWorkSchedule(workScheduleId: number, { companyId }: BaseParamDto, paginationQueryDto: GetAssigneesQueryDto): Promise<{
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        data: {
            email: string;
            employeeRef: string;
            employeeNo: string;
            fullNameLocal: string;
            fullNameEn: string;
            employeeId: number;
        }[];
    }>;
    getGroupAssigneesOfWorkSchedule(workScheduleId: number, { companyId }: BaseParamDto, paginationQueryDto: GetAssigneesQueryDto): Promise<{
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        data: {
            name: string;
            id: number;
            orgPath: string;
            parentId?: number;
            parentGroupName?: string | null;
        }[];
    }>;
    getWorkScheduleDetail(companyId: number, workScheduleId: number, date: Date): Promise<{
        assignees: {
            [k: string]: unknown;
        };
        assigneesCount: number;
        groupAssignees: {
            [k: string]: unknown;
        };
        groupAssigneesCount: number;
        daySchedules: import("../../../../core/database").DayScheduleEntity | null;
        ttWorkScheduleId: string;
        name: string;
        utcOffset: number;
        workArrangement: import("../../common").WorkArrangement;
        breakType: import("../../common").BreakType;
        default: boolean;
        weeklyHours: number;
        unitTime: import("../../common").UnitTime;
        excludeEarlyClockIn: boolean;
        companyId: number;
        overtimeId: number;
        endWorkDayAt: string;
        publishType: import("./enums/work-schedule-publish-type.enum").EWorkSchedulePublishType;
        color: string;
        startDate: Date;
        endDate: Date;
        state: import("./enums/work-schedule-state.enum").EWorkScheduleState;
        threshold: number;
        publishHistories: import("./interfaces/work-schedule-publish-history.interface").IWorkSchedulePublishHistory[];
        autoDeductions: import("../../../../core/database").AutoDeductionEntity[];
        breaks: import("../../../../core/database").BreakRuleEntity[];
        locationWorkSchedules: import("../../../../core/database").LocationWorkScheduleEntity[];
        workScheduleAssignment: import("../../../../core/database/entities/work-schedule-assignment.entity").WorkScheduleAssignmentEntity[];
        employees: import("../../../../core/database").EmployeeEntity[];
        workScheduleTags: import("../../../../core/database").WorkScheduleTagEntity[];
        organizationStructures: import("../../../../core/database").OrganizationStructureEntity[];
        id: number;
        isDeleted: boolean;
        createdBy: string;
        createdOn: Date;
        updatedBy?: string;
        updatedOn?: Date;
    } | null>;
}

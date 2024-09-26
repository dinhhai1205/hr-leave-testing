import { WorkScheduleService } from './work-schedule.service';
import { BaseParamDto, PaginationQueryDto } from '../../../../common/dto';
import { GetAllWorkScheduleInMultipleDateQueryDto, GetAssigneesQueryDto, PaginationQueryWithDateDto } from './dtos';
export declare class WorkScheduleESSController {
    private readonly workScheduleService;
    constructor(workScheduleService: WorkScheduleService);
    getAllWorkSchedulesFromToDate(companyId: number, startDate: string, endDate: string, query: GetAllWorkScheduleInMultipleDateQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<{
        date: string;
        workScheduleEntity: import("../../../../core/database").WorkScheduleEntity[];
    }> | import("../../../../common/dto").PaginationResponseDto<{
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
    getWorkScheduleDetail(companyId: number, workScheduleId: number): Promise<{
        id: number;
        name: string;
        color: string;
        startDate: Date;
        endDate: Date;
        isDeleted: boolean;
        state: import("./enums/work-schedule-state.enum").EWorkScheduleState;
        assignees: {
            [k: string]: unknown;
        };
        assigneesCount: number;
        groupAssignees: {
            [k: string]: unknown;
        };
        groupAssigneesCount: number;
        daySchedules: import("../../../../core/database").DayScheduleEntity[];
        publisher: string | null;
        publishedTime: string | null;
    } | null>;
}

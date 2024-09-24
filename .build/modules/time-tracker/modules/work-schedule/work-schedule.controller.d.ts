import { BaseParamDto } from '../../../../common/dto';
import { IActiveUserData } from '../../../../core/iam';
import { TimeTrackerMapping } from '../../common/decorators/type';
import { CheckInDefaultWorkScheduleDto, CreateWorkScheduleBodyDTO, GetAssigneesQueryDto, PaginationQueryWithDateDto, UpdateWorkScheduleBodyDTO, WorkScheduleQueryDto } from './dtos';
import { GetAllWorkScheduleOverlapQueryDto } from './dtos/get-all-work-schedule-overlap-query.dto';
import { PublishWorkScheduleBodyDto } from './dtos/publish-work-schedule-body.dto';
import { PublishWorkScheduleParamsDto } from './dtos/publish-work-schedule-params.dto';
import { WorkScheduleService } from './work-schedule.service';
export declare class WorkScheduleController {
    private readonly workScheduleService;
    constructor(workScheduleService: WorkScheduleService);
    getTTWorkScheduleDefault({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    getLeaveWorkScheduleDefault({ companyId }: BaseParamDto): Promise<import("../../../../core/database").WorkScheduleEntity | null>;
    getTTWorkScheduleByWorkScheduleId(workScheduleId: string, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    getAllWorkSchedulesIsOverlap(params: PublishWorkScheduleParamsDto, query: GetAllWorkScheduleOverlapQueryDto): Promise<import("../../../../core/database").WorkScheduleEntity[]>;
    getListBreaksOfWorkSchedule(employeeId: number, paginationQueryDto: PaginationQueryWithDateDto, { companyId }: BaseParamDto): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").BreakRuleEntity>>;
    getAllTTWorkScheduleByCompanyId({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    checkInDefaultWorkSchedule({ companyId }: BaseParamDto, checkInDefaultWorkScheduleDto: CheckInDefaultWorkScheduleDto): Promise<{
        employees: {
            email: string;
            employeeRef: string;
            employeeNo: string;
            fullNameLocal: string;
            fullNameEn: string;
            employeeId: number;
        }[];
        groups: {
            name: string;
            id: number;
            orgPath: string;
        }[];
        workScheduleDefaultId: number;
    }>;
    getWorkScheduleByWorkScheduleId(workScheduleId: number, { companyId }: BaseParamDto): Promise<import("../../../../core/database").WorkScheduleEntity | null>;
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
    getAllWorkScheduleByCompanyId({ companyId }: BaseParamDto, query: WorkScheduleQueryDto): Promise<{
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        data: any[];
    }>;
    create(createWorkScheduleBodyDTO: CreateWorkScheduleBodyDTO, { companyId }: BaseParamDto, { timeTrackerCompanyId, userEmail }: TimeTrackerMapping, { userEmail: leaveUserEmail }: IActiveUserData): Promise<any>;
    update(workScheduleId: number, updateWorkScheduleBodyDTO: UpdateWorkScheduleBodyDTO, { companyId }: BaseParamDto, { timeTrackerCompanyId, userEmail }: TimeTrackerMapping, { userEmail: leaveUserEmail }: IActiveUserData): Promise<{
        updatedWorkSchedule: import("../../../../core/database").WorkScheduleEntity;
        autoDeductionEntity: import("../../../../core/database").AutoDeductionEntity[] | import("../../../../core/database").BreakRuleEntity[] | import("../../../../core/database").DayScheduleEntity[];
        dayScheduleEntity: import("../../../../core/database").AutoDeductionEntity[] | import("../../../../core/database").BreakRuleEntity[] | import("../../../../core/database").DayScheduleEntity[];
        breakRuleEntity: import("../../../../core/database").AutoDeductionEntity[] | import("../../../../core/database").BreakRuleEntity[] | import("../../../../core/database").DayScheduleEntity[];
    }>;
    delete({ companyId }: BaseParamDto, { timeTrackerCompanyId, userEmail }: TimeTrackerMapping, workScheduleId: number, { userEmail: activeUserEmail }: IActiveUserData): Promise<string> | Promise<import("../../../../core/database").WorkScheduleEntity>;
    publishWorkSchedule(params: PublishWorkScheduleParamsDto, body: PublishWorkScheduleBodyDto, { timeTrackerCompanyId }: TimeTrackerMapping, userEmail?: string): Promise<{
        id: number;
        state: import("./enums/work-schedule-state.enum").EWorkScheduleState;
        updatedBy: string;
        updatedOn: Date;
        startDate: string;
        endDate: string;
        publishHistories: import("./interfaces/work-schedule-publish-history.interface").IWorkSchedulePublishHistory[];
        publishType: import("./enums/work-schedule-publish-type.enum").EWorkSchedulePublishType;
    } & import("../../../../core/database").WorkScheduleEntity>;
    unpublishWorkSchedule(companyId: number, workScheduleId: number, { timeTrackerCompanyId }: TimeTrackerMapping, userEmail?: string): Promise<string>;
    updateWorkScheduleDefault(workScheduleId: number, { companyId }: BaseParamDto, { timeTrackerCompanyId, userEmail }: TimeTrackerMapping, { userEmail: leaveUserEmail }: IActiveUserData): Promise<string>;
}

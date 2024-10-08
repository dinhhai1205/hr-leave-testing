import { SchedulerRegistry } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { PaginationQueryDto, PaginationResponseDto } from '../../../../common/dto';
import { AutoDeductionEntity, BreakRuleEntity, DayScheduleEntity, EmployeeEntity, LocationEntity, TypeOrmBaseService, WorkScheduleEntity } from '../../../../core/database';
import { HrforteNotificationProducer, LeaveWorkScheduleProducer } from '../../../../core/queue/producers';
import { EmployeeService } from '../../../../modules/user/modules/employee/employee.service';
import { OrganizationStructureService } from '../../../general/modules/organization-structure/organization-structure.service';
import { TimeTrackerApiService } from '../../libs/api/api.service';
import { AutoDeductionService } from '../auto-deduction/auto-deduction.service';
import { BreakRuleService } from '../break-rule/break-rule.service';
import { CompanyMappingService } from '../company-mapping/company-mapping.service';
import { DayScheduleService } from '../day-schedule/day-schedule.service';
import { EmployeeMappingService } from '../employee-mapping/employee-mapping.service';
import { GroupMappingService } from '../group-mapping/group-mapping.service';
import { LocationWorkScheduleService } from '../location-work-schedule/location-work-schedule.service';
import { WorkScheduleAssignmentService } from '../work-schedule-assignment/work-schedule-assignment.service';
import { CheckInDefaultWorkScheduleDto, CreateWorkScheduleBodyDTO, GetAllWorkScheduleInMultipleDateQueryDto, GetAssigneesQueryDto, UpdateWorkScheduleBodyDTO, WorkScheduleQueryDto } from './dtos';
import { EWorkSchedulePublishType } from './enums/work-schedule-publish-type.enum';
import { EWorkScheduleState } from './enums/work-schedule-state.enum';
import { IWorkScheduleAssignee } from './interfaces/work-schedule-assignee.interface';
import { IWorkScheduleGroupAssignee } from './interfaces/work-schedule-group-assignee.interface';
import { AppConfig } from '../../../../config';
import { GetWorkScheduleArguments, GetWorkScheduleOptions } from './work-schedule.type';
import { IWorkSchedulePublishHistory } from './interfaces/work-schedule-publish-history.interface';
export declare class WorkScheduleService extends TypeOrmBaseService<WorkScheduleEntity> {
    private readonly apiService;
    private readonly workScheduleRepository;
    private readonly autoDeductionService;
    private readonly breakRuleService;
    private readonly dayScheduleService;
    private readonly locationWorkScheduleService;
    private readonly companyMappingService;
    private readonly employeeService;
    private readonly organizationStructureService;
    private readonly workScheduleAssignmentService;
    private readonly schedulerRegistry;
    private readonly workScheduleProducer;
    private readonly employeeMappingService;
    private readonly groupMappingService;
    private readonly hrforteNotificationProducer;
    private readonly appConfig;
    constructor(apiService: TimeTrackerApiService, workScheduleRepository: Repository<WorkScheduleEntity>, autoDeductionService: AutoDeductionService, breakRuleService: BreakRuleService, dayScheduleService: DayScheduleService, locationWorkScheduleService: LocationWorkScheduleService, companyMappingService: CompanyMappingService, employeeService: EmployeeService, organizationStructureService: OrganizationStructureService, workScheduleAssignmentService: WorkScheduleAssignmentService, schedulerRegistry: SchedulerRegistry, workScheduleProducer: LeaveWorkScheduleProducer, employeeMappingService: EmployeeMappingService, groupMappingService: GroupMappingService, hrforteNotificationProducer: HrforteNotificationProducer, appConfig: Pick<AppConfig, 'clientUrl'>);
    updateAddAssigneesOfWorkSchedule(workScheduleId: number, assigneesDto: IWorkScheduleAssignee, companyId: number, userEmail: string): Promise<WorkScheduleEntity>;
    updateAddGroupAssigneesOfWorkSchedule(workScheduleId: number, assigneeGroupsDto: IWorkScheduleGroupAssignee, companyId: number, userEmail: string): Promise<WorkScheduleEntity>;
    updateRemoveAssigneesOfWorkSchedule(workScheduleId: number, employeeIds: number[], companyId: number, userEmail: string): Promise<WorkScheduleEntity>;
    updateRemoveGroupAssigneesOfWorkSchedule(workScheduleId: number, orgPaths: string[], companyId: number, userEmail: string): Promise<WorkScheduleEntity>;
    getTTWorkScheduleDefaultByWorkScheduleId(companyId: string): Promise<any>;
    getTTWorkScheduleByWorkScheduleId(workScheduleId: string, companyId: string): Promise<any>;
    getTTWorkScheduleByCompanyId(companyId: string): Promise<any>;
    handleCreateWorkSchedule(createWorkScheduleBodyDTO: CreateWorkScheduleBodyDTO, companyId: number, userEmail: string, timeTrackerCompanyId: string): Promise<any>;
    handleUpdateWorkSchedule(workScheduleId: number, companyId: number, timeTrackerCompanyId: string, userEmail: string, updateWorkScheduleBodyDTO: UpdateWorkScheduleBodyDTO): Promise<{
        updatedWorkSchedule: import("typeorm").UpdateResult;
        autoDeductionEntity: AutoDeductionEntity[] | BreakRuleEntity[] | DayScheduleEntity[];
        dayScheduleEntity: AutoDeductionEntity[] | BreakRuleEntity[] | DayScheduleEntity[];
        breakRuleEntity: AutoDeductionEntity[] | BreakRuleEntity[] | DayScheduleEntity[];
    }>;
    deleteWorkSchedule(workScheduleId: number, companyId: number, timeTrackerCompanyId: string, userEmail: string, optionDelete: string): Promise<string>;
    deleteWorkScheduleLeave(workScheduleId: number, companyId: number, userEmail: string, optionDelete: string): Promise<WorkScheduleEntity>;
    createWorkSchedule(companyId: number, userEmail: string, workScheduleDTO: Pick<CreateWorkScheduleBodyDTO, 'name' | 'workArrangement' | 'breakType' | 'default' | 'unitTime' | 'weeklyHours' | 'utcOffset' | 'ttWorkScheduleId' | 'overtime' | 'color' | 'state'>): Promise<WorkScheduleEntity>;
    updateWorkSchedule(companyId: number, userEmail: string, id: number, workScheduleDTO: Pick<UpdateWorkScheduleBodyDTO, 'name' | 'workArrangement' | 'breakType' | 'default' | 'unitTime' | 'weeklyHours' | 'overtime' | 'utcOffset' | 'color' | 'excludeEarlyClockIn'>): Promise<import("typeorm").UpdateResult>;
    getWorkScheduleOfDate(employeeId: number, companyId: number, date: string): Promise<WorkScheduleEntity | null>;
    getWorkScheduleOfMultipleDates(employeeId: number, companyId: number, dates: string[]): Promise<Record<string, WorkScheduleEntity>>;
    getBreakListByEmployeeId(employeeId: number, companyId: number, date: string, paginationQueryDto: PaginationQueryDto): Promise<PaginationResponseDto<BreakRuleEntity>>;
    getWorkScheduleByWorkScheduleId(workScheduleId: number, companyId: number): Promise<WorkScheduleEntity | null>;
    getWorkScheduleOfCompany(companyId: number): Promise<WorkScheduleEntity[]>;
    getNormalizedWorkScheduleByEmployee: (employeeIds: number[], companyId: number) => Promise<{
        [key: number]: WorkScheduleEntity | undefined;
    }>;
    getWorkScheduleByEmployeeId(employeeId: number): Promise<WorkScheduleEntity | null>;
    getWorkScheduleIdByCompanyId(companyId: number): Promise<WorkScheduleEntity[]>;
    getWorkScheduleByCompanyId(companyId: number): Promise<(WorkScheduleEntity | null)[]>;
    getAllWorkSchedulesByCompanyId(args: {
        companyId: number;
        query: WorkScheduleQueryDto;
    }): Promise<{
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        data: any[];
    }>;
    getLeaveGlobalWorkScheduleDefault(): Promise<WorkScheduleEntity | null>;
    getLeaveCompanyWorkScheduleDefault(companyId: number): Promise<WorkScheduleEntity | null>;
    getWorkScheduleByName(name: string, companyId: number): Promise<WorkScheduleEntity[]>;
    getWorkScheduleByWsTTId(workScheduleId: string, companyId: number): Promise<WorkScheduleEntity | null>;
    getWorkScheduleByTTIds(ids: string[], companyId: number): Promise<WorkScheduleEntity[]>;
    mapIdsToUUIDs(ids: number[]): Promise<string[]>;
    getTTWorkSchedulesByWorkScheduleIds(ids: number[], companyId: number): Promise<WorkScheduleEntity[]>;
    getTTWorkSchedulesByWorkScheduleIdsWithAssignees(ids: number[], companyId: number): Promise<WorkScheduleEntity[]>;
    updateTTWorkSchedule(id: number, ttWorkScheduleId: string): Promise<WorkScheduleEntity>;
    handleCreateWorkScheduleLeave(createWorkScheduleBodyDTO: CreateWorkScheduleBodyDTO, companyId: number, userEmail: string): Promise<{
        workScheduleEntity: WorkScheduleEntity;
        autoDeductionEntity: void[] | import("../location-work-schedule/dtos").LocationWorkScheduleDto[];
        dayScheduleEntity: void[] | import("../location-work-schedule/dtos").LocationWorkScheduleDto[];
        overTimeEntity: void[] | import("../location-work-schedule/dtos").LocationWorkScheduleDto[];
        breakRuleEntity: void[] | import("../location-work-schedule/dtos").LocationWorkScheduleDto[];
        locationEntity: void[] | import("../location-work-schedule/dtos").LocationWorkScheduleDto[];
    }>;
    handleUpdateWorkScheduleLeave(workScheduleId: number, companyId: number, userEmail: string, updateWorkScheduleBodyDTO: UpdateWorkScheduleBodyDTO): Promise<{
        updatedWorkSchedule: import("typeorm").UpdateResult;
        autoDeductionEntity: AutoDeductionEntity[] | BreakRuleEntity[] | DayScheduleEntity[];
        dayScheduleEntity: AutoDeductionEntity[] | BreakRuleEntity[] | DayScheduleEntity[];
        breakRuleEntity: AutoDeductionEntity[] | BreakRuleEntity[] | DayScheduleEntity[];
    }>;
    getWorkScheduleLeaveDefault(companyId: number): Promise<WorkScheduleEntity | null>;
    updateTtIdForWorkScheduleLeaveDefault(workScheduleId: number, ttWorkScheduleId: string): Promise<import("typeorm").UpdateResult>;
    syncExistedWorkScheduleWithAssigneesAndGroupAssignees(companyId: number, timeTrackerCompanyId: string): Promise<any[] | null>;
    syncAssignmentsToTimeTracker(companyId: number, ttCompanyId: string): Promise<null>;
    syncExistedWorkSchedule(companyId: number, timeTrackerCompanyId: string): Promise<({
        workScheduleEntity: WorkScheduleEntity;
        autoDeductionEntity: AutoDeductionEntity;
        dayScheduleEntity: DayScheduleEntity;
        overTimeEntity: {
            endWorkDayAt: string;
        };
        breakRuleEntity: BreakRuleEntity;
        locationEntity: LocationEntity;
    } | null)[] | null>;
    getWorkScheduleOfEmployee(employeeId: number, companyId: number, employeeEntity?: EmployeeEntity): Promise<WorkScheduleEntity>;
    deleteLinkedTtByCompanyId(workScheduleId: number, companyId: number): Promise<import("typeorm").UpdateResult>;
    publishWorkSchedule(params: {
        companyId: number;
        workScheduleId: number;
        startDate: string;
        endDate: string;
        userEmail: string;
        timeTrackerCompanyId: string;
        publishType?: EWorkSchedulePublishType;
    }): Promise<{
        id: number;
        state: EWorkScheduleState;
        updatedBy: string;
        updatedOn: Date;
        startDate: string;
        endDate: string;
        publishHistories: IWorkSchedulePublishHistory[];
        publishType: EWorkSchedulePublishType;
    } & WorkScheduleEntity>;
    sendWorkScheduleNotification(params: {
        employeeIds: number[];
        userEmail: string;
        companyId: number;
        dateFrom: string;
        dateTo: string;
        workScheduleId: number;
        verb: string;
        workScheduleName: string;
    }): Promise<void>;
    getAssigneesIsNotAssignedToWorkSchedule(companyId: number): Promise<EmployeeEntity[]>;
    getAssigneesWasAssignedToWorkSchedule(companyId: number, workSchedule: Partial<Pick<WorkScheduleEntity, 'assignees' | 'groupAssignees'>>): Promise<IWorkScheduleAssignee>;
    syncPublishedWorkSchedule(args: {
        ttCompanyId: string;
        workScheduleId: string;
        startDate: string;
        endDate: string;
        publishType?: EWorkSchedulePublishType;
    }): Promise<any>;
    unpublishWorkSchedule(args: {
        workScheduleId: number;
        companyId: number;
        userEmail: string;
        timeTrackerCompanyId: string;
    }): Promise<string>;
    syncUnpublishedWorkSchedule(args: {
        ttCompanyId: string;
        workScheduleId: string;
    }): Promise<any>;
    removeWorkSchedule(args: {
        companyId: number;
        workScheduleId: number;
    }): Promise<WorkScheduleEntity>;
    handleExpiredWorkSchedule(workSchedule: WorkScheduleEntity, companyId: number, endDate: string, ttCompanyId: string): Promise<void>;
    syncExpiredWorkSchedule(args: {
        ttCompanyId: string;
        workScheduleId: string;
    }): Promise<void>;
    private cancelScheduleExpiredJob;
    updateWorkScheduleDefault(args: {
        workScheduleId: number;
        companyId: number;
        ttCompanyId: string;
        userEmail: string;
    }): Promise<string>;
    private moveAssigneeFromDefaultToNewDefault;
    getAssigneesOfWorkSchedule({ workScheduleId, paginationQueryDto, companyId, }: {
        workScheduleId: number;
        paginationQueryDto: GetAssigneesQueryDto;
        companyId: number;
    }): Promise<{
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
    getAssigneesOfWorkScheduleWithoutPagination({ workScheduleId, companyId, }: {
        workScheduleId: number;
        companyId: number;
    }): Promise<{
        email: string;
        employeeRef: string;
        employeeNo: string;
        fullNameLocal: string;
        fullNameEn: string;
        employeeId: number;
        groupId?: number;
        groupName?: string;
    }[]>;
    getAllEmployeesInGroupAndSubGroups(companyId: number, orgPaths: string[]): Promise<{
        email: string;
        employeeRef: string;
        employeeNo: string;
        fullNameLocal: string;
        fullNameEn: string;
        employeeId: number;
        groupId: number;
        groupName: string;
    }[]>;
    getGroupAssigneesOfWorkSchedule({ workScheduleId, paginationQueryDto, companyId, }: {
        workScheduleId: number;
        paginationQueryDto: GetAssigneesQueryDto;
        companyId: number;
    }): Promise<{
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
    getGroupAssigneesOfWorkScheduleWithoutPagination({ workScheduleId, companyId, }: {
        workScheduleId: number;
        companyId: number;
    }): Promise<{
        name: string;
        id: number;
        orgPath: string;
        parentId?: number;
        parentGroupName?: string | null;
    }[]>;
    getAllWorkSchedulesIsOverlap(params: {
        companyId: number;
        startDate: string;
        endDate: string;
        workScheduleId: number;
    }): Promise<WorkScheduleEntity[]>;
    getWorkScheduleDefaultByCompanyId(companyId: number): Promise<WorkScheduleEntity | null>;
    handleGetWorkScheduleOfEmployeeFromToDate({ employeeId, companyId, startDate, endDate, query, }: {
        employeeId: number;
        companyId: number;
        startDate: string;
        endDate: string;
        query: PaginationQueryDto;
    }): Promise<PaginationResponseDto<{
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
    handleGetAllWorkScheduleFromToDate({ companyId, startDate, endDate, query, }: {
        companyId: number;
        startDate: string;
        endDate: string;
        query: GetAllWorkScheduleInMultipleDateQueryDto;
    }): Promise<PaginationResponseDto<{
        date: string;
        workScheduleEntity: WorkScheduleEntity[];
    }> | PaginationResponseDto<{
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
    checkInDefaultWorkSchedule(companyId: number, checkInDefaultWorkScheduleDto: CheckInDefaultWorkScheduleDto): Promise<{
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
    getDetailESSWorkSchedule(args: {
        companyId: number;
        workScheduleId: number;
    }): Promise<{
        id: number;
        name: string;
        color: string;
        startDate: Date;
        endDate: Date;
        isDeleted: boolean;
        state: EWorkScheduleState;
        assignees: {
            [k: string]: unknown;
        };
        assigneesCount: number;
        groupAssignees: {
            [k: string]: unknown;
        };
        groupAssigneesCount: number;
        daySchedules: DayScheduleEntity[];
        publisher: string | null;
        publishedTime: string | null;
    } | null>;
    private countAndGetFirstFiveObjects;
    private getScheduleForDate;
    getAllWorkScheduleOfGroupByOrgId({ companyId, orgId, }: {
        companyId: number;
        orgId: number;
    }): Promise<({
        workScheduleId: number;
        workScheduleName: string;
        state: EWorkScheduleState;
        parentId: number | undefined;
        parentGroupName: string | null | undefined;
    } | null)[]>;
    getAllWorkScheduleOfEmployeeByEmployeeId({ companyId, employeeId, }: {
        companyId: number;
        employeeId: number;
    }): Promise<({
        workScheduleId: number;
        workScheduleName: string;
        state: EWorkScheduleState;
        groupId: number | undefined;
        groupName: string | undefined;
        startDate: Date;
        endDate: Date;
        default: boolean;
    } | null)[]>;
    getWorkScheduleQueryBuilder(args: GetWorkScheduleArguments, options?: GetWorkScheduleOptions): import("typeorm").SelectQueryBuilder<WorkScheduleEntity>;
    getAllPublishedGroupWorkScheduleOfEmployee(employeeId: number, companyId: number): Promise<WorkScheduleEntity[]>;
    getOldestLatestWorkSchedule(workSchedules: WorkScheduleEntity[], type: 'oldest' | 'latest'): null;
    getMainWorkScheduleInDate(date: string, workSchedules: WorkScheduleEntity[]): WorkScheduleEntity | null;
    getGroupWorkScheduleOfEmployeeOnGivenWorkSchedules(employee: EmployeeEntity, workSchedules: WorkScheduleEntity[], rootGroupId?: number): WorkScheduleEntity[];
    getAllWorkScheduleOfManyEmployeesInDateRange(params: {
        employeeIds: number[];
        companyId: number;
        listDates: string[];
        groupByEmployee?: boolean;
    }): Promise<{
        [date: string]: WorkScheduleEntity[];
    }>;
    getWorkScheduleOfManyEmployeesInDateRange(params: {
        employeeIds: number[];
        companyId: number;
        startDate: string;
        endDate?: string;
        groupByEmployee?: boolean;
    }): Promise<{
        [date: string]: {
            [employeeId: string]: WorkScheduleEntity;
        };
    }>;
    getWorkScheduleOfEmployeeInDateRange(params: {
        employeeId: number;
        companyId: number;
        startDate: string;
        endDate?: string;
    }): Promise<Record<string, WorkScheduleEntity>>;
    getAllWorkSchedulePublishedForWsAssignment(companyId: number): Promise<Array<WorkScheduleEntity & {
        listOrganizationPaths: string[];
    }>>;
    checkIsExistedWsDefaultAtFirstTime(args: {
        companyId: number;
    }): Promise<boolean>;
}

import { Repository } from 'typeorm';
import { AppConfig } from '../../../../config';
import { TypeOrmBaseService, WorkScheduleEntity } from '../../../../core/database';
import { WorkScheduleAssignmentEntity } from '../../../../core/database/entities/work-schedule-assignment.entity';
import { HrforteNotificationProducer, LeaveWorkScheduleAssignmentProducer } from '../../../../core/queue/producers';
import { EmployeeService } from '../../../user/modules/employee/employee.service';
import { EWorkSchedulePublishType } from '../work-schedule/enums/work-schedule-publish-type.enum';
import { EWorkScheduleState } from '../work-schedule/enums/work-schedule-state.enum';
import { WorkScheduleService } from '../work-schedule/work-schedule.service';
import { WorkAssignmentQueryDto, WorkScheduleAssignmentDto } from './dtos';
export declare class WorkScheduleAssignmentService extends TypeOrmBaseService<WorkScheduleAssignmentEntity> {
    private readonly workScheduleAssignmentRepository;
    private readonly workScheduleAssignmentProducer;
    private readonly employeeService;
    private readonly hrforteNotificationProducer;
    private readonly workScheduleService;
    private readonly appConfig;
    constructor(workScheduleAssignmentRepository: Repository<WorkScheduleAssignmentEntity>, workScheduleAssignmentProducer: LeaveWorkScheduleAssignmentProducer, employeeService: EmployeeService, hrforteNotificationProducer: HrforteNotificationProducer, workScheduleService: WorkScheduleService, appConfig: Pick<AppConfig, 'clientUrl'>);
    createManyWSAssignments(args: {
        assignments: WorkScheduleAssignmentDto[];
        userEmail: string;
        companyId: number;
    }): Promise<WorkScheduleAssignmentEntity[]>;
    assignWorkScheduleToMultipleEmployees({ employeeIds, companyId, workScheduleId, specificDates, batchSize, userEmail, }: {
        employeeIds: number[];
        companyId: number;
        workScheduleId: number;
        specificDates: Date[];
        batchSize?: number;
        userEmail: string;
    }): Promise<{
        message: string;
        assigneeIds: number[];
    }>;
    deleteAssignmentsOfEmployeeIdsWithWorkScheduleIds(employeeWorkSchedules: {
        employeeId: number;
        workScheduleId: number;
    }[], companyId: number, userEmail: string): Promise<void>;
    removeWorkScheduleAssignment(args: {
        workScheduleId: number;
        companyId: number;
        state: EWorkScheduleState;
    }): Promise<string>;
    removeWorkScheduleAssignmentQueue(args: {
        workScheduleId: number;
        companyId: number;
        state: EWorkScheduleState;
    }): Promise<void>;
    getOneWorkScheduleAssignment(args: {
        companyId: number;
        workScheduleId: number;
    }): Promise<WorkScheduleAssignmentEntity>;
    getManyWorkScheduleAssignments(args: {
        companyId: number;
        workScheduleId: number;
    }): Promise<WorkScheduleAssignmentEntity[]>;
    checkIsRelatedActionsBelongToWorkScheduleAssignment(args: {
        workScheduleId: number;
        companyId: number;
    }): Promise<{
        isExistedAnyRelatedActions: boolean;
        relatedAction: string;
    }>;
    private formatTime;
    private paginateResults;
    getWorkScheduleAssignmentByCompanyId(args: {
        companyId: number;
        query: WorkAssignmentQueryDto;
    }): Promise<{
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        data: any[];
    }>;
    private processWorkSchedules;
    private formatEmployeeSchedules;
    private generateDaySchedules;
    private findApplicableSchedule;
    private mapDayOfWeek;
    private handleSearchAssignment;
    private checkIsInWorkScheduleDefault;
    publishWorkScheduleAssignment(params: {
        companyId: number;
        userEmail: string;
        workScheduleId: number;
        assigneeIds: number[];
        startDate: string;
        endDate: string;
        publishType?: EWorkSchedulePublishType;
    }): Promise<void>;
    sendWorkScheduleNotification(params: {
        employeeIds: number[];
        userEmail: string;
        companyId: number;
        dateFrom: string;
        dateTo: string;
        workScheduleId: number;
        verb: string;
    }): Promise<void>;
    getWorkScheduleAssignmentsByEmployeeIdWithDate(employeeId: number, companyId: number, date: string): Promise<WorkScheduleAssignmentEntity | null>;
    getWorkScheduleAssignmentsByEmployeeId(employeeId: number, companyId: number): Promise<WorkScheduleAssignmentEntity[]>;
    getAllAssignmentsOfCompany(companyId: number): Promise<WorkScheduleAssignmentEntity[]>;
    getWorkScheduleOfEmployeeMultipleDate(params: {
        employeeId: number;
        date: string[];
        companyId: number;
    }): Promise<Record<string, WorkScheduleEntity>>;
    getAllWorkScheduleOfMultipleDate(params: {
        date: string[];
        companyId: number;
        employeeIds?: number[];
    }): Promise<Record<string, WorkScheduleEntity[]>>;
}

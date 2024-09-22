import { DayToProrateDto } from './dtos/day-to-prorate.dto';
import { Repository } from 'typeorm';
import { CyclePeriodDetailEntity, CyclePeriodHeaderEntity } from '../../../../core/database';
import { WorkScheduleService } from '../../../time-tracker/modules/work-schedule';
import { EmployeeService } from '../../../user/modules/employee/employee.service';
import { PayRollGroupService } from '../../../payroll/modules/payroll-group/payroll-group.service';
import { OvertimeDetailEntity } from '../../../../core/database/entities/overtime-detail.entity';
import { OvertimeHeaderEntity } from '../../../../core/database/entities/overtime-hdr.entity';
import { WorkScheduleAssignmentService } from '../../../time-tracker/modules/work-schedule-assignment/work-schedule-assignment.service';
export declare class OvertimeService {
    private readonly cyclePeriodHeaderRepository;
    private readonly cyclePeriodDetailRepository;
    private readonly overtimeDetailRepository;
    private readonly overtimeHeaderRepository;
    private readonly workScheduleService;
    private readonly employeeService;
    private readonly payrollGroupService;
    private readonly workScheduleAssignmentService;
    constructor(cyclePeriodHeaderRepository: Repository<CyclePeriodHeaderEntity>, cyclePeriodDetailRepository: Repository<CyclePeriodDetailEntity>, overtimeDetailRepository: Repository<OvertimeDetailEntity>, overtimeHeaderRepository: Repository<OvertimeHeaderEntity>, workScheduleService: WorkScheduleService, employeeService: EmployeeService, payrollGroupService: PayRollGroupService, workScheduleAssignmentService: WorkScheduleAssignmentService);
    private getCycleDateRange;
    getDayToProrate(data: DayToProrateDto[], companyId: number): Promise<{
        overtimeDetailId: number | undefined;
        employeeId: number;
        dayToProrate: number;
    }[]>;
    getDayToProrateOfAnEmployee(payload: DayToProrateDto, companyId: number): Promise<{
        overtimeDetailId: number | undefined;
        employeeId: number;
        dayToProrate: number;
    }>;
    getDayToProrateOfAnEmployeeV2(payload: DayToProrateDto, companyId: number): Promise<{
        overtimeDetailId: number | undefined;
        employeeId: number;
        dayToProrate: number;
    }>;
    getDayToProrateOfEmployeeOvertimeHeader(companyId: number, overtimeHeaderId: number, overtimeDetailIds?: number[]): Promise<{
        id: number | undefined;
        daysToProrate: number;
    }[]>;
}

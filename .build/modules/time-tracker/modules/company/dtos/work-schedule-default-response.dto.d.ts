import type { BreakType, UnitTime, WorkArrangement } from 'modules/time-tracker/common/enums';
import type { CreateAutoDeductionDTO } from '../../auto-deduction/dtos';
import type { CreateBreakRuleDTO } from '../../break-rule/dtos';
import type { CreateDayScheduleDTO } from '../../day-schedule/dtos';
import type { CreateOvertimeDTO } from '../../overtime/dtos';
export declare class WorkScheduleDefaultResponseDto {
    id: string;
    name: string;
    workArrangement: WorkArrangement;
    breakType: BreakType;
    default: boolean;
    weeklyHours: number;
    unitTime: UnitTime;
    utcOffset: number;
    excludeEarlyClockIn: boolean;
    autoDeductions: CreateAutoDeductionDTO[];
    breaks: CreateBreakRuleDTO[];
    daySchedules: CreateDayScheduleDTO[];
    locations: number[];
    overtime: CreateOvertimeDTO;
}

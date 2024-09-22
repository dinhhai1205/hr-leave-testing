import { CreateWorkScheduleBodyDTO } from './create-work-schedule-body.dto';
import { UpdateAutoDeductionDto } from '../../auto-deduction/dtos';
import { UpdateBreakRuleDTO } from '../../break-rule/dtos';
import { UpdateDayScheduleDTO } from '../../day-schedule/dtos';
import { UpdateOvertimeDTO } from '../../overtime/dtos';
import { UpdateLocationWorkScheduleDto } from '../../location-work-schedule/dtos';
declare const UpdateWorkScheduleBodyDTO_base: import("@nestjs/common").Type<Pick<CreateWorkScheduleBodyDTO, "name" | "color" | "default" | "utcOffset" | "breakType" | "unitTime" | "workArrangement" | "weeklyHours" | "excludeEarlyClockIn">>;
export declare class UpdateWorkScheduleBodyDTO extends UpdateWorkScheduleBodyDTO_base {
    autoDeductions: UpdateAutoDeductionDto[];
    breaks: UpdateBreakRuleDTO[];
    daySchedules: UpdateDayScheduleDTO[];
    overtime: UpdateOvertimeDTO;
    locations: UpdateLocationWorkScheduleDto[];
    autoDeductionsDeleted?: number[];
    breaksDeleted?: number[];
    daySchedulesDeleted?: number[];
    locationsDeleted?: number[];
}
export {};

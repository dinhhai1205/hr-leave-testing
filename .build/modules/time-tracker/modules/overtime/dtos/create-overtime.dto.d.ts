import { TimeRangeStyle, UnitTime } from '../../../common';
export declare class CreateOvertimeDTO {
    dailyOvertime?: boolean;
    timeRangeStyle: TimeRangeStyle;
    dailyFrom?: string;
    dailyDuration?: number;
    dailyOvertimeMultiplier?: number;
    dailyDoubleOvertime?: boolean;
    dailyDoubleFrom?: string;
    dailyDoubleDuration?: number;
    dailyDoubleOvertimeMultiplier?: number;
    endWorkDayAt: string;
    weeklyDuration?: number;
    weeklyOvertime?: boolean;
    weeklyOvertimeMultiplier?: number;
    restDayOvertime?: boolean;
    restDayOvertimeMultiplier?: number;
    publicHolidayOvertime?: boolean;
    publicHolidayOvertimeMultiplier?: number;
    unitTime?: UnitTime;
}

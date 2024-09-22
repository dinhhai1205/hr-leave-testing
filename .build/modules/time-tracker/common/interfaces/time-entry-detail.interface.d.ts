import type { EmployeeEntity, WorkScheduleEntity } from '../../../../core/database';
import type { TimeEntryEntity } from '../../modules/time-entry';
import type { UnitTime } from '../enums';
export interface ITimeEntryDetailResponse {
    date: string;
    day: string;
    theLatestClockIn: boolean | null;
    firstIn: TimeEntryEntity | null;
    lastOut: TimeEntryEntity | null;
    timeEntries: TimeEntryEntity[];
    employeeInfo?: EmployeeEntity;
    workScheduleEntity?: WorkScheduleEntity;
    trackedHour: {
        trackedHour: number;
        sumBreakTimeById: {
            [key: string]: number;
        };
        workedHour: number;
        breakHour: number;
        unitTime: UnitTime;
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
        unitTime: UnitTime;
    };
}

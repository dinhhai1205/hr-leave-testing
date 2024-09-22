import type { EmployeeEntity, WorkScheduleEntity } from '../../../../../core/database';
import type { DayType, TimeEntryType, UnitTime } from '../../../common';
import type { ITimeEntryDetailResponse } from '../../../common/interfaces';
import type { ActivityEntity } from '../../activity/activity.entity';
import type { ProjectEntity } from '../../project/project.entity';
import type { TimeEntryEntity } from '../time-entry.entity';
import type * as moment from 'moment';
export declare class TimeEntryDetailResponseDto {
    employeeInfo: EmployeeEntity;
    date: string;
    day: string;
    timeEntries: TimeEntryEntity[];
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
    splitTime: string;
}
export declare class OverTimeDTO {
    regular: number;
    dailyOvertime: number;
    dailyDoubleOvertime: number;
    weeklyOvertime: number;
    restDayOvertime: number;
    publicHolidayOvertime: number;
}
export declare class TrackedHourDTO {
    trackedHour: number;
    workedHour: number;
    breakHour: number;
}
export declare class PayrollHourDTO {
    payrollHour: number;
    workedHour: number;
    overTime: OverTimeDTO;
    breakPaid: number;
    autoDeduction: number;
}
export declare class SummaryWeeklyDTO {
    trackedHour: TrackedHourDTO;
    payrollHour: PayrollHourDTO;
}
export declare class TimeEntriesRecordDTO {
    trackingInDay: TimeEntryDetailResponseDto;
}
export declare class SummaryWeekLyTrackedHourResponseDto {
    timeEntries: Record<string, TimeEntriesRecordDTO>;
    summaryWeekly: SummaryWeeklyDTO;
}
export declare class GetTimeEntriesDetailResponseDto implements ITimeEntryDetailResponse {
    date: string;
    day: string;
    theLatestClockIn: boolean | null;
    firstIn: TimeEntryEntity | null;
    lastOut: TimeEntryEntity | null;
    timeEntries: TimeEntryEntity[];
    employeeInfo?: EmployeeEntity | undefined;
    workScheduleEntity?: WorkScheduleEntity | undefined;
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
export declare class SummarizeOverviewTimeEntriesResponseDto {
    trackedHours: number;
    payrollHours: number;
    scheduledWorkHours: number;
    breakHours: number;
    autoDeduction: number;
    scheduledWorkHoursUnitTime: string;
}
export declare class TimeEntryDTO {
    timeEntryType: TimeEntryType;
    timeEntry: Date;
    project: ProjectEntity;
    activity: ActivityEntity;
    splitTime: moment.Moment;
}
export declare class GetLastActivityResponseDto {
    penultimate: TimeEntryDTO | null;
    last: TimeEntryDTO | null;
}
export declare class EmployeeInfoDto {
    id: string;
    firstName: string;
    lastName: string;
}
export declare class TimesheetDto {
    day: string;
    date: DayType;
    totalWorkScheduleHour: null | number;
    trackedHour: number;
    payrollHour: number;
    breakHour: number;
    autoDeduction: number;
    trackedHourDay: null | number;
    payrollHourDay: null | number;
}
export declare class GetTimesheetOfEmployeeResponseDto {
    employeeInfo: EmployeeInfoDto;
    timesheet: TimesheetDto[];
}

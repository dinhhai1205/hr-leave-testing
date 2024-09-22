import { TimeEntryType, UnitTime } from '../../../common';
export declare class CreateTimeEntryBodyDto {
    timeEntryType: TimeEntryType;
    utcOffset: number;
    unitTime: UnitTime;
    timeEntry?: Date;
    description?: string;
    employeeId: number;
    endBreakTime?: Date;
    breakId?: string;
    projectId?: string;
    activityId?: string;
    locationWorkScheduleId?: string;
    endTimeEntry?: Date;
}

import { BaseTimeTrackerEntity, StatusTimeEntry, TimeEntryType, UnitTime } from '../../common';
export declare class TimeEntryEntity extends BaseTimeTrackerEntity {
    timeEntryType: TimeEntryType;
    utcOffset: number;
    timeEntry: Date;
    description: string;
    localDate: string;
    totalDuration: number;
    reasonDelete: string;
    status: StatusTimeEntry;
    unitTime: UnitTime;
    nextTimeEntryId: string;
    previousTimeEntryId: string;
    belongsToDate: string;
    breakId: string;
    projectId: string;
    isManual: boolean;
    employeeId: string;
    workScheduleId: string;
    companyId: string;
    breakRuleId: string;
    activityId: string;
}

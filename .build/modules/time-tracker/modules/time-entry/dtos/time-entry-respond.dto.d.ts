import { StatusTimeEntry, TimeEntryType, UnitTime } from '../../../common';
export declare class TimeEntryResponseDTO {
    id: string;
    timeEntryType: TimeEntryType;
    utcOffset: number;
    timeEntry?: Date;
    description: string;
    localDate: string;
    totalDuration: number;
    status: StatusTimeEntry;
    nextTimeEntryId: string;
    previousTimeEntryId: string;
    breakId: string;
    employeeId: string;
    workScheduleId: string;
    companyId: string;
    projectId: string;
    activityId: string;
    reasonDelete: string;
    belongsToDate: string;
    isManual: boolean;
    unitTime: UnitTime;
}

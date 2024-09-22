import { TimeEntryType } from '../../../common';
export declare class UpdateMultiTimeEntryDto {
    id: string;
    timeEntry: Date;
    description: string;
    projectId: string;
    activityId: string;
    locationWorkScheduleId: string;
    timeEntryType: TimeEntryType;
    employeeId: number;
}

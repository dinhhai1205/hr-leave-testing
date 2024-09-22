import type { WorkScheduleEntity } from '../../../../core/database';
import type { TimeTrackerWorkScheduleEntity } from '../../modules/work-schedule';
import type { ITimeEntryDetailResponse } from './time-entry-detail.interface';
export interface ITimeEntryOverviewResponse {
    timeEntries: ITimeEntryDetailResponse[];
    employeeInfo: {
        id: string;
        firstName: string;
        lastName: string;
    };
    group: {
        id: string;
        groupName: string | undefined;
    } | null;
    workSchedule: TimeTrackerWorkScheduleEntity | null;
}
export interface ITimeEntryOverviewData {
    timeEntries: ITimeEntryDetailResponse[];
    employeeInfo: {
        id: number;
        firstName: string;
        lastName: string;
    };
    group: {
        id: string;
        groupName: string | undefined;
    } | null;
    workSchedule?: WorkScheduleEntity | null;
}

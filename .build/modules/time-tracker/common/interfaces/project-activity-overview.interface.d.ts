import type { ActivityEntity } from '../../modules/activity/activity.entity';
import type { EmployeeEntity } from '../../modules/employee/employee.entity';
import type { ProjectEntity } from '../../modules/project/project.entity';
import type { TimeTrackerWorkScheduleEntity } from '../../modules/work-schedule';
import type { ITimeEntryDetailResponse } from './time-entry-detail.interface';
export interface IProjectOverview {
    project: ProjectEntity;
    employeeInfo: EmployeeEntity;
    workSchedule: TimeTrackerWorkScheduleEntity | null;
    timeEntries: ITimeEntryDetailResponse[];
    activity?: undefined;
}
export interface IGetOverViewActivity {
    activity: ActivityEntity;
    employeeInfo: EmployeeEntity;
    workSchedule: TimeTrackerWorkScheduleEntity | null;
    timeEntries: ITimeEntryDetailResponse[];
    project?: undefined;
}
export type GetOverViewProjectActivity = IProjectOverview | IGetOverViewActivity;

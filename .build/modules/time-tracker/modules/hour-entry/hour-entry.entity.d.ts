import { BaseTimeTrackerEntity, UnitTime } from '../../common';
export declare class HoursEntryEntity extends BaseTimeTrackerEntity {
    duration: number;
    date: string;
    description: string;
    employeeId: string;
    projectId: string;
    activityId: string;
    locationWorkScheduleId: string;
    unitTime: UnitTime;
    companyId: string;
    reasonDelete: string;
}

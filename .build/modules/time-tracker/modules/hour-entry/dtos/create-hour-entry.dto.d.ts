import { UnitTime } from '../../../common';
export declare class CreateHourEntryDto {
    duration: number;
    date: string;
    description: string;
    employeeId: number;
    projectId: string;
    activityId: string;
    locationWorkScheduleId: number;
    unitTime: UnitTime;
}

import { BaseTimeTrackerEntity, BreakType, UnitTime, WorkArrangement } from '../../common';
export declare class TimeTrackerWorkScheduleEntity extends BaseTimeTrackerEntity {
    name: string;
    workArrangement: WorkArrangement;
    breakType: BreakType;
    default: boolean;
    weeklyHours: number;
    unitTime: UnitTime;
    excludeEarlyClockIn: boolean;
    companyId: string;
}

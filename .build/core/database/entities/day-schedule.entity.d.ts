import { DayType, UnitTime } from '../../../modules/time-tracker/common';
import { BaseAppEntity } from './base-app.entity';
import { WorkScheduleEntity } from './work-schedule.entity';
export declare class DayScheduleEntity extends BaseAppEntity {
    ttDayScheduleId: string;
    day: DayType;
    from: string;
    to: string;
    duration: number;
    unitTime: UnitTime;
    workSchedule: WorkScheduleEntity;
    companyId: number;
    workScheduleId: number;
}

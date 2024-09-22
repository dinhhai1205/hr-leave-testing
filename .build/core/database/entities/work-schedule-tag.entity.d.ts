import { BaseAppEntity } from './base-app.entity';
import { TimeTrackerTagEntity } from './time-tracker-tag.entity';
import { WorkScheduleEntity } from './work-schedule.entity';
export declare class WorkScheduleTagEntity extends BaseAppEntity {
    workScheduleId: number;
    tagId: number;
    companyId: number;
    tag: TimeTrackerTagEntity;
    workSchedule: WorkScheduleEntity;
}

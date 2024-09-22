import { BaseAppEntity } from './base-app.entity';
import { WorkScheduleTagEntity } from './work-schedule-tag.entity';
export declare class TimeTrackerTagEntity extends BaseAppEntity {
    name: string;
    code: string;
    description: string;
    color: string;
    companyId: number;
    workScheduleTags: WorkScheduleTagEntity[];
}

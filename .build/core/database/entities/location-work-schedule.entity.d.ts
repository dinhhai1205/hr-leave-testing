import { BaseAppEntity } from './base-app.entity';
import { LocationEntity } from './location.entity';
import { WorkScheduleEntity } from './work-schedule.entity';
export declare class LocationWorkScheduleEntity extends BaseAppEntity {
    companyId: number;
    locationId: number;
    workScheduleId: number;
    location: LocationEntity;
    workSchedule: WorkScheduleEntity;
}

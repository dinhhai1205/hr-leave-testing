import { UnitTime } from '../../../modules/time-tracker/common';
import { BaseAppEntity } from './base-app.entity';
import { WorkScheduleEntity } from './work-schedule.entity';
export declare class AutoDeductionEntity extends BaseAppEntity {
    ttAutoDeductionId: string;
    name: string;
    duration: number;
    threshold: number;
    unitTime: UnitTime;
    workSchedule: WorkScheduleEntity;
    companyId: number;
    workScheduleId: number;
}

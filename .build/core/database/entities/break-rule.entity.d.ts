import { UnitTime } from '../../../modules/time-tracker/common';
import { BaseAppEntity } from './base-app.entity';
import { WorkScheduleEntity } from './work-schedule.entity';
export declare class BreakRuleEntity extends BaseAppEntity {
    ttBreakRuleId: string;
    name: string;
    allowToBeTakenFromTo: boolean;
    duration: number;
    from: string;
    to: string;
    unitTime: UnitTime;
    workSchedule: WorkScheduleEntity;
    companyId: number;
    workScheduleId: number;
}

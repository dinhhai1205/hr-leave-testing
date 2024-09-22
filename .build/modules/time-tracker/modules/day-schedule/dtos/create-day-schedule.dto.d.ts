import { DayType, UnitTime } from '../../../common';
export declare class CreateDayScheduleDTO {
    day: DayType;
    ttDayScheduleId?: string;
    from: string;
    to: string;
    duration: number;
    unitTime: UnitTime;
}

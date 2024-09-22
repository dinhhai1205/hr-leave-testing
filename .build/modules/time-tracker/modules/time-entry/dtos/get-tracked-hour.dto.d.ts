import { Period } from '../../../common';
export declare class GetTrackedHourDto {
    period: Period;
    date: string;
    userId: number | number[];
    groupId: number | number[];
    workScheduleId: number | number[];
}

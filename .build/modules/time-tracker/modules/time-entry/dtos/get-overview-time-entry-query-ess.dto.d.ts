import { PaginationQueryDto } from '../../../common';
export declare class GetTimeEntriesOverviewQueryESSDto extends PaginationQueryDto {
    groupIds: number[];
    payrollHourMin: number;
    payrollHourMax: number;
    workScheduleIds: number[];
    trackedHourMin: number;
    trackedHourMax: number;
    startDate: string;
    endDate: string;
}

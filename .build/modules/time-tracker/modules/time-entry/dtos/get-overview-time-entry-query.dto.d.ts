import { PaginationQueryDto } from '../../../common';
export declare class GetTimeEntriesOverviewQueryDto extends PaginationQueryDto {
    groupIds: number[];
    employeeIds: number[];
    payrollHourMin: number;
    payrollHourMax: number;
    workScheduleIds: number[];
    trackedHourMin: number;
    trackedHourMax: number;
    startDate: string;
    endDate: string;
}

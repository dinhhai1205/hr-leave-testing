import { DashboardFilter } from '../../../common';
export declare class DashboardQueryDto {
    groupId?: string;
    scheduleId?: string;
    locationId?: string;
    from: string;
    to: string;
    filter: DashboardFilter;
}

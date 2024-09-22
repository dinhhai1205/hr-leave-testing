import { DashboardFilter } from '../../../common';
export declare class DashboardDataPayloadDto {
    companyId: string;
    groupId?: string;
    scheduleId?: string;
    locationId?: string;
    from: string;
    to: string;
    filter: DashboardFilter;
}

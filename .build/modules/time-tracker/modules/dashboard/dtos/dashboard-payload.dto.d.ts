import { DashboardTime } from '../../../common';
export declare class DashboardPayloadDto {
    companyId: string;
    groupId?: string;
    scheduleId?: string;
    locationId?: string;
    time: DashboardTime;
}

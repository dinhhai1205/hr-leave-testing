import { TimeTrackerApiService } from '../../libs/api/api.service';
import { DashboardQueryDto } from './dtos';
export declare class DashboardService {
    private readonly apiService;
    constructor(apiService: TimeTrackerApiService);
    trackerHourDashboardByCompany(args: {
        companyId: string;
        query: DashboardQueryDto;
    }): Promise<never[] | {
        totals: {
            totalTrackedHour: any;
            totalBreakHour: any;
        };
        trackedHours: {
            day: string;
            trackedHour: any;
        }[];
    } | undefined>;
    getProjectTimeTracked(args: {
        companyId: string;
        query: DashboardQueryDto;
    }): Promise<{
        name: string;
        totalWorkHour: number;
    }[] | undefined>;
    getActivityTimeTracked(args: {
        companyId: string;
        query: DashboardQueryDto;
    }): Promise<{
        name: string;
        totalWorkHour: number;
    }[] | undefined>;
}

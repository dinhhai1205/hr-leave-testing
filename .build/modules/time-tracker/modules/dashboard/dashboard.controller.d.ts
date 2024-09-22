import { DashboardService } from './dashboard.service';
import { DashboardQueryDto } from './dtos';
import { TimeTrackerMapping } from '../../common';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    trackerHourDashboardByCompany(companyId: string, query: DashboardQueryDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<never[] | {
        totals: {
            totalTrackedHour: any;
            totalBreakHour: any;
        };
        trackedHours: {
            day: string;
            trackedHour: any;
        }[];
    } | undefined>;
    getProjectTimeTracked(companyId: string, query: DashboardQueryDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        name: string;
        totalWorkHour: number;
    }[] | undefined>;
    getActivityTimeTracked(companyId: string, query: DashboardQueryDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        name: string;
        totalWorkHour: number;
    }[] | undefined>;
}

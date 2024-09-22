import { OctoDashboardPayrollPayCategoriesDto } from './dto/octo-dashboard-payroll-pay-categories.dto';
import { OctoDashboardWorkforceQueryDto } from './dto/octo-dashboard-workforce-query.dto';
import { OctoDashboardService } from './octo-dashboard.service';
export declare class OctoDashboardController {
    private readonly octoDashboardService;
    constructor(octoDashboardService: OctoDashboardService);
    getHeaderDashboard(companyId: number): Promise<import("./dto/octo-dashboard-header.dto").OctoDashboardHeaderDto>;
    getPayrollPayCategoriesDashboard(companyId: number, query: OctoDashboardPayrollPayCategoriesDto): Promise<{
        countryCode: string;
        countryName: string;
        currencyCode: string;
        exchangeRate: number;
    }[]>;
    getWorkforceDashboard(companyId: number, query: OctoDashboardWorkforceQueryDto): Promise<{
        countryCode: string;
        countryName: string;
    }[]>;
    getPayrollAggregateDashboard(companyId: number, query: OctoDashboardPayrollPayCategoriesDto): Promise<{
        countryCode: string;
        countryName: string;
        currencyCode: string;
        exchangeRate: number;
    }[]>;
    getInsightSummaryDashboard(companyId: number, clientId: number): Promise<import("./dto/octo-dashboard-insight-summary.dto").OctoDashboardInsightSummary>;
    getInsightDashboard(companyId: number, clientId: number): Promise<{
        countryCode: string;
        data: {
            dateRange: string;
        }[];
    }>;
    getListCountryOctoDashboard(companyId: number): Promise<{
        countryCode: string;
        countryName: string;
        currencyCode: string;
    }[]>;
}

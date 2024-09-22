import 'core-js/actual/array/group-by';
import * as moment from 'moment';
import { CompanyService } from '../../../general/modules/company';
import { CompanyParameterService } from '../../../general/modules/company-parameter';
import { CountryService } from '../../../general/modules/country';
import { UsdForexService } from '../../../general/modules/usd-forex/usd-forex.service';
import { PayrollReportService } from '../../../payroll/modules/payroll-report/payroll-report.service';
import { PrtrxHdrService } from '../../../payroll/modules/prtrx-hdr/prtrx-hdr.service';
import { EmployeeContractService } from '../../../user/modules/employee-contract/employee-contract.service';
import { EmployeeService } from '../../../user/modules/employee/employee.service';
import { OctoCompanyService } from '../octo-company/octo-company.service';
import { OctoTaskService } from '../octo-task/octo-task.service';
import { OctoDashboardHeaderDto } from './dto/octo-dashboard-header.dto';
import { OctoDashboardInsightSummary } from './dto/octo-dashboard-insight-summary.dto';
import { OctoDashboardPayrollPayCategoriesDto } from './dto/octo-dashboard-payroll-pay-categories.dto';
import { OctoDashboardWorkforceQueryDto } from './dto/octo-dashboard-workforce-query.dto';
export declare class OctoDashboardService {
    private readonly countryService;
    private readonly octoTaskService;
    private readonly employeeService;
    private readonly prtrxHdrService;
    private readonly employeeContractService;
    private readonly companyParameterService;
    private readonly payrollReportService;
    private readonly octoCompanyService;
    private readonly companyService;
    private readonly usdForexService;
    constructor(countryService: CountryService, octoTaskService: OctoTaskService, employeeService: EmployeeService, prtrxHdrService: PrtrxHdrService, employeeContractService: EmployeeContractService, companyParameterService: CompanyParameterService, payrollReportService: PayrollReportService, octoCompanyService: OctoCompanyService, companyService: CompanyService, usdForexService: UsdForexService);
    getAllClientIds(octoCompanyId: number): Promise<number[]>;
    getHeaderDashboard(octoCompanyId: number): Promise<OctoDashboardHeaderDto>;
    getPayrollDashboard(categoryType: 'normal' | 'aggregate', octoCompanyId: number, input: OctoDashboardPayrollPayCategoriesDto): Promise<{
        countryCode: string;
        countryName: string;
        currencyCode: string;
        exchangeRate: number;
    }[]>;
    getPayrollPayCategoriesDashboard(input: OctoDashboardPayrollPayCategoriesDto, countryCodes: string[]): Promise<{
        [key: string]: string;
    }[]>;
    getWorkforceDashboard(octoCompanyId: number, input: OctoDashboardWorkforceQueryDto): Promise<{
        countryCode: string;
        countryName: string;
    }[]>;
    getPayrollAggregateDashboard(input: OctoDashboardPayrollPayCategoriesDto, countryCodes: string[]): Promise<{
        [key: string]: string;
    }[]>;
    getInsightSummaryDashboard(args: {
        companyId: number;
        clientId: number;
    }): Promise<OctoDashboardInsightSummary>;
    getInsightDashboard(args: {
        companyId: number;
        clientId: number;
    }): Promise<{
        countryCode: string;
        data: {
            dateRange: string;
        }[];
    }>;
    getListCountryOctoDashboard(octoCompanyId: number): Promise<{
        countryCode: string;
        countryName: string;
        currencyCode: string;
    }[]>;
    startAndEndDateInCurrentYear(): {
        currentDate: moment.Moment;
        startDateOfYear: moment.Moment;
        endDateOfYear: moment.Moment;
    };
}

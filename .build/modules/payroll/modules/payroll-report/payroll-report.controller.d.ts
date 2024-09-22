import { Response } from 'express';
import { IAuthInfo } from '../../../../common/interfaces';
import { GetReportReconciliationDetailDto } from './dto/get-report-reconciliation-detail.dto';
import { PaginationPayrollReportByCountryDto } from './dto/pagination-payroll-report-by-country.dto';
import { PaginationPayrollReportDto } from './dto/pagination-payroll-report.dto';
import { PayrollReportColumnCustomizeDto } from './dto/payroll-report-column-customize.dto';
import { TotalCategoriesDto } from './dto/total-categories.dto';
import { PayrollReportService } from './payroll-report.service';
export declare class PayrollReportController {
    private readonly payrollReportService;
    constructor(payrollReportService: PayrollReportService);
    getReportReviewAndApproval(companyId: number, query: PaginationPayrollReportDto): Promise<import("../../../../common/dto").PaginationResponseDto<import("./interfaces/payroll-report.interface").IPayrollReport>>;
    getReportReviewAndApprovalByCountry(companyId: number, countryCode: string, query: PaginationPayrollReportByCountryDto): Promise<import("../../../../common/dto").PaginationResponseDto<import("./interfaces/payroll-report.interface").IPayrollReport>>;
    getReportReconciliation(companyId: number, query: PaginationPayrollReportDto): Promise<{
        isAllEmpSameContractCurrency: boolean;
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        data: unknown[];
        prevPayrollHeader: {
            id: number;
            cyclePeriodDetail: import("../../../../core/database").CyclePeriodDetailEntity | {
                id: number;
                code: null;
            };
        };
    }>;
    getReportReviewAndApprovalDetail(companyId: number, payrollHeaderId: number, employeeId: number): Promise<import("./interfaces/payroll-report.interface").IPayrollReport>;
    getReportReconciliationDetail(companyId: number, payrollHeaderId: number, query: GetReportReconciliationDetailDto): Promise<{
        current: import("mongoose").FlattenMaps<import("./interfaces/payroll-report.interface").IPayrollReport> & Required<{
            _id: string | import("mongoose").Types.ObjectId;
        }>;
        previous: import("mongoose").FlattenMaps<import("./interfaces/payroll-report.interface").IPayrollReport> & Required<{
            _id: string | import("mongoose").Types.ObjectId;
        }>;
    }>;
    exportReportReviewAndApproval(companyId: number, query: PaginationPayrollReportDto, response: Response, authInfo: IAuthInfo, body: PayrollReportColumnCustomizeDto): Promise<void>;
    exportReportReviewAndApprovalByCountry(companyId: number, countryCode: string, query: PaginationPayrollReportByCountryDto, response: Response, authInfo: IAuthInfo, body: PayrollReportColumnCustomizeDto): Promise<void>;
    exportReportReconciliation(companyId: number, query: PaginationPayrollReportDto, response: Response, authInfo: IAuthInfo, body: PayrollReportColumnCustomizeDto): Promise<void>;
    getTotalCategoriesReview(companyId: number, payrollHeaderId: number, query: TotalCategoriesDto): Promise<{
        payCategoriesTotal: any;
        aggregateCategoriesTotal: any;
    }>;
    getTotalCategoriesReconciliation(companyId: number, payrollHeaderId: number, query: TotalCategoriesDto): Promise<{
        payCategoriesTotal: any;
        aggregateCategoriesTotal: any;
    }>;
    batchDeleteAllOldPayrollReports(): Promise<void[]>;
}

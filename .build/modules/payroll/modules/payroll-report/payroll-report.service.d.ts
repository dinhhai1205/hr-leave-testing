import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { FilterQuery, Model } from 'mongoose';
import { BOOL } from '../../../../common/constants';
import { PaginationResponseDto } from '../../../../common/dto/pagination-response.dto';
import { IAuthInfo } from '../../../../common/interfaces';
import { ObjectValues } from '../../../../common/types';
import { EmployeeService } from '../../../user/modules/employee/employee.service';
import { PrtrxHdrService } from '../prtrx-hdr/prtrx-hdr.service';
import { PaginationPayrollReportDto } from './dto/pagination-payroll-report.dto';
import { PayrollReportColumnCustomizeDto } from './dto/payroll-report-column-customize.dto';
import { PayrollReportDashboardByPayCategoriesDto } from './dto/payroll-report-dashboard-by-pay-categorories.dto';
import { PayrollReportHelper } from './helpers/payroll-report.helper';
import { IPayrollReport } from './interfaces/payroll-report.interface';
export declare class PayrollReportService {
    readonly payrollReportModel: Model<IPayrollReport>;
    readonly payrollReportHelper: PayrollReportHelper;
    readonly prtrxHdrService: PrtrxHdrService;
    private readonly employeeService;
    constructor(payrollReportModel: Model<IPayrollReport>, payrollReportHelper: PayrollReportHelper, prtrxHdrService: PrtrxHdrService, employeeService: EmployeeService);
    getReportReviewAndApproval(args: {
        companyId: number;
        query: PaginationPayrollReportDto;
        noCount?: boolean;
    }): Promise<PaginationResponseDto<IPayrollReport>>;
    getReportReconciliation(args: {
        companyId: number;
        query: PaginationPayrollReportDto;
    }): Promise<{
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
    getReportReviewAndApprovalDetail(params: {
        companyId: number;
        payrollHeaderId: number;
        employeeId: number;
    }): Promise<IPayrollReport>;
    getReportReconciliationDetail(args: {
        companyId: number;
        employeeId: number;
        currPayrollHeaderId: number;
        prevPayrollHeaderId: number;
        country: string;
    }): Promise<{
        current: import("mongoose").FlattenMaps<IPayrollReport> & Required<{
            _id: string | import("mongoose").Types.ObjectId;
        }>;
        previous: import("mongoose").FlattenMaps<IPayrollReport> & Required<{
            _id: string | import("mongoose").Types.ObjectId;
        }>;
    }>;
    generateDefaultPayCategories(existingReport: IPayrollReport): IPayrollReport;
    exportPayrollReport(dataMode: 'reviewAndApproval' | 'reconciliation', args: {
        companyId: number;
        query: PaginationPayrollReportDto;
        response: Response;
        authInfo: Pick<IAuthInfo, 'utcOffset'>;
    }, { columnCustomizes }: PayrollReportColumnCustomizeDto): Promise<void>;
    batchesInsertPayrollReportToExcel(args: {
        worksheet: ExcelJS.Worksheet;
        dataMode: 'reviewAndApproval' | 'reconciliation';
        companyId: number;
        query: PaginationPayrollReportDto;
        itemCount: number;
        columns: Partial<ExcelJS.Column>[];
    }): Promise<void>;
    getTotalCategoriesBy(args: {
        companyId: number;
        dataMode: 'reviewAndApproval' | 'reconciliation';
        payrollHeaderId: number;
        query: Pick<PaginationPayrollReportDto, 'prevPayrollHeaderId' | 'byPercentage'>;
    }): Promise<{
        payCategoriesTotal: any;
        aggregateCategoriesTotal: any;
    }>;
    getTotalCategoriesReviewStep(args: {
        companyId: number;
        payrollHeaderId: number;
    }): Promise<{
        payCategoriesTotal: any;
        aggregateCategoriesTotal: any;
    }>;
    getTotalCategoriesReconciliationStep(args: {
        companyId: number;
        payrollHeaderId: number;
        prevPayrollHeaderId: number;
        byPercentage?: ObjectValues<typeof BOOL>;
    }): Promise<{
        payCategoriesTotal: {
            [category: string]: string;
        };
        aggregateCategoriesTotal: {
            [category: string]: string;
        };
    }>;
    getTotalPayCategories(args: {
        categoryType: 'normal' | 'aggregate';
        input: PayrollReportDashboardByPayCategoriesDto;
        specificCategoryForAggregate?: string;
        employeeIds?: number[];
    }): Promise<{
        [key: string]: string;
    }>;
    buildMatchStage(input: Omit<PayrollReportDashboardByPayCategoriesDto, 'categories'>, employeeIds?: number[]): FilterQuery<IPayrollReport> | undefined;
    buildProjectStage(args: {
        categoryType: 'normal' | 'aggregate';
        categories: string[];
        specificCategoryForAggregate?: string;
    }): {
        [key: string]: any;
    } | undefined;
    batchDeleteAllOldPayrollReports(): Promise<void[]>;
    deleteAllOldPayrollReports(args: {
        skip: number;
        take: number;
    }): Promise<void>;
    deleteOldReportsDeleted(payrollHeaderIds: number[]): Promise<any>;
    assignPayCalcMetForPayrollReport(payrollReports: IPayrollReport[]): Promise<IPayrollReport[]>;
}

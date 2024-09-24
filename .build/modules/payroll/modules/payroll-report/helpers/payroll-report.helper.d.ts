import * as ExcelJS from 'exceljs';
import { FilterQuery, PipelineStage } from 'mongoose';
import { BOOL } from '../../../../../common/constants';
import { EOrder } from '../../../../../common/enums';
import { ObjectValues } from '../../../../../common/types';
import { PAY_CATEGORY_COLOR } from '../constants';
import { PaginationPayrollReportDto } from '../dto/pagination-payroll-report.dto';
import { ColumnCustomizeDto } from '../dto/payroll-report-column-customize.dto';
import { IPayrollReport } from '../interfaces/payroll-report.interface';
import { IPrPayrollCategoriesDetail } from '../interfaces/pr-payroll-categories.interface';
export declare class PayrollReportHelper {
    matchQueryPayrollReport(companyId: number, query?: Partial<Pick<PaginationPayrollReportDto, 'keyword' | 'payrollHeaderId' | 'prevPayrollHeaderId' | 'country' | 'employeeIds'> & {
        dateFrom: string;
        dateTo: string;
    }>): FilterQuery<IPayrollReport>;
    groupReportByEmployeePipelineStage(): PipelineStage[];
    calculateCategoriesTotalPipelineStage(categoryType: 'normal' | 'aggregate', { CompanyId, PayrollHeaderId, }?: Pick<FilterQuery<IPayrollReport>, 'CompanyId' | 'PayrollHeaderId'>, customCondition?: Partial<{
        match: FilterQuery<IPayrollReport>;
        project: {
            [key: string]: number;
        };
        project2?: any;
        transformOutput: boolean;
    }>): any;
    convertPayCategoriesToObjectCodeTotal(isAggCategory: boolean): {
        PayCategories: {
            $map: {
                input: {
                    $objectToArray: string;
                };
                as: string;
                in: {
                    code: string;
                    total: string;
                };
            };
        };
    };
    sortReportPipelineStage(by: 'review' | 'reconciliation', args: {
        sort: string;
        order: EOrder;
        payrollHeaderId?: number;
        prevPayrollHeaderId?: number;
    }): PipelineStage[];
    getCategoryElementCodeKeys(payCategories?: {
        [categoryCode: string]: IPrPayrollCategoriesDetail;
    }): string[];
    fillColorBy(categoryCode: string | keyof typeof PAY_CATEGORY_COLOR): ExcelJS.Fill;
    fullBorderCell(): Partial<ExcelJS.Borders>;
    labelHeaderPayrollReport(args: {
        companyName: string;
        payrollNo: string | number;
        dateTo: string;
        dateFrom: string;
        worksheet: ExcelJS.Worksheet;
    }): void;
    columnDefaults(payrollReport: IPayrollReport): {
        columns: Partial<ExcelJS.Column>[];
        mergeColumnKeys: string[];
    };
    columnCustomizes(columnCustomizes: ColumnCustomizeDto[]): {
        columns: Partial<ExcelJS.Column & {
            headerName: string;
        }>[];
        mergeColumnKeys: string[];
    };
    totalColumn(args: {
        cateCode: string;
        colKey: string;
    }): {
        columns: {
            key: string;
            width: number;
            style: {
                numFmt: string;
            };
        }[];
        mergeColumnKeys: string[];
    };
    totalRowOfEveryColumn(args: {
        worksheet: ExcelJS.Worksheet;
        columns: Partial<ExcelJS.Column>[];
    }): void;
    insertPayrollReportToWorkSheet(args: {
        payrollReports: any[];
        columns: Partial<ExcelJS.Column>[];
        worksheet: ExcelJS.Worksheet;
        dataRowNumber: number;
    }): void;
    differentTotal(args: {
        currAmount?: string;
        prevAmount?: string;
        byPercentage?: ObjectValues<typeof BOOL>;
    }): string;
    getNumberInTextFormula(cellAddress: string, textToSearch: string): string;
    convertHoursToDaysFormula(fromCellAddr: string, toCellAddr: string): string;
    convertDaysToHoursFormula(fromCellAddr: string, toCellAddr: string): string;
    getNumWithTwoDecPlaces(addr: string): string;
    calculateTotalDaysAndHoursCell(colType: 'PaidDays' | 'NonPaidDay', colNum: number, params: {
        worksheet: ExcelJS.Worksheet;
        lastRow: number;
    }): void;
}

import type { EmptyObject } from '../../../../../common/types';
export interface IPrPayrollElementSet {
    _id: number;
    Code: string;
    Name: string;
    GlCode: string | null;
    Tags: string | null;
    Amount: string;
}
export interface IPrPayrollCategoriesDetail {
    Code: string;
    Name: string;
    Total: string;
    PayElementSets: {
        [elementSet: string]: IPrPayrollElementSet;
    } | EmptyObject;
}
export interface IPrPayrollCategories {
    'A-100': IPrPayrollCategoriesDetail;
    'A-110': IPrPayrollCategoriesDetail;
    'B-200': IPrPayrollCategoriesDetail;
    'B-210': IPrPayrollCategoriesDetail;
    'C-100': IPrPayrollCategoriesDetail;
    'C-110': IPrPayrollCategoriesDetail;
    'E-100': IPrPayrollCategoriesDetail;
    'E-110': IPrPayrollCategoriesDetail;
    'F-100': IPrPayrollCategoriesDetail;
    'F-110': IPrPayrollCategoriesDetail;
    'X-100': IPrPayrollCategoriesDetail;
}

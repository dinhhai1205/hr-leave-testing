import type { Types } from 'mongoose';
import type { IObjectLiteral } from '../../../../../common/interfaces';
import type { IPrCompany } from './pr-company.interface';
import type { IPrEmployee } from './pr-employee.interface';
import type { IPrPayrollCategoriesDetail } from './pr-payroll-categories.interface';
import type { IPrPayrollHeader } from './pr-payroll-header.interface';
export interface IPayrollReport {
    _id: Types.ObjectId | string;
    CompanyId: number;
    PayrollHeaderId: number;
    EmployeeId: number;
    EmployeeRef: string;
    FullNameLocal: string;
    Company: IPrCompany;
    Employee: IPrEmployee;
    PayrollHeader: IPrPayrollHeader;
    PayCategories: {
        [categoryCode: string]: IPrPayrollCategoriesDetail;
    } | IObjectLiteral;
}

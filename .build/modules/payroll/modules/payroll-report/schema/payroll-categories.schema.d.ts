import { Schema } from 'mongoose';
import type { IPrPayrollCategories, IPrPayrollCategoriesDetail, IPrPayrollElementSet } from '../interfaces/pr-payroll-categories.interface';
export declare const PayrollElementSetSchema: Schema<IPrPayrollElementSet, import("mongoose").Model<IPrPayrollElementSet, any, any, any, import("mongoose").Document<unknown, any, IPrPayrollElementSet> & IPrPayrollElementSet & Required<{
    _id: number;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPrPayrollElementSet, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPrPayrollElementSet>> & import("mongoose").FlatRecord<IPrPayrollElementSet> & Required<{
    _id: number;
}>>;
export declare const PayrollCategoriesDetailSchema: Schema<IPrPayrollCategoriesDetail, import("mongoose").Model<IPrPayrollCategoriesDetail, any, any, any, import("mongoose").Document<unknown, any, IPrPayrollCategoriesDetail> & IPrPayrollCategoriesDetail & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPrPayrollCategoriesDetail, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPrPayrollCategoriesDetail>> & import("mongoose").FlatRecord<IPrPayrollCategoriesDetail> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const PayrollCategoriesSchema: Schema<IPrPayrollCategories, import("mongoose").Model<IPrPayrollCategories, any, any, any, import("mongoose").Document<unknown, any, IPrPayrollCategories> & IPrPayrollCategories & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPrPayrollCategories, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPrPayrollCategories>> & import("mongoose").FlatRecord<IPrPayrollCategories> & {
    _id: import("mongoose").Types.ObjectId;
}>;

import { Schema } from 'mongoose';
import type { IPayrollReport } from '../interfaces/payroll-report.interface';
export declare const PayrollReportSchema: Schema<IPayrollReport, import("mongoose").Model<IPayrollReport, any, any, any, import("mongoose").Document<unknown, any, IPayrollReport> & IPayrollReport & Required<{
    _id: string | import("mongoose").Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPayrollReport, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPayrollReport>> & import("mongoose").FlatRecord<IPayrollReport> & Required<{
    _id: string | import("mongoose").Types.ObjectId;
}>>;

import { Schema } from 'mongoose';
import type { IPrPayrollHeader } from '../interfaces/pr-payroll-header.interface';
export declare const PayrollHeaderSchema: Schema<IPrPayrollHeader, import("mongoose").Model<IPrPayrollHeader, any, any, any, import("mongoose").Document<unknown, any, IPrPayrollHeader> & IPrPayrollHeader & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPrPayrollHeader, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPrPayrollHeader>> & import("mongoose").FlatRecord<IPrPayrollHeader> & {
    _id: import("mongoose").Types.ObjectId;
}>;

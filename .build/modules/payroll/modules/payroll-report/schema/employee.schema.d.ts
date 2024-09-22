import { Schema } from 'mongoose';
import type { IPrEmployee } from '../interfaces/pr-employee.interface';
export declare const EmployeeSchema: Schema<IPrEmployee, import("mongoose").Model<IPrEmployee, any, any, any, import("mongoose").Document<unknown, any, IPrEmployee> & IPrEmployee & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPrEmployee, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPrEmployee>> & import("mongoose").FlatRecord<IPrEmployee> & {
    _id: import("mongoose").Types.ObjectId;
}>;

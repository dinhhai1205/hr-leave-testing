import { Schema } from 'mongoose';
import type { IPrCompany } from '../interfaces/pr-company.interface';
export declare const CompanySchema: Schema<IPrCompany, import("mongoose").Model<IPrCompany, any, any, any, import("mongoose").Document<unknown, any, IPrCompany> & IPrCompany & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPrCompany, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<IPrCompany>> & import("mongoose").FlatRecord<IPrCompany> & {
    _id: import("mongoose").Types.ObjectId;
}>;

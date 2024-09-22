import * as Joi from 'joi';
import type { IObjectLiteral } from '../../common/interfaces';
interface IConfigProps {
    key: string;
    joi: Joi.Schema;
}
export type JoiConfig<T> = {
    [K in keyof T]: IConfigProps;
};
export declare class JoiUtil {
    static stringRequire(): Joi.StringSchema<string>;
    static stringOptional(): Joi.StringSchema<string>;
    static numberRequire(): Joi.NumberSchema<number>;
    static numberOptional(): Joi.NumberSchema<number>;
    static validate<T extends IObjectLiteral>(config: JoiConfig<T>): T;
    private static buildJoiSchema;
    private static assignVariablesToProcess;
}
export {};

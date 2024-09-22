import type { ValidationOptions } from 'class-validator';
import type { IObjectLiteral } from '../../interfaces';
export declare function isSafeString(str: unknown): boolean;
export declare function IsSafeString(validationOptions?: ValidationOptions): (object: IObjectLiteral, propertyName: string) => void;

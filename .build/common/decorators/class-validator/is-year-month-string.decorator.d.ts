import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { IObjectLiteral } from '../../interfaces';
export declare class IsYearMonthStringConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsYearMonthString(validationOptions?: ValidationOptions): (object: IObjectLiteral, propertyName: string) => void;

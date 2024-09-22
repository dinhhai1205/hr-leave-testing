import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { IObjectLiteral } from '../../interfaces';
export declare class IsNotEmptyArrayConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(validationArguments?: ValidationArguments): string;
}
export declare function IsNotEmptyArray(validationOptions?: ValidationOptions): (object: IObjectLiteral, propertyName: string) => void;

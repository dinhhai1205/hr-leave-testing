import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { IObjectLiteral } from '../../interfaces';
export declare class IsDateStringConstraint implements ValidatorConstraintInterface {
    validate(dateString: any): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsDateString(validationOptions?: ValidationOptions): (object: IObjectLiteral, propertyName: string) => void;

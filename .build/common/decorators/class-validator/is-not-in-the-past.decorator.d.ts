import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { IObjectLiteral } from '../../interfaces';
export declare class IsNotInThePastConstraint implements ValidatorConstraintInterface {
    validate(dateString: string): boolean;
    defaultMessage(): string;
}
export declare function IsNotInThePast(validationOptions?: ValidationOptions): (object: IObjectLiteral, propertyName: string) => void;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsYearMonthStringConstraint = void 0;
exports.IsYearMonthString = IsYearMonthString;
const class_validator_1 = require("class-validator");
let IsYearMonthStringConstraint = class IsYearMonthStringConstraint {
    validate(value) {
        const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
        return typeof value === 'string' && regex.test(value);
    }
    defaultMessage(args) {
        return `${args.property} must be a string in YYYY-MM format`;
    }
};
exports.IsYearMonthStringConstraint = IsYearMonthStringConstraint;
exports.IsYearMonthStringConstraint = IsYearMonthStringConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isYearMonthString', async: false })
], IsYearMonthStringConstraint);
function IsYearMonthString(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isYearMonthString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: IsYearMonthStringConstraint,
        });
    };
}
//# sourceMappingURL=is-year-month-string.decorator.js.map
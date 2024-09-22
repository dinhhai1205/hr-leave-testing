"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDateStringConstraint = void 0;
exports.IsDateString = IsDateString;
const class_validator_1 = require("class-validator");
let IsDateStringConstraint = class IsDateStringConstraint {
    validate(dateString) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (typeof dateString !== 'string') {
            return false;
        }
        if (!regex.test(dateString)) {
            return false;
        }
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date.getTime());
    }
    defaultMessage(args) {
        return `${args.property} ($value) is not in the format YYYY-MM-DD`;
    }
};
exports.IsDateStringConstraint = IsDateStringConstraint;
exports.IsDateStringConstraint = IsDateStringConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsDateStringConstraint);
function IsDateString(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDateStringConstraint,
        });
    };
}
//# sourceMappingURL=is-date-string.decorator.js.map
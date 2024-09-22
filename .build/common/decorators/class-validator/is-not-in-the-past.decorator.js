"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotInThePastConstraint = void 0;
exports.IsNotInThePast = IsNotInThePast;
const class_validator_1 = require("class-validator");
const moment = require("moment");
let IsNotInThePastConstraint = class IsNotInThePastConstraint {
    validate(dateString) {
        const date = moment.utc(dateString);
        const curr = moment.utc();
        return date.isBefore(curr);
    }
    defaultMessage() {
        return 'Date ($value) must not be in the past!';
    }
};
exports.IsNotInThePastConstraint = IsNotInThePastConstraint;
exports.IsNotInThePastConstraint = IsNotInThePastConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsNotInThePastConstraint);
function IsNotInThePast(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsNotInThePastConstraint,
        });
    };
}
//# sourceMappingURL=is-not-in-the-past.decorator.js.map
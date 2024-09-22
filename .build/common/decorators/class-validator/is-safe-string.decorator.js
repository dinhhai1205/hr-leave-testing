"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSafeString = isSafeString;
exports.IsSafeString = IsSafeString;
const class_validator_1 = require("class-validator");
const blacklist = [
    'SELECT',
    'INSERT',
    'UPDATE',
    'DELETE',
    'DROP',
    'TRUNCATE',
    '--',
    ';',
    "'",
    '"',
    '/*',
    '*/',
    'CONCAT',
    'SUBSTRING',
    'EXEC',
    'UNION',
];
function isSafeString(str) {
    if (typeof str !== 'string') {
        return false;
    }
    const upperValue = str.toUpperCase();
    return !blacklist.some(keyword => upperValue.includes(keyword));
}
function IsSafeString(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isSafeString',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return isSafeString(value);
                },
                defaultMessage(args) {
                    return `Input contains forbidden keywords or characters. ${args.value} `;
                },
            },
        });
    };
}
//# sourceMappingURL=is-safe-string.decorator.js.map
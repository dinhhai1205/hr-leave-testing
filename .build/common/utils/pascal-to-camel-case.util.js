"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalToCamelCase = pascalToCamelCase;
const mongoose_1 = require("mongoose");
const isUpperCase = (str) => str === str.toUpperCase();
const containNumber = (str) => /\d/.test(str);
const isDate = (val) => Object.prototype.toString.call(val) === '[object Date]';
const isObjectId = (val) => mongoose_1.default.Types.ObjectId.isValid(val);
function pascalToCamelCase(obj) {
    if (Array.isArray(obj)) {
        return obj.map(item => pascalToCamelCase(item));
    }
    else if (obj !== null &&
        !isDate(obj) &&
        !isObjectId(obj) &&
        typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            if (isUpperCase(key) && !containNumber(key)) {
                const lowerCaseKey = key.toLowerCase();
                acc[lowerCaseKey] = pascalToCamelCase(obj[key]);
                return acc;
            }
            const indexOfNumber = key.search(/\d/);
            if (isUpperCase(key) && indexOfNumber !== -1 && indexOfNumber > 1) {
                const indexKeyToLower = indexOfNumber - 1;
                const lowerCaseKey = key.substring(0, indexKeyToLower).split('');
                for (let i = 0; i < indexKeyToLower; i++) {
                    lowerCaseKey[i] = lowerCaseKey[i].toLowerCase();
                }
                const newKey = lowerCaseKey.join('') + key.substring(indexKeyToLower);
                acc[newKey] = pascalToCamelCase(obj[key]);
                return acc;
            }
            const camelCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
            acc[camelCaseKey] = pascalToCamelCase(obj[key]);
            return acc;
        }, {});
    }
    else {
        return obj;
    }
}
//# sourceMappingURL=pascal-to-camel-case.util.js.map
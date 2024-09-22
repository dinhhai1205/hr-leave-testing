"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectKeyToSnakeCase = convertObjectKeyToSnakeCase;
const camel_to_snake_case_util_1 = require("./camel-to-snake-case.util");
function convertObjectKeyToSnakeCase(obj, excludeKeys = []) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(item => convertObjectKeyToSnakeCase(item, excludeKeys));
    }
    const snakeCaseObj = {};
    for (const [key, value] of Object.entries(obj)) {
        if (!excludeKeys.includes(key)) {
            const snakeKey = (0, camel_to_snake_case_util_1.camelToSnakeCase)(key);
            snakeCaseObj[snakeKey] = convertObjectKeyToSnakeCase(value, excludeKeys);
        }
    }
    return snakeCaseObj;
}
//# sourceMappingURL=convert-object-key-to-snake-case.util.js.map
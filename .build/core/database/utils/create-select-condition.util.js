"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSelectCondition = buildSelectCondition;
function buildSelectCondition(obj, prefix = '') {
    let result = [];
    for (const [key, value] of Object.entries(obj)) {
        const currentKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
            result = result.concat(buildSelectCondition(value, currentKey));
        }
        else if (value === true) {
            result.push(currentKey);
        }
    }
    return result;
}
//# sourceMappingURL=create-select-condition.util.js.map
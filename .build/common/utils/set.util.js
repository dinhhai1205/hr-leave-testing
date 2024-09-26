"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = set;
function set(obj, path, value) {
    if (!obj || typeof obj !== 'object')
        return obj;
    const keys = Array.isArray(path) ? path : path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (i === keys.length - 1) {
            current[key] = value;
        }
        else {
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
    }
    return obj;
}
//# sourceMappingURL=set.util.js.map
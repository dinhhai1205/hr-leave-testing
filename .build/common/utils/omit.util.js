"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = omit;
function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
}
//# sourceMappingURL=omit.util.js.map
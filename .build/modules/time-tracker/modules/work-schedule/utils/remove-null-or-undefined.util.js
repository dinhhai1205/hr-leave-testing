"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNullOrUndefined = removeNullOrUndefined;
function removeNullOrUndefined(obj) {
    Object.keys(obj).forEach(key => {
        if (obj[key] === undefined || obj[key] === null) {
            delete obj[key];
        }
    });
    return obj;
}
//# sourceMappingURL=remove-null-or-undefined.util.js.map
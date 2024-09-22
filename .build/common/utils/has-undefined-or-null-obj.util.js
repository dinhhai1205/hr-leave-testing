"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasUndefinedOrNullObj = hasUndefinedOrNullObj;
exports.hasUndefinedOrNullObjV2 = hasUndefinedOrNullObjV2;
function hasUndefinedOrNullObj(obj) {
    return Object.values(obj).some(value => value === undefined || value === null);
}
function hasUndefinedOrNullObjV2(obj) {
    const undefinedOrNullKey = Object.keys(obj).find(key => obj[key] === undefined || obj[key] === null);
    return undefinedOrNullKey;
}
//# sourceMappingURL=has-undefined-or-null-obj.util.js.map
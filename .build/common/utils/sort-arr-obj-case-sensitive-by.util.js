"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArrObjCaseSensitiveBy = sortArrObjCaseSensitiveBy;
function sortArrObjCaseSensitiveBy(arr = [], fieldName) {
    if (!arr?.length || !fieldName) {
        return arr;
    }
    return arr.sort((a, b) => {
        if (a[fieldName] < b[fieldName])
            return -1;
        if (a[fieldName] > b[fieldName])
            return 1;
        return 0;
    });
}
//# sourceMappingURL=sort-arr-obj-case-sensitive-by.util.js.map
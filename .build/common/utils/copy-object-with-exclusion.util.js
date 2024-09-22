"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyObjectWithExclusion = copyObjectWithExclusion;
function copyObjectWithExclusion(originalObject, excludedFields) {
    const copiedObject = { ...originalObject };
    for (const field of excludedFields) {
        delete copiedObject[field];
    }
    return copiedObject;
}
//# sourceMappingURL=copy-object-with-exclusion.util.js.map
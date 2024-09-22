"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allValueIsSameObjects = allValueIsSameObjects;
function allValueIsSameObjects(source, target) {
    return Object.keys(source).every(key => source[key] === target[key]);
}
//# sourceMappingURL=all-value-is-same-objects.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pick = pick;
function pick(obj, keys) {
    const result = {};
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
//# sourceMappingURL=pick.util.js.map
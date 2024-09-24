"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeStringify = safeStringify;
function safeStringify(obj) {
    if (!obj)
        return '';
    if (typeof obj === 'string')
        return obj;
    return JSON.stringify(obj, null, 2);
}
//# sourceMappingURL=safe-stringify.util.js.map
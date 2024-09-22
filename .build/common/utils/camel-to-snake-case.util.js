"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToSnakeCase = camelToSnakeCase;
function camelToSnakeCase(str = '') {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
//# sourceMappingURL=camel-to-snake-case.util.js.map
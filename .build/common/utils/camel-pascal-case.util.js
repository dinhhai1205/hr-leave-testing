"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToPascalCase = camelToPascalCase;
function camelToPascalCase(str, opts = {}) {
    if (!str) {
        return '';
    }
    const pascalCase = str.charAt(0).toUpperCase() + str.slice(1);
    const { withSpaces = false } = opts;
    const result = withSpaces
        ? pascalCase.replace(/([A-Z])/g, ' $1')
        : pascalCase;
    return result;
}
//# sourceMappingURL=camel-pascal-case.util.js.map
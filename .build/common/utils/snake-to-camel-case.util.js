"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeToCamelCase = snakeToCamelCase;
function snakeToCamelCase(str = '') {
    return str.toLowerCase().replace(/(_\w)/g, function (match) {
        return match[1].toUpperCase();
    });
}
//# sourceMappingURL=snake-to-camel-case.util.js.map
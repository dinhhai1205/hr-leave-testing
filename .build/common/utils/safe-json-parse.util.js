"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeJsonParse = safeJsonParse;
function safeJsonParse(args) {
    const { text, defaultValueReturn } = args;
    if (!text)
        return defaultValueReturn;
    if (typeof text !== 'string')
        return text;
    try {
        const parsed = JSON.parse(text);
        return parsed ? parsed : defaultValueReturn;
    }
    catch (error) {
        return defaultValueReturn;
    }
}
//# sourceMappingURL=safe-json-parse.util.js.map
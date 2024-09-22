"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pemFormat = pemFormat;
function pemFormat(text) {
    if (!text)
        return '';
    if (text.includes('"')) {
        return `${JSON.parse(text.replace(/\n/g, '\\n'))}`;
    }
    return text;
}
//# sourceMappingURL=pem-format.util.js.map
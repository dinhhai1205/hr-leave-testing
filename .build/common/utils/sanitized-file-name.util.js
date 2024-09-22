"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeFilename = sanitizeFilename;
function sanitizeFilename(filename) {
    const allowedChars = /^[a-zA-Z0-9._-]+$/;
    let sanitized = '';
    for (let i = 0; i < filename.length; i++) {
        const char = filename[i];
        if (allowedChars.test(char)) {
            sanitized += char;
        }
        else {
            sanitized += '_';
        }
    }
    return sanitized;
}
//# sourceMappingURL=sanitized-file-name.util.js.map
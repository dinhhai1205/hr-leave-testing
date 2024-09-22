"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cutFinalSlash = cutFinalSlash;
function cutFinalSlash(path) {
    if (!path)
        return path;
    return path.substring(1, path.length - 1);
}
//# sourceMappingURL=cut-final-slash.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParentPaths = getParentPaths;
const cut_final_slash_util_1 = require("./cut-final-slash.util");
function getParentPaths(orgPaths) {
    if (!orgPaths.length)
        return [];
    orgPaths.sort((a, b) => a.length - b.length);
    const result = [];
    for (let i = 0; i < orgPaths.length; i++) {
        const orgPathElement = orgPaths[i].endsWith('/')
            ? (0, cut_final_slash_util_1.cutFinalSlash)(orgPaths[i])
            : orgPaths[i];
        if (!result.some(parent => orgPathElement.startsWith(parent + '/'))) {
            result.push(orgPathElement);
        }
    }
    return result;
}
//# sourceMappingURL=get-parent-org-paths.util.js.map
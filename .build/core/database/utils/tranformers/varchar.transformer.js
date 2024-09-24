"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varcharTransformer = varcharTransformer;
function varcharTransformer() {
    return {
        to(value) {
            return `${value}`;
        },
        from(value) {
            return value;
        },
    };
}
//# sourceMappingURL=varchar.transformer.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numericTransformer = numericTransformer;
function numericTransformer() {
    return {
        to(value) {
            return value;
        },
        from(value) {
            if (value === 0)
                return 0;
            if (!value)
                return null;
            const castingValue = Number(value);
            return Number.isNaN(castingValue) ? 0 : castingValue;
        },
    };
}
//# sourceMappingURL=numeric.transformer.js.map
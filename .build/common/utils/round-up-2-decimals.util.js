"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundUp2Decimals = roundUp2Decimals;
function roundUp2Decimals(n) {
    if (!n || Number.isNaN(Number(n)))
        return 0;
    return parseFloat(n.toFixed(2));
}
//# sourceMappingURL=round-up-2-decimals.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundingNumber = void 0;
const constants_1 = require("../constants");
const roundingNumber = (input) => {
    if (input < constants_1.ROUNDING_TIME_SHEET_BASE_CONSTANT) {
        return Math.floor(input);
    }
    if (input >= constants_1.ROUNDING_TIME_SHEET_BASE_CONSTANT &&
        input < constants_1.ROUNDING_TIME_SHEET_THRESHOLD_CONSTANT) {
        return constants_1.ROUNDING_TIME_SHEET_BASE_CONSTANT;
    }
    return constants_1.ROUNDING_TIME_SHEET_THRESHOLD_CONSTANT;
};
exports.roundingNumber = roundingNumber;
//# sourceMappingURL=rounding-number-time-sheet.util.js.map
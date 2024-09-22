"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToNumber = void 0;
const stringToNumber = (val, opts = {}) => {
    const { defaultVal = 0 } = opts;
    const num = Number(val);
    return isNaN(num) ? defaultVal : num;
};
exports.stringToNumber = stringToNumber;
//# sourceMappingURL=string-to-number.util.js.map
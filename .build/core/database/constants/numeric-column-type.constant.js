"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUMERIC_COLUMN_TYPE = void 0;
const utils_1 = require("../utils");
exports.NUMERIC_COLUMN_TYPE = {
    type: (0, utils_1.columnType)('NUMERIC'),
    transformer: (0, utils_1.numericTransformer)(),
    default: (0, utils_1.defaultColumn)({ columnType: 'NUMERIC', value: 0 }),
    precision: 10,
    scale: 2,
};
//# sourceMappingURL=numeric-column-type.constant.js.map
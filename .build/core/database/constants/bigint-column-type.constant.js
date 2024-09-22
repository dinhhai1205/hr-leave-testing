"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIGINT_COLUMN_TYPE = void 0;
const utils_1 = require("../utils");
exports.BIGINT_COLUMN_TYPE = {
    type: (0, utils_1.columnType)('BIGINT'),
    transformer: (0, utils_1.numericTransformer)(),
};
//# sourceMappingURL=bigint-column-type.constant.js.map
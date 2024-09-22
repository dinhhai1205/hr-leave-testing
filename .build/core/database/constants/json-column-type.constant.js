"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON_COLUMN_TYPE = void 0;
const utils_1 = require("../utils");
exports.JSON_COLUMN_TYPE = {
    type: (0, utils_1.columnType)('JSONB'),
    transformer: (0, utils_1.jsonTransformer)(),
};
//# sourceMappingURL=json-column-type.constant.js.map
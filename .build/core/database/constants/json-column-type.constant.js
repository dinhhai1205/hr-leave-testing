"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON_COLUMN_TYPE = void 0;
const enums_1 = require("../enums");
const utils_1 = require("../utils");
exports.JSON_COLUMN_TYPE = {
    type: (0, utils_1.columnType)('JSONB'),
    transformer: (0, utils_1.jsonTransformer)(),
    length: (0, utils_1.databaseType)() === enums_1.EDbSqlType.Postgres ? undefined : 'MAX',
};
//# sourceMappingURL=json-column-type.constant.js.map
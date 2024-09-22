"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBooleanValue = getBooleanValue;
const database_type_util_1 = require("./database-type.util");
function getBooleanValue(value) {
    const dbType = (0, database_type_util_1.databaseType)();
    if (dbType === 'mssql') {
        return value === 'TRUE' ? '1' : '0';
    }
    return value;
}
//# sourceMappingURL=get-boolean-value.util.js.map
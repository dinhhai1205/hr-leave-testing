"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxLengthVarcharColumn = maxLengthVarcharColumn;
const database_type_util_1 = require("./database-type.util");
function maxLengthVarcharColumn() {
    const dbType = (0, database_type_util_1.databaseType)();
    return dbType === 'postgres'
        ? { type: 'text' }
        : { type: 'varchar', length: 'MAX' };
}
//# sourceMappingURL=max-length-varchar-column.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnType = columnType;
const database_type_util_1 = require("./database-type.util");
const DatabaseColumnType = {
    DATETIME: {
        postgres: 'timestamp without time zone',
        mssql: 'datetime',
    },
    INTEGER: { postgres: 'integer', mssql: 'int' },
    BOOLEAN: { postgres: 'bool', mssql: 'bit' },
    NUMERIC: { postgres: 'numeric', mssql: 'numeric' },
    BIGINT: { postgres: 'bigint', mssql: 'bigint' },
    JSONB: { postgres: 'jsonb', mssql: 'nvarchar' },
    NVARCHAR: { postgres: 'varchar', mssql: 'nvarchar' },
    DATE: { postgres: 'date', mssql: 'date' },
    UUID: { postgres: 'uuid', mssql: 'uniqueidentifier' },
};
function columnType(columnType) {
    const dbType = (0, database_type_util_1.databaseType)();
    return DatabaseColumnType[columnType][dbType];
}
//# sourceMappingURL=column-type.util.js.map
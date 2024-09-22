"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultColumn = defaultColumn;
const moment = require("moment");
const moment_format_constant_1 = require("../../../common/constants/moment-format.constant");
const database_type_util_1 = require("./database-type.util");
const DefaultColumnData = {
    DATETIME: {
        postgres: (val, isMigration) => {
            if (val)
                return moment.utc(val).format(moment_format_constant_1.TIMESTAMP_STRING);
            if (isMigration)
                return 'CURRENT_TIMESTAMP';
            return () => `CURRENT_TIMESTAMP`;
        },
        mssql: (val, isMigration) => {
            if (val)
                return moment.utc(val).format(moment_format_constant_1.TIMESTAMP_STRING);
            if (isMigration)
                return `GETUTCDATE()`;
            return () => `GETUTCDATE()`;
        },
    },
    BOOLEAN: {
        postgres: val => (val ? val : false),
        mssql: val => (val === true ? 1 : 0),
    },
    INTEGER: {
        postgres: val => (val ? val : 0),
        mssql: val => (val ? val : 0),
    },
    NUMERIC: {
        postgres: val => (val ? val : 0),
        mssql: val => (val ? val : 0),
    },
    VARCHAR: {
        postgres: val => (val ? val : ''),
        mssql: val => (val ? val : ''),
    },
    JSONB: {
        postgres: val => (val ? val : undefined),
        mssql: val => (val ? val : 'MAX'),
    },
    UUID: {
        postgres: val => (val ? val : `uuid_generate_v4()`),
        mssql: val => (val ? val : `newid()`),
    },
};
function defaultColumn({ columnType, value, isMigration, }) {
    const dbType = (0, database_type_util_1.databaseType)();
    const defaultColFunc = DefaultColumnData[columnType][dbType];
    return defaultColFunc(value, isMigration);
}
//# sourceMappingURL=default-column.util.js.map
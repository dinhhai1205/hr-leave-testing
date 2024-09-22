"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonTransformer = jsonTransformer;
const utils_1 = require("../../../../common/utils");
const enums_1 = require("../../enums");
const database_type_util_1 = require("../database-type.util");
function jsonTransformer() {
    return {
        to(value) {
            const dbType = (0, database_type_util_1.databaseType)();
            if (dbType === enums_1.EDbSqlType.Postgres)
                return value;
            if (typeof value === 'string')
                return value;
            return JSON.stringify(value);
        },
        from(value) {
            if (typeof value === 'string') {
                return (0, utils_1.safeJsonParse)({ text: value, defaultValueReturn: null });
            }
            return value;
        },
    };
}
//# sourceMappingURL=json.transformer.js.map
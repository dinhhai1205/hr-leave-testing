"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseType = databaseType;
require("dotenv/config");
function databaseType() {
    return (process.env.DB_TYPE || 'postgres');
}
//# sourceMappingURL=database-type.util.js.map
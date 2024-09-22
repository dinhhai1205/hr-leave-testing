"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBaseEntityColumnsMigration = defaultBaseEntityColumnsMigration;
const column_type_util_1 = require("./column-type.util");
const default_column_util_1 = require("./default-column.util");
function defaultBaseEntityColumnsMigration() {
    return [
        {
            name: 'id',
            type: 'bigint',
            generationStrategy: 'increment',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
        },
        {
            name: 'is_deleted',
            type: (0, column_type_util_1.columnType)('BOOLEAN'),
            isNullable: true,
            default: (0, default_column_util_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
        },
        {
            name: 'created_by',
            type: 'varchar',
            length: '100',
        },
        {
            name: 'created_on',
            type: (0, column_type_util_1.columnType)('DATETIME'),
            isNullable: true,
            default: (0, default_column_util_1.defaultColumn)({ columnType: 'DATETIME', isMigration: true }),
        },
        {
            name: 'updated_by',
            type: 'varchar',
            length: '100',
            isNullable: true,
        },
        {
            name: 'updated_on',
            type: (0, column_type_util_1.columnType)('DATETIME'),
            isNullable: true,
        },
    ];
}
//# sourceMappingURL=deafult-base-entity-columns-migration.util.js.map
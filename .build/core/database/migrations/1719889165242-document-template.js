"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTemplate1719889165242 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class DocumentTemplate1719889165242 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.DOCUMENT_TEMPLATE,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'company_id',
                    type: 'bigint',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '200',
                    default: `'Sample Document'`,
                    isNullable: true,
                },
                {
                    name: 'owner',
                    type: 'varchar',
                    length: '200',
                },
                {
                    name: 'is_sequential',
                    type: (0, utils_1.columnType)('BOOLEAN'),
                    default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: true }),
                    isNullable: true,
                },
                {
                    name: 'expiration_days',
                    type: (0, utils_1.columnType)('INTEGER'),
                    isNullable: true,
                    default: 7,
                },
                {
                    name: 'validity',
                    type: (0, utils_1.columnType)('BIGINT'),
                    isNullable: true,
                    default: -1,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '1024',
                    isNullable: true,
                },
                {
                    name: 'email_reminders',
                    type: (0, utils_1.columnType)('BOOLEAN'),
                    isNullable: true,
                    default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
                },
                {
                    name: 'reminder_period',
                    type: (0, utils_1.columnType)('INTEGER'),
                    isNullable: true,
                    default: 5,
                },
                {
                    name: 'notes',
                    ...(0, utils_1.maxLengthVarcharColumn)(),
                    isNullable: true,
                },
                {
                    name: 'document_actions',
                    type: (0, utils_1.columnType)('JSONB'),
                    isNullable: true,
                    length: (0, utils_1.defaultColumn)({ columnType: 'JSONB' }),
                },
                {
                    name: 'document_type_id',
                    type: 'bigint',
                    isNullable: true,
                },
                {
                    name: 'folder_id',
                    type: 'bigint',
                    isNullable: true,
                },
            ],
        }), createTableIfNotExist);
    }
    async down() { }
}
exports.DocumentTemplate1719889165242 = DocumentTemplate1719889165242;
//# sourceMappingURL=1719889165242-document-template.js.map
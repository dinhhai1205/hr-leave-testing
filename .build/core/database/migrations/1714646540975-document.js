"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document1714646540975 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../modules/e-sign/enums");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
const max_length_varchar_column_util_1 = require("../utils/max-length-varchar-column.util");
class Document1714646540975 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_2.ETableName.DOCUMENT,
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
                    name: 'status',
                    type: 'varchar',
                    length: '50',
                    default: `'${enums_1.DocumentStatus.Draft}'`,
                    isNullable: true,
                },
                {
                    name: 'record_no',
                    type: 'bigint',
                    isNullable: true,
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
                    ...(0, max_length_varchar_column_util_1.maxLengthVarcharColumn)(),
                    isNullable: true,
                },
                {
                    name: 'sign_submitted_time',
                    type: (0, utils_1.columnType)('DATETIME'),
                    isNullable: true,
                },
                {
                    name: 'request_id',
                    type: 'varchar',
                    length: '1024',
                    isNullable: true,
                },
                {
                    name: 'completed_on',
                    type: (0, utils_1.columnType)('DATETIME'),
                    isNullable: true,
                },
                {
                    name: 'declined_on',
                    type: (0, utils_1.columnType)('DATETIME'),
                    isNullable: true,
                },
                {
                    name: 'declined_reason',
                    type: 'varchar',
                    length: '1024',
                    isNullable: true,
                },
                {
                    name: 'recalled_on',
                    type: (0, utils_1.columnType)('DATETIME'),
                    isNullable: true,
                },
                {
                    name: 'recalled_reason',
                    type: 'varchar',
                    length: '1024',
                    isNullable: true,
                },
                {
                    name: 'expired_on',
                    type: (0, utils_1.columnType)('DATETIME'),
                    isNullable: true,
                },
                {
                    name: 'extended_date',
                    type: (0, utils_1.columnType)('DATETIME'),
                    isNullable: true,
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
                {
                    name: 'document_template_id',
                    type: 'bigint',
                    isNullable: true,
                },
                {
                    name: 'is_bulk',
                    type: (0, utils_1.columnType)('BOOLEAN'),
                    default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
                    isNullable: true,
                },
                {
                    name: 'bulk_actions',
                    type: (0, utils_1.columnType)('JSONB'),
                    isNullable: true,
                    length: (0, utils_1.defaultColumn)({ columnType: 'JSONB' }),
                    default: "'[]'",
                },
            ],
        }), createTableIfNotExist);
    }
    async down() { }
}
exports.Document1714646540975 = Document1714646540975;
//# sourceMappingURL=1714646540975-document.js.map
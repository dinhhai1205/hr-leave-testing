"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentAction1714706673420 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../modules/e-sign/enums");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
class DocumentAction1714706673420 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_2.ETableName.DOCUMENT_ACTION,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'company_id',
                    type: 'bigint',
                },
                {
                    name: 'type',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'recipient_name',
                    type: 'varchar',
                    length: '200',
                },
                {
                    name: 'recipient_email',
                    type: 'varchar',
                    length: '200',
                },
                {
                    name: 'signing_order',
                    type: (0, utils_1.columnType)('INTEGER'),
                    isNullable: true,
                    default: 1,
                },
                {
                    name: 'in_person_name',
                    type: 'varchar',
                    length: '200',
                    isNullable: true,
                },
                {
                    name: 'in_person_email',
                    type: 'varchar',
                    length: '200',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                    default: `'${enums_1.DocumentActionStatus.NoAction}'`,
                },
                {
                    name: 'delivery_mode',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                    default: `'${enums_1.DocumentActionDeliveryMode.Email}'`,
                },
                {
                    name: 'private_note',
                    type: 'varchar',
                    length: '1024',
                    isNullable: true,
                },
                {
                    name: 'zoho_action_id',
                    type: 'varchar',
                    length: '1024',
                    isNullable: true,
                },
                {
                    name: 'recipient_countrycode',
                    type: 'varchar',
                    length: '10',
                    isNullable: true,
                },
                {
                    name: 'recipient_countrycode_iso',
                    type: 'varchar',
                    length: '10',
                    isNullable: true,
                },
                {
                    name: 'recipient_phonenumber',
                    type: 'varchar',
                    length: '1024',
                    isNullable: true,
                },
                {
                    name: 'verify_recipient',
                    type: (0, utils_1.columnType)('BOOLEAN'),
                    default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
                    isNullable: true,
                },
                {
                    name: 'verification_type',
                    type: 'varchar',
                    length: '1024',
                    isNullable: true,
                    default: `'${enums_1.DocumentActionVerificationType.None}'`,
                },
                {
                    name: 'verification_code',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'language',
                    type: 'varchar',
                    length: '20',
                    isNullable: true,
                    default: `'${enums_1.DocumentActionLanguageCode.English}'`,
                },
                {
                    name: 'fields',
                    type: (0, utils_1.columnType)('JSONB'),
                    isNullable: true,
                    length: (0, utils_1.defaultColumn)({ columnType: 'JSONB' }),
                },
                {
                    name: 'recipient_index',
                    type: (0, utils_1.columnType)('INTEGER'),
                },
                {
                    name: 'document_id',
                    type: 'bigint',
                },
                {
                    name: 'is_bulk',
                    type: (0, utils_1.columnType)('BOOLEAN'),
                    default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
                    isNullable: true,
                },
            ],
        }), createTableIfNotExist);
    }
    async down() { }
}
exports.DocumentAction1714706673420 = DocumentAction1714706673420;
//# sourceMappingURL=1714706673420-document-action.js.map
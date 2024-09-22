"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentAudit1714725469529 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class DocumentAudit1714725469529 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.DOCUMENT_AUDIT,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'company_id',
                    type: 'bigint',
                },
                {
                    name: 'document_name',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'document_status',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'activity',
                    type: 'varchar',
                    length: '300',
                    isNullable: true,
                },
                {
                    name: 'operation_type',
                    type: 'varchar',
                    length: '200',
                    isNullable: true,
                },
                {
                    name: 'ip_address',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'latitude',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'longitude',
                    type: 'varchar',
                    length: '50',
                    isNullable: true,
                },
                {
                    name: 'document_id',
                    type: 'bigint',
                },
                {
                    name: 'payload',
                    type: (0, utils_1.columnType)('JSONB'),
                    isNullable: true,
                    length: (0, utils_1.defaultColumn)({ columnType: 'JSONB' }),
                },
                {
                    name: 'data',
                    type: (0, utils_1.columnType)('JSONB'),
                    isNullable: true,
                    length: (0, utils_1.defaultColumn)({ columnType: 'JSONB' }),
                },
            ],
        }), createTableIfNotExist);
    }
    async down() { }
}
exports.DocumentAudit1714725469529 = DocumentAudit1714725469529;
//# sourceMappingURL=1714725469529-document-audit.js.map
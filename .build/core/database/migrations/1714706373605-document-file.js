"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentFile1714706373605 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class DocumentFile1714706373605 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.DOCUMENT_FILE,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'size',
                    type: (0, utils_1.columnType)('NUMERIC'),
                    isNullable: true,
                    default: 0.0,
                },
                {
                    name: 'order',
                    type: (0, utils_1.columnType)('INTEGER'),
                },
                {
                    name: 'image_string',
                    ...(0, utils_1.maxLengthVarcharColumn)(),
                    isNullable: true,
                },
                {
                    name: 'originalname',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                },
                {
                    name: 'company_id',
                    type: 'bigint',
                },
                {
                    name: 'document_id',
                    type: 'bigint',
                },
                {
                    name: 'document_template_id',
                    type: 'bigint',
                    isNullable: true,
                },
            ],
        }), createTableIfNotExist);
    }
    async down() { }
}
exports.DocumentFile1714706373605 = DocumentFile1714706373605;
//# sourceMappingURL=1714706373605-document-file.js.map
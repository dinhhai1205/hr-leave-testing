"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentShare1717753839887 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class DocumentShare1717753839887 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.DOCUMENT_SHARE,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'document_id',
                    type: 'bigint',
                },
                {
                    name: 'company_id',
                    type: 'bigint',
                },
                {
                    name: 'shared_with_email',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'shared_by_user',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'notes',
                    type: (0, utils_1.columnType)('NVARCHAR'),
                    length: '1024',
                    isNullable: true,
                },
            ],
        }), createTableIfNotExist);
    }
    async down() { }
}
exports.DocumentShare1717753839887 = DocumentShare1717753839887;
//# sourceMappingURL=1717753839887-document-share.js.map
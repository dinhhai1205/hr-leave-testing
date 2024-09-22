"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentType1714723393010 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class DocumentType1714723393010 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.DOCUMENT_TYPE,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'company_id',
                    type: 'bigint',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                },
            ],
        }), createTableIfNotExist);
    }
    async down() { }
}
exports.DocumentType1714723393010 = DocumentType1714723393010;
//# sourceMappingURL=1714723393010-document-type.js.map
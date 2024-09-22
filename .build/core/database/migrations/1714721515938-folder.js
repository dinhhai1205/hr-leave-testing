"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Folder1714721515938 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class Folder1714721515938 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.FOLDER,
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
exports.Folder1714721515938 = Folder1714721515938;
//# sourceMappingURL=1714721515938-folder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationStructure1721786245735 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class OrganizationStructure1721786245735 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.ORGANIZATION_STRUCTURE);
        if (!tableExist) {
            const createTableIfNotExist = true;
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.ORGANIZATION_STRUCTURE,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'company_id',
                        type: 'int',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                    },
                    {
                        name: 'parent_id',
                        type: 'int',
                    },
                    {
                        name: 'head_count',
                        type: 'int',
                    },
                    {
                        name: 'head',
                        type: 'int',
                    },
                    {
                        name: 'org_path',
                        type: 'varchar',
                    },
                ],
            }), createTableIfNotExist);
        }
    }
    async down(queryRunner) { }
}
exports.OrganizationStructure1721786245735 = OrganizationStructure1721786245735;
//# sourceMappingURL=1721786245735-organization-structure.js.map
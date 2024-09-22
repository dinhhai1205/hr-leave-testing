"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMapping1721806452920 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class GroupMapping1721806452920 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.GROUP_MAPPING,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'company_id',
                    type: 'int',
                },
                {
                    name: 'organization_structure_id',
                    type: 'int',
                },
                {
                    name: 'time_tracker_group_id',
                    type: 'varchar',
                },
            ],
        }), createTableIfNotExist);
    }
    async down(queryRunner) { }
}
exports.GroupMapping1721806452920 = GroupMapping1721806452920;
//# sourceMappingURL=1721806452920-group-mapping.js.map
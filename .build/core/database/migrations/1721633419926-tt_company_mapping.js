"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TtCompanyMapping1721633419926 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class TtCompanyMapping1721633419926 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.COMPANY_MAPPING,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'company_id',
                    type: 'bigint',
                },
                {
                    name: 'time_tracker_company_id',
                    type: 'text',
                },
                {
                    name: 'api_key',
                    type: 'text',
                },
            ],
        }), createTableIfNotExist);
    }
    async down(queryRunner) { }
}
exports.TtCompanyMapping1721633419926 = TtCompanyMapping1721633419926;
//# sourceMappingURL=1721633419926-tt_company_mapping.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakRule1721636812771 = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../../modules/time-tracker/common");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class BreakRule1721636812771 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.BREAK);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.BREAK,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'tt_break_rule_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'allow_taken_from_to',
                        type: (0, utils_1.columnType)('BOOLEAN'),
                    },
                    {
                        name: 'duration',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                    {
                        name: 'from',
                        type: 'time',
                        isNullable: true,
                    },
                    {
                        name: 'to',
                        type: 'time',
                        isNullable: true,
                    },
                    {
                        name: 'unit_time',
                        type: 'varchar',
                        default: `'${common_1.UnitTime.MINUTE}'`,
                    },
                    {
                        name: 'work_schedule_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                        isNullable: true,
                    },
                    {
                        name: 'company_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                        isNullable: true,
                    },
                ],
            }), true);
        }
    }
    async down(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.BREAK);
        if (tableExist) {
            await queryRunner.dropTable(enums_1.ETableName.BREAK, true);
        }
    }
}
exports.BreakRule1721636812771 = BreakRule1721636812771;
//# sourceMappingURL=1721636812771-break-rule.js.map
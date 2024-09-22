"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoDeduction1721636481928 = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../../modules/time-tracker/common");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class AutoDeduction1721636481928 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.AUTO_DEDUCTION);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.AUTO_DEDUCTION,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'tt_auto_deduction_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'duration',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                    {
                        name: 'threshold',
                        type: (0, utils_1.columnType)('INTEGER'),
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
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.AUTO_DEDUCTION);
        if (tableExist) {
            await queryRunner.dropTable(enums_1.ETableName.AUTO_DEDUCTION, true);
        }
    }
}
exports.AutoDeduction1721636481928 = AutoDeduction1721636481928;
//# sourceMappingURL=1721636481928-auto-deduction.js.map
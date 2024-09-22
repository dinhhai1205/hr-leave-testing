"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaySchedule1721637111480 = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("../../../modules/time-tracker/common");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class DaySchedule1721637111480 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.DAY_SCHEDULE);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.DAY_SCHEDULE,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'tt_day_schedule_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'day',
                        type: 'varchar',
                    },
                    {
                        name: 'from',
                        type: 'time',
                    },
                    {
                        name: 'to',
                        type: 'time',
                    },
                    {
                        name: 'duration',
                        type: (0, utils_1.columnType)('INTEGER'),
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
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.DAY_SCHEDULE);
        if (tableExist) {
            await queryRunner.dropTable(enums_1.ETableName.DAY_SCHEDULE, true);
        }
    }
}
exports.DaySchedule1721637111480 = DaySchedule1721637111480;
//# sourceMappingURL=1721637111480-day-schedule.js.map
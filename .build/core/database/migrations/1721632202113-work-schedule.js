"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkSchedule1721632202113 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../../common/enums");
const common_1 = require("../../../modules/time-tracker/common");
const enums_2 = require("../enums");
const utils_1 = require("../utils");
class WorkSchedule1721632202113 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_2.ETableName.WORK_SCHEDULE);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_2.ETableName.WORK_SCHEDULE,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'tt_work_schedule_id',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'utc_offset',
                        type: (0, utils_1.columnType)('INTEGER'),
                        isNullable: true,
                        default: 0,
                    },
                    {
                        name: 'work_arrangement',
                        type: 'varchar',
                    },
                    {
                        name: 'break_type',
                        type: 'varchar',
                        default: `'${common_1.BreakType.UnPaid}'`,
                    },
                    {
                        name: 'default',
                        type: (0, utils_1.columnType)('BOOLEAN'),
                        isNullable: true,
                        default: (0, utils_1.defaultColumn)({ columnType: 'BOOLEAN', value: false }),
                    },
                    {
                        name: 'weekly_hours',
                        type: (0, utils_1.columnType)('INTEGER'),
                        isNullable: true,
                    },
                    {
                        name: 'unit_time',
                        type: 'varchar',
                        default: `'${common_1.UnitTime.MINUTE}'`,
                        isNullable: true,
                    },
                    {
                        name: 'exclude_early_clock_in',
                        type: (0, utils_1.columnType)('BOOLEAN'),
                        isNullable: true,
                    },
                    {
                        name: 'company_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                        isNullable: true,
                    },
                    {
                        name: 'overtime_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                        isNullable: true,
                    },
                    {
                        name: 'end_work_day_at',
                        type: 'time',
                        isNullable: true,
                    },
                ],
            }), true);
        }
        await queryRunner.query(`INSERT INTO ${enums_2.ETableName.WORK_SCHEDULE} (name, created_by, work_arrangement, break_type, "default", unit_time, utc_offset, end_work_day_at) VALUES 
       ('DEFAULT', '${enums_1.EDefaultEmail.SYSTEM_GENERATED}', 'fixed', 'unpaid', 'true', 'minute', 0, '00:00:00')`);
    }
    async down(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_2.ETableName.WORK_SCHEDULE);
        if (tableExist) {
            await queryRunner.dropTable(enums_2.ETableName.WORK_SCHEDULE, true);
        }
    }
}
exports.WorkSchedule1721632202113 = WorkSchedule1721632202113;
//# sourceMappingURL=1721632202113-work-schedule.js.map
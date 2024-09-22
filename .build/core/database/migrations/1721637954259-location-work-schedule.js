"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationWorkSchedule1721637954259 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class LocationWorkSchedule1721637954259 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.LOCATION_WORK_SCHEDULE);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.LOCATION_WORK_SCHEDULE,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'company_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                    {
                        name: 'location_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                    {
                        name: 'work_schedule_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                ],
            }), true);
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(enums_1.ETableName.LOCATION_WORK_SCHEDULE);
        if (table) {
            const foreignKeys = table.foreignKeys.filter(fk => ['company_id', 'location_id', 'work_schedule_id'].includes(fk.columnNames[0]));
            for (const fk of foreignKeys) {
                await queryRunner.dropForeignKey(enums_1.ETableName.LOCATION_WORK_SCHEDULE, fk);
            }
            await queryRunner.dropTable(enums_1.ETableName.LOCATION_WORK_SCHEDULE, true);
        }
    }
}
exports.LocationWorkSchedule1721637954259 = LocationWorkSchedule1721637954259;
//# sourceMappingURL=1721637954259-location-work-schedule.js.map
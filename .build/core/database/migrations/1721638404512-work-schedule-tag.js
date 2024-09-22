"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleTag1721638404512 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class WorkScheduleTag1721638404512 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.WORK_SCHEDULE_TAG);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.WORK_SCHEDULE_TAG,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'work_schedule_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                    {
                        name: 'tag_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                    {
                        name: 'company_id',
                        type: (0, utils_1.columnType)('INTEGER'),
                    },
                ],
            }), true);
        }
    }
    async down(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.WORK_SCHEDULE_TAG);
        if (tableExist) {
            await queryRunner.dropTable(enums_1.ETableName.WORK_SCHEDULE_TAG, true);
        }
    }
}
exports.WorkScheduleTag1721638404512 = WorkScheduleTag1721638404512;
//# sourceMappingURL=1721638404512-work-schedule-tag.js.map
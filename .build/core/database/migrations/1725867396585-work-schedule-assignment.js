"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkScheduleAssignment1725867396585 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class WorkScheduleAssignment1725867396585 {
    async up(queryRunner) {
        const tableName = enums_1.ETableName.WORK_SCHEDULE_ASSIGNMENT;
        const hasTable = await queryRunner.hasTable(tableName);
        if (!hasTable) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: tableName,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'company_id',
                        type: 'bigint',
                    },
                    {
                        name: 'work_schedule_id',
                        type: 'bigint',
                    },
                    {
                        name: 'employee_id',
                        type: 'bigint',
                    },
                    {
                        name: 'date',
                        type: (0, utils_1.columnType)('DATE'),
                    },
                ],
            }));
        }
    }
    async down(queryRunner) { }
}
exports.WorkScheduleAssignment1725867396585 = WorkScheduleAssignment1725867396585;
//# sourceMappingURL=1725867396585-work-schedule-assignment.js.map
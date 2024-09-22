"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorkScheduleColumns1725866079997 = void 0;
const typeorm_1 = require("typeorm");
const work_schedule_state_enum_1 = require("../../../modules/time-tracker/modules/work-schedule/enums/work-schedule-state.enum");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class AddWorkScheduleColumns1725866079997 {
    async up(queryRunner) {
        const columns = [
            new typeorm_1.TableColumn({
                name: 'color',
                type: 'varchar',
                isNullable: true,
            }),
            new typeorm_1.TableColumn({
                name: 'start_date',
                type: 'date',
                isNullable: true,
            }),
            new typeorm_1.TableColumn({
                name: 'end_date',
                type: 'date',
                isNullable: true,
            }),
            new typeorm_1.TableColumn({
                name: 'state',
                type: 'varchar',
                isNullable: true,
                default: `'${work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED}'`,
            }),
            new typeorm_1.TableColumn({
                name: 'threshold',
                type: (0, utils_1.columnType)('INTEGER'),
                isNullable: true,
                default: 30,
            }),
            new typeorm_1.TableColumn({
                name: 'publish_histories',
                type: (0, utils_1.columnType)('JSONB'),
                isNullable: true,
            }),
            new typeorm_1.TableColumn({
                name: 'assignees',
                type: (0, utils_1.columnType)('JSONB'),
                isNullable: true,
            }),
            new typeorm_1.TableColumn({
                name: 'group_assignees',
                type: (0, utils_1.columnType)('JSONB'),
                isNullable: true,
            }),
        ];
        const tableName = enums_1.ETableName.WORK_SCHEDULE;
        await this.addTableColumns({ tableName, columns, queryRunner });
    }
    async addTableColumns(params) {
        const { queryRunner, columns, tableName } = params;
        const addColumns = [];
        for (const column of columns) {
            const hasColumn = await queryRunner.hasColumn(tableName, column.name);
            if (hasColumn)
                continue;
            addColumns.push(column);
        }
        if (addColumns.length)
            await queryRunner.addColumns(tableName, addColumns);
    }
    async down(queryRunner) { }
}
exports.AddWorkScheduleColumns1725866079997 = AddWorkScheduleColumns1725866079997;
//# sourceMappingURL=1725866079997-add-work-schedule-columns.js.map
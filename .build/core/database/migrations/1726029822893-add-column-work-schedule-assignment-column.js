"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnWorkScheduleAssignmentColumn1726029822893 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const get_boolean_value_util_1 = require("../utils/get-boolean-value.util");
class AddColumnWorkScheduleAssignmentColumn1726029822893 {
    async up(queryRunner) {
        const columns = [
            new typeorm_1.TableColumn({
                name: 'is_swapped',
                type: 'boolean',
                isNullable: true,
                default: (0, get_boolean_value_util_1.getBooleanValue)('FALSE'),
            }),
            new typeorm_1.TableColumn({
                name: 'is_unpublished',
                type: 'boolean',
                isNullable: true,
                default: (0, get_boolean_value_util_1.getBooleanValue)('FALSE'),
            }),
        ];
        const tableName = enums_1.ETableName.WORK_SCHEDULE_ASSIGNMENT;
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
exports.AddColumnWorkScheduleAssignmentColumn1726029822893 = AddColumnWorkScheduleAssignmentColumn1726029822893;
//# sourceMappingURL=1726029822893-add-column-work-schedule-assignment-column.js.map
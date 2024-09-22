"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorkScheduleIdToEmployee1721983937832 = void 0;
const typeorm_1 = require("typeorm");
class AddWorkScheduleIdToEmployee1721983937832 {
    async up(queryRunner) {
        const table = await queryRunner.getTable('employee');
        const hasColumn = table
            ? table.columns.some(column => column.name === 'work_schedule_id')
            : true;
        if (!hasColumn) {
            await queryRunner.addColumn('employee', new typeorm_1.TableColumn({
                name: 'work_schedule_id',
                type: 'int',
                isNullable: true,
            }));
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('employee');
        const foreignKey = table
            ? table.foreignKeys.find(fk => fk.columnNames.indexOf('work_schedule_id') !== -1)
            : false;
        if (foreignKey) {
            await queryRunner.dropForeignKey('employee', foreignKey);
        }
        const hasColumn = table
            ? table.columns.some(column => column.name === 'work_schedule_id')
            : false;
        if (hasColumn) {
            await queryRunner.dropColumn('employee', 'work_schedule_id');
        }
    }
}
exports.AddWorkScheduleIdToEmployee1721983937832 = AddWorkScheduleIdToEmployee1721983937832;
//# sourceMappingURL=1721983937832-add-work-schedule-id-to-employee.js.map
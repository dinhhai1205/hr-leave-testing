"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddWorkScheduleIdToOrganizationStructure1721983488498 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
class AddWorkScheduleIdToOrganizationStructure1721983488498 {
    async up(queryRunner) {
        const table = await queryRunner.getTable(enums_1.ETableName.ORGANIZATION_STRUCTURE);
        const hasColumn = table
            ? table.columns.some(column => column.name === 'work_schedule_id')
            : true;
        if (!hasColumn) {
            await queryRunner.addColumn(enums_1.ETableName.ORGANIZATION_STRUCTURE, new typeorm_1.TableColumn({
                name: 'work_schedule_id',
                type: 'int',
                isNullable: true,
            }));
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(enums_1.ETableName.ORGANIZATION_STRUCTURE);
        const foreignKey = table
            ? table.foreignKeys.find(fk => fk.columnNames.indexOf('work_schedule_id') !== -1)
            : false;
        if (foreignKey) {
            await queryRunner.dropForeignKey(enums_1.ETableName.ORGANIZATION_STRUCTURE, foreignKey);
        }
        const hasColumn = table
            ? table.columns.some(column => column.name === 'work_schedule_id')
            : false;
        if (hasColumn) {
            await queryRunner.dropColumn(enums_1.ETableName.ORGANIZATION_STRUCTURE, 'work_schedule_id');
        }
    }
}
exports.AddWorkScheduleIdToOrganizationStructure1721983488498 = AddWorkScheduleIdToOrganizationStructure1721983488498;
//# sourceMappingURL=1721983488498-add-work-schedule-id-to-organization-structure.js.map
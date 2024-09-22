"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnToApiLogTable1724319409027 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
class AddColumnToApiLogTable1724319409027 {
    async up(queryRunner) {
        const tableName = enums_1.ETableName.LEAVE_MODULE_API_LOG;
        const columns = ['auth_info', 'cause', 'current_context'];
        for (const col of columns) {
            const hasCol = await queryRunner.hasColumn(tableName, col);
            if (hasCol)
                continue;
            await queryRunner.addColumn(tableName, new typeorm_1.TableColumn({
                name: col,
                type: 'varchar',
                isNullable: true,
            }));
        }
    }
    async down(queryRunner) { }
}
exports.AddColumnToApiLogTable1724319409027 = AddColumnToApiLogTable1724319409027;
//# sourceMappingURL=1724319409027-add-column-to-api-log-table.js.map
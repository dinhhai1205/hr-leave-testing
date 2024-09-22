"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRemarkColumnLeaveTable1723023766392 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
class AddRemarkColumnLeaveTable1723023766392 {
    async up(queryRunner) {
        const leaveTable = enums_1.ETableName.LEAVE;
        const remarkColumn = 'remark';
        const hasColumn = await queryRunner.hasColumn(leaveTable, remarkColumn);
        if (!hasColumn) {
            await queryRunner.addColumn(leaveTable, new typeorm_1.TableColumn({
                name: remarkColumn,
                type: 'varchar',
                isNullable: true,
            }));
        }
    }
    async down(queryRunner) { }
}
exports.AddRemarkColumnLeaveTable1723023766392 = AddRemarkColumnLeaveTable1723023766392;
//# sourceMappingURL=1723023766392-add-remark-column-leave-table.js.map
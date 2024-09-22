"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddParentLeaveTypeIdColumnLeaveTable1722046306238 = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
class AddParentLeaveTypeIdColumnLeaveTable1722046306238 {
    constructor() {
        this.logger = new common_1.Logger(AddParentLeaveTypeIdColumnLeaveTable1722046306238.name);
    }
    async up(queryRunner) {
        const tableName = enums_1.ETableName.LEAVE;
        const columnName = 'parent_leave_type_id';
        const hasColumn = await queryRunner.hasColumn(tableName, columnName);
        if (hasColumn) {
            this.logger.warn(`The column ${columnName} is exist. Skip add column process`);
        }
        else {
            await queryRunner.addColumn(tableName, new typeorm_1.TableColumn({
                type: 'bigint',
                name: columnName,
                isNullable: true,
            }));
            this.logger.log(`The column ${columnName} of table ${tableName} is created successfully`);
        }
    }
    async down(queryRunner) { }
}
exports.AddParentLeaveTypeIdColumnLeaveTable1722046306238 = AddParentLeaveTypeIdColumnLeaveTable1722046306238;
//# sourceMappingURL=1722046306238-add-parent-leave-type-id-column-leave-table.js.map
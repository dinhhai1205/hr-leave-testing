"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddParentIdColumnLeaveTypeTable1721816850684 = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
class AddParentIdColumnLeaveTypeTable1721816850684 {
    constructor() {
        this.logger = new common_1.Logger(AddParentIdColumnLeaveTypeTable1721816850684.name);
    }
    async up(queryRunner) {
        const tableName = enums_1.ETableName.LEAVE_TYPE;
        const columnName = 'parent_id';
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
exports.AddParentIdColumnLeaveTypeTable1721816850684 = AddParentIdColumnLeaveTypeTable1721816850684;
//# sourceMappingURL=1721816850684-add-parent-id-column-leave-type-table.js.map
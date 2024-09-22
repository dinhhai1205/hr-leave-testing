"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDaysToProrateColumnToTimeSheetAdjustment1724818678867 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class AddDaysToProrateColumnToTimeSheetAdjustment1724818678867 {
    async up(queryRunner) {
        const table = await queryRunner.getTable(enums_1.ETableName.TIME_SHEET_ADJUSTMENT);
        const hasColumn = table
            ? table.columns.some(column => column.name === 'days_to_prorate')
            : true;
        if (!hasColumn) {
            await queryRunner.addColumn(enums_1.ETableName.TIME_SHEET_ADJUSTMENT, new typeorm_1.TableColumn({
                name: 'days_to_prorate',
                type: (0, utils_1.columnType)('NUMERIC'),
                isNullable: true,
                precision: 10,
                scale: 2,
                default: '1',
            }));
        }
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable(enums_1.ETableName.TIME_SHEET_ADJUSTMENT);
        const hasColumn = table
            ? table.columns.some(column => column.name === 'days_to_prorate')
            : false;
        if (hasColumn) {
            await queryRunner.dropColumn(enums_1.ETableName.TIME_SHEET_ADJUSTMENT, 'days_to_prorate');
        }
    }
}
exports.AddDaysToProrateColumnToTimeSheetAdjustment1724818678867 = AddDaysToProrateColumnToTimeSheetAdjustment1724818678867;
//# sourceMappingURL=1724818678867-add-days-to-prorate-column-to-time-sheet-adjustment.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetAdjustment1723178617967 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class TimesheetAdjustment1723178617967 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.TIME_SHEET_ADJUSTMENT);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.TIME_SHEET_ADJUSTMENT,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'time_sheet_type',
                        type: 'varchar',
                    },
                    {
                        name: 'status',
                        type: 'varchar',
                    },
                    {
                        name: 'pay_element_mapping_id',
                        type: (0, utils_1.columnType)('BIGINT'),
                        isNullable: true,
                    },
                    {
                        name: 'date',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'hour',
                        type: (0, utils_1.columnType)('INTEGER'),
                        isNullable: true,
                    },
                    {
                        name: 'company_id',
                        type: (0, utils_1.columnType)('BIGINT'),
                        isNullable: true,
                    },
                    {
                        name: 'payroll_timesheet_id',
                        type: (0, utils_1.columnType)('BIGINT'),
                    },
                    {
                        name: 'work_schedule_setting',
                        type: (0, utils_1.columnType)('JSONB'),
                        isNullable: true,
                        length: (0, utils_1.defaultColumn)({ columnType: 'JSONB' }),
                        default: `'{}'`,
                    },
                    {
                        name: 'adjustment_type',
                        type: 'varchar',
                    },
                    {
                        name: 'leave_id',
                        type: (0, utils_1.columnType)('BIGINT'),
                        isNullable: true,
                    },
                    {
                        name: 'uuid',
                        type: (0, utils_1.columnType)('UUID'),
                    },
                    {
                        name: 'day',
                        type: (0, utils_1.columnType)('NUMERIC'),
                        precision: 10,
                        scale: 2,
                        isNullable: true,
                    },
                ],
            }), true);
        }
    }
    async down(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.TIME_SHEET_ADJUSTMENT);
        if (tableExist) {
            await queryRunner.dropTable(enums_1.ETableName.TIME_SHEET_ADJUSTMENT, true);
        }
    }
}
exports.TimesheetAdjustment1723178617967 = TimesheetAdjustment1723178617967;
//# sourceMappingURL=1723178617967-timesheet-adjustment.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollTimeSheet1723104571544 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class PayrollTimeSheet1723104571544 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.PAYROLL_TIME_SHEET);
        if (!tableExist) {
            await queryRunner.createTable(new typeorm_1.Table({
                name: enums_1.ETableName.PAYROLL_TIME_SHEET,
                columns: [
                    ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                    {
                        name: 'company_id',
                        type: (0, utils_1.columnType)('BIGINT'),
                    },
                    {
                        name: 'employee_id',
                        type: (0, utils_1.columnType)('BIGINT'),
                    },
                    {
                        name: 'total_scheduled_work_days',
                        type: (0, utils_1.columnType)('NUMERIC'),
                        isNullable: true,
                        precision: 10,
                        scale: 2,
                        default: '1',
                    },
                    {
                        name: 'total_scheduled_work_hours',
                        type: (0, utils_1.columnType)('NUMERIC'),
                        isNullable: true,
                        precision: 10,
                        scale: 2,
                        default: '1',
                    },
                    {
                        name: 'total_payroll_regular_work_days',
                        type: (0, utils_1.columnType)('NUMERIC'),
                        isNullable: true,
                        precision: 10,
                        scale: 2,
                        default: '1',
                    },
                    {
                        name: 'prtrx_hdr_id',
                        type: (0, utils_1.columnType)('BIGINT'),
                        isNullable: true,
                    },
                ],
            }), true);
        }
    }
    async down(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.PAYROLL_TIME_SHEET);
        if (tableExist) {
            await queryRunner.dropTable(enums_1.ETableName.PAYROLL_TIME_SHEET, true);
        }
    }
}
exports.PayrollTimeSheet1723104571544 = PayrollTimeSheet1723104571544;
//# sourceMappingURL=1723104571544-payroll-timesheet.js.map
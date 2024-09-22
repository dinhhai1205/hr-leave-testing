"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeMapping1721632425417 = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class EmployeeMapping1721632425417 {
    async up(queryRunner) {
        const createTableIfNotExist = true;
        await queryRunner.createTable(new typeorm_1.Table({
            name: enums_1.ETableName.EMPLOYEE_MAPPING,
            columns: [
                ...(0, utils_1.defaultBaseEntityColumnsMigration)(),
                {
                    name: 'user_email',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'employee_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'time_tracker_employee_id',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'company_id',
                    type: 'int',
                    isNullable: false,
                },
            ],
        }), createTableIfNotExist);
    }
    async down(queryRunner) { }
}
exports.EmployeeMapping1721632425417 = EmployeeMapping1721632425417;
//# sourceMappingURL=1721632425417-employee-mapping.js.map
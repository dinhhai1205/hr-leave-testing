"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveEmployeeWorkScheduleToAssignees1726828992421 = void 0;
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class MoveEmployeeWorkScheduleToAssignees1726828992421 {
    async up(queryRunner) {
        const dbType = (0, utils_1.databaseType)();
        const wsTableName = enums_1.ETableName.WORK_SCHEDULE;
        if (dbType === 'postgres') {
            const workSchedules = await queryRunner.query(`SELECT id, assignees, company_id FROM ${enums_1.ETableName.WORK_SCHEDULE}`);
            for (const ws of workSchedules) {
                const assignees = ws.assignees || {};
                let employees = [];
                if (ws.default) {
                    employees = await queryRunner.query(`SELECT * FROM employee WHERE work_schedule_id IS NULL AND company_id = $1`, [ws.company_id]);
                }
                else {
                    employees = await queryRunner.query(`SELECT * FROM employee WHERE work_schedule_id = $1 AND company_id = $2`, [ws.id, ws.company_id]);
                }
                for (const employee of employees) {
                    const employeeExists = Object.prototype.hasOwnProperty.call(assignees, employee.id);
                    if (!employeeExists) {
                        assignees[employee.id] = {
                            email: employee.email,
                            employeeNo: employee.employee_no,
                            fullNameLocal: employee.full_name_local,
                            fullNameEn: employee.full_name_en,
                        };
                    }
                }
                await queryRunner.query(`UPDATE ${enums_1.ETableName.WORK_SCHEDULE} SET assignees = $1 WHERE id = $2`, [assignees, ws.id]);
            }
        }
        else if (dbType === 'mssql') {
            const workSchedules = await queryRunner.query(`SELECT id, assignees, company_id FROM ${wsTableName} WHERE ${wsTableName}.is_deleted = 0 AND ${wsTableName}.company_id IS NOT NULL`);
            for (const ws of workSchedules) {
                const assignees = ws?.assignees ? JSON.parse(ws.assignees) : {};
                let employees = [];
                const wsCompanyId = ws.company_id;
                const wsId = ws.id;
                if (ws.default === 1) {
                    employees = await queryRunner.query(`SELECT * FROM employee WHERE work_schedule_id IS NULL AND company_id = ${wsCompanyId}`, [wsCompanyId]);
                }
                else {
                    employees = await queryRunner.query(`SELECT * FROM employee WHERE work_schedule_id = ${wsId} AND company_id = ${wsCompanyId}`);
                }
                for (const employee of employees) {
                    const employeeExists = Object.prototype.hasOwnProperty.call(assignees, employee.id);
                    if (!employeeExists) {
                        assignees[employee.id] = {
                            email: employee.email,
                            employeeNo: employee.employee_no,
                            fullNameLocal: employee.full_name_local,
                            fullNameEn: employee.full_name_en,
                        };
                    }
                }
                await queryRunner.query(`UPDATE ${wsTableName} SET assignees = '${JSON.stringify(assignees)}' WHERE id = ${wsId}`);
            }
        }
    }
    async down(queryRunner) { }
}
exports.MoveEmployeeWorkScheduleToAssignees1726828992421 = MoveEmployeeWorkScheduleToAssignees1726828992421;
//# sourceMappingURL=1726828992421-move-employee-work-schedule-to-assignees.js.map
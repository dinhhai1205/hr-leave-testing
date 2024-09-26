"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveGroupWorkScheduleToGroupAssignees1727145264946 = void 0;
const enums_1 = require("../enums");
const utils_1 = require("../utils");
class MoveGroupWorkScheduleToGroupAssignees1727145264946 {
    async up(queryRunner) {
        const dbType = (0, utils_1.databaseType)();
        const wsTableName = enums_1.ETableName.WORK_SCHEDULE;
        if (dbType === 'postgres') {
            const workSchedules = await queryRunner.query(`SELECT id, group_assignees, company_id FROM ${wsTableName} WHERE ${wsTableName}.is_deleted = FALSE AND ${wsTableName}.company_id IS NOT NULL`);
            for (const ws of workSchedules) {
                const assignees = ws.group_assignees || {};
                const groups = await queryRunner.query(`SELECT * FROM ${enums_1.ETableName.ORGANIZATION_STRUCTURE} WHERE work_schedule_id = $1 AND company_id = $2`, [ws.id, ws.company_id]);
                for (const group of groups) {
                    const groupExists = Object.prototype.hasOwnProperty.call(assignees, group.org_path);
                    if (!groupExists) {
                        assignees[group.org_path] = {
                            id: group.id,
                            name: group.name,
                        };
                    }
                }
                await queryRunner.query(`UPDATE ${enums_1.ETableName.WORK_SCHEDULE} SET group_assignees = $1 WHERE id = $2`, [assignees, ws.id]);
            }
        }
        else if (dbType === 'mssql') {
            const workSchedules = await queryRunner.query(`SELECT id, group_assignees, company_id FROM ${wsTableName} WHERE ${wsTableName}.is_deleted = 0 AND ${wsTableName}.company_id IS NOT NULL`);
            for (const ws of workSchedules) {
                const assignees = ws?.group_assignees
                    ? JSON.parse(ws.group_assignees)
                    : {};
                const wsId = ws.id;
                const wsCompanyId = ws.company_id;
                const groups = await queryRunner.query(`SELECT * FROM ${enums_1.ETableName.ORGANIZATION_STRUCTURE} WHERE work_schedule_id = ${wsId} AND company_id = ${wsCompanyId}`);
                for (const group of groups) {
                    const groupExists = Object.prototype.hasOwnProperty.call(assignees, group.org_path);
                    if (!groupExists) {
                        assignees[group.org_path] = {
                            id: group.id,
                            name: group.name,
                        };
                    }
                }
                await queryRunner.query(`UPDATE ${wsTableName} SET group_assignees = '${JSON.stringify(assignees)}' WHERE id = ${wsId}`);
            }
        }
    }
    async down(queryRunner) { }
}
exports.MoveGroupWorkScheduleToGroupAssignees1727145264946 = MoveGroupWorkScheduleToGroupAssignees1727145264946;
//# sourceMappingURL=1727145264946-move-group-work-schedule-to-group-assignees.js.map
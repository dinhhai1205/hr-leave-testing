"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveGroupWorkScheduleToGroupAssignees1727145264946 = void 0;
const utils_1 = require("../utils");
const enums_1 = require("../enums");
class MoveGroupWorkScheduleToGroupAssignees1727145264946 {
    async up(queryRunner) {
        const dbType = (0, utils_1.databaseType)();
        if (dbType === 'postgres') {
            const workSchedules = await queryRunner.query(`SELECT id, group_assignees, company_id FROM ${enums_1.ETableName.WORK_SCHEDULE}`);
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
            const workSchedules = await queryRunner.query(`SELECT id, group_assignees, company_id FROM ${enums_1.ETableName.WORK_SCHEDULE}`);
            for (const ws of workSchedules) {
                const assignees = ws?.group_assignees
                    ? JSON.parse(ws.group_assignees)
                    : {};
                const groups = await queryRunner.query(`SELECT * FROM ${enums_1.ETableName.ORGANIZATION_STRUCTURE} WHERE work_schedule_id = @1 AND company_id = @2`, [ws.id, ws.company_id]);
                for (const group of groups) {
                    const groupExists = Object.prototype.hasOwnProperty.call(assignees, group.org_path);
                    if (!groupExists) {
                        assignees[group.org_path] = {
                            id: group.id,
                            name: group.name,
                        };
                    }
                }
                await queryRunner.query(`UPDATE ${enums_1.ETableName.WORK_SCHEDULE} SET group_assignees = @1 WHERE id = @2`, [JSON.stringify(assignees), ws.id]);
            }
        }
    }
    async down(queryRunner) { }
}
exports.MoveGroupWorkScheduleToGroupAssignees1727145264946 = MoveGroupWorkScheduleToGroupAssignees1727145264946;
//# sourceMappingURL=1727145264946-move-group-work-schedule-to-group-assignees.js.map
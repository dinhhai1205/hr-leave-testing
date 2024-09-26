"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkScheduleCompanyDefault1726221128088 = void 0;
const enums_1 = require("../enums");
const get_boolean_value_util_1 = require("../utils/get-boolean-value.util");
class UpdateWorkScheduleCompanyDefault1726221128088 {
    async up(queryRunner) {
        const tableName = enums_1.ETableName.WORK_SCHEDULE;
        const workSchedules = await queryRunner.query(`
      SELECT
        ws.company_id,
        ws.id,
        ws.name,
        ws.updated_on,
        "ws"."default"
      FROM
        ${tableName} AS ws
        INNER JOIN (
          SELECT
            company_id
          FROM
            ${tableName}
          WHERE
            is_deleted = ${(0, get_boolean_value_util_1.getBooleanValue)('FALSE')}
          GROUP BY
            company_id
          HAVING
            COUNT(*) = 1) AS single_schedule ON ws.company_id = single_schedule.company_id
      WHERE
        ws.is_deleted = ${(0, get_boolean_value_util_1.getBooleanValue)('FALSE')}
        AND ws.updated_on IS NULL
      `);
        for (const workSchedule of workSchedules) {
            await queryRunner.query(`UPDATE ${tableName} SET "default" = ${(0, get_boolean_value_util_1.getBooleanValue)('TRUE')} WHERE id = ${workSchedule.id}`);
        }
    }
    async down(queryRunner) { }
}
exports.UpdateWorkScheduleCompanyDefault1726221128088 = UpdateWorkScheduleCompanyDefault1726221128088;
//# sourceMappingURL=1726221128088-update-work-schedule-company-default.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayScheduleForWorkSchedule1726027501418 = void 0;
const common_1 = require("../../../modules/time-tracker/common");
const get_boolean_value_util_1 = require("../utils/get-boolean-value.util");
const enums_1 = require("../enums");
class DayScheduleForWorkSchedule1726027501418 {
    async up(queryRunner) {
        const workSchedules = await queryRunner.query(`
      SELECT id, company_id, utc_offset FROM work_schedule WHERE is_deleted = ${(0, get_boolean_value_util_1.getBooleanValue)('FALSE')}
    `);
        const days = [
            common_1.DayType['Mon'],
            common_1.DayType['Tue'],
            common_1.DayType['Wed'],
            common_1.DayType['Thu'],
            common_1.DayType['Fri'],
        ];
        for (const workSchedule of workSchedules) {
            const { id: workScheduleId, company_id: companyId, utc_offset: utcOffset, } = workSchedule;
            for (const day of days) {
                await queryRunner.query(`
          INSERT INTO ${enums_1.ETableName.DAY_SCHEDULE} (
            day, 
            "from", 
            "to", 
            duration, 
            unit_time, 
            work_schedule_id, 
            company_id,
            created_by
          )
          VALUES (
            '${day}', 
            '${9 - utcOffset}:00:00',  -- default start time
            '${18 - utcOffset}:00:00',  -- default end time
            480,         -- default duration (8 hours)
            '${common_1.UnitTime.MINUTE}',    -- unit time
            ${workScheduleId}, 
            ${companyId},
            'system_generated@hrforte.com'
          )
        `);
            }
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`
      DELETE FROM day_schedule
      WHERE day IN (${common_1.DayType['Mon']}, ${common_1.DayType['Tue']}, ${common_1.DayType['Wed']}, ${common_1.DayType['Thu']}, ${common_1.DayType['Fri']})
    `);
    }
}
exports.DayScheduleForWorkSchedule1726027501418 = DayScheduleForWorkSchedule1726027501418;
//# sourceMappingURL=1726027501418-day-schedule-for-work-schedule.js.map
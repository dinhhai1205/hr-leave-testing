"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWorkScheduleForExistingCompany1724314549257 = void 0;
const enums_1 = require("../enums");
const enums_2 = require("../../../common/enums");
class CreateWorkScheduleForExistingCompany1724314549257 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_1.ETableName.WORK_SCHEDULE);
        if (tableExist) {
            const companies = await queryRunner.query(`SELECT id from ${enums_1.ETableName.COMPANY}`);
            for (const company of companies) {
                await queryRunner.query(`INSERT INTO ${enums_1.ETableName.WORK_SCHEDULE} (name, created_by, work_arrangement, break_type, "default", unit_time, utc_offset, end_work_day_at, company_id) VALUES 
               ('Work Schedule Default', '${enums_2.EDefaultEmail.SYSTEM_GENERATED}', 'fixed', 'unpaid', 'true', 'minute', 0, '00:00:00', ${company.id})`);
            }
        }
    }
    async down(queryRunner) { }
}
exports.CreateWorkScheduleForExistingCompany1724314549257 = CreateWorkScheduleForExistingCompany1724314549257;
//# sourceMappingURL=1724314549257-create-work-schedule-for-existing-company.js.map
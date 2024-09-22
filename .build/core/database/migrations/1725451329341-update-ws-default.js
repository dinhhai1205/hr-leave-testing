"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWsDefault1725451329341 = void 0;
const enums_1 = require("../../../common/enums");
const enums_2 = require("../enums");
const get_boolean_value_util_1 = require("../utils/get-boolean-value.util");
class UpdateWsDefault1725451329341 {
    async up(queryRunner) {
        const tableExist = await queryRunner.hasTable(enums_2.ETableName.WORK_SCHEDULE);
        if (tableExist) {
            const companies = await queryRunner.query(`SELECT id from ${enums_2.ETableName.COMPANY}`);
            for (const company of companies) {
                const existingWorkSchedule = await queryRunner.query(`SELECT id FROM ${enums_2.ETableName.WORK_SCHEDULE} WHERE company_id = ${company.id} and is_deleted = ${(0, get_boolean_value_util_1.getBooleanValue)('FALSE')}`);
                if (existingWorkSchedule.length > 0) {
                    await queryRunner.query(`UPDATE ${enums_2.ETableName.WORK_SCHEDULE} SET "default" = ${(0, get_boolean_value_util_1.getBooleanValue)('TRUE')} WHERE company_id = ${company.id}`);
                }
                else {
                    await queryRunner.query(`INSERT INTO ${enums_2.ETableName.WORK_SCHEDULE} (name, created_by, work_arrangement, break_type, "default", unit_time, utc_offset, end_work_day_at, company_id) VALUES 
                     ('Work Schedule Default', '${enums_1.EDefaultEmail.SYSTEM_GENERATED}', 'fixed', 'unpaid', ${(0, get_boolean_value_util_1.getBooleanValue)('TRUE')}, 'minute', 0, '00:00:00', ${company.id})`);
                }
            }
        }
    }
    async down(queryRunner) { }
}
exports.UpdateWsDefault1725451329341 = UpdateWsDefault1725451329341;
//# sourceMappingURL=1725451329341-update-ws-default.js.map
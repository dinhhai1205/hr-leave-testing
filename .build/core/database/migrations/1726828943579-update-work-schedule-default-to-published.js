"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkScheduleDefaultToPublished1726828943579 = void 0;
const enums_1 = require("../enums");
const get_boolean_value_util_1 = require("../utils/get-boolean-value.util");
class UpdateWorkScheduleDefaultToPublished1726828943579 {
    async up(queryRunner) {
        await queryRunner.query(`
            UPDATE ${enums_1.ETableName.WORK_SCHEDULE}
            SET state = 'PUBLISHED'
            WHERE "default" = ${(0, get_boolean_value_util_1.getBooleanValue)('TRUE')} AND state != 'PUBLISHED';
          `);
    }
    async down(queryRunner) {
    }
}
exports.UpdateWorkScheduleDefaultToPublished1726828943579 = UpdateWorkScheduleDefaultToPublished1726828943579;
//# sourceMappingURL=1726828943579-update-work-schedule-default-to-published.js.map
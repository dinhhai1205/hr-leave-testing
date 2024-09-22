"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPublishTypeColumnWorkSchedule1726224696381 = void 0;
const typeorm_1 = require("typeorm");
const work_schedule_publish_type_enum_1 = require("../../../modules/time-tracker/modules/work-schedule/enums/work-schedule-publish-type.enum");
const enums_1 = require("../enums");
class AddPublishTypeColumnWorkSchedule1726224696381 {
    async up(queryRunner) {
        const tableName = enums_1.ETableName.WORK_SCHEDULE;
        const publishTypeColName = `publish_type`;
        const hasColumn = await queryRunner.hasColumn(tableName, publishTypeColName);
        if (!hasColumn) {
            await queryRunner.addColumn(tableName, new typeorm_1.TableColumn({
                name: publishTypeColName,
                type: 'varchar',
                isNullable: true,
                default: `'${work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_PUBLISH_NEW}'`,
            }));
        }
    }
    async down(queryRunner) { }
}
exports.AddPublishTypeColumnWorkSchedule1726224696381 = AddPublishTypeColumnWorkSchedule1726224696381;
//# sourceMappingURL=1726224696381-add-publish-type-column-work-schedule.js.map
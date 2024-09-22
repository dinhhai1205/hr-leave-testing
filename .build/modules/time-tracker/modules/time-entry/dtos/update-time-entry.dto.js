"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTimeEntryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_time_entry_body_dto_1 = require("./create-time-entry-body.dto");
class UpdateTimeEntryDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(create_time_entry_body_dto_1.CreateTimeEntryBodyDto, [
    'timeEntry',
    'description',
    'locationWorkScheduleId',
    'activityId',
    'projectId',
    'timeEntryType',
])) {
}
exports.UpdateTimeEntryDto = UpdateTimeEntryDto;
//# sourceMappingURL=update-time-entry.dto.js.map
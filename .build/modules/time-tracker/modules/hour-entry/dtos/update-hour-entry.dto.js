"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHourEntryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_hour_entry_dto_1 = require("./create-hour-entry.dto");
class UpdateHourEntryDto extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(create_hour_entry_dto_1.CreateHourEntryDto, [
    'activityId',
    'date',
    'description',
    'duration',
    'locationWorkScheduleId',
    'projectId',
    'unitTime',
])) {
}
exports.UpdateHourEntryDto = UpdateHourEntryDto;
//# sourceMappingURL=update-hour-entry.dto.js.map
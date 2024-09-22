"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubLeaveTypeBodyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const leave_type_creation_dto_1 = require("../../dto/leave-type-creation.dto");
class CreateSubLeaveTypeBodyDto extends (0, swagger_1.OmitType)(leave_type_creation_dto_1.LeaveTypeCreationDto, [
    'allowApplyExceed',
    'includeNonWorkingDay',
    'includePublicHoliday',
    'cfRoundTo',
]) {
}
exports.CreateSubLeaveTypeBodyDto = CreateSubLeaveTypeBodyDto;
//# sourceMappingURL=create-sub-leave-type-body.dto.js.map
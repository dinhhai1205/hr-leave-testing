"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourEntryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const common_2 = require("../../common");
const hour_entry_service_1 = require("./services/hour-entry.service");
const dtos_1 = require("./dtos");
const dto_1 = require("../../../../common/dto");
const get_hour_entry_dto_1 = require("./dtos/get-hour-entry.dto");
const iam_1 = require("../../../../core/iam");
let HourEntryController = class HourEntryController {
    constructor(hourEntryService) {
        this.hourEntryService = hourEntryService;
    }
    get({ companyId }, { timeTrackerCompanyId }, employeeId, query) {
        return this.hourEntryService.getHourEntry(companyId, timeTrackerCompanyId, query, employeeId);
    }
    create({ companyId }, createHourEntryDto, { timeTrackerCompanyId }) {
        return this.hourEntryService.createHourEntry(companyId, timeTrackerCompanyId, createHourEntryDto);
    }
    updateHourEntry({ companyId }, hoursEntryId, updateHoursEntryDto, { timeTrackerCompanyId }) {
        return this.hourEntryService.updateHourEntry(companyId, timeTrackerCompanyId, updateHoursEntryDto, hoursEntryId);
    }
    deletedHourEntry({ companyId }, deleteHoursEntryDto, hoursEntryId, { timeTrackerCompanyId }) {
        return this.hourEntryService.deleteHourEntry(companyId, timeTrackerCompanyId, deleteHoursEntryDto, hoursEntryId);
    }
};
exports.HourEntryController = HourEntryController;
__decorate([
    (0, common_1.Get)(`/employee/:employeeId`),
    (0, swagger_1.ApiOperation)({
        summary: 'Get hour entry',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number, get_hour_entry_dto_1.GetHourEntryDto]),
    __metadata("design:returntype", void 0)
], HourEntryController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create a new hours entry',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.CreateHourEntryDto }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.CreateHourEntryDto, Object]),
    __metadata("design:returntype", void 0)
], HourEntryController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(`/:hoursEntryId`),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('hoursEntryId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, String, dtos_1.UpdateHourEntryDto, Object]),
    __metadata("design:returntype", void 0)
], HourEntryController.prototype, "updateHourEntry", null);
__decorate([
    (0, common_1.Delete)(`/:hoursEntryId`),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('hoursEntryId', common_1.ParseUUIDPipe)),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.DeleteHourEntryDto, String, Object]),
    __metadata("design:returntype", void 0)
], HourEntryController.prototype, "deletedHourEntry", null);
exports.HourEntryController = HourEntryController = __decorate([
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, swagger_1.ApiTags)(common_2.HOUR_ENTRY_API_TAG),
    (0, common_1.Controller)({ path: common_2.HOUR_ENTRY_API_PATH }),
    __metadata("design:paramtypes", [hour_entry_service_1.HourEntryService])
], HourEntryController);
//# sourceMappingURL=hour-entry.controller.js.map
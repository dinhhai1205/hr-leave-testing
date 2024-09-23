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
exports.TimeEntryESSController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../common/dto");
const iam_1 = require("../../../../core/iam");
const common_2 = require("../../common");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const dtos_1 = require("./dtos");
const services_1 = require("./services");
const time_entry_service_1 = require("./services/time-entry.service");
const response_dto_1 = require("./dtos/response.dto");
const enums_1 = require("../../../../common/enums");
const time_entry_entity_1 = require("./time-entry.entity");
let TimeEntryESSController = class TimeEntryESSController {
    constructor(timeEntryService, timeSheetService) {
        this.timeEntryService = timeEntryService;
        this.timeSheetService = timeSheetService;
    }
    create(employeeId, createTimeEntryDto, { companyId }, { timeTrackerCompanyId }) {
        return this.timeEntryService.createTimeEntry({ ...createTimeEntryDto, employeeId }, timeTrackerCompanyId, companyId);
    }
    getWeeklySummaryTrackedHour(employeeId, startDate, endDate, { companyId }, { timeTrackerCompanyId }) {
        return this.timeEntryService.handleSummaryWeekLyTrackedHour(companyId, timeTrackerCompanyId, employeeId, startDate, endDate);
    }
    async getTimeEntriesDetailInDateByUserId(employeeId, query, { companyId }, { timeTrackerCompanyId }) {
        const result = await this.timeEntryService.handleGetTimeEntriesDetail(companyId, timeTrackerCompanyId, employeeId, query);
        return result;
    }
    async getListTimeEntriesInDate(employeeId, query, { companyId }, { timeTrackerCompanyId }) {
        const result = await this.timeEntryService.handleGetListTimeEntriesInDate(companyId, timeTrackerCompanyId, employeeId, query);
        return result;
    }
    async getDetailSummarizeInDate(employeeId, query, { companyId }, { timeTrackerCompanyId }) {
        const result = await this.timeEntryService.handleGetTimeEntriesSummarizeInDate(companyId, timeTrackerCompanyId, employeeId, query);
        return result;
    }
    async getTimeEntriesEmployeeOverview(employeeId, { companyId }, { timeTrackerCompanyId }, query) {
        const result = await this.timeEntryService.handleGetOverviewTimeEntriesOfEmployee(companyId, timeTrackerCompanyId, employeeId, query);
        return result;
    }
    async getTimeEntriesOverviewSummarize(employeeId, { companyId }, { timeTrackerCompanyId }, query) {
        const result = await this.timeEntryService.handleSummarizeOverviewTimeEntries(companyId, timeTrackerCompanyId, { ...query, employeeIds: [employeeId] });
        return result;
    }
    async getTimeEntriesOverview(employeeId, { companyId }, { timeTrackerCompanyId }, query) {
        const result = await this.timeEntryService.handleGetOverviewTimeEntries(companyId, timeTrackerCompanyId, { ...query, employeeIds: [employeeId] });
        return result;
    }
    getLastActivityByUserId(employeeId, { companyId }, { timeTrackerCompanyId }) {
        return this.timeEntryService.getLastActivityByEmployeeId(employeeId, companyId, timeTrackerCompanyId);
    }
    deleteTimeEntry(deleteTimeEntryDto, { timeTrackerCompanyId }) {
        return this.timeEntryService.deleteTimeEntry(deleteTimeEntryDto, timeTrackerCompanyId);
    }
    updateTimeEntry(updateTimeEntryDto, { companyId }, { timeTrackerCompanyId }) {
        return this.timeEntryService.updateTimeEntry(updateTimeEntryDto, timeTrackerCompanyId, companyId);
    }
    async getTimeSheetDetail(employeeId, { companyId }, query, { timeTrackerCompanyId }) {
        const result = await this.timeSheetService.getTimeSheetOfEmployee({
            query,
            companyId,
            employeeId,
            options: { companyId: timeTrackerCompanyId },
        });
        return { data: result };
    }
    async getTimeSheetOverview(employeeId, query, { companyId }, { timeTrackerCompanyId }) {
        const result = await this.timeSheetService.getTimeSheetOverviewByCompanyId({
            query: { ...query, employeeIds: [employeeId] },
            companyId,
            options: {
                companyId: timeTrackerCompanyId,
            },
        });
        return result;
    }
    async getCountTimeEntries(query, { companyId }, { timeTrackerCompanyId }) {
        const result = await this.timeEntryService.handleCalculateUnpaidDaysTimeTracker(query.employeeIds, query.startDate, query.endDate, companyId, timeTrackerCompanyId);
        return result;
    }
};
exports.TimeEntryESSController = TimeEntryESSController;
__decorate([
    (0, common_1.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Clock in, clock out, break',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The time entry has been successfully created.',
        type: [dtos_1.TimeEntryResponseDTO],
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiBody)({ type: dtos_1.CreateTimeEntryBodyDto }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryESSController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/weekly-summary/employee'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: ' Get weekly summary of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.SummaryWeekLyTrackedHourResponseDto }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Param)()),
    __param(4, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryESSController.prototype, "getWeeklySummaryTrackedHour", null);
__decorate([
    (0, common_1.Get)('detail/employee'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time-entries detail of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetTimeEntriesDetailResponseDto }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.GetDetailTimeEntryQueryDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getTimeEntriesDetailInDateByUserId", null);
__decorate([
    (0, common_1.Get)('detail/list-time-entries/employee'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get list time-entries detail of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetTimeEntriesDetailResponseDto }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.GetDetailTimeEntryQueryDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getListTimeEntriesInDate", null);
__decorate([
    (0, common_1.Get)('detail/summarize-in-date/employee'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get list time-entries detail of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetTimeEntriesDetailResponseDto }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.GetDetailTimeEntryQueryDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getDetailSummarizeInDate", null);
__decorate([
    (0, common_1.Get)('/overview/employee'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time-entries overview of employee',
    }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object, dtos_1.GetTimeEntriesOverviewQueryESSDto]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getTimeEntriesEmployeeOverview", null);
__decorate([
    (0, common_1.Get)('/overview-summarize'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Summarize time-entries overview of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.SummarizeOverviewTimeEntriesResponseDto }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object, dtos_1.GetTimeEntriesOverviewQueryESSDto]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getTimeEntriesOverviewSummarize", null);
__decorate([
    (0, common_1.Get)('/overview'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time-entries overview of user',
    }),
    (0, swagger_1.ApiResponse)({
        type: (dto_1.PaginationResponseDto),
    }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object, dtos_1.GetTimeEntriesOverviewQueryESSDto]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getTimeEntriesOverview", null);
__decorate([
    (0, common_1.Get)('/last-activity'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the last activity of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetLastActivityResponseDto }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryESSController.prototype, "getLastActivityByUserId", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete time-entry',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.DeleteTimeEntryDto }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.DeleteTimeEntryDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryESSController.prototype, "deleteTimeEntry", null);
__decorate([
    (0, common_1.Patch)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiOperation)({
        summary: 'Update time-entry',
    }),
    (0, swagger_1.ApiBody)({ type: [dtos_1.UpdateMultiTimeEntryDto] }),
    (0, swagger_1.ApiResponse)({ type: [time_entry_entity_1.TimeEntryEntity] }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryESSController.prototype, "updateTimeEntry", null);
__decorate([
    (0, common_1.Get)('/time-sheet/employee'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time sheet detail',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetTimesheetOfEmployeeResponseDto }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto,
        dtos_1.GetTimeSheetQuery, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getTimeSheetDetail", null);
__decorate([
    (0, common_1.Get)('/time-sheet'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time sheet overview',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.GetTimeEntriesOverviewQueryESSDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getTimeSheetOverview", null);
__decorate([
    (0, common_1.Get)('/calculate-unpaid-day'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time sheet overview',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.GetTimeEntriesCountDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryESSController.prototype, "getCountTimeEntries", null);
exports.TimeEntryESSController = TimeEntryESSController = __decorate([
    (0, swagger_1.ApiTags)(common_2.TIME_ENTRY_ESS_API_TAG),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, common_1.Controller)({ path: common_2.TIME_ENTRY_ESS_API_PATH }),
    __metadata("design:paramtypes", [time_entry_service_1.TimeEntryService,
        services_1.TimeSheetService])
], TimeEntryESSController);
//# sourceMappingURL=time-entry-ess.controller.js.map
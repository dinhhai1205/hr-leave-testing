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
exports.TimeEntryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../common/dto");
const enums_1 = require("../../../../common/enums");
const iam_1 = require("../../../../core/iam");
const common_2 = require("../../common");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const dtos_1 = require("./dtos");
const services_1 = require("./services");
const export_time_entries_excel_file_service_1 = require("./services/export-time-entries-excel-file.service");
const time_entry_service_1 = require("./services/time-entry.service");
const response_dto_1 = require("./dtos/response.dto");
const time_entry_entity_1 = require("./time-entry.entity");
let TimeEntryController = class TimeEntryController {
    constructor(timeEntryService, exportTimeEntriesExcel, timeSheetService) {
        this.timeEntryService = timeEntryService;
        this.exportTimeEntriesExcel = exportTimeEntriesExcel;
        this.timeSheetService = timeSheetService;
    }
    create(createTimeEntryDto, { companyId }, { timeTrackerCompanyId }) {
        return this.timeEntryService.createTimeEntry(createTimeEntryDto, timeTrackerCompanyId, companyId);
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
    async getTimeEntriesOverviewSummarize({ companyId }, { timeTrackerCompanyId }, query) {
        const result = await this.timeEntryService.handleSummarizOverviewTimeEntries(companyId, timeTrackerCompanyId, query);
        return result;
    }
    async getTimeEntriesOverview({ companyId }, { timeTrackerCompanyId }, query) {
        const result = await this.timeEntryService.handleGetOverviewTimeEntries(companyId, timeTrackerCompanyId, query);
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
    async getExcelFile({ companyId }, { timeTrackerCompanyId }, query) {
        return this.exportTimeEntriesExcel.handleGenerateRawExcelFile(timeTrackerCompanyId, query);
    }
    async getTimeSheetDetail({ companyId }, employeeId, query, { timeTrackerCompanyId }) {
        const result = await this.timeSheetService.getTimeSheetOfEmployee({
            query,
            companyId,
            employeeId,
            options: { companyId: timeTrackerCompanyId },
        });
        return { data: result };
    }
    async getTimeSheetOverview(query, { companyId }, { timeTrackerCompanyId }) {
        const result = await this.timeSheetService.getTimeSheetOverviewByCompanyId({
            query,
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
    async recompute({ companyId }, payrollHeaderId, { timeTrackerCompanyId }, userEmail) {
        const result = await this.timeEntryService.handleRecompute(companyId, timeTrackerCompanyId, userEmail, payrollHeaderId);
        return result;
    }
};
exports.TimeEntryController = TimeEntryController;
__decorate([
    (0, common_1.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
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
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateTimeEntryBodyDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/weekly-summary/employee/:employeeId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: ' Get weekly summary of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.SummaryWeekLyTrackedHourResponseDto }),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Param)()),
    __param(4, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryController.prototype, "getWeeklySummaryTrackedHour", null);
__decorate([
    (0, common_1.Get)('detail/employee/:employeeId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time-entries detail of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetTimeEntriesDetailResponseDto }),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.GetDetailTimeEntryQueryDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getTimeEntriesDetailInDateByUserId", null);
__decorate([
    (0, common_1.Get)('detail/list-time-entries/employee/:employeeId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get list time-entries detail of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetTimeEntriesDetailResponseDto }),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.GetDetailTimeEntryQueryDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getListTimeEntriesInDate", null);
__decorate([
    (0, common_1.Get)('detail/summarize-in-date/employee/:employeeId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get list time-entries detail of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetTimeEntriesDetailResponseDto }),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.GetDetailTimeEntryQueryDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getDetailSummarizeInDate", null);
__decorate([
    (0, common_1.Get)('/overview-summarize'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Summarize time-entries overview of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.SummarizeOverviewTimeEntriesResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_1.GetTimeEntriesOverviewQueryDto]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getTimeEntriesOverviewSummarize", null);
__decorate([
    (0, common_1.Get)('/overview'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time-entries overview of user',
    }),
    (0, swagger_1.ApiResponse)({
        type: (dto_1.PaginationResponseDto),
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_1.GetTimeEntriesOverviewQueryDto]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getTimeEntriesOverview", null);
__decorate([
    (0, common_1.Get)('/last-activity/:employeeId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get the last activity of user',
    }),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetLastActivityResponseDto }),
    __param(0, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryController.prototype, "getLastActivityByUserId", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete time-entry',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.DeleteTimeEntryDto }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.DeleteTimeEntryDto, Object]),
    __metadata("design:returntype", void 0)
], TimeEntryController.prototype, "deleteTimeEntry", null);
__decorate([
    (0, common_1.Patch)(''),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
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
], TimeEntryController.prototype, "updateTimeEntry", null);
__decorate([
    (0, common_1.Get)('/export-excel'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer),
    (0, swagger_1.ApiOperation)({
        summary: 'Get excel file',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer),
    (0, swagger_1.ApiResponse)({ type: common_1.StreamableFile }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_1.ExportExcelFileTypeDto]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getExcelFile", null);
__decorate([
    (0, common_1.Get)('/time-sheet/employee/:employeeId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time sheet detail',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({ type: response_dto_1.GetTimesheetOfEmployeeResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number, dtos_1.GetTimeSheetQuery, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getTimeSheetDetail", null);
__decorate([
    (0, common_1.Get)('/time-sheet'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time sheet overview',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.GetTimeEntriesOverviewQueryDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getTimeSheetOverview", null);
__decorate([
    (0, common_1.Get)('/calculate-unpaid-day'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time sheet overview',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.GetTimeEntriesCountDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "getCountTimeEntries", null);
__decorate([
    (0, common_1.Post)('/recompute/payroll-header/:payrollHeaderId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Recompute',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('payrollHeaderId')),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number, Object, String]),
    __metadata("design:returntype", Promise)
], TimeEntryController.prototype, "recompute", null);
exports.TimeEntryController = TimeEntryController = __decorate([
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, common_1.Controller)({ path: common_2.TIME_ENTRY_API_PATH }),
    __metadata("design:paramtypes", [time_entry_service_1.TimeEntryService,
        export_time_entries_excel_file_service_1.ExportTimeEntriesExcelFileService,
        services_1.TimeSheetService])
], TimeEntryController);
//# sourceMappingURL=time-entry.controller.js.map
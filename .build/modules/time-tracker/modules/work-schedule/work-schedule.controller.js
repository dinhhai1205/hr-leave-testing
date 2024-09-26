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
exports.WorkScheduleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../common/dto");
const enums_1 = require("../../../../common/enums");
const iam_1 = require("../../../../core/iam");
const common_2 = require("../../common");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const decorators_1 = require("./decorators");
const dtos_1 = require("./dtos");
const get_all_work_schedule_overlap_query_dto_1 = require("./dtos/get-all-work-schedule-overlap-query.dto");
const publish_work_schedule_body_dto_1 = require("./dtos/publish-work-schedule-body.dto");
const publish_work_schedule_params_dto_1 = require("./dtos/publish-work-schedule-params.dto");
const work_schedule_service_1 = require("./work-schedule.service");
let WorkScheduleController = class WorkScheduleController {
    constructor(workScheduleService) {
        this.workScheduleService = workScheduleService;
    }
    getTTWorkScheduleDefault({ companyId }, { timeTrackerCompanyId }) {
        return this.workScheduleService.getTTWorkScheduleDefaultByWorkScheduleId(timeTrackerCompanyId);
    }
    checkIsExistedWs({ companyId }) {
        return this.workScheduleService.checkIsExistedWsDefaultAtFirstTime({
            companyId,
        });
    }
    getLeaveWorkScheduleDefault({ companyId }) {
        return this.workScheduleService.getWorkScheduleDefaultByCompanyId(companyId);
    }
    getTTWorkScheduleByWorkScheduleId(workScheduleId, { companyId }, { timeTrackerCompanyId }) {
        return this.workScheduleService.getTTWorkScheduleByWorkScheduleId(workScheduleId, timeTrackerCompanyId);
    }
    getAllWorkSchedulesIsOverlap(params, query) {
        return this.workScheduleService.getAllWorkSchedulesIsOverlap({
            ...params,
            ...query,
        });
    }
    getListBreaksOfWorkSchedule(employeeId, paginationQueryDto, { companyId }) {
        return this.workScheduleService.getBreakListByEmployeeId(employeeId, companyId, paginationQueryDto.date, paginationQueryDto);
    }
    getAllTTWorkScheduleByCompanyId({ companyId }, { timeTrackerCompanyId }) {
        return this.workScheduleService.getTTWorkScheduleByCompanyId(timeTrackerCompanyId);
    }
    checkInDefaultWorkSchedule({ companyId }, checkInDefaultWorkScheduleDto) {
        return this.workScheduleService.checkInDefaultWorkSchedule(companyId, checkInDefaultWorkScheduleDto);
    }
    getWorkScheduleByWorkScheduleId(workScheduleId, { companyId }) {
        return this.workScheduleService.getWorkScheduleByWorkScheduleId(workScheduleId, companyId);
    }
    getAssigneesOfWorkSchedule(workScheduleId, { companyId }, paginationQueryDto) {
        return this.workScheduleService.getAssigneesOfWorkSchedule({
            workScheduleId,
            paginationQueryDto,
            companyId,
        });
    }
    getGroupAssigneesOfWorkSchedule(workScheduleId, { companyId }, paginationQueryDto) {
        return this.workScheduleService.getGroupAssigneesOfWorkSchedule({
            workScheduleId,
            paginationQueryDto,
            companyId,
        });
    }
    getAllWorkScheduleByCompanyId({ companyId }, query) {
        return this.workScheduleService.getAllWorkSchedulesByCompanyId({
            companyId,
            query,
        });
    }
    create(createWorkScheduleBodyDTO, { companyId }, { timeTrackerCompanyId, userEmail }, { userEmail: leaveUserEmail }) {
        if (timeTrackerCompanyId) {
            return this.workScheduleService.handleCreateWorkSchedule(createWorkScheduleBodyDTO, companyId, userEmail, timeTrackerCompanyId);
        }
        else {
            throw new common_1.BadRequestException('Unable to create a new Work Schedule for a company not integrated with Time Tracker.');
        }
    }
    update(workScheduleId, updateWorkScheduleBodyDTO, { companyId }, { timeTrackerCompanyId, userEmail }, { userEmail: leaveUserEmail }) {
        if (timeTrackerCompanyId) {
            return this.workScheduleService.handleUpdateWorkSchedule(workScheduleId, companyId, timeTrackerCompanyId, userEmail, updateWorkScheduleBodyDTO);
        }
        else {
            return this.workScheduleService.handleUpdateWorkScheduleLeave(workScheduleId, companyId, userEmail ? userEmail : leaveUserEmail, updateWorkScheduleBodyDTO);
        }
    }
    delete({ companyId }, { timeTrackerCompanyId, userEmail }, workScheduleId, { userEmail: activeUserEmail }) {
        if (timeTrackerCompanyId) {
            return this.workScheduleService.deleteWorkSchedule(workScheduleId, companyId, timeTrackerCompanyId, userEmail, common_2.OptionDelete.Soft);
        }
        else {
            return this.workScheduleService.deleteWorkScheduleLeave(workScheduleId, companyId, activeUserEmail, common_2.OptionDelete.Soft);
        }
    }
    publishWorkSchedule(params, body, { timeTrackerCompanyId }, userEmail = enums_1.EDefaultEmail.SYSTEM_GENERATED) {
        return this.workScheduleService.publishWorkSchedule({
            userEmail,
            ...params,
            ...body,
            timeTrackerCompanyId,
        });
    }
    async unpublishWorkSchedule(companyId, workScheduleId, { timeTrackerCompanyId }, userEmail = enums_1.EDefaultEmail.SYSTEM_GENERATED) {
        return this.workScheduleService.unpublishWorkSchedule({
            workScheduleId,
            companyId,
            userEmail,
            timeTrackerCompanyId,
        });
    }
    async updateWorkScheduleDefault(workScheduleId, { companyId }, { timeTrackerCompanyId, userEmail }, { userEmail: leaveUserEmail }) {
        return this.workScheduleService.updateWorkScheduleDefault({
            companyId,
            ttCompanyId: timeTrackerCompanyId,
            userEmail: leaveUserEmail,
            workScheduleId,
        });
    }
};
exports.WorkScheduleController = WorkScheduleController;
__decorate([
    (0, common_1.Get)('/time-tracker/default'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get workSchedule default',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getTTWorkScheduleDefault", null);
__decorate([
    (0, common_1.Get)('/check-is-existed-ws-default'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Check is existed work schedule default',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "checkIsExistedWs", null);
__decorate([
    (0, common_1.Get)('/default'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get workSchedule default',
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getLeaveWorkScheduleDefault", null);
__decorate([
    (0, common_1.Get)('/time-tracker/:workScheduleId'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get work_schedule by workScheduleId',
    }),
    __param(0, (0, common_1.Param)('workScheduleId')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getTTWorkScheduleByWorkScheduleId", null);
__decorate([
    (0, common_1.Get)('/:workScheduleId/overlap'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({ summary: 'Get all work schedules is overlap in date range' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publish_work_schedule_params_dto_1.PublishWorkScheduleParamsDto,
        get_all_work_schedule_overlap_query_dto_1.GetAllWorkScheduleOverlapQueryDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getAllWorkSchedulesIsOverlap", null);
__decorate([
    (0, common_1.Get)('/breaks/:employeeId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get list breaks of work schedule',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.PaginationQueryWithDateDto,
        dto_1.BaseParamDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getListBreaksOfWorkSchedule", null);
__decorate([
    (0, common_1.Get)('/time-tracker'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all WorkSchedule by companyId',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getAllTTWorkScheduleByCompanyId", null);
__decorate([
    (0, common_1.Get)('/check-in-default-work-schedule'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Check in default work schedule of employees, groups',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.CheckInDefaultWorkScheduleDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "checkInDefaultWorkSchedule", null);
__decorate([
    (0, common_1.Get)('/:workScheduleId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get work_schedule by workScheduleId',
    }),
    __param(0, (0, common_1.Param)('workScheduleId')),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getWorkScheduleByWorkScheduleId", null);
__decorate([
    (0, common_1.Get)('/:workScheduleId/assignees'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get assignees of work schedule',
    }),
    __param(0, (0, common_1.Param)('workScheduleId')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto,
        dtos_1.GetAssigneesQueryDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getAssigneesOfWorkSchedule", null);
__decorate([
    (0, common_1.Get)('/:workScheduleId/group-assignees'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get group assignees of work schedule',
    }),
    __param(0, (0, common_1.Param)('workScheduleId')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto,
        dtos_1.GetAssigneesQueryDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getGroupAssigneesOfWorkSchedule", null);
__decorate([
    (0, common_1.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, decorators_1.WorkScheduleApiQuery)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all WorkSchedule by companyId',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_1.WorkScheduleQuery)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.WorkScheduleQueryDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "getAllWorkScheduleByCompanyId", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'Create workSchedule',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateWorkScheduleBodyDTO,
        dto_1.BaseParamDto, Object, Object]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/:workScheduleId'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update workSchedule',
    }),
    __param(0, (0, common_1.Param)('workScheduleId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __param(4, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.UpdateWorkScheduleBodyDTO,
        dto_1.BaseParamDto, Object, Object]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:workScheduleId'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete workScheduleId',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('workScheduleId')),
    __param(3, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number, Object]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "delete", null);
__decorate([
    (0, common_1.Put)('/:workScheduleId/publish'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [publish_work_schedule_params_dto_1.PublishWorkScheduleParamsDto,
        publish_work_schedule_body_dto_1.PublishWorkScheduleBodyDto, Object, String]),
    __metadata("design:returntype", void 0)
], WorkScheduleController.prototype, "publishWorkSchedule", null);
__decorate([
    (0, common_1.Put)('/:workScheduleId/unpublish'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Param)('workScheduleId')),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, iam_1.ActiveUser)('userEmail')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, String]),
    __metadata("design:returntype", Promise)
], WorkScheduleController.prototype, "unpublishWorkSchedule", null);
__decorate([
    (0, common_1.Patch)('/:workScheduleId/mark-as-default'),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update workSchedule',
    }),
    __param(0, (0, common_1.Param)('workScheduleId')),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object, Object]),
    __metadata("design:returntype", Promise)
], WorkScheduleController.prototype, "updateWorkScheduleDefault", null);
exports.WorkScheduleController = WorkScheduleController = __decorate([
    (0, swagger_1.ApiTags)(common_2.WORK_SCHEDULE_API_TAG),
    (0, common_1.Controller)(common_2.WORK_SCHEDULE_API_PATH),
    __metadata("design:paramtypes", [work_schedule_service_1.WorkScheduleService])
], WorkScheduleController);
//# sourceMappingURL=work-schedule.controller.js.map
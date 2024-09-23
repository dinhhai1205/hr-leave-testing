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
exports.WorkScheduleESSController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../../../common/enums");
const iam_1 = require("../../../../core/iam");
const common_2 = require("../../common");
const work_schedule_service_1 = require("./work-schedule.service");
const dto_1 = require("../../../../common/dto");
const dtos_1 = require("./dtos");
let WorkScheduleESSController = class WorkScheduleESSController {
    constructor(workScheduleService) {
        this.workScheduleService = workScheduleService;
    }
    getAllWorkSchedulesFromToDate(companyId, startDate, endDate, query) {
        return this.workScheduleService.handleGetAllWorkScheduleFromToDate({
            companyId,
            startDate,
            endDate,
            query,
        });
    }
    getListBreaksOfWorkSchedule(employeeId, paginationQueryDto, { companyId }) {
        return this.workScheduleService.getBreakListByEmployeeId(employeeId, companyId, paginationQueryDto.date, paginationQueryDto);
    }
    getWorkScheduleOfEmployeeFromToDate(companyId, startDate, endDate, query, employeeId) {
        return this.workScheduleService.handleGetWorkScheduleOfEmployeeFromToDate({
            employeeId,
            companyId,
            startDate,
            endDate,
            query,
        });
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
    getWorkScheduleDetail(companyId, workScheduleId) {
        return this.workScheduleService.getDetailESSWorkSchedule({
            companyId,
            workScheduleId,
        });
    }
};
exports.WorkScheduleESSController = WorkScheduleESSController;
__decorate([
    (0, common_1.Get)('/all/employee'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get WorkSchedule Of Employee From-To Date',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, dtos_1.GetAllWorkScheduleInMultipleDateQueryDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleESSController.prototype, "getAllWorkSchedulesFromToDate", null);
__decorate([
    (0, common_1.Get)('/breaks'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get list breaks of work schedule',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    __param(0, (0, iam_1.ActiveEss)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.PaginationQueryWithDateDto,
        dto_1.BaseParamDto]),
    __metadata("design:returntype", void 0)
], WorkScheduleESSController.prototype, "getListBreaksOfWorkSchedule", null);
__decorate([
    (0, common_1.Get)('/employee'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get WorkSchedule Of Employee From-To Date',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)()),
    __param(4, (0, iam_1.ActiveEss)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, dto_1.PaginationQueryDto, Number]),
    __metadata("design:returntype", void 0)
], WorkScheduleESSController.prototype, "getWorkScheduleOfEmployeeFromToDate", null);
__decorate([
    (0, common_1.Get)('/:workScheduleId/assignees'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS),
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
], WorkScheduleESSController.prototype, "getAssigneesOfWorkSchedule", null);
__decorate([
    (0, common_1.Get)('/:workScheduleId/group-assignees'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS),
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
], WorkScheduleESSController.prototype, "getGroupAssigneesOfWorkSchedule", null);
__decorate([
    (0, common_1.Get)('/:workScheduleId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get work schedule details',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ESS, { selectedEmployeeFields: { id: true } }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Param)('workScheduleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], WorkScheduleESSController.prototype, "getWorkScheduleDetail", null);
exports.WorkScheduleESSController = WorkScheduleESSController = __decorate([
    (0, swagger_1.ApiTags)(common_2.WORK_SCHEDULE_ESS_API_TAG),
    (0, common_1.Controller)(common_2.WORK_SCHEDULE_ESS_API_PATH),
    __metadata("design:paramtypes", [work_schedule_service_1.WorkScheduleService])
], WorkScheduleESSController);
//# sourceMappingURL=work-schedule-ess.controller.js.map
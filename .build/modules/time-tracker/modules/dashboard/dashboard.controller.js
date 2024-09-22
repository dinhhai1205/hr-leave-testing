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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("./dashboard.service");
const decorators_1 = require("./decorators");
const swagger_1 = require("@nestjs/swagger");
const dtos_1 = require("./dtos");
const common_2 = require("../../common");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const enums_1 = require("../../../../core/iam/enums");
const iam_1 = require("../../../../core/iam");
const enums_2 = require("../../../../common/enums");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async trackerHourDashboardByCompany(companyId, query, { timeTrackerCompanyId }) {
        return this.dashboardService.trackerHourDashboardByCompany({
            companyId: timeTrackerCompanyId,
            query,
        });
    }
    async getProjectTimeTracked(companyId, query, { timeTrackerCompanyId }) {
        return this.dashboardService.getProjectTimeTracked({
            companyId: timeTrackerCompanyId,
            query,
        });
    }
    async getActivityTimeTracked(companyId, query, { timeTrackerCompanyId }) {
        return this.dashboardService.getActivityTimeTracked({
            companyId: timeTrackerCompanyId,
            query,
        });
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('/tracked-hours'),
    (0, decorators_1.DashboardApiQuery)(),
    (0, iam_1.Auth)(enums_1.AuthType.Bearer, enums_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_2.EApiAppMode.ADMIN, enums_2.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get tracked-hours dashboard by company',
    }),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.DashboardCompanyResponseDto] }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, decorators_1.DashboardQuery)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "trackerHourDashboardByCompany", null);
__decorate([
    (0, common_1.Get)('/project'),
    (0, decorators_1.DashboardApiQuery)(),
    (0, iam_1.Auth)(enums_1.AuthType.Bearer, enums_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_2.EApiAppMode.ADMIN, enums_2.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get project dashboard by company',
    }),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.DashboardCompanyResponseDto] }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, decorators_1.DashboardQuery)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getProjectTimeTracked", null);
__decorate([
    (0, common_1.Get)('/activity'),
    (0, decorators_1.DashboardApiQuery)(),
    (0, iam_1.Auth)(enums_1.AuthType.Bearer, enums_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_2.EApiAppMode.ADMIN, enums_2.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get activity dashboard by company',
    }),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.DashboardCompanyResponseDto] }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, decorators_1.DashboardQuery)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.DashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getActivityTimeTracked", null);
exports.DashboardController = DashboardController = __decorate([
    (0, common_1.Controller)({ path: common_2.DASHBOARD_API_PATH }),
    (0, swagger_1.ApiTags)(common_2.DASHBOARD_TAG_API_TAG),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map
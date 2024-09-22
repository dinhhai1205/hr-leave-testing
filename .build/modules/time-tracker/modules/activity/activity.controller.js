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
exports.ActivityController = void 0;
const common_1 = require("@nestjs/common");
const activity_service_1 = require("./activity.service");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const dtos_1 = require("./dtos");
const time_tracker_emp_info_decorator_1 = require("../../common/decorators/time-tracker-emp-info.decorator");
const time_tracker_path_constant_1 = require("../../common/constants/time-tracker-path.constant");
const iam_1 = require("../../../../core/iam");
const enums_1 = require("../../../../common/enums");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const common_2 = require("../../common");
const dtos_2 = require("../project/dtos");
let ActivityController = class ActivityController {
    constructor(activityService) {
        this.activityService = activityService;
    }
    getAllActivities(companyId, query, { timeTrackerCompanyId }) {
        return this.activityService.getAllActivities({
            companyId: timeTrackerCompanyId,
        }, query);
    }
    getAllGroupAssigneesByActivity(companyId, activityId, { timeTrackerCompanyId }, paginationQueryDto) {
        return this.activityService.getAllGroupAssigneesByActivityId(companyId, activityId, {
            companyId: timeTrackerCompanyId,
        }, paginationQueryDto);
    }
    getActivityDetail(companyId, activityId, { timeTrackerCompanyId }) {
        return this.activityService.getActivityDetail(activityId, companyId, {
            companyId: timeTrackerCompanyId,
        });
    }
    createActivity(companyId, createActivity, { timeTrackerCompanyId }) {
        return this.activityService.createActivity(createActivity, {
            companyId: timeTrackerCompanyId,
        });
    }
    archivedActivity(companyId, body, { timeTrackerCompanyId }) {
        return this.activityService.archivedActivities(body, {
            companyId: timeTrackerCompanyId,
        });
    }
    updateActivity(companyId, activityId, updateActivity, { timeTrackerCompanyId }) {
        return this.activityService.updateActivity({
            body: updateActivity,
            activityId,
        }, {
            companyId: timeTrackerCompanyId,
        });
    }
};
exports.ActivityController = ActivityController;
__decorate([
    (0, common_1.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all activities',
    }),
    (0, decorators_1.ApiOkResponsePaginated)(dtos_1.ActivityResponseDto),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, common_2.PaginationQueryDto, Object]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "getAllActivities", null);
__decorate([
    (0, common_1.Get)('/:activityId/group-assignees'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all group assignees by activityId',
    }),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Param)('activityId', common_1.ParseUUIDPipe)),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object, dtos_2.AssigneesProjectQueryDto]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "getAllGroupAssigneesByActivity", null);
__decorate([
    (0, common_1.Get)('/:activityId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get activity detail',
    }),
    (0, decorators_1.ApiOkResponsePaginated)(dtos_1.ActivityResponseDto),
    __param(0, (0, common_1.Param)('companyId')),
    __param(1, (0, common_1.Param)(`activityId`, common_1.ParseUUIDPipe)),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "getActivityDetail", null);
__decorate([
    (0, common_1.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new activity',
    }),
    __param(0, (0, common_1.Param)(`companyId`)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.CreateActivityDto, Object]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "createActivity", null);
__decorate([
    (0, common_1.Delete)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Archived one or multiple activities',
    }),
    __param(0, (0, common_1.Param)(`companyId`)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dtos_1.ArchivedActivity, Object]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "archivedActivity", null);
__decorate([
    (0, common_1.Patch)(':activityId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update activity',
    }),
    __param(0, (0, common_1.Param)(`companyId`)),
    __param(1, (0, common_1.Param)(`activityId`, common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, dtos_1.UpdateActivityBodyDto, Object]),
    __metadata("design:returntype", void 0)
], ActivityController.prototype, "updateActivity", null);
exports.ActivityController = ActivityController = __decorate([
    (0, swagger_1.ApiTags)(time_tracker_path_constant_1.ACTIVITY_API_TAG),
    (0, common_1.Controller)({ path: time_tracker_path_constant_1.ACTIVITY_API_PATH }),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    __metadata("design:paramtypes", [activity_service_1.ActivityService])
], ActivityController);
//# sourceMappingURL=activity.controller.js.map
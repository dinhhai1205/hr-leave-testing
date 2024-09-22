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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const time_tracker_path_constant_1 = require("../../common/constants/time-tracker-path.constant");
const project_service_1 = require("./project.service");
const decorators_1 = require("../../../../common/decorators");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const iam_1 = require("../../../../core/iam");
const file_support_constant_1 = require("../../common/constants/file-support.constant");
const time_tracker_emp_info_decorator_1 = require("../../common/decorators/time-tracker-emp-info.decorator");
const dtos_1 = require("./dtos");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const common_2 = require("../../common");
const dto_1 = require("../../../../common/dto");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async createProject({ name, description, locationId, clientId, code }, file, { timeTrackerCompanyId }) {
        return this.projectService.createProject({
            name,
            file,
            code,
            active: true,
            clientId,
            description,
            locationId,
        }, { companyId: timeTrackerCompanyId });
    }
    async addNewAssignee({ companyId }, projectId, addNewAssigneeDto, { timeTrackerCompanyId }) {
        return this.projectService.addNewAssigneeToProject(companyId, {
            payload: addNewAssigneeDto,
            projectId,
        }, {
            companyId: timeTrackerCompanyId,
        });
    }
    async removeMultipleAssignees({ companyId }, projectId, removeAssigneesDto, { timeTrackerCompanyId }) {
        return this.projectService.removeMultipleEmployeesAssigneeOfProject(companyId, {
            payload: removeAssigneesDto,
            projectId,
        }, {
            companyId: timeTrackerCompanyId,
        });
    }
    async updateProject(projectId, file, updateProjectInfoDto, { timeTrackerCompanyId }) {
        return this.projectService.updateProjectInfo({
            body: updateProjectInfoDto,
            file,
            projectId,
        }, {
            companyId: timeTrackerCompanyId,
        });
    }
    async deleteProject(projectId, { timeTrackerCompanyId }) {
        return this.projectService.deleteProjectById(projectId, {
            companyId: timeTrackerCompanyId,
        });
    }
    async deleteProjects(deleteProjectsDto, { timeTrackerCompanyId }) {
        return this.projectService.deleteMultipleProjects(deleteProjectsDto, {
            companyId: timeTrackerCompanyId,
        });
    }
    async getAllProjectsByCompanyId({ companyId }, paginationQueryDto, { timeTrackerCompanyId }) {
        return this.projectService.getAllProjectsByCompanyId(companyId, {
            companyId: timeTrackerCompanyId,
        }, paginationQueryDto);
    }
    async getAllEmployeeAssigneesByProjectId({ companyId }, projectId, { timeTrackerCompanyId }, paginationQueryDto) {
        return this.projectService.getAllEmployeeAssigneesByProjectId(companyId, projectId, {
            companyId: timeTrackerCompanyId,
        }, paginationQueryDto);
    }
    async getAllGroupAssigneesByProjectId({ companyId }, projectId, { timeTrackerCompanyId }, paginationQueryDto) {
        return this.projectService.getAllGroupAssigneesByProjectId(companyId, projectId, {
            companyId: timeTrackerCompanyId,
        }, paginationQueryDto);
    }
    async getProjectById({ companyId }, projectId, { timeTrackerCompanyId }) {
        return this.projectService.getProjectById(companyId, projectId, {
            companyId: timeTrackerCompanyId,
        });
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new project',
    }),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 5 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(file_support_constant_1.FILES_SUPPORTED),
        },
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.CreateProjectBodyDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ProjectResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)('file')),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateProjectBodyDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createProject", null);
__decorate([
    (0, common_1.Patch)(':projectId/assignees/add'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Add new assignee (groups, members) to a project',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.AddNewAssigneeDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ProjectStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('projectId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, String, dtos_1.AddNewAssigneeDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "addNewAssignee", null);
__decorate([
    (0, common_1.Patch)(':projectId/assignees/remove'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove multiple assignees (members) from a project',
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.RemoveAssigneesDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ProjectStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('projectId', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, String, dtos_1.RemoveAssigneesDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "removeMultipleAssignees", null);
__decorate([
    (0, common_1.Patch)(':projectId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.EDIT),
    (0, swagger_1.ApiOperation)({
        summary: 'Update project info by id',
    }),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 5 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(file_support_constant_1.FILES_SUPPORTED),
        },
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateProjectInfoDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ProjectResponseDto }),
    __param(0, (0, common_1.Param)('projectId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)('file')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, dtos_1.UpdateProjectInfoDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)(':projectId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete project by id',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ProjectStatusResponseDto }),
    __param(0, (0, common_1.Param)('projectId', common_1.ParseUUIDPipe)),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
__decorate([
    (0, common_1.Delete)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.DELETE),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete multiple projects with ids',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.RemoveMultiProjectResponse }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.DeleteProjectsDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProjects", null);
__decorate([
    (0, common_1.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all projects by companyId',
    }),
    (0, swagger_1.ApiQuery)({ type: common_2.PaginationQueryDto }),
    (0, decorators_1.ApiOkResponsePaginated)(dtos_1.ProjectResponseDto),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        common_2.PaginationQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllProjectsByCompanyId", null);
__decorate([
    (0, common_1.Get)(':projectId/employee-assignees'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all employee assignees by projectId',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.GetAllAssigneeResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('projectId', common_1.ParseUUIDPipe)),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, String, Object, dtos_1.AssigneesProjectQueryDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllEmployeeAssigneesByProjectId", null);
__decorate([
    (0, common_1.Get)(':projectId/group-assignees'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all group assignees by projectId',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('projectId', common_1.ParseUUIDPipe)),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, String, Object, dtos_1.AssigneesProjectQueryDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllGroupAssigneesByProjectId", null);
__decorate([
    (0, common_1.Get)(':projectId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.VIEW),
    (0, swagger_1.ApiOperation)({
        summary: 'Get project by projectId',
    }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ProjectResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('projectId', common_1.ParseUUIDPipe)),
    __param(2, (0, time_tracker_emp_info_decorator_1.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, String, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectById", null);
exports.ProjectController = ProjectController = __decorate([
    (0, swagger_1.ApiTags)(time_tracker_path_constant_1.PROJECT_API_TAG),
    (0, common_1.Controller)({ path: time_tracker_path_constant_1.PROJECT_API_PATH }),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map
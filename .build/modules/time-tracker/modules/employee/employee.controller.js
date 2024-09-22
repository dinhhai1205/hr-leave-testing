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
exports.TimeTrackerEmployeeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../../../../common/decorators");
const dto_1 = require("../../../../common/dto");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const iam_1 = require("../../../../core/iam");
const constants_1 = require("../../common/constants");
const decorators_2 = require("../../common/decorators");
const time_tracker_path_constant_1 = require("../../common/constants/time-tracker-path.constant");
const dtos_1 = require("./dtos");
const api_service_1 = require("../../../time-tracker/libs/api/api.service");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const employee_mapping_service_1 = require("../employee-mapping/employee-mapping.service");
const project_service_1 = require("../project/project.service");
const work_schedule_1 = require("../work-schedule");
const employee_service_2 = require("./employee.service");
const employee_module_type_enum_1 = require("./enums/employee-module-type.enum");
let TimeTrackerEmployeeController = class TimeTrackerEmployeeController {
    constructor(apiService, employeeService, hrForteEmployeeService, workScheduleService, projectService, employeeMappingService) {
        this.apiService = apiService;
        this.employeeService = employeeService;
        this.hrForteEmployeeService = hrForteEmployeeService;
        this.workScheduleService = workScheduleService;
        this.projectService = projectService;
        this.employeeMappingService = employeeMappingService;
    }
    async getAll({ companyId }, paginationQueryDto, { timeTrackerCompanyId }) {
        const result = await this.hrForteEmployeeService.getAllEmployeesWithWorkSchedule({
            companyId,
            paginationQueryDto,
        });
        const { data } = result;
        if (timeTrackerCompanyId) {
            const employeeIds = data?.map(e => e.id);
            let ttEmployeeIds = [];
            let employeeMappings = [];
            if (employeeIds.length > 0) {
                employeeMappings =
                    await this.employeeMappingService.getManyEmployeeMappingByIds({
                        companyId,
                        employeeIds,
                    });
                if (employeeMappings.length === 0) {
                    throw new common_1.BadRequestException('Employee mappings not found');
                }
                ttEmployeeIds = employeeMappings?.map(e => e.timeTrackerEmployeeId);
            }
            if (ttEmployeeIds.length > 0) {
                const { data: projectsData } = await this.apiService.request({
                    type: 'GET_ALL_PROJECT_EMPLOYEES',
                    data: { employeeIds: ttEmployeeIds },
                    segments: { companyId: timeTrackerCompanyId },
                }, { useMasterApiKey: true });
                if (projectsData && projectsData.length > 0) {
                    const employeeIdsMapping = new Map(employeeMappings.map(e => [e.employeeId, e.timeTrackerEmployeeId]));
                    const employeeProjectsMap = projectsData?.reduce((acc, project) => {
                        const employeeId = Array.from(employeeIdsMapping.entries()).find(([_, id]) => id === project.employeeId)?.[0];
                        if (employeeId !== undefined) {
                            if (!acc[employeeId])
                                acc[employeeId] = [];
                            acc[employeeId].push({
                                id: project?.projectId,
                                name: project?.project?.name,
                                description: project?.project?.description,
                                logo: project?.project?.logo,
                            });
                        }
                        return acc;
                    }, {});
                    const employeeWithProject = data?.map(employee => {
                        return {
                            ...employee,
                            projects: employeeProjectsMap[employee.id] || [],
                        };
                    });
                    const { projectIds, moduleType } = paginationQueryDto;
                    if (moduleType === employee_module_type_enum_1.EEmployeeModuleType.PROJECT &&
                        projectIds?.length) {
                        const filteredEmployees = employeeWithProject.filter(employee => {
                            const hasProjectId = employee.projects.some(project => projectIds.includes(project.id));
                            return !hasProjectId;
                        });
                        return {
                            ...result,
                            data: filteredEmployees ? filteredEmployees : data,
                        };
                    }
                    return {
                        ...result,
                        data: employeeWithProject ? employeeWithProject : data,
                    };
                }
            }
        }
        return result;
    }
    async assignWorkScheduleEmployee({ companyId }, assignWorkScheduleEmployeesDto, workScheduleId, { timeTrackerCompanyId }, { userEmail }) {
        if (timeTrackerCompanyId) {
            return this.employeeService.assignWorkScheduleToEmployees({
                assignWorkScheduleEmployeesDto,
                workScheduleId,
                companyId,
                options: { companyId: timeTrackerCompanyId },
                userEmail,
            });
        }
        else {
            return this.employeeService.assignWorkScheduleToEmployeesLeave({
                assignWorkScheduleEmployeesDto,
                workScheduleId,
                companyId,
                userEmail,
            });
        }
    }
    async unAssignWorkScheduleEmployee({ companyId }, assignWorkScheduleEmployeesDto, { timeTrackerCompanyId }, { userEmail }) {
        if (timeTrackerCompanyId) {
            return this.employeeService.unaAssignWorkScheduleToEmployees({
                assignWorkScheduleEmployeesDto,
                companyId,
                options: {
                    companyId: timeTrackerCompanyId,
                },
                userEmail,
            });
        }
        else {
            return this.employeeService.unaAssignWorkScheduleToEmployeesLeave({
                assignWorkScheduleEmployeesDto,
                companyId,
                userEmail,
            });
        }
    }
    async syncAllEmployees({ companyId }, { timeTrackerCompanyId }) {
        return this.employeeService.createManyEmployees({
            companyId: timeTrackerCompanyId,
        }, companyId);
    }
    async createEmployee({ companyId }, createManyEmployeesDto, { timeTrackerCompanyId }) {
        return this.employeeService.createMultiEmployee(createManyEmployeesDto, {
            companyId: timeTrackerCompanyId,
        }, companyId);
    }
    async assignEmployeesToARole({ companyId }, { timeTrackerCompanyId }, employeeRoleDto) {
        return this.employeeService.changeRoleOfEmployees(employeeRoleDto, companyId, { companyId: timeTrackerCompanyId });
    }
    async updateEmployeeAvatar({ companyId }, file, { timeTrackerCompanyId, timeTrackerEmployeeId }) {
        return this.employeeService.updateEmployeeAvatar({
            file,
        }, { companyId: timeTrackerCompanyId }, timeTrackerEmployeeId);
    }
    async getEmployeeInfoForClockWithEmployeeId({ companyId }, employeeId, { timeTrackerCompanyId }) {
        return this.employeeService.getEmployeeInfoForClock({
            companyId: timeTrackerCompanyId,
        }, companyId, employeeId);
    }
    async getAllEmployeesInCompanyWithFilter({ companyId }, paginationQueryDto, { timeTrackerCompanyId }) {
        return this.employeeService.getAllEmployees({ companyId: timeTrackerCompanyId }, paginationQueryDto, companyId);
    }
    async getEmployeeInfoForClock({ companyId }, { timeTrackerCompanyId }) {
        return this.employeeService.getEmployeeInfoForClock({
            companyId: timeTrackerCompanyId,
        }, companyId);
    }
    async getUserById({ companyId }, employeeId, { timeTrackerCompanyId }) {
        return this.employeeService.getEmployeeById({
            companyId: timeTrackerCompanyId,
        }, employeeId, companyId);
    }
    async getAllWorkScheduleOfEmployeeByEmployeeId({ companyId }, employeeId, { timeTrackerCompanyId }) {
        return this.workScheduleService.getAllWorkScheduleOfEmployeeByEmployeeId({
            companyId,
            employeeId,
        });
    }
    async isEmployeeInTimeTracker({ companyId }, { timeTrackerEmployeeId }, activeUser) {
        return {
            isTimeTrackerEmployee: !!timeTrackerEmployeeId,
            isAdmin: activeUser.isAdmin,
        };
    }
    async updateEmployeeProfile({ companyId }, employeeId, { timeTrackerCompanyId }, updateEmployeeProfileDto) {
        return this.employeeService.updateEmployeeProfile(updateEmployeeProfileDto, { companyId: timeTrackerCompanyId }, employeeId, companyId);
    }
    async updateOwnEmployeeProfile({ companyId }, { timeTrackerCompanyId, timeTrackerEmployeeId }, updateEmployeeProfileDto) {
        return this.employeeService.updateOwnEmployeeProfile(updateEmployeeProfileDto, { companyId: timeTrackerCompanyId }, timeTrackerEmployeeId);
    }
    async deleteEmployees({ companyId }, deleteMultipleEmployeeDto, { timeTrackerCompanyId }) {
        return this.employeeService.deleteMultipleEmployees(deleteMultipleEmployeeDto, { companyId: timeTrackerCompanyId }, companyId);
    }
};
exports.TimeTrackerEmployeeController = TimeTrackerEmployeeController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all employees HR Forte',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.EmployeeResponseDto] }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.PaginationEmployeeQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)('/work-schedule/:workScheduleId/assign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign work schedule  to many employees',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('workScheduleId', common_1.ParseIntPipe)),
    __param(3, (0, decorators_2.TimeTrackerEmpInfo)()),
    __param(4, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.AssignWorkScheduleEmployeesDto, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "assignWorkScheduleEmployee", null);
__decorate([
    (0, common_1.Patch)('/work-schedule/unassign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Unassign work schedule  to many employees',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __param(3, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.UnassignWorkScheduleEmployeesDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "unAssignWorkScheduleEmployee", null);
__decorate([
    (0, common_1.Post)('/sync-employees'),
    (0, swagger_1.ApiOperation)({
        summary: 'Sync all employees for a company.',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, iam_1.Permissions)(enums_1.EApiAppMode.ADMIN, enums_1.EPermissionActions.CREATE),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.EmployeeResponseDto] }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "syncAllEmployees", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create many employees',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_1.CreateManyEmployeesDto }),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.EmployeeResponseDto] }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.CreateManyEmployeesDto, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Patch)('/role/change'),
    (0, swagger_1.ApiOperation)({
        summary: 'Change selected employees to a role',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_1.EmployeeRoleBodyDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.ChangeRoleEmployeesResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_1.EmployeeRoleBodyDto]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "assignEmployeesToARole", null);
__decorate([
    (0, common_1.Patch)('me/avatar'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update avatar of own user',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, decorators_1.FilesUpload)({
        singleUpload: true,
        multerOptions: {
            limits: { fileSize: 5 * enums_1.StorageUnitInByte.OneMb },
            fileFilter: (0, utils_1.filesSupportedFilter)(constants_1.FILES_SUPPORTED),
        },
    }),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateEmployeeAvatarBody }),
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, swagger_1.ApiResponse)({ type: dtos_1.EmployeeResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.UploadedFile)('file')),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "updateEmployeeAvatar", null);
__decorate([
    (0, common_1.Get)('clock-info/:employeeId'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get employee information for clock in/out of other employee.',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('employeeId')),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "getEmployeeInfoForClockWithEmployeeId", null);
__decorate([
    (0, common_1.Get)('/all'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all employees time tracker with filter',
    }),
    (0, swagger_1.ApiQuery)({ type: dtos_1.PaginationEmployeeQueryDto }),
    (0, swagger_1.ApiResponse)({ type: (dto_1.PaginationResponseDto) }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.PaginationEmployeeQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "getAllEmployeesInCompanyWithFilter", null);
__decorate([
    (0, common_1.Get)('clock-info'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get employee information for clock in/out.',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "getEmployeeInfoForClock", null);
__decorate([
    (0, common_1.Get)('/:employeeId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get employee by Id',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({
        type: dtos_1.EmployeeWithGroupOwnerResponseDto,
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Get)(':employeeId/work-schedules'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all work schedules of employee',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('employeeId', common_1.ParseIntPipe)),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "getAllWorkScheduleOfEmployeeByEmployeeId", null);
__decorate([
    (0, common_1.Post)('/info'),
    (0, swagger_1.ApiOperation)({
        summary: 'Check if employee belongs to time tracker',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_2.TimeTrackerEmpInfo)()),
    __param(2, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "isEmployeeInTimeTracker", null);
__decorate([
    (0, common_1.Patch)('/:employeeId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update employee by Id',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateEmployeeProfileDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.EmployeeResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('employeeId')),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number, Object, dtos_1.UpdateEmployeeProfileDto]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "updateEmployeeProfile", null);
__decorate([
    (0, common_1.Patch)('/me/profile'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update own employee',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_1.UpdateEmployeeProfileDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.EmployeeResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, decorators_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_1.UpdateEmployeeProfileDto]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "updateOwnEmployeeProfile", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Archive selected employees',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_1.DeleteMultipleEmployeeBodyDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.DeleteMultiEmployeeResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_1.DeleteMultipleEmployeeBodyDto, Object]),
    __metadata("design:returntype", Promise)
], TimeTrackerEmployeeController.prototype, "deleteEmployees", null);
exports.TimeTrackerEmployeeController = TimeTrackerEmployeeController = __decorate([
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, swagger_1.ApiTags)(time_tracker_path_constant_1.EMPLOYEE_API_TAG),
    (0, common_1.Controller)({ path: time_tracker_path_constant_1.EMPLOYEE_API_PATH }),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService,
        employee_service_2.TimeTrackerEmployeeService,
        employee_service_1.EmployeeService,
        work_schedule_1.WorkScheduleService,
        project_service_1.ProjectService,
        employee_mapping_service_1.EmployeeMappingService])
], TimeTrackerEmployeeController);
//# sourceMappingURL=employee.controller.js.map
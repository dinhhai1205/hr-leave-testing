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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../../libs/api/api.service");
const company_mapping_service_1 = require("../company-mapping/company-mapping.service");
const employee_mapping_service_1 = require("../employee-mapping/employee-mapping.service");
const group_mapping_service_1 = require("../group-mapping/group-mapping.service");
const time_tracker_stream_img_service_1 = require("../time-tracker-stream-img/time-tracker-stream-img.service");
let ProjectService = class ProjectService {
    constructor(apiService, employeeMappingService, groupMappingService, companyMappingService, streamImageService) {
        this.apiService = apiService;
        this.employeeMappingService = employeeMappingService;
        this.groupMappingService = groupMappingService;
        this.companyMappingService = companyMappingService;
        this.streamImageService = streamImageService;
    }
    async createProject(payload, options) {
        const { file, active, clientId, code, description, locationId, name } = payload;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('active', JSON.stringify(active));
        formData.append('code', code);
        if (file) {
            formData.append('file', new Blob([file.buffer], { type: file.mimetype }));
        }
        if (description) {
            formData.append('description', description);
        }
        if (clientId) {
            formData.append('clientId', clientId);
        }
        if (locationId) {
            formData.append('locationId', locationId);
        }
        const { data } = await this.apiService.request({
            type: 'CREATE_PROJECT',
            data: formData,
            segments: { companyId: options.companyId },
        });
        return data;
    }
    async addNewAssigneeToProject(companyId, payload, options) {
        const { assigneeEmployeeIds = [], assigneeGroupIds = [] } = payload.payload;
        let employeeMappings = [];
        if (assigneeEmployeeIds.length > 0) {
            employeeMappings =
                await this.employeeMappingService.getManyEmployeeMappingByIds({
                    companyId,
                    employeeIds: assigneeEmployeeIds,
                });
            if (employeeMappings.length === 0) {
                throw new common_1.BadRequestException('Employee mappings not found');
            }
        }
        let groupMappings = [];
        if (assigneeGroupIds.length > 0) {
            groupMappings = await this.groupMappingService.getGroupMappings(assigneeGroupIds, companyId);
            if (groupMappings.length === 0) {
                throw new common_1.BadRequestException('Group mappings not found');
            }
        }
        const payloadData = {
            assigneeEmployeeIds: employeeMappings.map(e => e.timeTrackerEmployeeId),
            assigneeGroupIds: groupMappings.map(g => g.timeTrackerGroupId),
        };
        const { data } = await this.apiService.request({
            type: 'UPDATE_PROJECT_ADD_NEW_ASSIGNEE',
            data: payloadData,
            segments: { companyId: options.companyId, projectId: payload.projectId },
        });
        return data;
    }
    async removeMultipleEmployeesAssigneeOfProject(companyId, payload, options) {
        const { assigneeEmployeeIds = [], assigneeGroupIds = [] } = payload.payload;
        let employeeMappings = [];
        if (assigneeEmployeeIds.length > 0) {
            employeeMappings =
                await this.employeeMappingService.getManyEmployeeMappingByIds({
                    companyId,
                    employeeIds: assigneeEmployeeIds,
                });
            if (employeeMappings.length === 0) {
                throw new common_1.BadRequestException('Employee mappings not found');
            }
        }
        let groupMappings = [];
        if (assigneeGroupIds.length > 0) {
            groupMappings = await this.groupMappingService.getGroupMappings(assigneeGroupIds, companyId);
            if (groupMappings.length === 0) {
                throw new common_1.BadRequestException('Group mappings not found');
            }
        }
        const payloadData = {
            assigneeEmployeeIds: employeeMappings.map(e => e.timeTrackerEmployeeId),
            assigneeGroupIds: groupMappings.map(g => g.timeTrackerGroupId),
        };
        const { data } = await this.apiService.request({
            type: 'UPDATE_PROJECT_REMOVE_ASSIGNEE',
            data: payloadData,
            segments: { companyId: options.companyId, projectId: payload.projectId },
        });
        return data;
    }
    async updateProjectInfo(payload, options) {
        const { projectId, body, file } = payload;
        const formData = new FormData();
        if (file) {
            formData.append('file', new Blob([file.buffer], { type: file.mimetype }));
        }
        if (body.active) {
            formData.append('active', JSON.stringify(body.active));
        }
        if (body.clientId) {
            formData.append('clientId', body.clientId);
        }
        if (body.code) {
            formData.append('code', body.code);
        }
        if (body.description) {
            formData.append('description', body.description);
        }
        if (body.locationId) {
            formData.append('locationId', body.locationId);
        }
        if (body.name) {
            formData.append('name', body.name);
        }
        const { data } = await this.apiService.request({
            type: 'UPDATE_PROJECT_BY_ID',
            data: formData,
            segments: { companyId: options.companyId, projectId },
        });
        return data;
    }
    async deleteProjectById(projectId, options) {
        const { data } = await this.apiService.request({
            type: 'DELETE_PROJECT_BY_ID',
            segments: { companyId: options.companyId, projectId: projectId },
        });
        return data;
    }
    async deleteMultipleProjects(payload, options) {
        const { data } = await this.apiService.request({
            type: 'DELETE_MULTIPLE_PROJECTS',
            data: payload,
            segments: { companyId: options.companyId },
        });
        return data;
    }
    async getAllProjectsByCompanyId(companyId, options, query) {
        const { data } = await this.apiService.request({
            type: 'GET_ALL_PROJECT',
            segments: { companyId: options.companyId },
            params: query,
        });
        const { data: projectData } = data;
        const ttEmployeeIds = projectData?.flatMap(project => project?.assigneeEmployees?.map(employee => employee.employeeId));
        let employeeMappings = [];
        if (ttEmployeeIds.length > 0) {
            employeeMappings =
                await this.employeeMappingService.getManyEmployeeMappingByTTIds({
                    ttEmployeeIds,
                    companyId,
                });
            if (employeeMappings.length === 0) {
                throw new common_1.BadRequestException('Employee mappings not found');
            }
        }
        const ttEmployeesMap = new Map(employeeMappings.map(e => [e.timeTrackerEmployeeId, e.employeeId]));
        const ttGroupIds = projectData?.flatMap(project => project?.assigneeGroups?.map(group => group.groupId));
        let groupMappings = [];
        if (ttGroupIds.length > 0) {
            groupMappings =
                await this.groupMappingService.getGroupMappingByTTGroupIds({
                    ttGroupIds,
                    companyId,
                });
            if (groupMappings.length === 0) {
                throw new common_1.BadRequestException('Group mappings not found');
            }
        }
        const ttGroupsMap = new Map(groupMappings.map(e => [e.timeTrackerGroupId, e.organizationStructureId]));
        const result = projectData.map(project => ({
            ...project,
            assigneeEmployees: project.assigneeEmployees.map(assignee => ({
                ...assignee,
                employeeId: ttEmployeesMap.get(assignee.employeeId),
                employee: {
                    ...assignee.employee,
                    id: ttEmployeesMap.get(assignee.employee.id),
                },
            })),
            assigneeGroups: project.assigneeGroups.map(groupAssignee => ({
                ...groupAssignee,
                groupId: ttGroupsMap.get(groupAssignee.groupId),
                group: {
                    ...groupAssignee.group,
                    id: ttGroupsMap.get(groupAssignee.group.id),
                },
            })),
        }));
        return {
            ...data,
            data: result,
        };
    }
    async getAllEmployeeAssigneesByProjectId(companyId, projectId, options, paginationQueryDto) {
        const { data } = await this.apiService.request({
            type: 'GET_ALL_PROJECT_EMPLOYEE_ASSIGNEE',
            segments: { companyId: options.companyId, projectId },
            params: paginationQueryDto,
        });
        if (data) {
            const { data: assignees } = data;
            const ttEmployeeIds = assignees?.map(assignee => assignee.employeeId);
            const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByTTIds({
                ttEmployeeIds,
                companyId,
            });
            const ttEmployeesMap = new Map(employeeMappings.map(e => [e.timeTrackerEmployeeId, e.employeeId]));
            const result = assignees?.map(assignee => ({
                ...assignee,
                employeeId: ttEmployeesMap.get(assignee.employeeId),
                employee: {
                    ...assignee.employee,
                    id: ttEmployeesMap.get(assignee.employeeId),
                },
            }));
            return {
                ...data,
                data: result ? result : assignees,
            };
        }
        return data;
    }
    async getAllGroupAssigneesByProjectId(companyId, projectId, options, paginationQueryDto) {
        const { data } = await this.apiService.request({
            type: 'GET_ALL_PROJECT_GROUP_ASSIGNEE',
            segments: { companyId: options.companyId, projectId },
            params: paginationQueryDto,
        });
        if (data) {
            const { data: assignees } = data;
            const ttGroupIds = assignees?.map(assignee => assignee.id);
            const groupMappings = await this.groupMappingService.getGroupMappingByTTGroupIds({
                ttGroupIds,
                companyId,
            });
            const ttGroupsMap = new Map(groupMappings.map(e => [
                e.timeTrackerGroupId,
                e.organizationStructureId,
            ]));
            const result = assignees?.map(assignee => ({
                ...assignee,
                id: ttGroupsMap.get(assignee.id),
            }));
            return {
                ...data,
                data: result ? result : assignees,
            };
        }
        return data;
    }
    async getProjectById(companyId, projectId, options) {
        const { data } = await this.apiService.request({
            type: 'GET_PROJECT_BY_ID',
            segments: { companyId: options.companyId, projectId },
        });
        const ttEmployeeIds = data?.assigneeEmployees?.map(e => e.employeeId);
        let employeeMappings = [];
        if (ttEmployeeIds?.length > 0) {
            employeeMappings =
                await this.employeeMappingService.getManyEmployeeMappingByTTIds({
                    ttEmployeeIds,
                    companyId,
                });
            if (employeeMappings.length === 0) {
                throw new common_1.BadRequestException('Employee mappings not found');
            }
        }
        const ttGroupIds = data.assigneeGroups.map(g => g.groupId);
        let groupMappings = [];
        if (ttGroupIds?.length > 0) {
            groupMappings =
                await this.groupMappingService.getGroupMappingByTTGroupIds({
                    ttGroupIds,
                    companyId,
                });
            if (groupMappings.length === 0) {
                throw new common_1.BadRequestException('Group mappings not found');
            }
        }
        const ttEmployeesMap = new Map(employeeMappings.map(e => [e.timeTrackerEmployeeId, e.employeeId]));
        const ttGroupsMap = new Map(groupMappings.map(e => [e.timeTrackerGroupId, e.organizationStructureId]));
        let image = null;
        if (data.logo) {
            const keyImageEncode = data.logo.substring(data.logo.indexOf('v1'));
            image = await this.streamImageService.getProjectImage(keyImageEncode);
        }
        const result = {
            ...data,
            assigneeEmployees: data?.assigneeEmployees?.map(employee => ({
                ...employee,
                employeeId: ttEmployeesMap.get(employee?.employeeId) || employee?.employeeId,
                employee: {
                    ...employee?.employee,
                    id: ttEmployeesMap.get(employee?.employee?.id) ||
                        employee?.employee?.id,
                },
            })),
            assigneeGroups: data?.assigneeGroups?.map(group => ({
                ...group,
                groupId: ttGroupsMap.get(group?.groupId) || group?.groupId,
                group: {
                    ...group.group,
                    id: ttGroupsMap.get(group?.group.id) || group?.group.id,
                },
            })),
        };
        if (result) {
            return {
                ...result,
                logo: image,
            };
        }
        return {
            ...data,
            logo: image,
        };
    }
    async getAllProjectsByEmployeeIds({ companyId, employeeIds, }) {
        const companyMapping = await this.companyMappingService.getTimeTrackerCompanyByHrfCompanyId(companyId);
        if (!companyMapping) {
            return;
        }
        let ttEmployeeIds = [];
        if (employeeIds.length > 0) {
            const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
                companyId,
                employeeIds,
            });
            if (employeeMappings.length === 0) {
                throw new common_1.BadRequestException('Employee mappings not found');
            }
            ttEmployeeIds = employeeMappings?.map(e => e.timeTrackerEmployeeId);
        }
        const { data } = await this.apiService.request({
            type: 'GET_ALL_PROJECT_EMPLOYEES',
            data: { employeeIds: ttEmployeeIds },
            segments: { companyId: companyMapping.timeTrackerCompanyId },
        }, { useMasterApiKey: true });
        return data;
    }
    async getProjectByEmployeeId(args) {
        const { companyId, employeeId } = args;
        const employeeIds = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        const companyMapping = await this.companyMappingService.getTimeTrackerCompanyByHrfCompanyId(companyId);
        if (!companyMapping) {
            return;
        }
        const { data } = await this.apiService.request({
            type: 'GET_ALL_ESS_PROJECT_EMPLOYEE',
            segments: {
                companyId: companyMapping.timeTrackerCompanyId,
                employeeId: employeeIds[0].timeTrackerEmployeeId,
            },
        });
        return data;
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService,
        employee_mapping_service_1.EmployeeMappingService,
        group_mapping_service_1.GroupMappingService,
        company_mapping_service_1.CompanyMappingService,
        time_tracker_stream_img_service_1.TimeTrackerStreamImgService])
], ProjectService);
//# sourceMappingURL=project.service.js.map
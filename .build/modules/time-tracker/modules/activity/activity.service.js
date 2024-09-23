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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const api_service_1 = require("../../libs/api/api.service");
const group_mapping_service_1 = require("../group-mapping/group-mapping.service");
const employee_mapping_service_1 = require("../employee-mapping/employee-mapping.service");
const company_mapping_service_1 = require("../company-mapping/company-mapping.service");
let ActivityService = class ActivityService {
    constructor(apiService, groupMappingService, employeeMappingService, companyMappingService) {
        this.apiService = apiService;
        this.groupMappingService = groupMappingService;
        this.employeeMappingService = employeeMappingService;
        this.companyMappingService = companyMappingService;
    }
    async getAllActivities(options, query) {
        const { data } = await this.apiService.request({
            type: 'GET_ALL_ACTIVITIES',
            segments: { companyId: options.companyId },
        });
        const { data: activityData } = data;
        const result = activityData?.map(activity => ({
            id: activity.id,
            createdBy: activity.createdBy,
            createdOn: activity.createdOn,
            updatedBy: activity.updatedBy,
            name: activity.name,
            activityCode: activity.activityCode,
            description: activity.description,
            color: activity.color,
            assigneeGroups: activity.activityGroups.map(groupAssignee => ({
                ...groupAssignee,
            })),
        }));
        return { ...data, data: result };
    }
    async createActivity(payload, options) {
        const { data } = await this.apiService.request({
            type: 'CREATE_NEW_ACTIVITY',
            data: payload,
            segments: { companyId: options.companyId },
        });
        return data;
    }
    async archivedActivities(payload, options) {
        const { data } = await this.apiService.request({
            type: 'DELETE_MULTIPLE_ACTIVITIES',
            data: payload,
            segments: { companyId: options.companyId },
        });
        return data;
    }
    async updateActivity(payload, options) {
        const { data } = await this.apiService.request({
            type: 'UPDATE_ACTIVITY',
            data: payload.body,
            segments: {
                companyId: options.companyId,
                activityId: payload.activityId,
            },
        });
        return data;
    }
    async getActivityDetail(activityId, companyId, options) {
        const { data } = await this.apiService.request({
            type: 'GET_ACTIVITY_DETAIL',
            segments: {
                companyId: options.companyId,
                activityId,
            },
        });
        const ttGroupIds = data?.activityGroups?.map(ag => ag.groupId);
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
        const ttGroupsMap = new Map(groupMappings.map(e => [e.timeTrackerGroupId, e.organizationStructureId]));
        const mappingResult = {
            ...data,
            activityGroups: data?.activityGroups?.map(ag => ({
                ...ag,
                groupId: ttGroupsMap.get(ag.groupId) || ag.groupId,
                group: {
                    ...ag.group,
                    id: ttGroupsMap.get(ag.group.id) || ag.group.id,
                },
            })),
        };
        return mappingResult ? mappingResult : data;
    }
    async getAllGroupAssigneesByActivityId(companyId, activityId, options, paginationQueryDto) {
        const { data } = await this.apiService.request({
            type: 'GET_ALL_ACTIVITY_GROUP_ASSIGNEE',
            segments: { companyId: options.companyId, activityId },
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
    async getActivityByEmployeeId(args) {
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
            type: 'GET_ALL_ACTIVITY_ESS',
            segments: {
                companyId: companyMapping.timeTrackerCompanyId,
                employeeId: employeeIds[0].timeTrackerEmployeeId,
            },
        });
        return data;
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService,
        group_mapping_service_1.GroupMappingService,
        employee_mapping_service_1.EmployeeMappingService,
        company_mapping_service_1.CompanyMappingService])
], ActivityService);
//# sourceMappingURL=activity.service.js.map
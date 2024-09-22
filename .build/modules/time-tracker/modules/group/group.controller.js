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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../../common/dto");
const iam_1 = require("../../../../core/iam");
const common_2 = require("../../common");
const organization_structure_service_1 = require("../../../../modules/general/modules/organization-structure/organization-structure.service");
const time_tracker_path_constant_1 = require("../../common/constants/time-tracker-path.constant");
const time_tracker_emp_guard_1 = require("../../common/guards/time-tracker-emp.guard");
const dtos_1 = require("../member/dtos");
const dtos_2 = require("./dtos");
const assign_work_schedule_dto_1 = require("./dtos/assign-work-schedule.dto");
const group_service_1 = require("./group.service");
const work_schedule_1 = require("../work-schedule");
let GroupController = class GroupController {
    constructor(groupService, orgService, workScheduleService) {
        this.groupService = groupService;
        this.orgService = orgService;
        this.workScheduleService = workScheduleService;
    }
    async syncGroups({ companyId }, { timeTrackerCompanyId }) {
        return this.groupService.syncGroupsToTimeTracker(companyId, timeTrackerCompanyId);
    }
    async syncAGroup(createGroupPayloadDto, { companyId }, { timeTrackerCompanyId }) {
        return this.groupService.syncAGroup(createGroupPayloadDto, {
            companyId: timeTrackerCompanyId,
        }, companyId);
    }
    async getAllManagersByGroupId(groupId, { companyId }, { timeTrackerCompanyId, timeTrackerGroupId }) {
        return this.groupService.getManagersOfGroup(timeTrackerGroupId, {
            companyId: timeTrackerCompanyId,
        }, companyId);
    }
    async getAllOrganizationsWithRelation({ companyId }, paginationQueryDto) {
        return this.orgService.getAllOrganizationsWithRelation({
            companyId,
            paginationQueryDto,
        });
    }
    async getGroupMembersByGroupId(groupId, { companyId }, { timeTrackerCompanyId, timeTrackerGroupId }, paginationQueryDto) {
        return this.groupService.getMembersOfGroup(timeTrackerGroupId, companyId, {
            companyId: timeTrackerCompanyId,
        }, paginationQueryDto);
    }
    async getAllWorkScheduleOfGroupByOrgId({ companyId }, groupId) {
        return this.workScheduleService.getAllWorkScheduleOfGroupByOrgId({
            companyId,
            orgId: groupId,
        });
    }
    async getGroupById({ companyId }, { timeTrackerCompanyId, timeTrackerGroupId }, groupId) {
        return this.groupService.getGroupById(timeTrackerGroupId, companyId, {
            companyId: timeTrackerCompanyId,
        });
    }
    async addMembersToGroup({ companyId }, { timeTrackerCompanyId, timeTrackerGroupId }, groupId, addMembersToGroupDto) {
        if (timeTrackerGroupId) {
            return this.groupService.addMembersToGroup(addMembersToGroupDto, { companyId: timeTrackerCompanyId }, timeTrackerGroupId, companyId);
        }
        else {
            throw new common_1.BadRequestException('Group mapping not found');
        }
    }
    async removeMembersFromGroup({ companyId }, { timeTrackerCompanyId, timeTrackerGroupId }, groupId, removeMembersToGroupDto) {
        if (timeTrackerGroupId) {
            return this.groupService.removeMembersFromGroup(timeTrackerGroupId, removeMembersToGroupDto, { companyId: timeTrackerCompanyId }, companyId);
        }
        else {
            throw new common_1.BadRequestException('Group mapping not found');
        }
    }
    async moveMembersToAnotherGroup({ companyId }, { timeTrackerCompanyId }, moveMembersDto) {
        return this.groupService.moveMembersToAnotherGroup(moveMembersDto, { companyId: timeTrackerCompanyId }, companyId);
    }
    async assignWorkScheduleToGroups({ companyId }, workScheduleId, body, { timeTrackerCompanyId }, { userEmail }) {
        if (timeTrackerCompanyId) {
            return this.groupService.assignWorkScheduleToGroups({
                companyId,
                body,
                workScheduleId,
                options: {
                    companyId: timeTrackerCompanyId,
                },
                userEmail,
            });
        }
        else {
            return this.groupService.assignWorkScheduleToGroupsLeave({
                companyId,
                body,
                workScheduleId,
                userEmail,
            });
        }
    }
    async unAssignWorkScheduleToGroups({ companyId }, body, { timeTrackerCompanyId }, { userEmail }) {
        if (timeTrackerCompanyId) {
            return this.groupService.unAssignWorkScheduleToGroups({
                companyId,
                body,
                options: {
                    companyId: timeTrackerCompanyId,
                },
                userEmail,
            });
        }
        else {
            return this.groupService.unAssignWorkScheduleToGroupsLeave({
                companyId,
                body,
                userEmail,
            });
        }
    }
    async assignActivityToGroups({ companyId }, { timeTrackerCompanyId }, activityId, { orgIds }) {
        return this.groupService.assignActivityToGroups(activityId, orgIds, companyId, { companyId: timeTrackerCompanyId });
    }
    async unassignActivityToGroups({ companyId }, { timeTrackerCompanyId }, activityId, { orgIds }) {
        return this.groupService.unassignActivityToGroups(activityId, orgIds, companyId, { companyId: timeTrackerCompanyId });
    }
    async unassignActivitiesToGroup({ companyId }, { timeTrackerCompanyId, timeTrackerGroupId }, groupId, unassignActivitiesToGroupDto) {
        return this.groupService.unassignActivitiesToGroup(timeTrackerGroupId, unassignActivitiesToGroupDto, { companyId: timeTrackerCompanyId });
    }
    async unassignWorkScheduleToGroup({ companyId }, { timeTrackerCompanyId, timeTrackerGroupId }, groupId) {
        return this.groupService.unassignWorkScheduleToGroup(timeTrackerGroupId, {
            companyId: timeTrackerCompanyId,
        });
    }
    async updateGroupSetting({ companyId }, { timeTrackerCompanyId, timeTrackerGroupId }, groupId, updateGroupSettingDto) {
        return this.groupService.updateGroupSetting(timeTrackerGroupId, updateGroupSettingDto, { companyId: timeTrackerCompanyId }, companyId);
    }
    async deleteGroupById({ companyId }, { timeTrackerCompanyId, timeTrackerGroupId }, groupId) {
        return this.groupService.deleteGroupById(timeTrackerGroupId, {
            companyId: timeTrackerCompanyId,
        });
    }
    async deleteMultipleGroups({ companyId }, { timeTrackerCompanyId }, deleteMultiGroupsDto) {
        return this.groupService.deleteMultipleGroups(deleteMultiGroupsDto, { companyId: timeTrackerCompanyId }, companyId);
    }
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Post)('/sync'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Sync group of a company',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "syncGroups", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create new group',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.CreateGroupPayloadMappingDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_2.CreateGroupPayloadMappingDto,
        dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "syncAGroup", null);
__decorate([
    (0, common_1.Get)(':groupId/managers'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({ type: [dtos_1.MemberResponseDto] }),
    __param(0, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getAllManagersByGroupId", null);
__decorate([
    (0, common_1.Get)(),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all organization of company',
    }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        dtos_2.PaginationGroupQueryDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getAllOrganizationsWithRelation", null);
__decorate([
    (0, common_1.Get)(':groupId/members'),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all members by group id. Search by email, fistName, lastName, phone',
    }),
    (0, swagger_1.ApiQuery)({ type: dtos_2.PaginationGroupMembersQueryDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_1.GetAllMembersResponseDto }),
    __param(0, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.BaseParamDto, Object, dtos_2.PaginationGroupMembersQueryDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroupMembersByGroupId", null);
__decorate([
    (0, common_1.Get)(':groupId/work-schedules'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all work schedule of group',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getAllWorkScheduleOfGroupByOrgId", null);
__decorate([
    (0, common_1.Get)(':groupId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get group by id',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "getGroupById", null);
__decorate([
    (0, common_1.Patch)(':groupId/members/add'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add members to group',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.AddMembersToGroupBodyDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number, dtos_2.AddMembersToGroupBodyDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "addMembersToGroup", null);
__decorate([
    (0, common_1.Patch)(':groupId/members/remove'),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove members to group',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.RemoveMembersToGroupBodyDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number, dtos_2.RemoveMembersToGroupBodyDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "removeMembersFromGroup", null);
__decorate([
    (0, common_1.Patch)('members/move'),
    (0, swagger_1.ApiOperation)({
        summary: 'Move selected employees to another group',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.MoveMembersToAnotherGroupBodyDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_2.MoveMembersToAnotherGroupBodyDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "moveMembersToAnotherGroup", null);
__decorate([
    (0, common_1.Patch)('/work-schedule/:workScheduleId/assign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign work schedule to groups',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Param)('workScheduleId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_2.TimeTrackerEmpInfo)()),
    __param(4, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Number, assign_work_schedule_dto_1.AssignWorkScheduleToGroupsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "assignWorkScheduleToGroups", null);
__decorate([
    (0, common_1.Patch)('/work-schedule/unassign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Unassign work schedule from groups',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_2.TimeTrackerEmpInfo)()),
    __param(3, (0, iam_1.ActiveUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto,
        assign_work_schedule_dto_1.UnassignWorkScheduleToGroupsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "unAssignWorkScheduleToGroups", null);
__decorate([
    (0, common_1.Patch)(':activityId/activities/assign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Assign multi groups to an activity',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.AssignActivityToGroupsDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('activityId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, String, dtos_2.AssignActivityToGroupsDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "assignActivityToGroups", null);
__decorate([
    (0, common_1.Patch)(':activityId/activities/unassign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Unassign multi groups to an activity',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.AssignActivityToGroupsDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('activityId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, String, dtos_2.AssignActivityToGroupsDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "unassignActivityToGroups", null);
__decorate([
    (0, common_1.Patch)(':groupId/activities/unassign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Unassign multi activities to a group',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.UnassignActivitiesToGroupDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number, dtos_2.UnassignActivitiesToGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "unassignActivitiesToGroup", null);
__decorate([
    (0, common_1.Patch)(':groupId/work-schedule/unassign'),
    (0, swagger_1.ApiOperation)({
        summary: 'Unassign work schedule group',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "unassignWorkScheduleToGroup", null);
__decorate([
    (0, common_1.Patch)(':groupId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update group setting. Update name, description, managers of group',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.UpdateGroupSettingBodyDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number, dtos_2.UpdateGroupSettingBodyDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updateGroupSetting", null);
__decorate([
    (0, common_1.Delete)(':groupId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete group by id',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiResponse)({ type: dtos_2.GroupStatusResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, Number]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteGroupById", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete multiple groups with ids',
    }),
    (0, iam_1.Auth)(iam_1.AuthType.Bearer, iam_1.AuthType.Permission),
    (0, swagger_1.ApiBody)({ type: dtos_2.DeleteMultiGroupsPayloadDto }),
    (0, swagger_1.ApiResponse)({ type: dtos_2.DeleteMultiGroupsResponseDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.TimeTrackerEmpInfo)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.BaseParamDto, Object, dtos_2.DeleteMultiGroupsPayloadDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "deleteMultipleGroups", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.UseGuards)(time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard),
    (0, swagger_1.ApiTags)(time_tracker_path_constant_1.GROUP_API_TAG),
    (0, common_1.Controller)({ path: time_tracker_path_constant_1.GROUP_API_PATH }),
    __metadata("design:paramtypes", [group_service_1.GroupService,
        organization_structure_service_1.OrganizationStructureService,
        work_schedule_1.WorkScheduleService])
], GroupController);
//# sourceMappingURL=group.controller.js.map
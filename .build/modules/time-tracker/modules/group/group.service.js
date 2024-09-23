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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const database_1 = require("../../../../core/database");
const organization_structure_service_1 = require("../../../../modules/general/modules/organization-structure/organization-structure.service");
const company_user_role_1 = require("../../../user/modules/company-user-role");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const common_2 = require("../../common");
const api_service_1 = require("../../libs/api/api.service");
const company_mapping_service_1 = require("../company-mapping/company-mapping.service");
const employee_mapping_service_1 = require("../employee-mapping/employee-mapping.service");
const employee_service_2 = require("../employee/employee.service");
const group_mapping_service_1 = require("../group-mapping/group-mapping.service");
const work_schedule_1 = require("../work-schedule");
const work_schedule_assignment_service_1 = require("../work-schedule-assignment/work-schedule-assignment.service");
const work_schedule_state_enum_1 = require("../work-schedule/enums/work-schedule-state.enum");
const employee_fields_for_common_info_util_1 = require("../../../user/modules/employee/utils/employee-fields-for-common-info.util");
const utils_1 = require("../../../../common/utils");
let GroupService = class GroupService {
    constructor(orgRepository, apiService, orgStructureService, groupMappingService, employeeService, employeeMappingService, companyUserRoleService, ttEmployeeService, companyMappingService, workScheduleService, workScheduleAssignmentService) {
        this.orgRepository = orgRepository;
        this.apiService = apiService;
        this.orgStructureService = orgStructureService;
        this.groupMappingService = groupMappingService;
        this.employeeService = employeeService;
        this.employeeMappingService = employeeMappingService;
        this.companyUserRoleService = companyUserRoleService;
        this.ttEmployeeService = ttEmployeeService;
        this.companyMappingService = companyMappingService;
        this.workScheduleService = workScheduleService;
        this.workScheduleAssignmentService = workScheduleAssignmentService;
    }
    async getAdminWithFullAccessOfCompany(companyId, timeTrackerCompanyId) {
        const adminRaw = await this.companyUserRoleService.getAdminDataOfCompany({
            companyId,
        });
        if (!adminRaw) {
            return [];
        }
        const adminListFullAccess = adminRaw?.filter(item => item.orgElementListJson === null ||
            item.orgElementListJson === 'null' ||
            item.orgElementListJson === '[]');
        const emailList = adminListFullAccess
            .map(item => item.email)
            .filter(email => email);
        const adminMapping = await this.employeeMappingService.getManyEmployeeMapping({
            companyId,
            userEmails: emailList,
        });
        const adminMappingIds = adminMapping.map(a => a.timeTrackerEmployeeId);
        if (adminMappingIds.length === 0) {
            return [];
        }
        await this.ttEmployeeService.changeRoleOfEmployeesWithUseMasterKey({
            ttIds: adminMappingIds,
            roleName: common_2.RoleName.Admin,
        }, companyId, { companyId: timeTrackerCompanyId });
        return adminMappingIds;
    }
    async getAllAdminOfOrganizations(companyId, timeTrackerCompanyId) {
        const adminsRaw = await this.companyUserRoleService.getAdminDataOfCompany({
            companyId,
        });
        if (!adminsRaw) {
            return [];
        }
        const adminListWithValues = adminsRaw.filter(item => item.orgElementListJson !== null &&
            item.orgElementListJson !== 'null' &&
            item.orgElementListJson !== '[]');
        const adminsWithPaths = adminListWithValues.map(admin => ({
            email: admin.email,
            organizationPaths: this.companyUserRoleService.getAdminOrganizationPaths(admin.orgElementListJson),
        }));
        const emailList = adminsWithPaths
            .map(item => item.email)
            .filter(email => email);
        const adminMapping = await this.employeeMappingService.getManyEmployeeMapping({
            companyId,
            userEmails: emailList,
        });
        const adminMappingIds = adminMapping.map(a => a.timeTrackerEmployeeId);
        if (adminMappingIds.length === 0) {
            return [];
        }
        await this.ttEmployeeService.changeRoleOfEmployeesWithUseMasterKey({
            ttIds: adminMappingIds,
            roleName: common_2.RoleName.Manager,
        }, companyId, { companyId: timeTrackerCompanyId });
        const adminsWithMapping = adminsWithPaths.map(admin => {
            const mapping = adminMapping.find(a => a.userEmail === admin.email);
            return {
                ...admin,
                timeTrackerEmployeeId: mapping ? mapping.timeTrackerEmployeeId : null,
            };
        });
        return adminsWithMapping;
    }
    async syncGroupsToTimeTracker(companyId, timeTrackerCompanyId) {
        const groups = await this.orgStructureService.getAllGroups(companyId);
        if (groups.length === 0) {
            return;
        }
        const workScheduleIds = groups.flatMap(g => g.workScheduleId ? [g.workScheduleId] : []);
        const workSchedules = await this.workScheduleService.getTTWorkSchedulesByWorkScheduleIds(workScheduleIds, companyId);
        const workSchedulesMap = new Map(workSchedules.map(workSchedule => [
            workSchedule.id,
            workSchedule?.ttWorkScheduleId,
        ]));
        const organizationTree = await this.organizationTree(companyId, timeTrackerCompanyId, groups);
        if (!organizationTree) {
            throw new Error('Cannot get org structure');
        }
        const queue = [organizationTree];
        const groupMapping = new Map();
        while (queue.length > 0) {
            const currentGroup = queue.shift();
            if (currentGroup) {
                let parentId;
                let createGroupDto;
                if (currentGroup.parentId === 0) {
                    const managerIds = await this.getAdminWithFullAccessOfCompany(companyId, timeTrackerCompanyId);
                    const memberIds = currentGroup.employeesMap?.map(employee => employee.id) || [];
                    createGroupDto = {
                        name: currentGroup.name,
                        description: '',
                        active: true,
                        managerIds,
                        memberIds,
                        parentId: undefined,
                        workScheduleId: currentGroup?.workScheduleId
                            ? workSchedulesMap.get(currentGroup?.workScheduleId)
                            : undefined,
                    };
                }
                else {
                    parentId = await this.groupMappingService.getGroupMapping(currentGroup.parentId, companyId);
                    if (!parentId) {
                        throw new common_1.BadRequestException('Parent group mapping not found');
                    }
                    const memberIds = currentGroup.employeesMap?.map(employee => employee.id) || [];
                    const managerMappingIds = currentGroup.adminMappingIds;
                    createGroupDto = {
                        name: currentGroup.name,
                        description: '',
                        active: true,
                        managerIds: managerMappingIds ? managerMappingIds : [],
                        memberIds,
                        parentId: parentId || undefined,
                        workScheduleId: currentGroup?.workScheduleId
                            ? workSchedulesMap.get(currentGroup?.workScheduleId)
                            : undefined,
                    };
                }
                const createdGroup = await this.createGroup(createGroupDto, {
                    companyId: timeTrackerCompanyId,
                });
                await this.groupMappingService.createManyGroupMappings([
                    {
                        organizationStructureId: currentGroup.id,
                        timeTrackerGroupId: createdGroup.id,
                        companyId,
                    },
                ]);
                groupMapping.set(currentGroup.id, createdGroup.id);
                if (currentGroup.children) {
                    queue.push(...currentGroup.children);
                }
            }
        }
        return {
            message: 'Sync all groups successfully',
        };
    }
    async organizationTree(companyId, timeTrackerCompanyId, groups) {
        const organizationTree = this.orgStructureService.buildTree(groups);
        const groupIds = groups.map(group => group.id);
        const adminsWithMapping = await this.getAllAdminOfOrganizations(companyId, timeTrackerCompanyId);
        const employees = await this.employeeService.getAllEmployeesByCompanyIdWithElementIds({
            companyId,
            organizationElementIds: groupIds,
        }, {
            id: true,
            employeeRef: true,
            email: true,
            fullNameLocal: true,
            fullNameEn: true,
            employeeNo: true,
            isEssEnabled: true,
            active: true,
            orgPath: true,
            organizationElementId: true,
        });
        if (!employees) {
            throw new Error('Failed to fetch employees.');
        }
        const employeeIds = employees.map(e => e.id);
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        const emailToTimeTrackerIdMap = new Map(employeeMappings.map(mapping => [
            mapping.employeeId,
            mapping.timeTrackerEmployeeId,
        ]));
        const queue = [organizationTree];
        while (queue.length > 0) {
            const node = queue.shift();
            if (!node) {
                continue;
            }
            node.adminMappingIds = [];
            node.employeesMap = [];
            node.employeesMap = employees
                .filter(emp => emp.organizationElementId === node.id)
                .map(emp => ({
                ...emp,
                id: emailToTimeTrackerIdMap.get(emp.id),
            }));
            adminsWithMapping.forEach(admin => {
                if (admin?.organizationPaths.includes(node.orgPath)) {
                    if (admin.timeTrackerEmployeeId) {
                        node?.adminMappingIds?.push(admin.timeTrackerEmployeeId);
                    }
                }
            });
            if (node.children) {
                queue.push(...node.children);
            }
        }
        return organizationTree;
    }
    async createGroup(createGroupDto, options) {
        const { data } = await this.apiService.request({
            type: 'CREATE_GROUP',
            data: createGroupDto,
            segments: {
                companyId: options.companyId,
            },
        }, { useMasterApiKey: true });
        return data;
    }
    async syncAGroup(payload, options, companyId) {
        const { companyId: timeTrackerCompanyId } = options;
        const { organizationStructureId } = payload;
        const orgStructure = await this.orgStructureService.getGroupById({
            companyId,
            orgId: organizationStructureId,
        });
        let parentId;
        let createGroupDto;
        const employeeIds = orgStructure?.employees?.map(employee => employee.id);
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        const ttEmployeeIds = employeeMappings?.map(e => e.timeTrackerEmployeeId);
        if (orgStructure.parentId === 0) {
            const managerIds = await this.getAdminWithFullAccessOfCompany(companyId, timeTrackerCompanyId);
            createGroupDto = {
                name: orgStructure.name,
                description: '',
                active: true,
                managerIds,
                memberIds: ttEmployeeIds,
                parentId: undefined,
            };
        }
        else {
            if (orgStructure.parentId) {
                parentId = await this.groupMappingService.getGroupMapping(orgStructure.parentId, companyId);
                if (!parentId) {
                    throw new common_1.BadRequestException('Parent group mapping not found');
                }
            }
            const adminsWithMapping = await this.getAllAdminOfOrganizations(companyId, timeTrackerCompanyId);
            const managerIds = adminsWithMapping
                .map(a => a?.timeTrackerEmployeeId)
                .filter((id) => id !== null);
            createGroupDto = {
                name: orgStructure.name,
                description: '',
                active: true,
                managerIds: managerIds,
                memberIds: ttEmployeeIds,
                parentId: parentId || undefined,
            };
        }
        const createdGroup = await this.createGroup(createGroupDto, {
            companyId: timeTrackerCompanyId,
        });
        await this.groupMappingService.createManyGroupMappings([
            {
                organizationStructureId: orgStructure.id,
                timeTrackerGroupId: createdGroup.id,
                companyId,
            },
        ]);
        return {
            message: 'Sync group successfully',
        };
    }
    async getManagersOfGroup(groupId, options, companyId) {
        const { data } = await this.apiService.request({
            type: 'GET_GROUP_MANAGERS',
            segments: {
                companyId: options.companyId,
                groupId,
            },
        });
        const employeeIds = data.map(e => e.employeeId);
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByTTIds({
            companyId,
            ttEmployeeIds: employeeIds,
        });
        if (!employeeMappings) {
            throw new common_1.BadRequestException('Employees mapping not found');
        }
        const employeeMappingMap = new Map(employeeMappings.map(e => [e.timeTrackerEmployeeId, e.employeeId]));
        const mapTTData = data.map(manager => ({
            ...manager,
            employeeId: employeeMappingMap.get(manager.employeeId),
            employee: {
                ...manager.employee,
                id: employeeMappingMap.get(manager.employeeId),
            },
        }));
        return mapTTData;
    }
    async getMembersOfGroup(groupId, companyId, options, query) {
        const { data } = await this.apiService.request({
            type: 'GET_GROUP_MEMBERS',
            segments: {
                companyId: options.companyId,
                groupId,
            },
            params: query,
        });
        const ttData = data.data;
        const ttEmployeeIds = ttData.map(e => e.employeeId);
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByTTIds({
            companyId,
            ttEmployeeIds: ttEmployeeIds,
        });
        if (!employeeMappings) {
            throw new common_1.BadRequestException('Employees mapping not found');
        }
        const employeeMappingMap = new Map(employeeMappings.map(e => [e.timeTrackerEmployeeId, e.employeeId]));
        const mapTTData = ttData.map(member => ({
            ...member,
            employeeId: employeeMappingMap.get(member.employeeId),
            employee: {
                ...member.employee,
                id: employeeMappingMap.get(member.employeeId),
            },
        }));
        const response = {
            page: data.page,
            take: data.take,
            itemCount: data.itemCount,
            pageCount: data.pageCount,
            hasPreviousPage: data.hasPreviousPage,
            hasNextPage: data.hasNextPage,
            data: mapTTData,
        };
        return response;
    }
    async getGroupById(groupId, companyId, options) {
        const { data } = await this.apiService.request({
            type: 'GET_GROUP',
            segments: {
                companyId: options.companyId,
                groupId,
            },
        });
        const groupMapping = await this.groupMappingService.getGroupMappingByTTGroupIds({
            ttGroupIds: [data.id],
            companyId,
        });
        const companyMapping = await this.companyMappingService.findCompanyMapping(companyId);
        if (!companyMapping) {
            throw new common_1.BadRequestException('Company mapping not found');
        }
        const ttMapData = {
            ...data,
            id: groupMapping[0].organizationStructureId,
            companyId: companyMapping.companyId,
        };
        return ttMapData;
    }
    async getAllGroupsByCompanyId(companyId, options, query) {
        const { data } = await this.apiService.request({
            type: 'GET_ALL_GROUPS',
            params: query,
            segments: {
                companyId: options.companyId,
            },
        });
        const ttData = data.data;
        const companyMapping = await this.companyMappingService.findCompanyMapping(companyId);
        if (!companyMapping) {
            throw new common_1.BadRequestException('Company mapping not found');
        }
        const ttGroupIds = ttData.flatMap(e => e.members.map(m => m.groupId));
        const groupMappings = await this.groupMappingService.getGroupMappingByTTGroupIds({
            companyId,
            ttGroupIds,
        });
        if (!groupMappings) {
            throw new common_1.BadRequestException('Group mappings not found');
        }
        const ttEmployeeIds = ttData.flatMap(e => e.members.map(m => m.employeeId));
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByTTIds({
            companyId,
            ttEmployeeIds: ttEmployeeIds,
        });
        if (!employeeMappings) {
            throw new common_1.BadRequestException('Employees mapping not found');
        }
        const employeeMappingMap = new Map(employeeMappings.map(e => [e.timeTrackerEmployeeId, e.employeeId]));
        const groupMappingMap = new Map(groupMappings.map(g => [g.timeTrackerGroupId, g.organizationStructureId]));
        const mapTtData = ttData.map(group => ({
            ...group,
            id: groupMappingMap.get(group.id),
            companyId: companyMapping.companyId,
            members: group.members.map(member => ({
                ...member,
                groupId: groupMappingMap.get(member.groupId) || member.groupId,
                companyId: companyMapping.companyId,
                employeeId: employeeMappingMap.get(member.employeeId) || member.employeeId,
                employee: member.employee
                    ? {
                        ...member.employee,
                        id: employeeMappingMap.get(member.employee.id) ||
                            member.employee.id,
                    }
                    : undefined,
            })),
        }));
        const response = {
            ...data,
            data: mapTtData,
        };
        return response;
    }
    async addMembersToGroup(addMembersToGroupDto, options, timeTrackerGroupId, companyId) {
        const { employeeIds } = addMembersToGroupDto;
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        if (employeeMappings.length === 0) {
            throw new common_1.BadRequestException('Employee mappings not found');
        }
        const ttEmployeeIds = employeeMappings.map(e => e.timeTrackerEmployeeId);
        const payload = {
            memberIds: ttEmployeeIds,
        };
        const { data } = await this.apiService.request({
            type: 'ADD_GROUP_MEMBERS',
            data: payload,
            segments: {
                companyId: options.companyId,
                groupId: timeTrackerGroupId,
            },
        });
        return data;
    }
    async removeMembersFromGroup(groupId, removeMembersToGroupDto, options, companyId) {
        const { employeeIds } = removeMembersToGroupDto;
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        if (employeeMappings.length === 0) {
            throw new common_1.BadRequestException('Employee mappings not found');
        }
        const ttEmployeeIds = employeeMappings.map(e => e.timeTrackerEmployeeId);
        const payload = {
            memberIds: ttEmployeeIds,
        };
        const { data } = await this.apiService.request({
            type: 'REMOVE_GROUP_MEMBERS',
            data: payload,
            segments: {
                companyId: options.companyId,
                groupId,
            },
        });
        return data;
    }
    async moveMembersToAnotherGroup(moveMembersDto, options, companyId) {
        const { orgId, employeeIds } = moveMembersDto;
        const groupMapping = await this.groupMappingService.getTimeTrackerGroupId(companyId, orgId);
        if (!groupMapping) {
            throw new common_1.NotFoundException('Group mapping not found!');
        }
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        if (employeeMappings.length === 0) {
            throw new common_1.BadRequestException('Employee mappings not found');
        }
        const ttEmployeeIds = employeeMappings.map(e => e.timeTrackerEmployeeId);
        const payload = {
            groupId: groupMapping.timeTrackerGroupId,
            memberIds: ttEmployeeIds,
        };
        const { data } = await this.apiService.request({
            type: 'MOVE_MEMBERS_TO_GROUP',
            data: payload,
            segments: {
                companyId: options.companyId,
            },
        });
        return data;
    }
    async assignWorkScheduleToGroup(groupId, workScheduleId, options) {
        const { data } = await this.apiService.request({
            type: 'ASSIGN_WORK_SCHEDULE_TO_GROUP',
            segments: {
                companyId: options.companyId,
                groupId,
                workScheduleId,
            },
        });
        return data;
    }
    async getAllEmployeesInGroupAndSubGroups(companyId, orgPaths) {
        const groupOrgPaths = (0, utils_1.getParentPaths)(orgPaths);
        const empAlias = database_1.ETableName.EMPLOYEE;
        const empQueryBuilder = this.employeeService.repository
            .createQueryBuilder(empAlias)
            .andWhere(`${empAlias}.isDeleted = :isDeleted
        AND ${empAlias}.companyId = :companyId
        AND ${empAlias}.orgPath IS NOT NULL 
        AND ${empAlias}.orgPath != ''
        `, { isDeleted: false, companyId });
        if (groupOrgPaths.length && !groupOrgPaths.includes('')) {
            let query = '';
            const parameters = {};
            for (let i = 0; i < groupOrgPaths.length; i++) {
                i === 0 ? (query += '(') : (query += ' OR');
                const orgPathVariable = `orgPath_${i}`;
                query += ` ${empAlias}.orgPath LIKE :${orgPathVariable}`;
                parameters[orgPathVariable] = `${groupOrgPaths[i]}%`;
                i === groupOrgPaths.length - 1 ? (query += ')') : query;
            }
            empQueryBuilder.andWhere(query, parameters);
        }
        empQueryBuilder.select((0, employee_fields_for_common_info_util_1.employeeFieldsForCommonInfo)(empAlias));
        const employees = await empQueryBuilder.getMany();
        return employees;
    }
    async assignWorkScheduleToGroups({ companyId, body, workScheduleId, options, userEmail, }) {
        const { orgIds } = body;
        const groupMappings = await this.groupMappingService.getGroupMappings(orgIds, companyId);
        if (groupMappings.length === 0) {
            throw new common_1.BadRequestException('Groups mapping not found!');
        }
        const workSchedule = await this.workScheduleService.getWorkScheduleByWorkScheduleId(workScheduleId, companyId);
        if (!workSchedule) {
            throw new common_1.BadRequestException('Work schedule not found!');
        }
        const groups = await this.orgStructureService.getGroupByIds({
            companyId,
            orgIds,
        });
        if (workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.EXPIRED) {
            throw new common_1.BadRequestException('Work schedule expired!');
        }
        if (workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED ||
            workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED) {
            for (const group of groups) {
                group.workScheduleId = workScheduleId;
                group.updatedOn = moment.utc().toDate();
            }
            await this.orgRepository.save(groups);
            const assigneesInWorkScheduleDefault = await this.workScheduleService.checkInDefaultWorkSchedule(companyId, {
                orgIds,
            });
            if (assigneesInWorkScheduleDefault) {
                const assigneesToRemove = assigneesInWorkScheduleDefault.groups;
                const orgPathsRemove = assigneesToRemove.map(assignee => assignee.orgPath);
                await this.workScheduleService.updateRemoveGroupAssigneesOfWorkSchedule(assigneesInWorkScheduleDefault.workScheduleDefaultId, orgPathsRemove, companyId, userEmail);
            }
            const assigneeGroupsDto = groups.reduce((acc, group) => {
                acc[group.orgPath] = {
                    name: group.name,
                    id: group.id,
                };
                return acc;
            }, {});
            await this.workScheduleService.updateAddGroupAssigneesOfWorkSchedule(workScheduleId, assigneeGroupsDto, companyId, userEmail);
        }
        const ttGroupIds = groupMappings.map(g => g.timeTrackerGroupId);
        const ttWorkScheduleId = workSchedule.ttWorkScheduleId;
        await this.apiService.request({
            type: 'ASSIGN_WORK_SCHEDULE_TO_GROUPS',
            data: {
                groupsIds: ttGroupIds,
            },
            segments: {
                companyId: options.companyId,
                workScheduleId: ttWorkScheduleId,
            },
        });
        return {
            message: 'Assign work schedule to groups successfully',
            orgIds,
        };
    }
    async assignWorkScheduleToGroupsLeave({ companyId, body, workScheduleId, userEmail, }) {
        const { orgIds } = body;
        const workSchedule = await this.workScheduleService.getWorkScheduleByWorkScheduleId(workScheduleId, companyId);
        if (!workSchedule) {
            throw new common_1.BadRequestException('Work schedule not found!');
        }
        const groups = await this.orgStructureService.getGroupByIds({
            companyId,
            orgIds,
        });
        if (workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.EXPIRED) {
            throw new common_1.BadRequestException('Work schedule expired!');
        }
        if (workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED ||
            workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED) {
            for (const group of groups) {
                group.workScheduleId = workScheduleId;
                group.updatedOn = moment.utc().toDate();
            }
            await this.orgRepository.save(groups);
            const assigneesInWorkScheduleDefault = await this.workScheduleService.checkInDefaultWorkSchedule(companyId, {
                orgIds,
            });
            if (assigneesInWorkScheduleDefault) {
                const assigneesToRemove = assigneesInWorkScheduleDefault.groups;
                const orgPathsRemove = assigneesToRemove.map(assignee => assignee.orgPath);
                await this.workScheduleService.updateRemoveGroupAssigneesOfWorkSchedule(assigneesInWorkScheduleDefault.workScheduleDefaultId, orgPathsRemove, companyId, userEmail);
            }
            const assigneeGroupsDto = groups.reduce((acc, group) => {
                acc[group.orgPath] = {
                    name: group.name,
                    id: group.id,
                };
                return acc;
            }, {});
            await this.workScheduleService.updateAddGroupAssigneesOfWorkSchedule(workScheduleId, assigneeGroupsDto, companyId, userEmail);
        }
        return {
            message: 'Assign work schedule to groups successfully',
            orgIds,
        };
    }
    async unAssignWorkScheduleToGroups({ companyId, body, options, userEmail, }) {
        const { groupWorkSchedules } = body;
        const orgIds = groupWorkSchedules?.map(groupWorkSchedules => groupWorkSchedules.orgId);
        if (orgIds.length === 0) {
            return {
                message: 'Unassign work schedule to groups successfully',
                orgIds,
            };
        }
        const orgs = await this.orgStructureService.getGroupByIds({
            companyId,
            orgIds,
        });
        const orgPathsMapping = new Map(orgs?.map(e => [e.id, e.orgPath]));
        if (groupWorkSchedules.length > 0) {
            const workScheduleAssigneeMap = groupWorkSchedules.reduce((acc, group) => {
                if (!acc[group.workScheduleId]) {
                    acc[group.workScheduleId] = [];
                }
                acc[group.workScheduleId].push(orgPathsMapping.get(group.orgId));
                return acc;
            }, {});
            await Promise.all(Object.keys(workScheduleAssigneeMap).map(workScheduleId => this.workScheduleService.updateRemoveGroupAssigneesOfWorkSchedule(+workScheduleId, workScheduleAssigneeMap[+workScheduleId], companyId, userEmail)));
            const workScheduleIds = groupWorkSchedules?.map(groupWorkSchedule => groupWorkSchedule.workScheduleId);
            const workSchedules = await this.workScheduleService.getTTWorkSchedulesByWorkScheduleIds(workScheduleIds, companyId);
            if (orgIds.length > 0) {
                await this.orgRepository
                    .createQueryBuilder()
                    .update(database_1.OrganizationStructureEntity)
                    .set({
                    workScheduleId: () => 'NULL',
                    updatedBy: userEmail,
                    updatedOn: moment.utc().toDate(),
                })
                    .where('id IN (:...orgIds) AND companyId = :companyId AND isDeleted = false', {
                    orgIds,
                    companyId,
                })
                    .execute();
            }
            const groupMappings = await this.groupMappingService.getGroupMappings(orgIds, companyId);
            if (!groupMappings || groupMappings.length === 0) {
                throw new common_1.BadRequestException('No valid group mappings found!');
            }
            const ttGroupIds = groupMappings.map(g => g.timeTrackerGroupId);
            const groupIdsMapping = new Map(groupMappings?.map(g => [
                g.organizationStructureId,
                g.timeTrackerGroupId,
            ]));
            const workSchedulesMap = new Map(workSchedules?.map(workSchedule => [
                workSchedule.id,
                workSchedule.ttWorkScheduleId,
            ]));
            const mappedGroupWorkSchedules = groupWorkSchedules.map(gws => {
                const groupId = groupIdsMapping.get(gws.orgId);
                const workScheduleId = workSchedulesMap.get(gws.workScheduleId);
                if (!groupId || !workScheduleId) {
                    throw new Error(`Not found mapping orgId: ${gws.orgId} or workScheduleId: ${gws.workScheduleId}`);
                }
                return {
                    groupId,
                    workScheduleId,
                };
            });
            if (mappedGroupWorkSchedules && mappedGroupWorkSchedules.length > 0) {
                await this.apiService.request({
                    type: 'UNASSIGN_WORK_SCHEDULE_OF_GROUPS',
                    data: {
                        groupWorkSchedules: mappedGroupWorkSchedules,
                    },
                    segments: {
                        companyId: options.companyId,
                    },
                });
            }
        }
        return {
            message: 'Unassign work schedule to groups successfully',
            orgIds,
        };
    }
    async unAssignWorkScheduleToGroupsLeave({ companyId, body, userEmail, }) {
        const { groupWorkSchedules } = body;
        const orgIds = groupWorkSchedules?.map(groupWorkSchedules => groupWorkSchedules.orgId);
        if (orgIds.length === 0) {
            return {
                message: 'Unassign work schedule to groups successfully',
                orgIds,
            };
        }
        const orgs = await this.orgStructureService.getGroupByIds({
            companyId,
            orgIds,
        });
        const orgPathsMapping = new Map(orgs?.map(e => [e.id, e.orgPath]));
        if (groupWorkSchedules.length > 0) {
            const workScheduleAssigneeMap = groupWorkSchedules.reduce((acc, group) => {
                if (!acc[group.workScheduleId]) {
                    acc[group.workScheduleId] = [];
                }
                acc[group.workScheduleId].push(orgPathsMapping.get(group.orgId));
                return acc;
            }, {});
            await Promise.all(Object.keys(workScheduleAssigneeMap).map(workScheduleId => this.workScheduleService.updateRemoveGroupAssigneesOfWorkSchedule(+workScheduleId, workScheduleAssigneeMap[+workScheduleId], companyId, userEmail)));
            if (orgIds.length > 0) {
                await this.orgRepository
                    .createQueryBuilder()
                    .update(database_1.OrganizationStructureEntity)
                    .set({
                    workScheduleId: () => 'NULL',
                    updatedBy: userEmail,
                    updatedOn: moment.utc().toDate(),
                })
                    .where('id IN (:...orgIds) AND companyId = :companyId AND isDeleted = false', {
                    orgIds,
                    companyId,
                })
                    .execute();
            }
        }
        return {
            message: 'Unassign work schedule to groups successfully',
            orgIds,
        };
    }
    async assignHolidayPolicyGroup(payload, options) {
        const { data } = await this.apiService.request({
            type: 'ASSIGN_HOLIDAY_TO_GROUP',
            data: payload,
            segments: {
                companyId: options.companyId,
            },
        });
        return data;
    }
    async assignActivitiesToGroup(groupId, assignActivitiesToGroupDto, options) {
        const { data } = await this.apiService.request({
            type: 'ASSIGN_ACTIVITY_TO_GROUP',
            data: assignActivitiesToGroupDto,
            segments: {
                companyId: options.companyId,
                groupId,
            },
        });
        return data;
    }
    async assignActivityToGroups(activityId, groupIds, companyId, options) {
        if (groupIds.length === 0) {
            return {};
        }
        const groupMappings = await this.groupMappingService.getGroupMappings(groupIds, companyId);
        if (groupMappings.length === 0) {
            throw new common_1.BadRequestException('Group mappings not found');
        }
        const ttGroupIds = groupMappings.map(g => g.timeTrackerGroupId);
        const { data } = await this.apiService.request({
            type: 'ASSIGN_ACTIVITY_TO_GROUPS',
            data: { groupIds: ttGroupIds },
            segments: {
                companyId: options.companyId,
                activityId,
            },
        });
        return data;
    }
    async unassignActivityToGroups(activityId, groupIds, companyId, options) {
        if (groupIds.length === 0) {
            return {};
        }
        const groupMappings = await this.groupMappingService.getGroupMappings(groupIds, companyId);
        if (groupMappings.length === 0) {
            throw new common_1.BadRequestException('Group mappings not found');
        }
        const ttGroupIds = groupMappings.map(g => g.timeTrackerGroupId);
        const { data } = await this.apiService.request({
            type: 'UNASSIGN_ACTIVITY_TO_GROUPS',
            data: { groupIds: ttGroupIds },
            segments: {
                companyId: options.companyId,
                activityId,
            },
        });
        return data;
    }
    async unassignActivitiesToGroup(groupId, unassignActivitiesToGroupDto, options) {
        const { data } = await this.apiService.request({
            type: 'UNASSIGN_ACTIVITY_OF_GROUP',
            data: unassignActivitiesToGroupDto,
            segments: {
                companyId: options.companyId,
                groupId,
            },
        });
        return data;
    }
    async unassignWorkScheduleToGroup(groupId, options) {
        const { data } = await this.apiService.request({
            type: 'UNASSIGN_WORK_SCHEDULE_OF_GROUP',
            segments: {
                companyId: options.companyId,
                groupId,
            },
        });
        return data;
    }
    async unassignHolidayPolicyGroup(payload, options) {
        const { data } = await this.apiService.request({
            type: 'UNASSIGN_HOLIDAY_OF_GROUP',
            data: payload,
            segments: {
                companyId: options.companyId,
            },
        });
        return data;
    }
    async updateGroupSetting(groupId, updateGroupSettingDto, options, companyId) {
        const { emails = [], name, description } = updateGroupSettingDto;
        let ttEmployeeIds = [];
        if (emails.length > 0) {
            const employeeMappings = await this.employeeMappingService.getManyEmployeeMapping({
                companyId,
                userEmails: emails,
            });
            ttEmployeeIds = employeeMappings.map(e => e.timeTrackerEmployeeId);
        }
        const payload = {
            name,
            description,
            managerIds: ttEmployeeIds,
        };
        const { data } = await this.apiService.request({
            type: 'UPDATE_GROUP_SETTING',
            data: payload,
            segments: {
                companyId: options.companyId,
                groupId,
            },
        });
        return data;
    }
    async deleteGroupById(groupId, options) {
        const { data } = await this.apiService.request({
            type: 'DELETE_GROUP',
            segments: {
                companyId: options.companyId,
                groupId,
            },
        });
        return data;
    }
    async deleteMultipleGroups(deleteMultiGroupsDto, options, companyId) {
        const { orgIds } = deleteMultiGroupsDto;
        const groupMappings = await this.groupMappingService.getGroupMappings(orgIds, companyId);
        if (groupMappings.length === 0) {
            throw new common_1.BadRequestException('Group mappings not found');
        }
        const groupIds = groupMappings?.map(g => g.timeTrackerGroupId);
        const { data } = await this.apiService.request({
            type: 'DELETE_GROUPS',
            data: { groupIds },
            segments: {
                companyId: options.companyId,
            },
        });
        await this.groupMappingService.deleteManyGroupMapping({
            companyId,
            timeTrackerIds: groupIds,
        });
        return data;
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.OrganizationStructureEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        api_service_1.TimeTrackerApiService,
        organization_structure_service_1.OrganizationStructureService,
        group_mapping_service_1.GroupMappingService,
        employee_service_1.EmployeeService,
        employee_mapping_service_1.EmployeeMappingService,
        company_user_role_1.CompanyUserRoleService,
        employee_service_2.TimeTrackerEmployeeService,
        company_mapping_service_1.CompanyMappingService,
        work_schedule_1.WorkScheduleService,
        work_schedule_assignment_service_1.WorkScheduleAssignmentService])
], GroupService);
//# sourceMappingURL=group.service.js.map
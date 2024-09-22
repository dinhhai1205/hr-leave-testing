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
exports.OrganizationStructureService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dto_1 = require("../../../../common/dto");
const database_1 = require("../../../../core/database");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
const api_service_1 = require("../../../time-tracker/libs/api/api.service");
const company_mapping_service_1 = require("../../../time-tracker/modules/company-mapping/company-mapping.service");
const group_mapping_service_1 = require("../../../time-tracker/modules/group-mapping/group-mapping.service");
const common_1 = require("@nestjs/common");
const employee_module_type_enum_1 = require("../../../time-tracker/modules/employee/enums/employee-module-type.enum");
let OrganizationStructureService = class OrganizationStructureService extends services_1.LegacyBaseService {
    constructor(orgStructureRepository, employeeRepository, groupMappingService, companyMappingService, apiService) {
        super(orgStructureRepository);
        this.orgStructureRepository = orgStructureRepository;
        this.employeeRepository = employeeRepository;
        this.groupMappingService = groupMappingService;
        this.companyMappingService = companyMappingService;
        this.apiService = apiService;
    }
    async getAllGroups(companyId) {
        return this.orgStructureRepository.find({
            where: {
                companyId,
                isDeleted: false,
            },
        });
    }
    async getAllOrganizationsWithRelation({ companyId, paginationQueryDto, }) {
        const { moduleType, workScheduleIds } = paginationQueryDto;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const orgAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const queryBuilder = this.orgStructureRepository
            .createQueryBuilder(orgAlias)
            .where(`${orgAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${orgAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .leftJoinAndSelect(`${orgAlias}.workSchedule`, workScheduleAlias, `${workScheduleAlias}.isDeleted = :isDeleted AND ${workScheduleAlias}.companyId = :companyId`, { isDeleted: false, companyId });
        if (moduleType === employee_module_type_enum_1.EEmployeeModuleType.WORK_SCHEDULE &&
            workScheduleIds?.length) {
            queryBuilder.andWhere(`(NOT EXISTS (
            SELECT 1
            FROM ${workScheduleAlias},
            jsonb_each(${workScheduleAlias}.groupAssignees) AS groupAssignee
            WHERE ${workScheduleAlias}.id IN (:...workScheduleIds)
            AND (groupAssignee.value->>'id')::int = ${orgAlias}.id
          ))`, { workScheduleIds });
        }
        const querySearchFields = ['name'];
        const { page, take, q: querySearchString, isDeleted = false, ids, createdFrom, isSelectAll, } = paginationQueryDto;
        const alias = queryBuilder.alias;
        const sqlBuilder = new database_1.WhereConditionBuilder(alias);
        queryBuilder.andWhere(sqlBuilder
            .andWhere({
            field: 'isDeleted',
            operator: '=',
            value: isDeleted,
        })
            .buildBracket());
        if (querySearchFields?.length && querySearchString) {
            for (const field of querySearchFields) {
                sqlBuilder.orWhere({
                    field,
                    operator: 'LIKE',
                    value: querySearchString.trim(),
                    variable: 'querySearchFields',
                });
            }
            const bracket = sqlBuilder.buildBracket();
            queryBuilder.andWhere(bracket);
        }
        if (ids?.length) {
            queryBuilder.andWhereInIds(ids);
        }
        if (createdFrom) {
            queryBuilder.andWhere(sqlBuilder
                .andWhere({
                field: 'createdOn',
                operator: '>=',
                value: createdFrom,
            })
                .buildBracket());
        }
        queryBuilder.take(take).skip((page - 1) * take);
        queryBuilder.select([
            `${orgAlias}.id`,
            `${orgAlias}.companyId`,
            `${orgAlias}.name`,
            `${orgAlias}.code`,
            `${orgAlias}.parentId`,
            `${orgAlias}.headCount`,
            `${orgAlias}.head`,
            `${orgAlias}.orgPath`,
            `${orgAlias}.workScheduleId`,
            `${workScheduleAlias}.end_work_day_at`,
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.name`,
            `${workScheduleAlias}.utcOffset`,
            `${workScheduleAlias}.workArrangement`,
            `${workScheduleAlias}.breakType`,
            `${workScheduleAlias}.default`,
            `${workScheduleAlias}.weeklyHours`,
            `${workScheduleAlias}.unitTime`,
            `${workScheduleAlias}.excludeEarlyClockIn`,
            `${workScheduleAlias}.overtimeId`,
            `${workScheduleAlias}.endWorkDayAt`,
            `${workScheduleAlias}.companyId`,
            `${workScheduleAlias}.color`,
            `${workScheduleAlias}.startDate`,
            `${workScheduleAlias}.endDate`,
            `${workScheduleAlias}.state`,
            `${workScheduleAlias}.threshold`,
            `${workScheduleAlias}.ttWorkScheduleId`,
        ]);
        const [entities, count] = await queryBuilder.getManyAndCount();
        const companyMapping = await this.companyMappingService.findCompanyMapping(companyId);
        if (companyMapping) {
            const groupIds = entities.map(g => g.id);
            let ttGroupIds = [];
            let groupMappings = [];
            if (groupIds.length > 0) {
                groupMappings = await this.groupMappingService.getGroupMappings(groupIds, companyId);
                if (groupMappings.length === 0) {
                    throw new common_1.BadRequestException('Group mappings not found');
                }
                ttGroupIds = groupMappings?.map(g => g.timeTrackerGroupId);
                if (ttGroupIds.length > 0) {
                    const { data: activityData } = await this.apiService.request({
                        type: 'GET_ALL_ACTIVITY_OF_GROUPS',
                        data: { groupIds: ttGroupIds },
                        segments: { companyId: companyMapping.timeTrackerCompanyId },
                    }, { useMasterApiKey: true });
                    const { data: projectData } = await this.apiService.request({
                        type: 'GET_ALL_PROJECT_GROUPS',
                        data: { groupIds: ttGroupIds },
                        segments: { companyId: companyMapping.timeTrackerCompanyId },
                    }, { useMasterApiKey: true });
                    const groupIdsMapping = new Map(groupMappings.map(g => [
                        g.organizationStructureId,
                        g.timeTrackerGroupId,
                    ]));
                    let groupActivityMap = {};
                    if (activityData && activityData.length > 0) {
                        groupActivityMap = activityData.reduce((acc, activity) => {
                            const groupId = Array.from(groupIdsMapping.entries()).find(([_, id]) => id === activity.groupId)?.[0];
                            if (groupId !== undefined) {
                                if (!acc[groupId])
                                    acc[groupId] = [];
                                acc[groupId].push({
                                    id: activity?.activityId,
                                    name: activity?.activity?.name,
                                    activityCode: activity?.activity?.activityCode,
                                    description: activity?.activity?.description,
                                    color: activity?.activity?.color,
                                });
                            }
                            return acc;
                        }, {});
                    }
                    let groupProjectMap = {};
                    if (projectData && projectData.length > 0) {
                        groupProjectMap = projectData.reduce((acc, project) => {
                            const groupId = Array.from(groupIdsMapping.entries()).find(([_, id]) => id === project.groupId)?.[0];
                            if (groupId !== undefined) {
                                if (!acc[groupId])
                                    acc[groupId] = [];
                                acc[groupId].push({
                                    id: project?.project?.id,
                                    name: project?.project?.name,
                                    description: project?.project?.description,
                                    logo: project?.project?.logo,
                                });
                            }
                            return acc;
                        }, {});
                    }
                    const groupWithActivitiesAndProjects = entities.map(employee => {
                        return {
                            ...employee,
                            activities: groupActivityMap[employee.id] || [],
                            projects: groupProjectMap[employee.id] || [],
                        };
                    });
                    const { taskIds, projectIds } = paginationQueryDto;
                    if (moduleType === employee_module_type_enum_1.EEmployeeModuleType.TASK && taskIds?.length) {
                        const filteredGroups = groupWithActivitiesAndProjects.filter(group => {
                            const hasActivityId = group.activities.some(activity => taskIds.includes(activity.id));
                            return !hasActivityId;
                        });
                        return new dto_1.PaginationResponseDto({
                            paginationDto: {
                                page: page,
                                take: take,
                                isSelectAll: isSelectAll,
                            },
                            itemCount: count,
                            data: filteredGroups ? filteredGroups : entities,
                        });
                    }
                    if (moduleType === employee_module_type_enum_1.EEmployeeModuleType.PROJECT &&
                        projectIds?.length) {
                        const filteredGroups = groupWithActivitiesAndProjects.filter(group => {
                            const hasProjectId = group.projects.some(project => projectIds.includes(project.id));
                            return !hasProjectId;
                        });
                        return new dto_1.PaginationResponseDto({
                            paginationDto: {
                                page: page,
                                take: take,
                                isSelectAll: isSelectAll,
                            },
                            itemCount: count,
                            data: filteredGroups ? filteredGroups : entities,
                        });
                    }
                    return new dto_1.PaginationResponseDto({
                        paginationDto: {
                            page: page,
                            take: take,
                            isSelectAll: isSelectAll,
                        },
                        itemCount: count,
                        data: groupWithActivitiesAndProjects
                            ? groupWithActivitiesAndProjects
                            : entities,
                    });
                }
            }
        }
        return new dto_1.PaginationResponseDto({
            paginationDto: {
                page: page,
                take: take,
                isSelectAll: isSelectAll,
            },
            itemCount: count,
            data: entities,
        });
    }
    async getGroupByIds({ companyId, orgIds, }) {
        if (orgIds.length === 0) {
            return [];
        }
        return this.orgStructureRepository.find({
            where: {
                isDeleted: false,
                companyId,
                id: (0, typeorm_2.In)(orgIds),
            },
            relations: ['employees'],
        });
    }
    async getGroupById({ companyId, orgId, }) {
        const org = await this.orgStructureRepository.findOne({
            where: {
                companyId,
                id: orgId,
                isDeleted: false,
            },
            relations: ['employees'],
            select: {
                employees: {
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
                },
            },
        });
        if (!org) {
            throw new common_1.BadRequestException('Organization not found');
        }
        return org;
    }
    buildTree(data) {
        const map = {};
        data.forEach(node => {
            map[node.id] = { ...node, children: [] };
        });
        let root = null;
        data.forEach(node => {
            if (node.parentId === 0) {
                root = map[node.id];
            }
            else {
                if (map[node.parentId]) {
                    map[node.parentId].children?.push(map[node.id]);
                }
            }
        });
        return root;
    }
    async getGroupWorkScheduleForEmployee(employeeId, companyId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId, companyId },
            relations: ['orgStructure'],
        });
        if (!employee) {
            return null;
        }
        const currentGroup = employee?.orgStructure;
        if (currentGroup?.workScheduleId) {
            return currentGroup?.workScheduleId;
        }
        const orgPathIds = employee.orgPath
            ?.split('/')
            .filter(id => id)
            .map(id => parseInt(id, 10)) || [];
        if (orgPathIds.length > 0) {
            const groups = await this.orgStructureRepository.find({
                where: { id: (0, typeorm_2.In)(orgPathIds), companyId, isDeleted: false },
            });
            const groupMap = new Map();
            groups.forEach(group => {
                groupMap.set(group.id, group?.workScheduleId);
            });
            for (let i = orgPathIds.length - 1; i >= 0; i--) {
                const groupId = orgPathIds[i];
                if (groupMap.has(groupId)) {
                    const workScheduleId = groupMap.get(groupId);
                    if (workScheduleId) {
                        return workScheduleId;
                    }
                }
            }
        }
        const rootWorkSchedule = await this.orgStructureRepository.findOne({
            where: {
                parentId: 0,
                companyId,
                isDeleted: false,
            },
        });
        if (rootWorkSchedule?.workScheduleId) {
            return rootWorkSchedule?.workScheduleId;
        }
        return null;
    }
    async getSubOrgsByIds({ orgIds, companyId, }) {
        if (orgIds.length === 0) {
            return [];
        }
        const orgs = await this.orgStructureRepository.find({
            where: {
                id: (0, typeorm_2.In)(orgIds),
                companyId,
                isDeleted: false,
            },
            select: {
                id: true,
                orgPath: true,
                parentId: true,
                name: true,
            },
        });
        if (orgs.length === 0) {
            return [];
        }
        const orgPaths = orgs.map(org => org.orgPath);
        if (orgPaths.length && orgPaths.includes('')) {
            const allOrgs = await this.orgStructureRepository.find({
                where: {
                    companyId,
                    isDeleted: false,
                },
                select: {
                    id: true,
                    orgPath: true,
                    name: true,
                    parentId: true,
                },
            });
            const parentIds = allOrgs
                .filter(group => group.parentId !== null)
                .map(group => group.parentId);
            const parentGroups = await this.orgStructureRepository.find({
                where: {
                    id: (0, typeorm_2.In)(parentIds),
                    companyId,
                    isDeleted: false,
                },
                select: {
                    id: true,
                    name: true,
                },
            });
            const parentGroupMap = new Map(parentGroups.map(parent => [parent.id, parent.name]));
            return allOrgs.map(group => ({
                ...group,
                parentGroupName: parentGroupMap.get(group.parentId) || null,
            }));
        }
        const subOrgConditions = orgPaths.map(path => ({
            orgPath: (0, typeorm_2.Like)(`${path}/%`),
            companyId,
            isDeleted: false,
        }));
        const subGroups = await this.orgStructureRepository.find({
            where: subOrgConditions,
            select: {
                id: true,
                orgPath: true,
                name: true,
                parentId: true,
            },
        });
        const uniqueGroupsAndSubGroups = Array.from(new Map([...orgs, ...subGroups].map(group => [group.id, group])).values());
        const parentIds = uniqueGroupsAndSubGroups
            .filter(group => group.parentId !== null)
            .map(group => group.parentId);
        const parentGroups = await this.orgStructureRepository.find({
            where: {
                id: (0, typeorm_2.In)(parentIds),
                companyId,
                isDeleted: false,
            },
            select: {
                id: true,
                name: true,
            },
        });
        const parentGroupMap = new Map(parentGroups.map(parent => [parent.id, parent.name]));
        return uniqueGroupsAndSubGroups.map(group => ({
            ...group,
            parentGroupName: parentGroupMap.get(group.parentId) || null,
        }));
    }
};
exports.OrganizationStructureService = OrganizationStructureService;
exports.OrganizationStructureService = OrganizationStructureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.OrganizationStructureEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.EmployeeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        group_mapping_service_1.GroupMappingService,
        company_mapping_service_1.CompanyMappingService,
        api_service_1.TimeTrackerApiService])
], OrganizationStructureService);
//# sourceMappingURL=organization-structure.service.js.map
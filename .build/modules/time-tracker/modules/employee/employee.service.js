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
exports.TimeTrackerEmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../../../core/database/entities");
const company_user_role_1 = require("../../../user/modules/company-user-role");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const common_2 = require("../../common");
const api_service_1 = require("../../libs/api/api.service");
const company_mapping_service_1 = require("../company-mapping/company-mapping.service");
const employee_mapping_service_1 = require("../employee-mapping/employee-mapping.service");
const group_mapping_service_1 = require("../group-mapping/group-mapping.service");
const work_schedule_1 = require("../work-schedule");
const work_schedule_assignment_service_1 = require("../work-schedule-assignment/work-schedule-assignment.service");
const work_schedule_state_enum_1 = require("../work-schedule/enums/work-schedule-state.enum");
const const_1 = require("./const");
let TimeTrackerEmployeeService = class TimeTrackerEmployeeService {
    constructor(employeeRepository, apiService, employeeMappingService, employeeService, groupMappingService, companyMappingService, workScheduleService, companyUserRoleService, workScheduleAssignmentService) {
        this.employeeRepository = employeeRepository;
        this.apiService = apiService;
        this.employeeMappingService = employeeMappingService;
        this.employeeService = employeeService;
        this.groupMappingService = groupMappingService;
        this.companyMappingService = companyMappingService;
        this.workScheduleService = workScheduleService;
        this.companyUserRoleService = companyUserRoleService;
        this.workScheduleAssignmentService = workScheduleAssignmentService;
    }
    chunkArray(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }
    async createManyEmployees(options, companyId) {
        const allEmployees = await this.employeeService.getAllEmployeesByCompanyId({
            companyId,
        }, {
            email: true,
            fullNameLocal: true,
            gender: true,
            id: true,
            employeeRef: true,
            workScheduleId: true,
        });
        if (!allEmployees) {
            throw new common_1.BadRequestException('Cannot get all employees');
        }
        const allEmployeesWithEmail = allEmployees.map(emp => {
            return {
                ...emp,
                email: emp.email || `000${emp.id}-hrforte-user@gmail.com`,
            };
        });
        const workScheduleIds = allEmployeesWithEmail.flatMap(e => e.workScheduleId ? [e.workScheduleId] : []);
        const workSchedules = await this.workScheduleService.getTTWorkSchedulesByWorkScheduleIds(workScheduleIds, companyId);
        const workSchedulesMap = new Map(workSchedules.map(workSchedule => [
            workSchedule.id,
            workSchedule?.ttWorkScheduleId,
        ]));
        const usedEmails = new Set();
        const createEmployeeDtos = allEmployeesWithEmail.map(essData => {
            let email = essData.email;
            if (usedEmails.has(email)) {
                email = `${essData.id}-${email}`;
            }
            usedEmails.add(email);
            return {
                username: essData?.fullNameLocal ?? essData?.email,
                email: email,
                gender: essData?.gender ?? '',
                firstName: essData?.fullNameLocal ?? '',
                lastName: '',
                password: const_1.PASSWORD_TIME_TRACKER_EMPLOYEE_DEFAULT,
                workScheduleId: workSchedulesMap.get(essData?.workScheduleId),
            };
        });
        const emailToEmployeeIdMap = allEmployeesWithEmail.reduce((map, essData) => {
            let emailKey = essData.email;
            if (map[emailKey]) {
                emailKey = `${essData.id}-${essData.email}`;
            }
            map[emailKey] = essData.id;
            return map;
        }, {});
        const { data } = await this.apiService.request({
            type: 'CREATE_MANY_EMPLOYEES',
            data: createEmployeeDtos,
            segments: { companyId: options.companyId },
        }, { useMasterApiKey: true });
        const createEmployeeMappingDtos = data.map(e => ({
            timeTrackerEmployeeId: e.id,
            userEmail: e.email,
            companyId: companyId,
            employeeId: emailToEmployeeIdMap[e.email],
        }));
        const employeeMapping = await this.employeeMappingService.createManyEmployeeMappings(createEmployeeMappingDtos);
        const adminsRaw = await this.companyUserRoleService.getAdminDataOfCompany({
            companyId,
        });
        if (employeeMapping.length > 0 && adminsRaw) {
            const adminEmails = employeeMapping
                .filter(data => adminsRaw.some(item => item.email === data.userEmail))
                .map(admin => admin.timeTrackerEmployeeId);
            if (adminEmails.length > 0) {
                const payload = {
                    ttIds: adminEmails,
                    roleName: common_2.RoleName.Admin,
                };
                await this.changeRoleOfEmployeesWithUseMasterKey(payload, companyId, options);
            }
        }
        return data;
    }
    async createMultiEmployee(payload, options, companyId) {
        const employees = await this.employeeService.getManyEssData({
            ids: payload.ids,
            companyId,
        }, { email: true, fullNameLocal: true, gender: true, id: true });
        if (!employees) {
            throw new common_1.BadRequestException('Cannot get employees');
        }
        const employeeList = employees.map(item => {
            return {
                ...item,
                email: item.email ? item.email : `000${item.id}-hrforte-user@gmail.com`,
            };
        });
        const employeeIds = employeeList.map(e => e.id);
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        const existedEmployeeMappingIds = new Set(employeeMapping.map(e => e.employeeId));
        const employeeToMap = employeeList.filter(employee => !existedEmployeeMappingIds.has(employee.id));
        const usedEmails = new Set();
        const createEmployeeDtos = employeeToMap.map(essData => {
            let email = essData.email;
            if (usedEmails.has(email)) {
                email = `${essData.id}-${email}`;
            }
            usedEmails.add(email);
            return {
                username: essData.fullNameLocal ?? essData.email,
                email: email,
                gender: essData.gender ?? '',
                firstName: essData?.fullNameLocal ?? '',
                lastName: '',
                password: const_1.PASSWORD_TIME_TRACKER_EMPLOYEE_DEFAULT,
            };
        });
        const emailToEmployeeIdMap = employeeToMap.reduce((map, essData) => {
            let emailKey = essData.email;
            if (map[emailKey]) {
                emailKey = `${essData.id}-${essData.email}`;
            }
            map[emailKey] = essData.id;
            return map;
        }, {});
        const { data } = await this.apiService.request({
            type: 'CREATE_MANY_EMPLOYEES',
            data: createEmployeeDtos,
            segments: { companyId: options.companyId },
        });
        const createEmployeeMappingDtos = data?.map(e => ({
            timeTrackerEmployeeId: e.id,
            userEmail: e.email,
            companyId: companyId,
            employeeId: emailToEmployeeIdMap[e.email],
        }));
        await this.employeeMappingService.createManyEmployeeMappings(createEmployeeMappingDtos);
        return data;
    }
    async changeRoleOfEmployees(payload, companyId, options) {
        const { ttIds, roleName } = payload;
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByTTIds({
            companyId,
            ttEmployeeIds: ttIds,
        });
        const timeTrackerEmployeeIds = employeeMappings.map(e => e.timeTrackerEmployeeId);
        const employeeRoleDto = {
            employeeIds: timeTrackerEmployeeIds,
            roleName,
        };
        const { data } = await this.apiService.request({
            type: 'CHANGE_ROLE_EMPLOYEE',
            data: employeeRoleDto,
            segments: { companyId: options.companyId },
        });
        return data;
    }
    async changeRoleOfEmployeesWithUseMasterKey(payload, companyId, options) {
        const { ttIds, roleName } = payload;
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByTTIds({
            companyId,
            ttEmployeeIds: ttIds,
        });
        const timeTrackerEmployeeIds = employeeMappings.map(e => e.timeTrackerEmployeeId);
        const employeeRoleDto = {
            employeeIds: timeTrackerEmployeeIds,
            roleName,
        };
        const { data } = await this.apiService.request({
            type: 'CHANGE_ROLE_EMPLOYEE',
            data: employeeRoleDto,
            segments: { companyId: options.companyId },
        }, {
            useMasterApiKey: true,
        });
        return data;
    }
    async updateEmployeeAvatar(payload, options, employeeId) {
        const { file } = payload;
        const formData = new FormData();
        formData.append('file', new Blob([file.buffer], { type: file.mimetype }));
        const { data } = await this.apiService.request({
            type: 'UPDATE_AVATAR_EMPLOYEE',
            data: formData,
            segments: { companyId: options.companyId, employeeId },
        });
        return data;
    }
    async getAllEmployees(options, query, companyId) {
        const { data } = await this.apiService.request({
            type: 'GET_ALL_EMPLOYEES',
            segments: { companyId: options.companyId },
            params: query,
        });
        const ttData = data?.data;
        const userEmails = ttData.map(e => e.email);
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMapping({
            companyId,
            userEmails,
        });
        if (!employeeMappings) {
            throw new common_1.BadRequestException('Employees mapping not found');
        }
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
        const employeeMappingMap = new Map(employeeMappings.map(e => [e.timeTrackerEmployeeId, e.employeeId]));
        const groupMappingMap = new Map(groupMappings.map(g => [g.timeTrackerGroupId, g.organizationStructureId]));
        const mapTtData = ttData.map(employee => ({
            ...employee,
            id: employeeMappingMap.get(employee.id),
            companyId: companyMapping.companyId,
            members: employee.members.map(member => ({
                ...member,
                groupId: groupMappingMap.get(member.groupId) || member.groupId,
                employeeId: employeeMappingMap.get(member.employeeId) || member.employeeId,
                group: member.group
                    ? {
                        ...member.group,
                        id: groupMappingMap.get(member.group.id) || member.group.id,
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
    async getEmployeeById(options, employeeId, companyId) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        if (!employeeMapping) {
            throw new common_1.BadRequestException('Employee mapping not found');
        }
        const { data } = await this.apiService.request({
            type: 'GET_EMPLOYEE',
            segments: {
                companyId: options.companyId,
                employeeId: employeeMapping[0].timeTrackerEmployeeId,
            },
        });
        const companyMapping = await this.companyMappingService.findCompanyMapping(companyId);
        if (!companyMapping) {
            throw new common_1.BadRequestException('Company mapping not found');
        }
        const ttGroupId = data?.members[0]?.groupId;
        const groupMapping = await this.groupMappingService.getOrgByGroupId({
            ttGroupId,
            companyId,
        });
        if (!groupMapping) {
            throw new common_1.BadRequestException('Group mapping not found');
        }
        const ttEmployeeId = employeeMapping[0].employeeId;
        const orgId = groupMapping.organizationStructureId;
        const mappingData = {
            ...data,
            id: ttEmployeeId,
            companyId: companyMapping.companyId,
            members: data.members.map(member => ({
                ...member,
                groupId: orgId,
                employeeId: ttEmployeeId,
                group: {
                    ...member.group,
                    id: orgId,
                },
            })),
        };
        return mappingData;
    }
    async getEmployeeInfoForClock(options, companyId, employeeId) {
        let response;
        if (employeeId) {
            const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
                companyId,
                employeeIds: [employeeId],
            });
            if (employeeMapping.length === 0)
                throw new common_1.BadRequestException('Employee mapping not found');
            response = await this.apiService.request({
                type: 'GET_EMPLOYEE_CLOCK_INFO_WITH_EMPLOYEE_ID_PARAMS',
                segments: {
                    companyId: options.companyId,
                    employeeId: employeeMapping[0].id,
                },
            });
        }
        else {
            response = await this.apiService.request({
                type: 'GET_EMPLOYEE_CLOCK_INFO',
                segments: { companyId: options.companyId },
            });
        }
        const { data } = response;
        if (!data)
            throw new common_1.BadRequestException('Get response from e-smart time failed');
        const companyMapping = await this.companyMappingService.findCompanyMapping(companyId);
        if (!companyMapping) {
            throw new common_1.BadRequestException('Company mapping not found');
        }
        const employeeMapping = await this.employeeMappingService.getEmployeeMappingByEmail(data?.email, companyId);
        if (!employeeMapping) {
            throw new common_1.BadRequestException('Employee mapping not found');
        }
        let workScheduleMappingId = undefined;
        if (data.workSchedule) {
            const { id } = data.workSchedule;
            const workScheduleMapping = await this.workScheduleService.getWorkScheduleByWsTTId(id, companyId);
            if (!workScheduleMapping) {
                throw new common_1.BadRequestException('Work Schedule mapping not found');
            }
            workScheduleMappingId = workScheduleMapping.id;
        }
        const ttGroupId = data?.members[0]?.groupId;
        let orgId;
        if (ttGroupId) {
            const groupMapping = await this.groupMappingService.getOrgByGroupId({
                ttGroupId,
                companyId,
            });
            if (!groupMapping) {
                throw new common_1.BadRequestException('Group mapping not found');
            }
            orgId = groupMapping.organizationStructureId;
        }
        const ttEmployeeId = employeeMapping.employeeId;
        const mappingData = {
            ...data,
            id: ttEmployeeId,
            members: data.members.map(member => ({
                ...member,
                groupId: orgId,
                employeeId: ttEmployeeId,
                group: {
                    ...member.group,
                    id: orgId,
                },
            })),
            workSchedule: data.workSchedule
                ? {
                    ...data.workSchedule,
                    id: workScheduleMappingId,
                }
                : null,
            workScheduleId: workScheduleMappingId ? workScheduleMappingId : null,
            project: data?.assigneeGroups?.project
                ? data.assigneeGroups.project
                : undefined,
        };
        return mappingData;
    }
    async updateOwnEmployeeProfile(payload, options, employeeId) {
        const { data } = await this.apiService.request({
            type: 'UPDATE_EMPLOYEE_PROFILE',
            data: payload,
            segments: { companyId: options.companyId, employeeId },
        });
        return data;
    }
    async updateEmployeeProfile(payload, options, employeeId, companyId) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        if (employeeMapping.length === 0) {
            throw new common_1.BadRequestException('Employee mapping not found');
        }
        const timeTrackerEmployeeId = employeeMapping[0]?.timeTrackerEmployeeId;
        const { data } = await this.apiService.request({
            type: 'UPDATE_EMPLOYEE_PROFILE',
            data: payload,
            segments: {
                companyId: options.companyId,
                employeeId: timeTrackerEmployeeId,
            },
        });
        return data;
    }
    async deleteMultipleEmployees(payload, options, companyId) {
        const { employeeIds } = payload;
        const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        if (employeeMappings.length === 0) {
            throw new common_1.BadRequestException('Employees mapping not found');
        }
        const employeeMappingIds = employeeMappings.map(e => e.timeTrackerEmployeeId);
        const { data } = await this.apiService.request({
            type: 'DELETE_EMPLOYEES',
            data: { employeeIds: employeeMappingIds },
            segments: { companyId: options.companyId },
        });
        const { employeeIds: timeTrackerIds } = data;
        await this.employeeMappingService.deleteManyEmployeeMapping({
            companyId,
            timeTrackerIds,
        });
        return data;
    }
    async assignWorkScheduleToEmployees({ assignWorkScheduleEmployeesDto, workScheduleId, companyId, options, userEmail, }) {
        const { employeeIds } = assignWorkScheduleEmployeesDto;
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        if (!employeeMapping) {
            throw new common_1.BadRequestException('Employees mapping not found!');
        }
        const ids = employeeMapping.map(e => e.employeeId);
        const workSchedule = await this.workScheduleService.getWorkScheduleByWorkScheduleId(workScheduleId, companyId);
        if (!workSchedule) {
            throw new common_1.BadRequestException('Work schedule not found!');
        }
        const employees = await this.employeeService.getManyEssData({
            ids,
            companyId,
        });
        if (workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.EXPIRED) {
            throw new common_1.BadRequestException('Work schedule expired!');
        }
        if (workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED ||
            workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED) {
            for (const employee of employees) {
                employee.workScheduleId = workScheduleId;
                employee.updatedOn = moment.utc().toDate();
            }
            await this.employeeRepository.save(employees);
            const assigneesInWorkScheduleDefault = await this.workScheduleService.checkInDefaultWorkSchedule(companyId, {
                employeeIds,
            });
            if (assigneesInWorkScheduleDefault) {
                const assigneesToRemove = assigneesInWorkScheduleDefault.employees;
                const employeeRemoveIds = assigneesToRemove.map(assignee => assignee.employeeId);
                await this.workScheduleService.updateRemoveAssigneesOfWorkSchedule(assigneesInWorkScheduleDefault.workScheduleDefaultId, employeeRemoveIds, companyId, userEmail);
            }
            const assigneesDto = employees.reduce((acc, employee) => {
                acc[employee.id] = {
                    employeeRef: employee.employeeRef,
                    employeeNo: employee.employeeNo,
                    email: employee.email,
                    fullNameLocal: employee.fullNameLocal,
                    fullNameEn: employee.fullNameEn,
                };
                return acc;
            }, {});
            await this.workScheduleService.updateAddAssigneesOfWorkSchedule(workScheduleId, assigneesDto, companyId, userEmail);
        }
        const ttWorkScheduleId = workSchedule.ttWorkScheduleId;
        const ttEmployeeIds = employeeMapping.map(e => e.timeTrackerEmployeeId);
        if (ttEmployeeIds.length > 0) {
            await this.apiService.request({
                type: 'ASSIGN_WORK_SCHEDULE_TO_EMPLOYEES',
                data: {
                    employeeIds: ttEmployeeIds,
                },
                segments: {
                    companyId: options.companyId,
                    workScheduleId: ttWorkScheduleId,
                },
            });
        }
        return {
            message: 'Assign work schedule to employees successfully',
            employeeIds,
        };
    }
    async assignWorkScheduleToEmployeesLeave({ assignWorkScheduleEmployeesDto, workScheduleId, companyId, userEmail, }) {
        const { employeeIds } = assignWorkScheduleEmployeesDto;
        const workSchedule = await this.workScheduleService.getWorkScheduleByWorkScheduleId(workScheduleId, companyId);
        if (!workSchedule) {
            throw new common_1.BadRequestException('Work schedule not found!');
        }
        const employees = await this.employeeService.getManyEssData({
            ids: employeeIds,
            companyId,
        });
        if (workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.EXPIRED) {
            throw new common_1.BadRequestException('Work schedule expired!');
        }
        if (workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED ||
            workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED) {
            for (const employee of employees) {
                employee.workScheduleId = workScheduleId;
                employee.updatedOn = moment.utc().toDate();
            }
            await this.employeeRepository.save(employees);
            const assigneesInWorkScheduleDefault = await this.workScheduleService.checkInDefaultWorkSchedule(companyId, {
                employeeIds,
            });
            if (assigneesInWorkScheduleDefault) {
                const assigneesToRemove = assigneesInWorkScheduleDefault.employees;
                const employeeRemoveIds = assigneesToRemove.map(assignee => assignee.employeeId);
                await this.workScheduleService.updateRemoveAssigneesOfWorkSchedule(assigneesInWorkScheduleDefault.workScheduleDefaultId, employeeRemoveIds, companyId, userEmail);
            }
            const assigneesDto = employees.reduce((acc, employee) => {
                acc[employee.id] = {
                    employeeRef: employee.employeeRef,
                    employeeNo: employee.employeeNo,
                    email: employee.email,
                    fullNameLocal: employee.fullNameLocal,
                    fullNameEn: employee.fullNameEn,
                };
                return acc;
            }, {});
            await this.workScheduleService.updateAddAssigneesOfWorkSchedule(workScheduleId, assigneesDto, companyId, userEmail);
        }
        return {
            message: 'Assign work schedule to employees successfully',
            employeeIds,
        };
    }
    async unaAssignWorkScheduleToEmployees({ assignWorkScheduleEmployeesDto, companyId, options, userEmail, }) {
        const { employeeWorkSchedules } = assignWorkScheduleEmployeesDto;
        const employeeIds = employeeWorkSchedules?.map(e => e.employeeId) ?? [];
        if (!employeeWorkSchedules?.length || !employeeIds.length) {
            return {
                message: 'Unassign work schedule to employees successfully',
                employeeIds: [],
            };
        }
        if (employeeWorkSchedules.length > 0) {
            const workScheduleAssigneeMap = employeeWorkSchedules.reduce((acc, { workScheduleId, employeeId }) => {
                (acc[workScheduleId] ||= []).push(employeeId);
                return acc;
            }, {});
            await Promise.all(Object.keys(workScheduleAssigneeMap).map(workScheduleId => this.workScheduleService.updateRemoveAssigneesOfWorkSchedule(+workScheduleId, workScheduleAssigneeMap[+workScheduleId], companyId, userEmail)));
            if (employeeIds.length > 0) {
                await this.employeeRepository
                    .createQueryBuilder()
                    .update(entities_1.EmployeeEntity)
                    .set({
                    workScheduleId: () => 'NULL',
                    updatedBy: userEmail,
                    updatedOn: moment.utc().toDate(),
                })
                    .where('id IN (:...employeeIds) AND companyId = :companyId AND isDeleted = :isDeleted', {
                    employeeIds,
                    companyId,
                    isDeleted: false,
                })
                    .execute();
            }
        }
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds,
        });
        if (!employeeMapping || employeeMapping.length === 0) {
            throw new common_1.BadRequestException('Employees mapping not found!');
        }
        const workScheduleIds = employeeWorkSchedules?.map(w => w.workScheduleId);
        const workSchedules = await this.workScheduleService.getTTWorkSchedulesByWorkScheduleIds(workScheduleIds, companyId);
        const employeeIdsMapping = new Map(employeeMapping?.map(e => [e.employeeId, e.timeTrackerEmployeeId]));
        const workSchedulesMap = new Map(workSchedules?.map(workSchedule => [
            workSchedule.id,
            workSchedule.ttWorkScheduleId,
        ]));
        const mappedEmployeeWorkSchedules = employeeWorkSchedules.map(ews => {
            const employeeId = employeeIdsMapping.get(ews.employeeId);
            const workScheduleId = workSchedulesMap.get(ews.workScheduleId);
            if (!employeeId || !workScheduleId) {
                throw new Error(`Not found mapping for employeeId: ${ews.employeeId} or workScheduleId: ${ews.workScheduleId}`);
            }
            return {
                employeeId,
                workScheduleId,
            };
        });
        if (mappedEmployeeWorkSchedules && mappedEmployeeWorkSchedules.length > 0) {
            await this.apiService.request({
                type: 'UNASSIGN_WORK_SCHEDULE_FROM_EMPLOYEES',
                data: {
                    employeeWorkSchedules: mappedEmployeeWorkSchedules,
                },
                segments: {
                    companyId: options.companyId,
                },
            });
        }
        return {
            message: 'Unassign work schedule to employees successfully',
            employeeIds,
        };
    }
    async unaAssignWorkScheduleToEmployeesLeave({ assignWorkScheduleEmployeesDto, companyId, userEmail, }) {
        const { employeeWorkSchedules } = assignWorkScheduleEmployeesDto;
        const employeeIds = employeeWorkSchedules?.map(e => e.employeeId) ?? [];
        if (!employeeWorkSchedules?.length || !employeeIds.length) {
            return {
                message: 'Unassign work schedule to employees successfully',
                employeeIds: [],
            };
        }
        if (employeeWorkSchedules.length > 0) {
            const workScheduleAssigneeMap = employeeWorkSchedules.reduce((acc, { workScheduleId, employeeId }) => {
                (acc[workScheduleId] ||= []).push(employeeId);
                return acc;
            }, {});
            await Promise.all(Object.keys(workScheduleAssigneeMap).map(workScheduleId => this.workScheduleService.updateRemoveAssigneesOfWorkSchedule(+workScheduleId, workScheduleAssigneeMap[+workScheduleId], companyId, userEmail)));
            if (employeeIds.length > 0) {
                await this.employeeRepository
                    .createQueryBuilder()
                    .update(entities_1.EmployeeEntity)
                    .set({
                    workScheduleId: () => 'NULL',
                    updatedBy: userEmail,
                    updatedOn: moment.utc().toDate(),
                })
                    .where('id IN (:...employeeIds) AND companyId = :companyId AND isDeleted = :isDeleted', {
                    employeeIds,
                    companyId,
                    isDeleted: false,
                })
                    .execute();
            }
        }
        return {
            message: 'Unassign work schedule to employees successfully',
            employeeIds,
        };
    }
    async createAdmin(companyId) {
        const { data } = await this.apiService.request({
            type: 'CREATE_EMPLOYEE_ADMIN',
            segments: { companyId },
        }, { useMasterApiKey: true });
        return data;
    }
    async getEmployeeRefAndEmailUsingEIds(Ids) {
        const listEmployee = this.employeeRepository.find({
            select: {
                id: true,
                email: true,
                employeeRef: true,
            },
            where: {
                id: (0, typeorm_2.In)(Ids),
                isDeleted: false,
            },
        });
        return listEmployee;
    }
};
exports.TimeTrackerEmployeeService = TimeTrackerEmployeeService;
exports.TimeTrackerEmployeeService = TimeTrackerEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.EmployeeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        api_service_1.TimeTrackerApiService,
        employee_mapping_service_1.EmployeeMappingService,
        employee_service_1.EmployeeService,
        group_mapping_service_1.GroupMappingService,
        company_mapping_service_1.CompanyMappingService,
        work_schedule_1.WorkScheduleService,
        company_user_role_1.CompanyUserRoleService,
        work_schedule_assignment_service_1.WorkScheduleAssignmentService])
], TimeTrackerEmployeeService);
//# sourceMappingURL=employee.service.js.map
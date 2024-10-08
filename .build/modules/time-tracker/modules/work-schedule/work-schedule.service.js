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
exports.WorkScheduleService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const cron_1 = require("cron");
const crypto_1 = require("crypto");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const dto_1 = require("../../../../common/dto");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const get_parent_org_paths_util_1 = require("../../../../common/utils/get-parent-org-paths.util");
const database_1 = require("../../../../core/database");
const producers_1 = require("../../../../core/queue/producers");
const employee_service_1 = require("../../../../modules/user/modules/employee/employee.service");
const organization_structure_service_1 = require("../../../general/modules/organization-structure/organization-structure.service");
const employee_fields_for_common_info_util_1 = require("../../../user/modules/employee/utils/employee-fields-for-common-info.util");
const common_2 = require("../../common");
const api_service_1 = require("../../libs/api/api.service");
const auto_deduction_service_1 = require("../auto-deduction/auto-deduction.service");
const break_rule_service_1 = require("../break-rule/break-rule.service");
const company_mapping_service_1 = require("../company-mapping/company-mapping.service");
const day_schedule_service_1 = require("../day-schedule/day-schedule.service");
const employee_mapping_service_1 = require("../employee-mapping/employee-mapping.service");
const group_mapping_service_1 = require("../group-mapping/group-mapping.service");
const location_work_schedule_service_1 = require("../location-work-schedule/location-work-schedule.service");
const work_schedule_assignment_service_1 = require("../work-schedule-assignment/work-schedule-assignment.service");
const work_schedule_publish_type_enum_1 = require("./enums/work-schedule-publish-type.enum");
const work_schedule_state_enum_1 = require("./enums/work-schedule-state.enum");
const chunk_array_util_1 = require("../../../../common/utils/chunk-array.util");
const config_1 = require("../../../../config");
const work_schedule_assignment_hrforte_notification_mapper_1 = require("../work-schedule-assignment/mappers/work-schedule-assignment-hrforte-notification.mapper");
const set_util_1 = require("../../../../common/utils/set.util");
const remove_null_or_undefined_util_1 = require("./utils/remove-null-or-undefined.util");
let WorkScheduleService = class WorkScheduleService extends database_1.TypeOrmBaseService {
    constructor(apiService, workScheduleRepository, autoDeductionService, breakRuleService, dayScheduleService, locationWorkScheduleService, companyMappingService, employeeService, organizationStructureService, workScheduleAssignmentService, schedulerRegistry, workScheduleProducer, employeeMappingService, groupMappingService, hrforteNotificationProducer, appConfig) {
        super(workScheduleRepository);
        this.apiService = apiService;
        this.workScheduleRepository = workScheduleRepository;
        this.autoDeductionService = autoDeductionService;
        this.breakRuleService = breakRuleService;
        this.dayScheduleService = dayScheduleService;
        this.locationWorkScheduleService = locationWorkScheduleService;
        this.companyMappingService = companyMappingService;
        this.employeeService = employeeService;
        this.organizationStructureService = organizationStructureService;
        this.workScheduleAssignmentService = workScheduleAssignmentService;
        this.schedulerRegistry = schedulerRegistry;
        this.workScheduleProducer = workScheduleProducer;
        this.employeeMappingService = employeeMappingService;
        this.groupMappingService = groupMappingService;
        this.hrforteNotificationProducer = hrforteNotificationProducer;
        this.appConfig = appConfig;
        this.getNormalizedWorkScheduleByEmployee = async (employeeIds, companyId) => {
            const employees = await this.employeeService.getEmployeeByIds(employeeIds);
            const data = {};
            const defaultWS = await this.workScheduleRepository.findOne({
                where: { companyId, default: true, isDeleted: false },
            });
            employees.forEach(item => {
                if (!data?.[item?.id]) {
                    data[item?.id] = item.workSchedule || defaultWS;
                }
            });
            return data;
        };
    }
    async updateAddAssigneesOfWorkSchedule(workScheduleId, assigneesDto, companyId, userEmail) {
        const workSchedule = await this.workScheduleRepository.findOne({
            where: { id: workScheduleId, companyId, isDeleted: false },
        });
        if (!workSchedule) {
            throw new common_1.NotFoundException('Work schedule not found');
        }
        const currentAssignees = workSchedule.assignees || {};
        const updatedAssignees = { ...currentAssignees, ...assigneesDto };
        workSchedule.assignees = updatedAssignees;
        await this.workScheduleRepository.save({
            ...workSchedule,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        return workSchedule;
    }
    async updateAddGroupAssigneesOfWorkSchedule(workScheduleId, assigneeGroupsDto, companyId, userEmail) {
        const workSchedule = await this.workScheduleRepository.findOne({
            where: { id: workScheduleId, companyId, isDeleted: false },
        });
        if (!workSchedule) {
            throw new common_1.NotFoundException('Work schedule not found');
        }
        const currentAssignees = workSchedule.groupAssignees || {};
        const updatedAssignees = { ...currentAssignees, ...assigneeGroupsDto };
        workSchedule.groupAssignees = updatedAssignees;
        await this.workScheduleRepository.save({
            ...workSchedule,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        return workSchedule;
    }
    async updateRemoveAssigneesOfWorkSchedule(workScheduleId, employeeIds, companyId, userEmail) {
        const workSchedule = await this.workScheduleRepository.findOne({
            where: { id: workScheduleId, companyId, isDeleted: false },
        });
        if (!workSchedule) {
            throw new common_1.NotFoundException('Work schedule not found');
        }
        const currentAssignees = workSchedule.assignees || {};
        const updatedAssignees = { ...currentAssignees };
        employeeIds.forEach(employeeId => {
            if (updatedAssignees[employeeId]) {
                delete updatedAssignees[employeeId];
            }
        });
        workSchedule.assignees = updatedAssignees;
        await this.workScheduleRepository.save({
            ...workSchedule,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        return workSchedule;
    }
    async updateRemoveGroupAssigneesOfWorkSchedule(workScheduleId, orgPaths, companyId, userEmail) {
        const workSchedule = await this.workScheduleRepository.findOne({
            where: { id: workScheduleId, companyId, isDeleted: false },
        });
        if (!workSchedule) {
            throw new common_1.NotFoundException('Work schedule not found');
        }
        const currentAssignees = workSchedule.groupAssignees || {};
        const updatedAssignees = { ...currentAssignees };
        orgPaths.forEach(orgPath => {
            if (updatedAssignees[orgPath]) {
                delete updatedAssignees[orgPath];
            }
        });
        workSchedule.groupAssignees = updatedAssignees;
        await this.workScheduleRepository.save({
            ...workSchedule,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        return workSchedule;
    }
    async getTTWorkScheduleDefaultByWorkScheduleId(companyId) {
        const { data } = await this.apiService.request({
            type: 'GET_WORK_SCHEDULE_DEFAULT',
            segments: { companyId: companyId },
        });
        return data;
    }
    async getTTWorkScheduleByWorkScheduleId(workScheduleId, companyId) {
        const { data } = await this.apiService.request({
            type: 'GET_WORK_SCHEDULE_BY_ID',
            segments: { workScheduleId: workScheduleId, companyId: companyId },
        });
        return data;
    }
    async getTTWorkScheduleByCompanyId(companyId) {
        const { data } = await this.apiService.request({
            type: 'GET_WORK_SCHEDULE',
            segments: { companyId: companyId },
        });
        return data;
    }
    async handleCreateWorkSchedule(createWorkScheduleBodyDTO, companyId, userEmail, timeTrackerCompanyId) {
        const workSchedule = await this.getWorkScheduleByName(createWorkScheduleBodyDTO.name, companyId);
        if (workSchedule.length !== 0)
            throw new common_1.BadRequestException(`Work schedule ${createWorkScheduleBodyDTO.name} has been created`);
        const { data } = await this.apiService.request({
            type: 'CREATE_WORK_SCHEDULE',
            data: {
                ...createWorkScheduleBodyDTO,
                color: createWorkScheduleBodyDTO?.color,
                state: createWorkScheduleBodyDTO?.state
                    ? createWorkScheduleBodyDTO?.state
                    : work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED,
                locations: (await this.locationWorkScheduleService.mapIdsToUUIDs(createWorkScheduleBodyDTO.locations)) || [],
            },
            segments: { companyId: timeTrackerCompanyId },
        });
        if (data) {
            const autoDeductionDTOs = createWorkScheduleBodyDTO.autoDeductions;
            const breakRuleDTOs = createWorkScheduleBodyDTO.breaks;
            const daySchedulesDTOs = createWorkScheduleBodyDTO.daySchedules;
            const locationWorkScheduleDTOs = createWorkScheduleBodyDTO.locations;
            const workScheduleDTO = {
                name: createWorkScheduleBodyDTO.name,
                workArrangement: createWorkScheduleBodyDTO.workArrangement,
                breakType: createWorkScheduleBodyDTO.breakType,
                default: createWorkScheduleBodyDTO.default,
                unitTime: createWorkScheduleBodyDTO?.unitTime,
                companyId: companyId,
                userEmail: userEmail,
                weeklyHours: createWorkScheduleBodyDTO?.weeklyHours,
                utcOffset: createWorkScheduleBodyDTO?.utcOffset,
                ttWorkScheduleId: data.workScheduleEntity.id
                    ? data.workScheduleEntity.id
                    : createWorkScheduleBodyDTO.ttWorkScheduleId,
                overtime: data.overTimeEntity,
                color: createWorkScheduleBodyDTO?.color,
                state: (data.state ? data.state : createWorkScheduleBodyDTO?.state) ??
                    (createWorkScheduleBodyDTO?.state
                        ? createWorkScheduleBodyDTO?.state
                        : work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED),
            };
            const workScheduleEntity = await this.createWorkSchedule(companyId, userEmail, workScheduleDTO);
            if (!workScheduleEntity) {
                throw new common_1.BadRequestException('Failed to create work_schedule');
            }
            if (createWorkScheduleBodyDTO.default) {
                await this.workScheduleRepository
                    .createQueryBuilder()
                    .update()
                    .set({ default: false })
                    .where('id != :id', { id: workScheduleEntity.id })
                    .andWhere('default = :isDefault', { isDefault: true })
                    .andWhere('company_id = :companyId', { companyId })
                    .execute();
            }
            try {
                const ttAutoDeductionId = data.autoDeductionEntity.id;
                const ttDayScheduleId = data.dayScheduleEntity.id;
                const ttBreakRuleId = data.breakRuleEntity.id;
                const promises = [
                    this.autoDeductionService.createManyAutoDeduction(data.autoDeductionEntity.map((autoDeduction) => {
                        return {
                            ...autoDeduction,
                            ttAutoDeductionId: autoDeduction.id,
                            id: undefined,
                        };
                    }), companyId, workScheduleEntity.id, userEmail),
                    this.dayScheduleService.createManyDaySchedule(data.dayScheduleEntity.map((daySchedule) => {
                        return {
                            ...daySchedule,
                            ttDayScheduleId: daySchedule.id,
                            id: undefined,
                        };
                    }), companyId, userEmail, workScheduleEntity.id),
                    this.breakRuleService.createManyBreakRules(data.breakRuleEntity.map((breakRule) => {
                        return {
                            ...breakRule,
                            ttBreakRuleId: breakRule.id,
                            id: undefined,
                        };
                    }), companyId, workScheduleEntity.id, userEmail),
                    this.locationWorkScheduleService.assignMultipleLocationForWorkSchedules(locationWorkScheduleDTOs.map(item => {
                        return {
                            locationId: item,
                            workScheduleId: workScheduleEntity.id,
                        };
                    }), companyId, userEmail),
                ];
                const [autoDeductionEntity, dayScheduleEntity, overTimeEntity, breakRuleEntity, locationEntity,] = await Promise.all(promises);
                return {
                    workScheduleEntity,
                    autoDeductionEntity,
                    dayScheduleEntity,
                    overTimeEntity,
                    breakRuleEntity,
                    locationEntity,
                };
            }
            catch (error) {
                console.error('Error creating related entities:', error);
                throw new common_1.BadRequestException('Failed to create related entities');
            }
        }
        return data;
    }
    async handleUpdateWorkSchedule(workScheduleId, companyId, timeTrackerCompanyId, userEmail, updateWorkScheduleBodyDTO) {
        const autoDeductionDTOs = updateWorkScheduleBodyDTO.autoDeductions;
        const breakRuleDTOs = updateWorkScheduleBodyDTO.breaks;
        const daySchedulesDTOs = updateWorkScheduleBodyDTO.daySchedules;
        const autoDeductionsDeleted = updateWorkScheduleBodyDTO.autoDeductionsDeleted;
        const breaksDeleted = updateWorkScheduleBodyDTO.breaksDeleted;
        const daySchedulesDeleted = updateWorkScheduleBodyDTO.daySchedulesDeleted;
        const locationsDeleted = updateWorkScheduleBodyDTO.locationsDeleted;
        const locationWorkScheduleDTOs = updateWorkScheduleBodyDTO.locations;
        const workScheduleDTO = {
            name: updateWorkScheduleBodyDTO.name,
            workArrangement: updateWorkScheduleBodyDTO.workArrangement,
            breakType: updateWorkScheduleBodyDTO.breakType,
            default: updateWorkScheduleBodyDTO.default,
            unitTime: updateWorkScheduleBodyDTO?.unitTime,
            companyId: companyId,
            userEmail: userEmail,
            weeklyHours: updateWorkScheduleBodyDTO?.weeklyHours,
            excludeEarlyClockIn: updateWorkScheduleBodyDTO?.excludeEarlyClockIn,
            overtime: updateWorkScheduleBodyDTO?.overtime,
            utcOffset: updateWorkScheduleBodyDTO?.utcOffset,
            color: updateWorkScheduleBodyDTO?.color,
        };
        const workScheduleEntity = await this.getWorkScheduleByWorkScheduleId(workScheduleId, companyId);
        if (!workScheduleEntity) {
            throw new common_1.BadRequestException('Not found work_schedule entity');
        }
        const workScheduleDefault = await this.workScheduleRepository.findOne({
            where: {
                isDeleted: false,
                default: true,
                companyId,
            },
        });
        if (workScheduleDefault && !workScheduleDTO.default) {
            if (workScheduleDefault.id === workScheduleId) {
                throw new common_1.BadRequestException('You cannot deselect the default status of the current work schedule');
            }
        }
        const breakRuleMappingObject = await this.breakRuleService.mapIdsToUUIDsInDtosV2(breakRuleDTOs);
        const autoDeductionMappingObject = await this.autoDeductionService.mapIdsToUUIDsInDtosV2(autoDeductionDTOs);
        const dayScheduleMappingObject = await this.dayScheduleService.mapIdsToUUIDsInDtosV2(daySchedulesDTOs);
        const breakDtosUpdated = breakRuleDTOs.map(value => ({
            ...value,
            ttBreakRuleId: undefined,
            id: value?.id ? breakRuleMappingObject[String(value.id)] : undefined,
        }));
        const autoDeductionDtosUpdated = autoDeductionDTOs.map(value => ({
            ...value,
            ttAutoDeductionId: undefined,
            id: value?.id ? autoDeductionMappingObject[String(value.id)] : undefined,
        }));
        const dayScheduleDtosUpdated = daySchedulesDTOs.map(value => ({
            ...value,
            ttDayScheduleId: undefined,
            id: value?.id ? dayScheduleMappingObject[String(value.id)] : undefined,
        }));
        const updatePayload = {
            ...updateWorkScheduleBodyDTO,
            breaks: breakDtosUpdated || [],
            autoDeductions: autoDeductionDtosUpdated || [],
            daySchedules: dayScheduleDtosUpdated || [],
            locations: (await this.locationWorkScheduleService.mapIdsToUUIDsInDtos(updateWorkScheduleBodyDTO.locations)) || [],
            breaksDeleted: await this.breakRuleService.mapIdsToUUIDs(updateWorkScheduleBodyDTO.breaksDeleted || []),
            autoDeductionsDeleted: await this.autoDeductionService.mapIdsToUUIDs(updateWorkScheduleBodyDTO.autoDeductionsDeleted || []),
            daySchedulesDeleted: await this.dayScheduleService.mapIdsToUUIDs(updateWorkScheduleBodyDTO.daySchedulesDeleted || []),
            locationsDeleted: await this.locationWorkScheduleService.mapIdsToUUIDs(updateWorkScheduleBodyDTO.locationsDeleted || []),
        };
        const updatedNewData = updatePayload.daySchedules.map(({ ttDayScheduleId, ...rest }) => rest);
        const { data } = await this.apiService.request({
            type: 'UPDATE_WORK_SCHEDULE',
            data: {
                ...updatePayload,
                name: workScheduleEntity.name,
                daySchedules: updatedNewData,
            },
            segments: {
                companyId: timeTrackerCompanyId,
                workScheduleId: workScheduleEntity.ttWorkScheduleId,
            },
        });
        if (!data) {
            throw new common_1.BadRequestException('Failed to update work schedule');
        }
        const updatedWorkSchedule = await this.updateWorkSchedule(companyId, userEmail, workScheduleId, workScheduleDTO);
        if (updateWorkScheduleBodyDTO?.default) {
            await this.workScheduleRepository
                .createQueryBuilder()
                .update()
                .set({ default: false })
                .where('id != :id', { id: workScheduleEntity.id })
                .andWhere('default = :isDefault', { isDefault: true })
                .andWhere('company_id = :companyId', { companyId })
                .execute();
        }
        if (autoDeductionsDeleted) {
            const response = autoDeductionsDeleted.map(item => {
                return this.autoDeductionService.deleteAutoDeduction(item, {
                    option: common_2.OptionDelete.Soft,
                    userEmail: userEmail,
                });
            });
            await Promise.all(response);
        }
        if (breaksDeleted) {
            const response = breaksDeleted.map(item => {
                return this.breakRuleService.deleteBreakRule(item, {
                    option: common_2.OptionDelete.Soft,
                    userEmail: userEmail,
                });
            });
            await Promise.all(response);
        }
        if (daySchedulesDeleted) {
            const response = daySchedulesDeleted.map(item => {
                return this.dayScheduleService.deleteDaySchedule(item, {
                    option: common_2.OptionDelete.Soft,
                    userEmail: userEmail,
                });
            });
            await Promise.all(response);
        }
        if (locationsDeleted) {
            const response = locationsDeleted.map(item => {
                return this.locationWorkScheduleService.archiveLocationWorkSchedule(item, workScheduleId, companyId, userEmail);
            });
            await Promise.all(response);
        }
        const breakTTMapObject = await this.breakRuleService.mapUUIdsToIdsInDtos(data.breakRuleEntity);
        const autoDeductionTTMapObject = await this.autoDeductionService.mapUUIdsToIdsInDtos(data.autoDeductionEntity);
        const dayScheduleTTMapObject = await this.dayScheduleService.mapUUIdsToIdsInDtos(data.dayScheduleEntity);
        try {
            const promises = [
                this.autoDeductionService.updateManyAutoDeduction(data.autoDeductionEntity.map((value) => ({
                    ...value,
                    ttAutoDeductionId: value.id,
                    id: autoDeductionTTMapObject[value.id] || undefined,
                })), userEmail, companyId, workScheduleId),
                this.dayScheduleService.updateManyDaySchedule(data.dayScheduleEntity.map((value) => ({
                    ...value,
                    ttDayScheduleId: value.id,
                    id: dayScheduleTTMapObject[value.id] || undefined,
                })), userEmail, companyId, workScheduleId),
                this.breakRuleService.updateManyBreakRule(data.breakRuleEntity.map((value) => ({
                    ...value,
                    ttBreakRuleId: value.id,
                    id: breakTTMapObject[value.id] || undefined,
                })), userEmail, companyId, workScheduleId),
            ];
            const [autoDeductionEntity, dayScheduleEntity, breakRuleEntity] = await Promise.all(promises);
            return {
                updatedWorkSchedule,
                autoDeductionEntity,
                dayScheduleEntity,
                breakRuleEntity,
            };
        }
        catch (error) {
            console.error('Error creating related entities:', error);
            throw new common_1.BadRequestException('Failed to update related entities');
        }
    }
    async deleteWorkSchedule(workScheduleId, companyId, timeTrackerCompanyId, userEmail, optionDelete) {
        const workScheduleEntity = await this.workScheduleRepository.findOne({
            where: {
                id: workScheduleId,
                companyId,
                isDeleted: false,
            },
        });
        if (!workScheduleEntity) {
            throw new common_1.BadRequestException('Not found work_schedule entity');
        }
        const { state: currentWorkScheduleState } = workScheduleEntity;
        if (currentWorkScheduleState === work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED) {
            throw new common_1.BadRequestException(`Work schedule "${workScheduleEntity.name}" is already published. Cannot remove this work schedule`);
        }
        if (optionDelete === common_2.OptionDelete.Permanent) {
            const work_scheduleDeleted = await this.workScheduleRepository.delete(workScheduleId);
            if (work_scheduleDeleted.affected === 0)
                throw new common_1.BadRequestException('Delete work schedule failed!');
        }
        else {
            const work_scheduleDeleted = await this.delete(workScheduleId, {
                userEmail: userEmail,
                companyId,
            });
            if (!work_scheduleDeleted)
                throw new common_1.BadRequestException('Delete work schedule failed!');
        }
        if (timeTrackerCompanyId) {
            await this.apiService.request({
                type: 'DELETE_WORK_SCHEDULE',
                segments: {
                    companyId: timeTrackerCompanyId,
                    workScheduleId: workScheduleEntity.ttWorkScheduleId,
                },
            });
        }
        return 'Delete work schedule successfully';
    }
    async deleteWorkScheduleLeave(workScheduleId, companyId, userEmail, optionDelete) {
        const workScheduleEntity = await this.getWorkScheduleByWorkScheduleId(workScheduleId, companyId);
        if (!workScheduleEntity) {
            throw new common_1.BadRequestException('Not found work_schedule entity');
        }
        if (optionDelete === common_2.OptionDelete.Permanent) {
            const work_scheduleDeleted = await this.workScheduleRepository.delete(workScheduleId);
            if (work_scheduleDeleted.affected === 0)
                throw new common_1.BadRequestException('Delete work schedule failed!');
        }
        else {
            const work_scheduleDeleted = await this.delete(workScheduleId, {
                userEmail: userEmail,
                companyId,
            });
            if (!work_scheduleDeleted)
                throw new common_1.BadRequestException('Delete work schedule failed!');
        }
        return workScheduleEntity;
    }
    async createWorkSchedule(companyId, userEmail, workScheduleDTO) {
        return this.create({
            ...workScheduleDTO,
            endWorkDayAt: workScheduleDTO?.overtime?.endWorkDayAt || '00:00:00',
            companyId,
            company: { id: companyId },
        }, { userEmail: userEmail });
    }
    async updateWorkSchedule(companyId, userEmail, id, workScheduleDTO) {
        const { name, workArrangement, breakType, default: defaultDto, unitTime, weeklyHours, excludeEarlyClockIn, utcOffset, color, } = workScheduleDTO;
        return this.workScheduleRepository.update(id, {
            name,
            workArrangement,
            breakType,
            default: defaultDto,
            unitTime,
            weeklyHours,
            companyId,
            color,
            updatedBy: userEmail,
            excludeEarlyClockIn,
            utcOffset: utcOffset,
            updatedOn: moment.utc().toDate(),
        });
    }
    async getWorkScheduleOfDate(employeeId, companyId, date) {
        const workScheduleAssignment = await this.workScheduleAssignmentService.getWorkScheduleAssignmentsByEmployeeIdWithDate(employeeId, companyId, date);
        if (!workScheduleAssignment) {
            return this.getLeaveCompanyWorkScheduleDefault(companyId);
        }
        const workScheduleEntity = await this.getWorkScheduleByWorkScheduleId(workScheduleAssignment.workScheduleId, companyId);
        if (!workScheduleEntity) {
            return this.getLeaveCompanyWorkScheduleDefault(companyId);
        }
        return workScheduleEntity;
    }
    async getWorkScheduleOfMultipleDates(employeeId, companyId, dates) {
        const { employees } = await this.checkInDefaultWorkSchedule(companyId, {
            employeeIds: [employeeId],
        });
        if (employees.length !== 0) {
            const workScheduleMap = {};
            const workScheduleDefaultEntity = await this.getLeaveCompanyWorkScheduleDefault(companyId);
            if (!workScheduleDefaultEntity)
                throw new Error('Default work schedule not found');
            const daySchedules = workScheduleDefaultEntity.daySchedules;
            for (const date of dates) {
                const weekDay = (0, common_2.convertDayToWeekDay)(date);
                const daySchedule = daySchedules.find(item => item.day === weekDay);
                if (!workScheduleMap[date] && daySchedule) {
                    workScheduleMap[date] = workScheduleDefaultEntity;
                }
            }
            return workScheduleMap;
        }
        try {
            const workScheduleMap = await this.workScheduleAssignmentService.getWorkScheduleOfEmployeeMultipleDate({
                employeeId,
                companyId,
                date: dates,
            });
            return workScheduleMap;
        }
        catch (e) {
            console.error(e);
            const workScheduleMap = {};
            return workScheduleMap;
        }
    }
    async getBreakListByEmployeeId(employeeId, companyId, date, paginationQueryDto) {
        const workScheduleEntity = await this.getWorkScheduleOfDate(employeeId, companyId, date);
        if (!workScheduleEntity)
            throw new common_1.BadRequestException('work schedule not found');
        const breaks = await this.breakRuleService.getBreaksByWorkScheduleIdWithPagination(workScheduleEntity?.id, companyId, paginationQueryDto);
        return breaks;
    }
    async getWorkScheduleByWorkScheduleId(workScheduleId, companyId) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const breakAlias = database_1.ETableName.BREAK;
        const autoDeductionAlias = database_1.ETableName.AUTO_DEDUCTION;
        const locationWorkSchedulesAlias = database_1.ETableName.LOCATION_WORK_SCHEDULE;
        const daySchedulesAlias = database_1.ETableName.DAY_SCHEDULE;
        const locationAlias = database_1.ETableName.LOCATION;
        const wsQueryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .leftJoinAndSelect(`${workScheduleAlias}.breaks`, breakAlias, `${breakAlias}.isDeleted = :isDeleted AND ${breakAlias}.work_schedule_id = :workScheduleId`, { isDeleted: false, workScheduleId })
            .leftJoinAndSelect(`${workScheduleAlias}.locationWorkSchedules`, locationWorkSchedulesAlias, `${locationWorkSchedulesAlias}.isDeleted = :isDeleted AND ${locationWorkSchedulesAlias}.work_schedule_id = :workScheduleId`, { isDeleted: false, workScheduleId })
            .leftJoinAndSelect(`${locationWorkSchedulesAlias}.location`, locationAlias, `${locationAlias}.isDeleted = :isDeleted AND ${locationAlias}.id = ${locationWorkSchedulesAlias}.location_id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.autoDeductions`, autoDeductionAlias, `${autoDeductionAlias}.isDeleted = :isDeleted AND ${autoDeductionAlias}.work_schedule_id = :workScheduleId`, { isDeleted: false, workScheduleId })
            .leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, daySchedulesAlias, `${daySchedulesAlias}.isDeleted = :isDeleted AND ${daySchedulesAlias}.work_schedule_id = :workScheduleId`, { isDeleted: false, workScheduleId })
            .where(`${workScheduleAlias}.id = :workScheduleId`, { workScheduleId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .andWhere(`${workScheduleAlias}.companyId = :companyId`, {
            companyId,
        });
        wsQueryBuilder.select([
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
            `${workScheduleAlias}.publishType`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.publishHistories`,
            `${breakAlias}.id`,
            `${breakAlias}.name`,
            `${breakAlias}.allowToBeTakenFromTo`,
            `${breakAlias}.duration`,
            `${breakAlias}.from`,
            `${breakAlias}.to`,
            `${breakAlias}.unitTime`,
            `${breakAlias}.ttBreakRuleId`,
            `${locationAlias}.id`,
            `${locationAlias}.name`,
            `${locationAlias}.address`,
            `${locationAlias}.latitude`,
            `${locationAlias}.longitude`,
            `${autoDeductionAlias}.id`,
            `${autoDeductionAlias}.name`,
            `${autoDeductionAlias}.duration`,
            `${autoDeductionAlias}.threshold`,
            `${autoDeductionAlias}.unitTime`,
            `${autoDeductionAlias}.ttAutoDeductionId`,
            `${daySchedulesAlias}.id`,
            `${daySchedulesAlias}.day`,
            `${daySchedulesAlias}.from`,
            `${daySchedulesAlias}.to`,
            `${daySchedulesAlias}.duration`,
            `${daySchedulesAlias}.unitTime`,
            `${daySchedulesAlias}.ttDayScheduleId`,
        ]);
        const result = await wsQueryBuilder.getOne();
        if (result?.daySchedules) {
            result.daySchedules = result.daySchedules.map(item => {
                item.from = moment
                    .utc(item.from, 'HH:mm:ss')
                    .utcOffset(result.utcOffset)
                    .format('HH:mm:ssZ');
                item.to = moment
                    .utc(item.to, 'HH:mm:ss')
                    .utcOffset(result.utcOffset * 60)
                    .format('HH:mm:ssZ');
                return item;
            });
        }
        if (result?.breaks) {
            result.breaks = result.breaks.map(item => {
                item.from = moment
                    .utc(item.from, 'HH:mm:ss')
                    .utcOffset(result.utcOffset)
                    .format('HH:mm:ssZ');
                item.to = moment
                    .utc(item.to, 'HH:mm:ss')
                    .utcOffset(result.utcOffset * 60)
                    .format('HH:mm:ssZ');
                return item;
            });
        }
        if (result?.endWorkDayAt) {
            result.endWorkDayAt = moment
                .utc(result.endWorkDayAt, 'HH:mm:ss')
                .utcOffset(result.utcOffset)
                .format('HH:mm:ssZ');
        }
        return result;
    }
    async getWorkScheduleOfCompany(companyId) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const breakAlias = database_1.ETableName.BREAK;
        const autoDeductionAlias = database_1.ETableName.AUTO_DEDUCTION;
        const locationWorkSchedulesAlias = database_1.ETableName.LOCATION_WORK_SCHEDULE;
        const daySchedulesAlias = database_1.ETableName.DAY_SCHEDULE;
        const locationAlias = database_1.ETableName.LOCATION;
        const groupAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const employeeAlias = 'employee';
        const results = await this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .leftJoinAndSelect(`${workScheduleAlias}.breaks`, breakAlias, `${breakAlias}.isDeleted = :isDeleted AND ${breakAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.locationWorkSchedules`, locationWorkSchedulesAlias, `${locationWorkSchedulesAlias}.isDeleted = :isDeleted AND ${locationWorkSchedulesAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${locationWorkSchedulesAlias}.location`, locationAlias, `${locationAlias}.isDeleted = :isDeleted AND ${locationAlias}.id = ${locationWorkSchedulesAlias}.location_id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.autoDeductions`, autoDeductionAlias, `${autoDeductionAlias}.isDeleted = :isDeleted AND ${autoDeductionAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.organizationStructures`, groupAlias, `${groupAlias}.isDeleted = :isDeleted AND ${groupAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, daySchedulesAlias, `${daySchedulesAlias}.isDeleted = :isDeleted AND ${daySchedulesAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.employees`, employeeAlias, `${employeeAlias}.isDeleted = :isDeleted AND ${employeeAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .where(`${workScheduleAlias}.company_id = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .addSelect(`${workScheduleAlias}.end_work_day_at`)
            .getMany();
        for (const result of results) {
            if (result?.daySchedules) {
                result.daySchedules = result.daySchedules.map(item => {
                    item.from = moment
                        .utc(item.from, 'HH:mm:ss')
                        .utcOffset(result.utcOffset)
                        .format('HH:mm:ssZ');
                    item.to = moment
                        .utc(item.to, 'HH:mm:ss')
                        .utcOffset(result.utcOffset * 60)
                        .format('HH:mm:ssZ');
                    return item;
                });
            }
            if (result?.breaks) {
                result.breaks = result.breaks.map(item => {
                    item.from = moment
                        .utc(item.from, 'HH:mm:ss')
                        .utcOffset(result.utcOffset)
                        .format('HH:mm:ssZ');
                    item.to = moment
                        .utc(item.to, 'HH:mm:ss')
                        .utcOffset(result.utcOffset * 60)
                        .format('HH:mm:ssZ');
                    return item;
                });
            }
            if (result?.endWorkDayAt) {
                result.endWorkDayAt = moment
                    .utc(result.endWorkDayAt, 'HH:mm:ss')
                    .utcOffset(result.utcOffset)
                    .format('HH:mm:ssZ');
            }
            if (result?.default) {
                const employeesWithWorkScheduleDefault = await this.employeeService.getAllEmployeesWithWorkScheduleDefault(companyId);
                result.employees = [
                    ...result.employees,
                    ...employeesWithWorkScheduleDefault,
                ];
            }
        }
        return results;
    }
    async getWorkScheduleByEmployeeId(employeeId) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const breakAlias = database_1.ETableName.BREAK;
        const autoDeductionAlias = database_1.ETableName.AUTO_DEDUCTION;
        const locationWorkSchedulesAlias = database_1.ETableName.LOCATION_WORK_SCHEDULE;
        const daySchedulesAlias = database_1.ETableName.DAY_SCHEDULE;
        const locationAlias = database_1.ETableName.LOCATION;
        const groupAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const employeeAlias = 'employee';
        const result = await this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .leftJoinAndSelect(`${workScheduleAlias}.employees`, employeeAlias, `${employeeAlias}.isDeleted = :isDeleted AND ${employeeAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.breaks`, breakAlias, `${breakAlias}.isDeleted = :isDeleted AND ${breakAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.locationWorkSchedules`, locationWorkSchedulesAlias, `${locationWorkSchedulesAlias}.isDeleted = :isDeleted AND ${locationWorkSchedulesAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${locationWorkSchedulesAlias}.location`, locationAlias, `${locationAlias}.isDeleted = :isDeleted AND ${locationAlias}.id = ${locationWorkSchedulesAlias}.location_id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.autoDeductions`, autoDeductionAlias, `${autoDeductionAlias}.isDeleted = :isDeleted AND ${autoDeductionAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.organizationStructures`, groupAlias, `${groupAlias}.isDeleted = :isDeleted AND ${groupAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, daySchedulesAlias, `${daySchedulesAlias}.isDeleted = :isDeleted AND ${daySchedulesAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .where(`${employeeAlias}.id = :employeeId`, { employeeId })
            .getOne();
        if (result?.daySchedules) {
            result.daySchedules = result.daySchedules.map(item => {
                item.from = moment
                    .utc(item.from, 'HH:mm:ss')
                    .utcOffset(result.utcOffset)
                    .format('HH:mm:ssZ');
                item.to = moment
                    .utc(item.to, 'HH:mm:ss')
                    .utcOffset(result.utcOffset * 60)
                    .format('HH:mm:ssZ');
                return item;
            });
        }
        return result;
    }
    async getWorkScheduleIdByCompanyId(companyId) {
        const listWorkScheduleIds = this.workScheduleRepository.find({
            select: {
                id: true,
                name: true,
                state: true,
                startDate: true,
                endDate: true,
                default: true,
            },
            where: {
                companyId: companyId,
                isDeleted: false,
            },
        });
        return listWorkScheduleIds;
    }
    async getWorkScheduleByCompanyId(companyId) {
        const listWorkScheduleEntities = await this.getWorkScheduleIdByCompanyId(companyId);
        const listWorkSchedule = listWorkScheduleEntities.map(workScheduleEntity => {
            return this.getWorkScheduleByWorkScheduleId(workScheduleEntity.id, companyId);
        });
        const response = await Promise.all(listWorkSchedule);
        return response.filter(item => item);
    }
    async getAllWorkSchedulesByCompanyId(args) {
        const { companyId, query } = args;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.workScheduleRepository.createQueryBuilder(workScheduleAlias);
        queryBuilder
            .where(`${workScheduleAlias}.company_id = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.is_deleted = :isDeleted`, {
            isDeleted: false,
        });
        const { page = 1, q, sort = 'DESC', state, take = 20 } = query;
        queryBuilder.skip((page - 1) * take).take(take);
        if (state) {
            queryBuilder.andWhere(`LOWER(${workScheduleAlias}.state) = LOWER(:state)`, { state });
        }
        if (q) {
            queryBuilder.andWhere(`LOWER(${workScheduleAlias}.name) LIKE LOWER(:q)`, {
                q: `%${q}%`,
            });
        }
        queryBuilder.orderBy(`${workScheduleAlias}.created_on`, sort);
        queryBuilder.select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.name`,
            `${workScheduleAlias}.default`,
            `${workScheduleAlias}.color`,
            `${workScheduleAlias}.startDate`,
            `${workScheduleAlias}.endDate`,
            `${workScheduleAlias}.state`,
            `${workScheduleAlias}.created_on`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.group_assignees`,
        ]);
        const worSchedules = await queryBuilder.getRawMany();
        const totalCount = await queryBuilder.getCount();
        const { default: defaultSchedules, notDefault: nonDefaultSchedules } = worSchedules.reduce((acc, worSchedule) => {
            const schedule = {
                id: +worSchedule.work_schedule_id,
                name: worSchedule.work_schedule_name,
                default: worSchedule.work_schedule_default,
                color: worSchedule.work_schedule_color,
                startDate: worSchedule.work_schedule_start_date,
                endDate: worSchedule.work_schedule_end_date,
                state: worSchedule.work_schedule_state,
                createdOn: worSchedule.created_on,
                assigneeCount: Object.keys(worSchedule?.work_schedule_assignees).length || 0,
                groupAssigneeCount: Object.keys(worSchedule?.group_assignees).length || 0,
            };
            if (schedule.default) {
                acc.default.push(schedule);
            }
            else {
                acc.notDefault.push(schedule);
            }
            return acc;
        }, { default: [], notDefault: [] });
        const paginatedResults = {
            page: +page,
            take: +take,
            itemCount: worSchedules.length,
            pageCount: Math.ceil(totalCount / take),
            hasPreviousPage: page > 1,
            hasNextPage: page < Math.ceil(totalCount / take),
            data: [...defaultSchedules, ...nonDefaultSchedules],
        };
        return paginatedResults;
    }
    async getLeaveGlobalWorkScheduleDefault() {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const breakAlias = database_1.ETableName.BREAK;
        const autoDeductionAlias = database_1.ETableName.AUTO_DEDUCTION;
        const locationWorkSchedulesAlias = database_1.ETableName.LOCATION_WORK_SCHEDULE;
        const daySchedulesAlias = database_1.ETableName.DAY_SCHEDULE;
        const locationAlias = database_1.ETableName.LOCATION;
        const groupAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const employeeAlias = 'employee';
        const result = await this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .leftJoinAndSelect(`${workScheduleAlias}.employees`, employeeAlias, `${employeeAlias}.isDeleted = :isDeleted AND ${employeeAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.breaks`, breakAlias, `${breakAlias}.isDeleted = :isDeleted AND ${breakAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.locationWorkSchedules`, locationWorkSchedulesAlias, `${locationWorkSchedulesAlias}.isDeleted = :isDeleted AND ${locationWorkSchedulesAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${locationWorkSchedulesAlias}.location`, locationAlias, `${locationAlias}.isDeleted = :isDeleted AND ${locationAlias}.id = ${locationWorkSchedulesAlias}.location_id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.autoDeductions`, autoDeductionAlias, `${autoDeductionAlias}.isDeleted = :isDeleted AND ${autoDeductionAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.organizationStructures`, groupAlias, `${groupAlias}.isDeleted = :isDeleted AND ${groupAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, daySchedulesAlias, `${daySchedulesAlias}.isDeleted = :isDeleted AND ${daySchedulesAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .where(`${workScheduleAlias}.company_id IS NULL`)
            .getOne();
        if (result?.daySchedules) {
            result.daySchedules = result.daySchedules.map(item => {
                item.from = moment
                    .utc(item.from, 'HH:mm:ss')
                    .utcOffset(result.utcOffset)
                    .format('HH:mm:ssZ');
                item.to = moment
                    .utc(item.to, 'HH:mm:ss')
                    .utcOffset(result.utcOffset * 60)
                    .format('HH:mm:ssZ');
                return item;
            });
        }
        return result;
    }
    async getLeaveCompanyWorkScheduleDefault(companyId) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const breakAlias = database_1.ETableName.BREAK;
        const autoDeductionAlias = database_1.ETableName.AUTO_DEDUCTION;
        const locationWorkSchedulesAlias = database_1.ETableName.LOCATION_WORK_SCHEDULE;
        const daySchedulesAlias = database_1.ETableName.DAY_SCHEDULE;
        const locationAlias = database_1.ETableName.LOCATION;
        const groupAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const employeeAlias = 'employee';
        const wsQueryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .leftJoinAndSelect(`${workScheduleAlias}.employees`, employeeAlias, `${employeeAlias}.isDeleted = :isDeleted AND ${employeeAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.breaks`, breakAlias, `${breakAlias}.isDeleted = :isDeleted AND ${breakAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.locationWorkSchedules`, locationWorkSchedulesAlias, `${locationWorkSchedulesAlias}.isDeleted = :isDeleted AND ${locationWorkSchedulesAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${locationWorkSchedulesAlias}.location`, locationAlias, `${locationAlias}.isDeleted = :isDeleted AND ${locationAlias}.id = ${locationWorkSchedulesAlias}.location_id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.autoDeductions`, autoDeductionAlias, `${autoDeductionAlias}.isDeleted = :isDeleted AND ${autoDeductionAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.organizationStructures`, groupAlias, `${groupAlias}.isDeleted = :isDeleted AND ${groupAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, daySchedulesAlias, `${daySchedulesAlias}.isDeleted = :isDeleted AND ${daySchedulesAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .where(`${workScheduleAlias}.company_id = :companyId AND ${workScheduleAlias}.default = :isDefault`, { isDefault: true, companyId });
        wsQueryBuilder.select([
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
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${breakAlias}.id`,
            `${breakAlias}.name`,
            `${breakAlias}.allowToBeTakenFromTo`,
            `${breakAlias}.duration`,
            `${breakAlias}.from`,
            `${breakAlias}.to`,
            `${breakAlias}.unitTime`,
            `${breakAlias}.ttBreakRuleId`,
            `${locationAlias}.id`,
            `${locationAlias}.name`,
            `${locationAlias}.address`,
            `${locationAlias}.latitude`,
            `${locationAlias}.longitude`,
            `${autoDeductionAlias}.id`,
            `${autoDeductionAlias}.name`,
            `${autoDeductionAlias}.duration`,
            `${autoDeductionAlias}.threshold`,
            `${autoDeductionAlias}.unitTime`,
            `${autoDeductionAlias}.ttAutoDeductionId`,
            `${daySchedulesAlias}.id`,
            `${daySchedulesAlias}.day`,
            `${daySchedulesAlias}.from`,
            `${daySchedulesAlias}.to`,
            `${daySchedulesAlias}.duration`,
            `${daySchedulesAlias}.unitTime`,
            `${daySchedulesAlias}.ttDayScheduleId`,
        ]);
        const result = await wsQueryBuilder.getOne();
        if (result?.daySchedules) {
            result.daySchedules = result.daySchedules.map(item => {
                item.from = moment
                    .utc(item.from, 'HH:mm:ss')
                    .utcOffset(result.utcOffset)
                    .format('HH:mm:ssZ');
                item.to = moment
                    .utc(item.to, 'HH:mm:ss')
                    .utcOffset(result.utcOffset * 60)
                    .format('HH:mm:ssZ');
                return item;
            });
        }
        return result;
    }
    async getWorkScheduleByName(name, companyId) {
        const listWorkScheduleIds = this.workScheduleRepository.find({
            select: {
                id: true,
                name: true,
            },
            where: {
                name,
                isDeleted: false,
                companyId,
            },
        });
        return listWorkScheduleIds;
    }
    async getWorkScheduleByWsTTId(workScheduleId, companyId) {
        const listWorkScheduleIds = this.workScheduleRepository.findOne({
            select: {
                id: true,
                name: true,
            },
            where: {
                ttWorkScheduleId: workScheduleId,
                companyId,
                isDeleted: false,
            },
        });
        return listWorkScheduleIds;
    }
    async getWorkScheduleByTTIds(ids, companyId) {
        const listWorkScheduleIds = this.workScheduleRepository.find({
            select: {
                id: true,
                ttWorkScheduleId: true,
            },
            where: {
                ttWorkScheduleId: (0, typeorm_2.In)(ids),
                isDeleted: false,
                companyId: companyId,
            },
        });
        return listWorkScheduleIds;
    }
    async mapIdsToUUIDs(ids) {
        const workSchedules = await this.workScheduleRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
        });
        return workSchedules.map(workSchedule => workSchedule.ttWorkScheduleId);
    }
    async getTTWorkSchedulesByWorkScheduleIds(ids, companyId) {
        if (ids.length === 0) {
            return [];
        }
        const workSchedules = await this.workScheduleRepository.find({
            where: { id: (0, typeorm_2.In)(ids), companyId, isDeleted: false },
            select: {
                companyId: true,
                ttWorkScheduleId: true,
                id: true,
                state: true,
                name: true,
            },
        });
        return workSchedules;
    }
    async getTTWorkSchedulesByWorkScheduleIdsWithAssignees(ids, companyId) {
        if (ids.length === 0) {
            return [];
        }
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.default`,
            `${workScheduleAlias}.ttWorkScheduleId`,
            `${workScheduleAlias}.state`,
        ])
            .where(`${workScheduleAlias}.id IN (:...ids)`, { ids })
            .andWhere(`${workScheduleAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        const workSchedules = await queryBuilder.getMany();
        return workSchedules;
    }
    async updateTTWorkSchedule(id, ttWorkScheduleId) {
        const result = await this.update(id, {
            ttWorkScheduleId: ttWorkScheduleId,
        });
        return result;
    }
    async handleCreateWorkScheduleLeave(createWorkScheduleBodyDTO, companyId, userEmail) {
        const workSchedule = await this.getWorkScheduleByName(createWorkScheduleBodyDTO.name, companyId);
        if (workSchedule.length !== 0)
            throw new common_1.BadRequestException(`Work schedule ${createWorkScheduleBodyDTO.name} has been created`);
        const workScheduleDTO = {
            name: createWorkScheduleBodyDTO.name,
            workArrangement: createWorkScheduleBodyDTO.workArrangement,
            breakType: createWorkScheduleBodyDTO.breakType,
            default: createWorkScheduleBodyDTO.default,
            unitTime: createWorkScheduleBodyDTO?.unitTime,
            companyId: companyId,
            userEmail: userEmail,
            weeklyHours: createWorkScheduleBodyDTO?.weeklyHours,
            utcOffset: createWorkScheduleBodyDTO?.utcOffset,
            state: createWorkScheduleBodyDTO.state,
            overtime: createWorkScheduleBodyDTO.overtime,
        };
        const workScheduleEntity = await this.createWorkSchedule(companyId, userEmail, workScheduleDTO);
        if (!workScheduleEntity) {
            throw new common_1.BadRequestException('Failed to create work_schedule');
        }
        if (createWorkScheduleBodyDTO.default) {
            await this.workScheduleRepository
                .createQueryBuilder()
                .update()
                .set({ default: false })
                .where('id != :id', { id: workScheduleEntity.id })
                .andWhere('default = :isDefault', { isDefault: true })
                .andWhere('company_id = :companyId', { companyId })
                .execute();
        }
        try {
            const promises = [
                createWorkScheduleBodyDTO.autoDeductions.map(item => {
                    this.autoDeductionService.createAutoDeduction(item, workScheduleEntity.id, companyId, userEmail);
                }),
                createWorkScheduleBodyDTO.daySchedules.map(item => {
                    this.dayScheduleService.createDaySchedule(item, companyId, workScheduleEntity.id, userEmail);
                }),
                createWorkScheduleBodyDTO.breaks.map(item => {
                    this.breakRuleService.createBreakRule(item, companyId, workScheduleEntity.id, userEmail);
                }),
                this.locationWorkScheduleService.assignMultipleLocationForWorkSchedules(createWorkScheduleBodyDTO.locations.map(item => {
                    return {
                        locationId: item,
                        workScheduleId: workScheduleEntity.id,
                    };
                }), companyId, userEmail),
            ];
            const [autoDeductionEntity, dayScheduleEntity, overTimeEntity, breakRuleEntity, locationEntity,] = await Promise.all(promises);
            return {
                workScheduleEntity,
                autoDeductionEntity,
                dayScheduleEntity,
                overTimeEntity,
                breakRuleEntity,
                locationEntity,
            };
        }
        catch (error) {
            console.error('Error creating related entities:', error);
            throw new common_1.BadRequestException('Failed to create related entities');
        }
    }
    async handleUpdateWorkScheduleLeave(workScheduleId, companyId, userEmail, updateWorkScheduleBodyDTO) {
        const autoDeductionDTOs = updateWorkScheduleBodyDTO.autoDeductions;
        const breakRuleDTOs = updateWorkScheduleBodyDTO.breaks;
        const daySchedulesDTOs = updateWorkScheduleBodyDTO.daySchedules;
        const autoDeductionsDeleted = updateWorkScheduleBodyDTO.autoDeductionsDeleted;
        const breaksDeleted = updateWorkScheduleBodyDTO.breaksDeleted;
        const daySchedulesDeleted = updateWorkScheduleBodyDTO.daySchedulesDeleted;
        const locationsDeleted = updateWorkScheduleBodyDTO.locationsDeleted;
        const locationWorkScheduleDTOs = updateWorkScheduleBodyDTO.locations;
        const workScheduleDTO = {
            name: updateWorkScheduleBodyDTO.name,
            workArrangement: updateWorkScheduleBodyDTO.workArrangement,
            breakType: updateWorkScheduleBodyDTO.breakType,
            default: updateWorkScheduleBodyDTO.default,
            unitTime: updateWorkScheduleBodyDTO?.unitTime,
            companyId: companyId,
            userEmail: userEmail,
            weeklyHours: updateWorkScheduleBodyDTO?.weeklyHours,
            excludeEarlyClockIn: updateWorkScheduleBodyDTO?.excludeEarlyClockIn || false,
            overtime: updateWorkScheduleBodyDTO?.overtime,
            utcOffset: updateWorkScheduleBodyDTO?.utcOffset,
            color: updateWorkScheduleBodyDTO?.color,
        };
        const workScheduleEntity = await this.getWorkScheduleByWorkScheduleId(workScheduleId, companyId);
        if (!workScheduleEntity) {
            throw new common_1.BadRequestException('Not found work_schedule entity');
        }
        const workScheduleDefault = await this.workScheduleRepository.findOne({
            where: {
                isDeleted: false,
                default: true,
                companyId,
            },
        });
        if (workScheduleDefault && !workScheduleDTO.default) {
            if (workScheduleDefault.id === workScheduleId) {
                throw new common_1.BadRequestException('You cannot deselect the default status of the current work schedule');
            }
        }
        const breakRuleMappingObject = await this.breakRuleService.mapIdsToUUIDsInDtosV2(breakRuleDTOs);
        const autoDeductionMappingObject = await this.autoDeductionService.mapIdsToUUIDsInDtosV2(autoDeductionDTOs);
        const dayScheduleMappingObject = await this.dayScheduleService.mapIdsToUUIDsInDtosV2(daySchedulesDTOs);
        const breakDtosUpdated = breakRuleDTOs.map(value => ({
            ...value,
            ttBreakRuleId: undefined,
            id: value?.id ? breakRuleMappingObject[String(value.id)] : undefined,
        }));
        const autoDeductionDtosUpdated = autoDeductionDTOs.map(value => ({
            ...value,
            ttAutoDeductionId: undefined,
            id: value?.id ? autoDeductionMappingObject[String(value.id)] : undefined,
        }));
        const dayScheduleDtosUpdated = daySchedulesDTOs.map(value => ({
            ...value,
            ttDayScheduleId: undefined,
            id: value?.id ? dayScheduleMappingObject[String(value.id)] : undefined,
        }));
        const updatePayload = {
            ...updateWorkScheduleBodyDTO,
            breaks: breakDtosUpdated || [],
            autoDeductions: autoDeductionDtosUpdated || [],
            daySchedules: dayScheduleDtosUpdated || [],
            locations: (await this.locationWorkScheduleService.mapIdsToUUIDsInDtos(updateWorkScheduleBodyDTO.locations)) || [],
            breaksDeleted: await this.breakRuleService.mapIdsToUUIDs(updateWorkScheduleBodyDTO.breaksDeleted || []),
            autoDeductionsDeleted: await this.autoDeductionService.mapIdsToUUIDs(updateWorkScheduleBodyDTO.autoDeductionsDeleted || []),
            daySchedulesDeleted: await this.dayScheduleService.mapIdsToUUIDs(updateWorkScheduleBodyDTO.daySchedulesDeleted || []),
            locationsDeleted: await this.locationWorkScheduleService.mapIdsToUUIDs(updateWorkScheduleBodyDTO.locationsDeleted || []),
        };
        const updatedNewData = updatePayload.daySchedules.map(({ ttDayScheduleId, ...rest }) => rest);
        const updatedWorkSchedule = await this.updateWorkSchedule(companyId, userEmail, workScheduleId, workScheduleDTO);
        if (updateWorkScheduleBodyDTO?.default) {
            await this.workScheduleRepository
                .createQueryBuilder()
                .update()
                .set({ default: false })
                .where('id != :id', { id: workScheduleEntity.id })
                .andWhere('default = :isDefault', { isDefault: true })
                .andWhere('company_id = :companyId', { companyId })
                .execute();
        }
        if (autoDeductionsDeleted) {
            const response = autoDeductionsDeleted.map(item => {
                return this.autoDeductionService.deleteAutoDeduction(item, {
                    option: common_2.OptionDelete.Soft,
                    userEmail: userEmail,
                });
            });
            await Promise.all(response);
        }
        if (breaksDeleted) {
            const response = breaksDeleted.map(item => {
                return this.breakRuleService.deleteBreakRule(item, {
                    option: common_2.OptionDelete.Soft,
                    userEmail: userEmail,
                });
            });
            await Promise.all(response);
        }
        if (daySchedulesDeleted) {
            const response = daySchedulesDeleted.map(item => {
                return this.dayScheduleService.deleteDaySchedule(item, {
                    option: common_2.OptionDelete.Soft,
                    userEmail: userEmail,
                });
            });
            await Promise.all(response);
        }
        if (daySchedulesDeleted) {
            const response = daySchedulesDeleted.map(item => {
                return this.dayScheduleService.deleteDaySchedule(item, {
                    option: common_2.OptionDelete.Soft,
                    userEmail: userEmail,
                });
            });
            await Promise.all(response);
        }
        if (locationsDeleted) {
            const response = locationsDeleted.map(item => {
                return this.locationWorkScheduleService.archiveLocationWorkSchedule(item, workScheduleId, companyId, userEmail);
            });
            await Promise.all(response);
        }
        try {
            const promises = [
                this.autoDeductionService.updateManyAutoDeduction(updateWorkScheduleBodyDTO.autoDeductions.map((value) => ({
                    ...value,
                })), userEmail, companyId, workScheduleId),
                this.dayScheduleService.updateManyDaySchedule(updateWorkScheduleBodyDTO.daySchedules.map((value) => ({
                    ...value,
                })), userEmail, companyId, workScheduleId),
                this.breakRuleService.updateManyBreakRule(updateWorkScheduleBodyDTO.breaks.map((value) => ({
                    ...value,
                })), userEmail, companyId, workScheduleId),
            ];
            const [autoDeductionEntity, dayScheduleEntity, breakRuleEntity] = await Promise.all(promises);
            return {
                updatedWorkSchedule,
                autoDeductionEntity,
                dayScheduleEntity,
                breakRuleEntity,
            };
        }
        catch (error) {
            console.error('Error creating related entities:', error);
            throw new common_1.BadRequestException('Failed to update related entities');
        }
    }
    async getWorkScheduleLeaveDefault(companyId) {
        return this.getOne({
            where: {
                companyId,
                default: true,
                isDeleted: false,
            },
        });
    }
    async updateTtIdForWorkScheduleLeaveDefault(workScheduleId, ttWorkScheduleId) {
        return this.workScheduleRepository.update(workScheduleId, {
            ttWorkScheduleId,
        });
    }
    async syncExistedWorkScheduleWithAssigneesAndGroupAssignees(companyId, timeTrackerCompanyId) {
        const allWorkSchedules = await this.getWorkScheduleByCompanyId(companyId);
        if (allWorkSchedules && allWorkSchedules.length > 0) {
            const workSchedulePromises = allWorkSchedules.map(async (item) => {
                let assigneeIds = [];
                if (item?.assignees) {
                    const currentAssignees = item.assignees || {};
                    const employeeIds = Object.keys(currentAssignees).map(Number);
                    const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
                        companyId,
                        employeeIds,
                    });
                    assigneeIds = employeeMappings?.map(e => e.timeTrackerEmployeeId);
                }
                let groupAssigneeIds = [];
                if (item?.groupAssignees) {
                    const currentGroupAssignees = item.groupAssignees || {};
                    const groupIds = Object.values(currentGroupAssignees).map(assignee => assignee.id);
                    const groupMappings = await this.groupMappingService.getGroupMappings(groupIds, companyId);
                    groupAssigneeIds = groupMappings?.map(g => g.timeTrackerGroupId);
                }
                if (item) {
                    const workScheduleDTO = {
                        id: item.ttWorkScheduleId,
                        assigneeIds: assigneeIds,
                        groupAssigneeIds: groupAssigneeIds,
                    };
                    const { data } = await this.apiService.request({
                        type: 'SYNC_ASSIGNEES_WORK_SCHEDULE',
                        data: {
                            ...workScheduleDTO,
                        },
                        segments: { companyId: timeTrackerCompanyId },
                    }, {
                        useMasterApiKey: true,
                    });
                    return data;
                }
                return null;
            });
            const workSchedules = await Promise.all(workSchedulePromises);
            return workSchedules;
        }
        return null;
    }
    async syncAssignmentsToTimeTracker(companyId, ttCompanyId) {
        const assignments = await this.workScheduleAssignmentService.getAllAssignmentsOfCompany(companyId);
        if (assignments) {
            const employeeIds = [
                ...new Set(assignments?.map(assignment => assignment.employeeId)),
            ];
            const workScheduleIds = [
                ...new Set(assignments?.map(assignment => assignment.workScheduleId)),
            ];
            const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
                companyId,
                employeeIds,
            });
            const employeeMappingMap = new Map(employeeMappings.map(e => [e.employeeId, e.timeTrackerEmployeeId]));
            const workSchedules = await this.getTTWorkSchedulesByWorkScheduleIds(workScheduleIds, companyId);
            const workScheduleMap = new Map(workSchedules.map(ws => [ws.id, ws.ttWorkScheduleId]));
            let mappedAssignments = assignments
                .map(assignment => {
                const timeTrackerEmployeeId = employeeMappingMap.get(assignment.employeeId);
                const ttWorkScheduleId = workScheduleMap.get(assignment.workScheduleId);
                if (!timeTrackerEmployeeId || !ttWorkScheduleId) {
                    return null;
                }
                return {
                    ...assignment,
                    employeeId: timeTrackerEmployeeId,
                    workScheduleId: ttWorkScheduleId,
                    companyId: ttCompanyId,
                    date: assignment?.date instanceof Date
                        ? assignment?.date.toISOString()
                        : assignment?.date,
                };
            })
                .filter(assignment => assignment !== null);
            while (mappedAssignments.length > 0) {
                const batch = mappedAssignments.slice(0, 100);
                const { data } = await this.apiService.request({
                    type: 'SYNC_WORK_SCHEDULE_ASSIGNMENTS',
                    data: batch,
                    segments: { companyId: ttCompanyId },
                }, {
                    useMasterApiKey: true,
                });
                mappedAssignments = mappedAssignments.slice(100);
            }
        }
        return null;
    }
    async syncExistedWorkSchedule(companyId, timeTrackerCompanyId) {
        const allWorkSchedules = await this.getWorkScheduleByCompanyId(companyId);
        if (allWorkSchedules && allWorkSchedules.length > 0) {
            const workSchedulePromises = allWorkSchedules.map(async (item) => {
                const locations = await this.locationWorkScheduleService.mapIdsToUUIDs(item?.locationWorkSchedules?.map(loc => loc.id) || []);
                let newTtWorkScheduleId = null;
                if (!item?.ttWorkScheduleId) {
                    newTtWorkScheduleId = (0, crypto_1.randomUUID)();
                    if (item) {
                        await this.updateTtIdForWorkScheduleLeaveDefault(item.id, newTtWorkScheduleId);
                    }
                }
                const listTtBreakId = [];
                if (item?.breaks && item?.breaks.length > 0) {
                    const breakPromises = item.breaks.map(async (breakRule) => {
                        const ttBreakId = (0, crypto_1.randomUUID)();
                        listTtBreakId.push({ id: breakRule.id, ttId: ttBreakId });
                        await this.breakRuleService.updateTtRuleId(breakRule.id, ttBreakId);
                    });
                    await Promise.all(breakPromises);
                }
                const listTtAutoDeductionId = [];
                if (item?.autoDeductions && item?.autoDeductions.length > 0) {
                    const autoDeductionPromises = item.autoDeductions.map(async (autoDeduction) => {
                        const ttAutoDeductionId = (0, crypto_1.randomUUID)();
                        listTtAutoDeductionId.push({
                            id: autoDeduction.id,
                            ttId: ttAutoDeductionId,
                        });
                        await this.autoDeductionService.updateTtAutoDeduction(autoDeduction.id, ttAutoDeductionId);
                    });
                    await Promise.all(autoDeductionPromises);
                }
                const listTtDayScheduleId = [];
                if (item?.daySchedules && item?.daySchedules.length > 0) {
                    const autoDeductionPromises = item.daySchedules.map(async (daySchedule) => {
                        const ttDayScheduleId = (0, crypto_1.randomUUID)();
                        listTtDayScheduleId.push({
                            id: daySchedule.id,
                            ttId: ttDayScheduleId,
                        });
                        await this.dayScheduleService.updateTtIds(daySchedule.id, ttDayScheduleId);
                    });
                    await Promise.all(autoDeductionPromises);
                }
                if (item) {
                    const createDto = {
                        autoDeductions: item.autoDeductions.map(item => {
                            return {
                                name: item.name,
                                duration: item.duration,
                                threshold: item.threshold,
                                unitTime: item.unitTime,
                                id: listTtAutoDeductionId.find(ttItem => ttItem.id === item.id)
                                    ?.ttId,
                            };
                        }),
                        breaks: item.breaks.map(subItem => {
                            return {
                                name: subItem.name,
                                allowToBeTakenFromTo: subItem.allowToBeTakenFromTo,
                                duration: subItem.duration,
                                from: moment(subItem.from, 'HH:mm:ssZ').format('HH:mm:ss Z'),
                                to: moment(subItem.to, 'HH:mm:ssZ').format('HH:mm:ss Z'),
                                unitTime: subItem.unitTime,
                                id: listTtBreakId.find(ttItem => ttItem.id === subItem.id)
                                    ?.ttId,
                            };
                        }),
                        daySchedules: item.daySchedules.map(subItem => {
                            return {
                                day: subItem.day,
                                from: moment(subItem.from, 'HH:mm:ssZ').format('HH:mm:ss Z'),
                                to: moment(subItem.to, 'HH:mm:ssZ').format('HH:mm:ss Z'),
                                duration: subItem.duration,
                                unitTime: subItem.unitTime,
                                id: listTtDayScheduleId.find(ttItem => ttItem.id === subItem.id)
                                    ?.ttId,
                            };
                        }),
                        name: item.name,
                        breakType: item.breakType,
                        default: item.default,
                        excludeEarlyClockIn: item.excludeEarlyClockIn || false,
                        overtime: {
                            timeRangeStyle: common_2.TimeRangeStyle.Hour,
                            endWorkDayAt: moment(item.endWorkDayAt, 'HH:mm:ssZ').format('HH:mm:ss Z'),
                            unitTime: common_2.UnitTime.MINUTE,
                        },
                        utcOffset: item.utcOffset,
                        weeklyHours: item.weeklyHours,
                        unitTime: item?.unitTime,
                        workArrangement: item?.workArrangement,
                        locations: [],
                        color: item?.color,
                        state: item?.state,
                        threshold: item?.threshold,
                        publishType: item?.publishType,
                        publishHistories: item?.publishHistories
                            ? item?.publishHistories
                            : undefined,
                    };
                    if (!item.startDate) {
                        delete createDto.startDate;
                    }
                    else {
                        createDto.startDate = item.startDate.toISOString();
                    }
                    if (!item.endDate) {
                        delete createDto.endDate;
                    }
                    else {
                        createDto.endDate = item.endDate.toISOString();
                    }
                    const sanitizedDto = (0, remove_null_or_undefined_util_1.removeNullOrUndefined)(createDto);
                    const { data } = await this.apiService.request({
                        type: 'CREATE_WORK_SCHEDULE',
                        data: {
                            ...sanitizedDto,
                            locations: locations || [],
                            id: item.ttWorkScheduleId && item.ttWorkScheduleId,
                            newId: newTtWorkScheduleId && newTtWorkScheduleId,
                        },
                        segments: { companyId: timeTrackerCompanyId },
                    }, {
                        useMasterApiKey: true,
                    });
                    return data;
                }
                return null;
            });
            const workSchedules = await Promise.all(workSchedulePromises);
            return workSchedules;
        }
        return null;
    }
    async getWorkScheduleOfEmployee(employeeId, companyId, employeeEntity) {
        let employee = null;
        if (!employeeEntity) {
            employee = await this.employeeService.getEmployeeById(companyId, employeeId);
            if (!employee) {
                throw new common_1.NotFoundException('Employee not found');
            }
        }
        else
            employee = employeeEntity;
        let workScheduleEntity;
        if (!employee.workScheduleId) {
            const groupWorkScheduleId = await this.organizationStructureService.getGroupWorkScheduleForEmployee(employeeId, companyId);
            let groupWorkSchedule = null;
            if (groupWorkScheduleId) {
                groupWorkSchedule = await this.workScheduleRepository.findOne({
                    where: {
                        id: groupWorkScheduleId,
                        companyId,
                    },
                });
            }
            if (!groupWorkSchedule) {
                const defaultCompanyWorkSchedule = await this.getLeaveCompanyWorkScheduleDefault(companyId);
                if (!defaultCompanyWorkSchedule) {
                    const defaultWorkSchedule = await this.getLeaveGlobalWorkScheduleDefault();
                    if (!defaultWorkSchedule)
                        throw new common_1.BadRequestException('Work schedule not found');
                    workScheduleEntity = defaultWorkSchedule;
                }
                else
                    workScheduleEntity = defaultCompanyWorkSchedule;
            }
            else
                workScheduleEntity = groupWorkSchedule;
        }
        else {
            workScheduleEntity = await this.getWorkScheduleByWorkScheduleId(employee.workScheduleId, companyId);
            if (!workScheduleEntity)
                throw new common_1.NotFoundException('Work schedule not found');
        }
        return workScheduleEntity;
    }
    async deleteLinkedTtByCompanyId(workScheduleId, companyId) {
        return this.workScheduleRepository.update(workScheduleId, {
            ttWorkScheduleId: '',
            updatedOn: moment.utc().toDate(),
        });
    }
    async publishWorkSchedule(params) {
        const { companyId, workScheduleId, userEmail, startDate, endDate, timeTrackerCompanyId, publishType, } = params;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted
      AND ${workScheduleAlias}.id = :workScheduleId
      AND ${workScheduleAlias}.companyId = :companyId
      `, { isDeleted: false, workScheduleId, companyId })
            .select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.ttWorkScheduleId`,
            `${workScheduleAlias}.name`,
            `${workScheduleAlias}.threshold`,
            `${workScheduleAlias}.publishHistories`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.default`,
        ]);
        const workSchedule = await queryBuilder.getOne();
        if (!workSchedule) {
            throw new common_1.NotFoundException(`Not found work schedule ${workScheduleId} in company ${companyId}`);
        }
        const { name, default: isWorkScheduleDefault } = workSchedule;
        const publishHistories = workSchedule.publishHistories ?? [];
        const assignees = await this.getAssigneesWasAssignedToWorkSchedule(companyId, workSchedule);
        if (isWorkScheduleDefault) {
            const employees = await this.getAssigneesIsNotAssignedToWorkSchedule(companyId);
            for (const emp of employees) {
                assignees[emp.id] = {
                    email: emp.email,
                    employeeNo: emp.employeeNo,
                    employeeRef: emp.employeeRef,
                    fullNameEn: emp.fullNameEn,
                    fullNameLocal: emp.fullNameLocal,
                };
            }
        }
        if ((0, utils_1.isEmptyObject)(assignees)) {
            throw new common_1.BadRequestException(`The work schedule ${name} does not have any assignee`);
        }
        const assigneeIds = Object.keys(assignees).map(id => +id);
        const currentDate = new Date();
        const updateWorkScheduleDto = {
            id: workSchedule.id,
            state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
            updatedBy: userEmail,
            updatedOn: currentDate,
            startDate,
            endDate,
            publishHistories: [
                ...publishHistories,
                {
                    startDate,
                    endDate,
                    updatedBy: userEmail,
                    updatedOn: currentDate.toISOString(),
                },
            ],
            publishType: publishType ?? work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_PUBLISH_NEW,
        };
        if (isWorkScheduleDefault) {
            Object.assign(updateWorkScheduleDto, { assignees });
        }
        const [updatedWorkSchedule] = await Promise.all([
            this.workScheduleRepository.save(updateWorkScheduleDto),
        ]);
        if (endDate && new Date(endDate) >= new Date()) {
            await this.handleExpiredWorkSchedule(workSchedule, companyId, endDate, timeTrackerCompanyId);
        }
        if (timeTrackerCompanyId) {
            await this.workScheduleProducer.publishedWorkSchedule({
                ttCompanyId: timeTrackerCompanyId,
                workScheduleId: workSchedule.ttWorkScheduleId,
                startDate,
                endDate,
            });
        }
        await this.sendWorkScheduleNotification({
            companyId,
            workScheduleId,
            employeeIds: assigneeIds,
            dateFrom: startDate,
            dateTo: endDate,
            userEmail,
            verb: `has just published a work schedule. Check it out now`,
            workScheduleName: workSchedule.name,
        });
        return updatedWorkSchedule;
    }
    async sendWorkScheduleNotification(params) {
        const { employeeIds, companyId, userEmail, dateFrom, dateTo, workScheduleId, verb, workScheduleName, } = params;
        const chunkSize = 50;
        const chunks = (0, chunk_array_util_1.chunkArray)(employeeIds, chunkSize);
        for (const chunk of chunks) {
            const employees = await this.employeeService.repository.find({
                where: { id: (0, typeorm_2.In)(chunk), isDeleted: false },
                select: { id: true, email: true },
            });
            const notificationParams = work_schedule_assignment_hrforte_notification_mapper_1.WorkScheduleAssignmentHrforteNotificationMapper.toParams({
                actorEmail: userEmail,
                clientUrl: this.appConfig.clientUrl,
                dateFrom,
                dateTo,
                employees,
                workScheduleId,
                workScheduleName,
                verb,
            });
            await this.hrforteNotificationProducer.addSendBulkJob({
                companyId,
                params: notificationParams,
            });
        }
    }
    async getAssigneesIsNotAssignedToWorkSchedule(companyId) {
        const empAlias = database_1.ETableName.EMPLOYEE;
        return (this.employeeService.repository
            .createQueryBuilder(empAlias)
            .where(`${empAlias}.isDeleted = :isDeleted
        AND ${empAlias}.companyId = :companyId 
        `, { isDeleted: false, companyId })
            .select((0, employee_fields_for_common_info_util_1.employeeFieldsForCommonInfo)(empAlias))
            .getMany());
    }
    async getAssigneesWasAssignedToWorkSchedule(companyId, workSchedule) {
        const cloneAssignees = workSchedule.assignees || {};
        const cloneGroupAssignees = workSchedule.groupAssignees || {};
        if ((0, utils_1.isEmptyObject)(cloneGroupAssignees))
            return cloneAssignees;
        const groupOrgPaths = (0, get_parent_org_paths_util_1.getParentPaths)(Object.keys(cloneGroupAssignees));
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
        if (employees.length) {
            for (const emp of employees) {
                const { id: empId, email, employeeNo, employeeRef, fullNameEn, fullNameLocal, } = emp;
                cloneAssignees[empId] = {
                    email,
                    employeeNo,
                    employeeRef,
                    fullNameEn,
                    fullNameLocal,
                };
            }
        }
        return cloneAssignees;
    }
    async syncPublishedWorkSchedule(args) {
        const { endDate, startDate, ttCompanyId, workScheduleId, publishType } = args;
        const { data } = await this.apiService.request({
            type: 'PUBLISHED_WORK_SCHEDULE',
            data: {
                startDate,
                endDate,
                publishType: publishType ?? work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_PUBLISH_NEW,
            },
            segments: { companyId: ttCompanyId, workScheduleId: workScheduleId },
        }, {
            useMasterApiKey: true,
        });
        return data;
    }
    async unpublishWorkSchedule(args) {
        const { companyId, userEmail, workScheduleId, timeTrackerCompanyId } = args;
        const workSchedule = await this.workScheduleRepository.findOne({
            where: {
                id: workScheduleId,
                companyId,
                isDeleted: false,
            },
        });
        if (!workSchedule)
            throw new common_1.NotFoundException('Work schedule not found');
        const relatedActions = await this.workScheduleAssignmentService.checkIsRelatedActionsBelongToWorkScheduleAssignment({
            companyId,
            workScheduleId,
        });
        if (relatedActions.isExistedAnyRelatedActions) {
            throw new common_1.BadRequestException(`Unable to unpublish the work schedule as some employees have already ${relatedActions.relatedAction} the schedule.`);
        }
        const workScheduleEndDate = workSchedule.endDate;
        const isInThePast = new Date(workScheduleEndDate) >= new Date();
        if (workScheduleEndDate && isInThePast) {
            this.cancelScheduleExpiredJob(workSchedule.id);
        }
        await this.workScheduleRepository
            .createQueryBuilder()
            .update(database_1.WorkScheduleEntity)
            .set({
            state: work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED,
            publishHistories: workSchedule.publishHistories,
            startDate: () => 'NULL',
            endDate: () => 'NULL',
            assignees: workSchedule.assignees,
            groupAssignees: workSchedule.groupAssignees,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        })
            .where('id = :id', { id: workScheduleId })
            .andWhere('companyId = :companyId AND isDeleted = :isDeleted', {
            companyId,
            isDeleted: false,
        })
            .execute();
        await this.workScheduleAssignmentService.removeWorkScheduleAssignmentQueue({
            workScheduleId,
            companyId,
            state: work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED,
        });
        const assignees = await this.getAssigneesWasAssignedToWorkSchedule(companyId, workSchedule);
        const assigneeIds = Object.keys(assignees).map(id => +id);
        await this.sendWorkScheduleNotification({
            companyId,
            workScheduleId,
            employeeIds: assigneeIds,
            dateFrom: moment(workSchedule.startDate).format('YYYY-MM-DD'),
            dateTo: moment(workSchedule.endDate).format('YYYY-MM-DD'),
            userEmail,
            verb: `has just unpublished a work schedule.`,
            workScheduleName: workSchedule.name,
        });
        if (timeTrackerCompanyId) {
            const workScheduleTTMappingId = workSchedule.ttWorkScheduleId;
            await this.workScheduleProducer.unpublishedWorkSchedule({
                ttCompanyId: timeTrackerCompanyId,
                workScheduleId: workScheduleTTMappingId,
            });
        }
        return 'Update unpublished work schedule successfully';
    }
    async syncUnpublishedWorkSchedule(args) {
        const { ttCompanyId, workScheduleId } = args;
        const { data } = await this.apiService.request({
            type: 'UNPUBLISHED_WORK_SCHEDULE',
            segments: { companyId: ttCompanyId, workScheduleId: workScheduleId },
        }, {
            useMasterApiKey: true,
        });
        return data;
    }
    async removeWorkSchedule(args) {
        const { companyId, workScheduleId } = args;
        const workSchedule = await this.workScheduleRepository.findOne({
            where: {
                id: workScheduleId,
                companyId,
                isDeleted: false,
            },
        });
        if (!workSchedule) {
            throw new common_1.NotFoundException('Work schedule not found');
        }
        const { state: currentWorkScheduleState } = workSchedule;
        if (currentWorkScheduleState === work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED) {
            throw new common_1.BadRequestException(`Work schedule "${workSchedule.name}" is already published. Cannot remove this work schedule`);
        }
        return this.delete(workSchedule.id);
    }
    async handleExpiredWorkSchedule(workSchedule, companyId, endDate, ttCompanyId) {
        const jobName = `delete-work-schedule-${workSchedule.id}`;
        const cronTime = moment(endDate, 'YYYY-MM-DD')
            .utcOffset(workSchedule.utcOffset || 0)
            .set({ hour: 23, minute: 59, second: 59 })
            .toDate();
        if (this.schedulerRegistry.doesExist('cron', jobName)) {
            this.schedulerRegistry.deleteCronJob(jobName);
        }
        const job = new cron_1.CronJob(cronTime, async () => {
            await this.update(workSchedule.id, {
                isDeleted: true,
                state: work_schedule_state_enum_1.EWorkScheduleState.EXPIRED,
            });
            await this.workScheduleAssignmentService.removeWorkScheduleAssignment({
                workScheduleId: workSchedule.id,
                companyId,
                state: work_schedule_state_enum_1.EWorkScheduleState.EXPIRED,
            });
            if (ttCompanyId) {
                const ttScheduleWorkSchedule = workSchedule.ttWorkScheduleId;
                await this.workScheduleProducer.expiredWorkSchedule({
                    ttCompanyId: ttCompanyId,
                    workScheduleId: ttScheduleWorkSchedule,
                });
            }
        });
        this.schedulerRegistry.addCronJob(jobName, job);
        job.start();
    }
    async syncExpiredWorkSchedule(args) {
        const { ttCompanyId, workScheduleId } = args;
        await this.apiService.request({
            type: 'EXPIRED_WORK_SCHEDULE',
            segments: {
                companyId: ttCompanyId,
                workScheduleId: workScheduleId,
            },
        }, {
            useMasterApiKey: true,
        });
    }
    cancelScheduleExpiredJob(workScheduleId) {
        const jobName = `delete-work-schedule-${workScheduleId}`;
        try {
            const job = this.schedulerRegistry.getCronJob(jobName);
            if (job) {
                job.stop();
                this.schedulerRegistry.deleteCronJob(jobName);
            }
        }
        catch (error) {
            console.error('[Error] cancelScheduleExpiredJob: ', error);
        }
    }
    async updateWorkScheduleDefault(args) {
        const { companyId, ttCompanyId, workScheduleId, userEmail } = args;
        const workSchedule = await this.workScheduleRepository.findOne({
            where: {
                id: workScheduleId,
                companyId,
                isDeleted: false,
            },
        });
        if (!workSchedule) {
            throw new common_1.NotFoundException('Work schedule not found');
        }
        const isExpired = workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.EXPIRED;
        if (isExpired) {
            throw new common_1.NotFoundException('This work schedule has expired. Can you mark as default for this one');
        }
        const workScheduleDefault = await this.workScheduleRepository.findOne({
            where: {
                companyId,
                default: true,
                isDeleted: false,
            },
        });
        if (!workScheduleDefault) {
            throw new common_1.BadRequestException('Default work schedule not found');
        }
        const isPublished = workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED;
        const isUnpublished = workSchedule.state === work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED;
        await this.moveAssigneeFromDefaultToNewDefault({
            workSchedule,
            workScheduleDefault,
            userEmail,
        });
        if (isPublished) {
            const promises = [
                this.workScheduleAssignmentService.removeWorkScheduleAssignment({
                    workScheduleId: workSchedule.id,
                    companyId,
                    state: work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED,
                }),
                this.update(workScheduleId, {
                    default: true,
                    assignees: workSchedule.assignees,
                    groupAssignees: workSchedule.groupAssignees,
                }, {
                    userEmail,
                    companyId,
                }),
            ];
            await Promise.all(promises);
            await this.workScheduleRepository
                .createQueryBuilder()
                .update(database_1.WorkScheduleEntity)
                .set({
                startDate: () => 'NULL',
                endDate: () => 'NULL',
                assignees: workSchedule.assignees,
                groupAssignees: workSchedule.groupAssignees,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            })
                .where('id = :id', { id: workScheduleId })
                .andWhere('companyId = :companyId AND isDeleted = :isDeleted', {
                companyId,
                isDeleted: false,
            })
                .execute();
            try {
                this.cancelScheduleExpiredJob(workSchedule.id);
            }
            catch (error) {
                console.error(error);
            }
        }
        if (isUnpublished) {
            await this.update(workScheduleId, {
                default: true,
                state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
                assignees: workSchedule.assignees,
                groupAssignees: workSchedule.groupAssignees,
            }, {
                userEmail,
                companyId,
            });
            await this.workScheduleRepository
                .createQueryBuilder()
                .update(database_1.WorkScheduleEntity)
                .set({
                startDate: () => 'NULL',
                endDate: () => 'NULL',
                assignees: workSchedule.assignees,
                groupAssignees: workSchedule.groupAssignees,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            })
                .where('id = :id', { id: workScheduleId })
                .andWhere('companyId = :companyId AND isDeleted = :isDeleted', {
                companyId,
                isDeleted: false,
            })
                .execute();
        }
        await this.update(workScheduleDefault.id, {
            default: false,
            state: work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED,
        }, {
            userEmail,
            companyId,
        });
        await this.workScheduleRepository
            .createQueryBuilder()
            .update(database_1.WorkScheduleEntity)
            .set({
            startDate: () => 'NULL',
            endDate: () => 'NULL',
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        })
            .where('id = :id', { id: workScheduleId })
            .andWhere('companyId = :companyId AND isDeleted = :isDeleted', {
            companyId,
            isDeleted: false,
        })
            .execute();
        if (ttCompanyId) {
            await this.apiService.request({
                type: 'UPDATE_WORK_SCHEDULE_DEFAULT',
                segments: {
                    companyId: ttCompanyId,
                    workScheduleId: workSchedule.ttWorkScheduleId,
                },
            });
        }
        return 'Update work schedule as default successfully';
    }
    async moveAssigneeFromDefaultToNewDefault(args) {
        const { workSchedule, workScheduleDefault, userEmail } = args;
        workSchedule.assignees = {
            ...workSchedule.assignees,
            ...workScheduleDefault.assignees,
        };
        workSchedule.groupAssignees = {
            ...workSchedule.groupAssignees,
            ...workScheduleDefault.groupAssignees,
        };
        workScheduleDefault.assignees = {};
        workScheduleDefault.groupAssignees = {};
        await Promise.all([
            this.workScheduleRepository.save({
                ...workSchedule,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            }),
            this.workScheduleRepository.save({
                ...workScheduleDefault,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            }),
        ]);
    }
    async getAssigneesOfWorkSchedule({ workScheduleId, paginationQueryDto, companyId, }) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.default`,
        ])
            .where(`${workScheduleAlias}.id = :workScheduleId`, { workScheduleId })
            .andWhere(`${workScheduleAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        const workSchedule = await queryBuilder.getOne();
        if (!workSchedule ||
            (!workSchedule.assignees && !workSchedule?.groupAssignees)) {
            return {
                page: 1,
                take: 0,
                itemCount: 0,
                pageCount: 0,
                hasPreviousPage: false,
                hasNextPage: false,
                data: [],
            };
        }
        let groupEmployees = [];
        if (workSchedule?.groupAssignees) {
            const groupAssignees = workSchedule?.groupAssignees;
            const groupOrgPaths = Object.keys(groupAssignees);
            if (groupOrgPaths.length > 0) {
                groupEmployees = await this.getAllEmployeesInGroupAndSubGroups(companyId, groupOrgPaths);
            }
        }
        const { q, page, take, ids, order } = paginationQueryDto;
        const assigneesArray = Object.entries(workSchedule.assignees).map(([key, value]) => ({
            employeeId: Number(key),
            ...value,
        }));
        const assigneeMap = new Map(assigneesArray.map(assignee => [assignee.employeeId, assignee]));
        groupEmployees?.forEach(groupEmployee => {
            if (!assigneeMap.has(groupEmployee.employeeId)) {
                assigneesArray.push(groupEmployee);
            }
        });
        let filteredAssignees = assigneesArray;
        if (q) {
            const lowerQ = q.toLowerCase();
            filteredAssignees = assigneesArray?.filter(assignee => assignee?.email?.toLowerCase().includes(lowerQ) ||
                assignee?.fullNameLocal?.toLowerCase().includes(lowerQ) ||
                (assignee?.fullNameEn &&
                    assignee?.fullNameEn?.toLowerCase().includes(lowerQ)));
        }
        if (ids && ids.length > 0) {
            filteredAssignees = filteredAssignees?.filter(assignee => ids.includes(assignee?.employeeId));
        }
        if (order === enums_1.EOrder.ASC) {
            assigneesArray?.sort((a, b) => a.employeeId - b.employeeId);
        }
        else {
            assigneesArray?.sort((a, b) => b.employeeId - a.employeeId);
        }
        const getPage = page || 1;
        const getTake = take || 20;
        const skip = (getPage - 1) * getTake;
        const paginatedAssignees = filteredAssignees?.slice(skip, skip + getTake);
        const totalCount = filteredAssignees?.length;
        const paginatedResults = {
            page: getPage,
            take: getTake,
            itemCount: paginatedAssignees.length,
            pageCount: Math.ceil(totalCount / getTake),
            hasPreviousPage: getPage > 1,
            hasNextPage: getPage < Math.ceil(totalCount / getTake),
            data: paginatedAssignees,
        };
        return paginatedResults;
    }
    async getAssigneesOfWorkScheduleWithoutPagination({ workScheduleId, companyId, }) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.default`,
        ])
            .where(`${workScheduleAlias}.id = :workScheduleId`, { workScheduleId })
            .andWhere(`${workScheduleAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        const workSchedule = await queryBuilder.getOne();
        if (!workSchedule ||
            (!workSchedule.assignees && !workSchedule?.groupAssignees)) {
            return [];
        }
        let groupEmployees = [];
        if (workSchedule?.groupAssignees) {
            const groupAssignees = workSchedule?.groupAssignees;
            const groupOrgPaths = Object.keys(groupAssignees);
            if (groupOrgPaths.length > 0) {
                groupEmployees = await this.getAllEmployeesInGroupAndSubGroups(companyId, groupOrgPaths);
            }
        }
        const assigneesArray = Object.entries(workSchedule.assignees).map(([key, value]) => ({
            employeeId: Number(key),
            ...value,
        }));
        const assigneeMap = new Map(assigneesArray.map(assignee => [assignee.employeeId, assignee]));
        groupEmployees?.forEach(groupEmployee => {
            if (!assigneeMap.has(groupEmployee.employeeId)) {
                assigneesArray.push(groupEmployee);
            }
        });
        return assigneesArray;
    }
    async getAllEmployeesInGroupAndSubGroups(companyId, orgPaths) {
        if (!orgPaths.length) {
            return [];
        }
        const groupOrgPaths = (0, get_parent_org_paths_util_1.getParentPaths)(orgPaths);
        const empAlias = database_1.ETableName.EMPLOYEE;
        const orgAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const empQueryBuilder = this.employeeService.repository
            .createQueryBuilder(empAlias)
            .leftJoinAndSelect(`${empAlias}.orgStructure`, orgAlias)
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
        empQueryBuilder.select([
            `${empAlias}.id`,
            `${empAlias}.email`,
            `${empAlias}.employeeRef`,
            `${empAlias}.employeeNo`,
            `${empAlias}.fullNameLocal`,
            `${empAlias}.fullNameEn`,
            `${orgAlias}.id`,
            `${orgAlias}.name`,
        ]);
        const employees = await empQueryBuilder.getMany();
        if (employees) {
            return employees?.map(emp => ({
                employeeId: emp.id,
                email: emp.email,
                employeeNo: emp.employeeNo,
                fullNameEn: emp.fullNameEn,
                employeeRef: emp.employeeRef,
                fullNameLocal: emp.fullNameLocal,
                groupId: emp?.orgStructure?.id,
                groupName: emp?.orgStructure?.name,
            }));
        }
        return [];
    }
    async getGroupAssigneesOfWorkSchedule({ workScheduleId, paginationQueryDto, companyId, }) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.groupAssignees`,
        ])
            .where(`${workScheduleAlias}.id = :workScheduleId`, { workScheduleId })
            .andWhere(`${workScheduleAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        const workSchedule = await queryBuilder.getOne();
        if (!workSchedule || !workSchedule.groupAssignees) {
            return {
                page: 1,
                take: 0,
                itemCount: 0,
                pageCount: 0,
                hasPreviousPage: false,
                hasNextPage: false,
                data: [],
            };
        }
        const { q, page, take, ids, order } = paginationQueryDto;
        const orgIds = [];
        const groupAssigneesArray = Object.entries(workSchedule?.groupAssignees).map(([key, value]) => {
            orgIds.push(value.id);
            return {
                orgPath: key,
                ...value,
            };
        });
        const orgAndSubOrgs = await this.organizationStructureService.getSubOrgsByIds({
            companyId,
            orgIds,
        });
        orgAndSubOrgs.forEach(org => {
            const matchingAssignee = groupAssigneesArray?.find(assignee => assignee.id === org.id);
            if (!matchingAssignee) {
                groupAssigneesArray?.push({
                    orgPath: org.orgPath,
                    id: org.id,
                    name: org.name,
                    parentGroupName: org.parentGroupName,
                    parentId: org.parentId,
                });
            }
        });
        let filteredGroupAssignees = groupAssigneesArray;
        if (q) {
            const lowerQ = q.toLowerCase();
            filteredGroupAssignees = groupAssigneesArray?.filter(groupAssignee => groupAssignee?.name?.toLowerCase().includes(lowerQ));
        }
        if (ids && ids.length > 0) {
            filteredGroupAssignees = filteredGroupAssignees?.filter(groupAssignee => ids.includes(groupAssignee.id));
        }
        if (order === enums_1.EOrder.ASC) {
            filteredGroupAssignees?.sort((a, b) => a.id - b.id);
        }
        else {
            filteredGroupAssignees?.sort((a, b) => b.id - a.id);
        }
        const getPage = page || 1;
        const getTake = take || 20;
        const skip = (getPage - 1) * getTake;
        const paginatedGroupAssignees = filteredGroupAssignees?.slice(skip, skip + getTake);
        const totalCount = filteredGroupAssignees?.length;
        const paginatedResults = {
            page: getPage,
            take: getTake,
            itemCount: paginatedGroupAssignees?.length,
            pageCount: Math.ceil(totalCount / getTake),
            hasPreviousPage: getPage > 1,
            hasNextPage: getPage < Math.ceil(totalCount / getTake),
            data: paginatedGroupAssignees,
        };
        return paginatedResults;
    }
    async getGroupAssigneesOfWorkScheduleWithoutPagination({ workScheduleId, companyId, }) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.groupAssignees`,
        ])
            .where(`${workScheduleAlias}.id = :workScheduleId`, { workScheduleId })
            .andWhere(`${workScheduleAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        const workSchedule = await queryBuilder.getOne();
        if (!workSchedule || !workSchedule.groupAssignees) {
            return [];
        }
        const orgIds = [];
        const groupAssigneesArray = Object.entries(workSchedule?.groupAssignees).map(([key, value]) => {
            orgIds.push(value.id);
            return {
                orgPath: key,
                ...value,
            };
        });
        const orgAndSubOrgs = await this.organizationStructureService.getSubOrgsByIds({
            companyId,
            orgIds,
        });
        orgAndSubOrgs.forEach(org => {
            const matchingAssignee = groupAssigneesArray.find(assignee => assignee.id === org.id);
            if (!matchingAssignee) {
                groupAssigneesArray.push({
                    orgPath: org.orgPath,
                    id: org.id,
                    name: org.name,
                    parentGroupName: org.parentGroupName,
                    parentId: org.parentId,
                });
            }
        });
        return groupAssigneesArray;
    }
    async getAllWorkSchedulesIsOverlap(params) {
        const { companyId, endDate, startDate } = params;
        const targetStartDate = moment(startDate).startOf('day');
        const targetEndDate = moment(endDate).endOf('day');
        const wsAlias = database_1.ETableName.WORK_SCHEDULE;
        const workSchedules = await this.workScheduleRepository
            .createQueryBuilder(wsAlias)
            .andWhere(`${wsAlias}.isDeleted = :isDeleted
         AND ${wsAlias}.companyId = :companyId
         AND ${wsAlias}.id != :workScheduleId
         AND (
           (${wsAlias}.startDate <= :targetEndDate AND ${wsAlias}.endDate >= :targetStartDate)
           OR (${wsAlias}.startDate >= :targetStartDate AND ${wsAlias}.endDate <= :targetEndDate)
           OR (${wsAlias}.startDate <= :targetStartDate AND ${wsAlias}.endDate >= :targetEndDate)
         )
         AND ${wsAlias}.state = :state`, {
            isDeleted: false,
            companyId,
            workScheduleId: params.workScheduleId,
            targetStartDate: targetStartDate.toDate(),
            targetEndDate: targetEndDate.toDate(),
            state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
        })
            .select([
            `${wsAlias}.id`,
            `${wsAlias}.name`,
            `${wsAlias}.startDate`,
            `${wsAlias}.endDate`,
            `${wsAlias}.color`,
            `${wsAlias}.default`,
        ])
            .getMany();
        return workSchedules;
    }
    async getWorkScheduleDefaultByCompanyId(companyId) {
        const workSchedule = await this.workScheduleRepository.findOne({
            where: {
                companyId,
                default: true,
                isDeleted: false,
            },
            relations: ['daySchedules'],
            select: [
                'id',
                'name',
                'default',
                'isDeleted',
                'color',
                'daySchedules',
                'utcOffset',
                'assignees',
                'groupAssignees',
            ],
        });
        if (workSchedule?.daySchedules) {
            workSchedule.daySchedules = workSchedule.daySchedules.map(item => {
                item.from = moment
                    .utc(item.from, 'HH:mm:ss')
                    .utcOffset(workSchedule.utcOffset)
                    .format('HH:mm:ssZ');
                item.to = moment
                    .utc(item.to, 'HH:mm:ss')
                    .utcOffset(workSchedule.utcOffset * 60)
                    .format('HH:mm:ssZ');
                return item;
            });
        }
        return workSchedule;
    }
    async handleGetWorkScheduleOfEmployeeFromToDate({ employeeId, companyId, startDate, endDate, query, }) {
        const listDayBetweenStartEnd = startDate && endDate
            ? (0, common_2.getDaysBetweenDates)(startDate, endDate)
            : (0, common_2.getCurrentWeek)();
        const { take, page, isSelectAll } = query;
        const listDays = !isSelectAll
            ? (0, common_2.paginateArray)(listDayBetweenStartEnd, page, take)
            : listDayBetweenStartEnd;
        try {
            const listWorkSchedules = await this.workScheduleAssignmentService.getWorkScheduleOfEmployeeMultipleDate({
                employeeId,
                companyId,
                date: listDays,
            });
            const result = listDays.map(day => {
                const workScheduleEntity = listWorkSchedules[day];
                if (!workScheduleEntity) {
                    return {
                        date: day,
                        workScheduleEntity: [],
                    };
                }
                const assignees = workScheduleEntity?.assignees;
                const groupAssignees = workScheduleEntity?.groupAssignees;
                if (workScheduleEntity?.daySchedules?.length > 0) {
                    const newDayScheduleEntity = workScheduleEntity?.daySchedules.filter(item => {
                        return item.day === (0, common_2.convertDayToWeekDay)(day);
                    })[0];
                    if (newDayScheduleEntity) {
                        newDayScheduleEntity.from = moment
                            .utc(newDayScheduleEntity.from, 'HH:mm:ss')
                            .utcOffset(workScheduleEntity.utcOffset)
                            .format('HH:mm:ssZ');
                        newDayScheduleEntity.to = moment
                            .utc(newDayScheduleEntity.to, 'HH:mm:ss')
                            .utcOffset(workScheduleEntity.utcOffset * 60)
                            .format('HH:mm:ssZ');
                    }
                    return {
                        date: day,
                        workScheduleEntity: [
                            {
                                id: workScheduleEntity.id,
                                name: workScheduleEntity.name,
                                color: workScheduleEntity.color,
                                daySchedules: newDayScheduleEntity
                                    ? {
                                        id: newDayScheduleEntity.id,
                                        from: moment
                                            .utc(newDayScheduleEntity.from, 'HH:mm:ss')
                                            .utcOffset(workScheduleEntity.utcOffset)
                                            .format('HH:mm:ssZ'),
                                        to: moment
                                            .utc(newDayScheduleEntity.to, 'HH:mm:ss')
                                            .utcOffset(workScheduleEntity.utcOffset)
                                            .format('HH:mm:ssZ'),
                                    }
                                    : null,
                                assignees: Object.entries(assignees || {})
                                    .slice(0, 5)
                                    .reduce((result, [key, value]) => {
                                    result[key] = value;
                                    return result;
                                }, {}),
                                assigneesCount: Object.values(assignees).reduce((acc, arr) => acc + 1, 0),
                                groupAssignees: Object.entries(groupAssignees || {})
                                    .slice(0, 5)
                                    .reduce((result, [key, value]) => {
                                    result[key] = value;
                                    return result;
                                }, {}),
                                groupAssigneesCount: Object.values(groupAssignees).reduce((acc, arr) => acc + 1, 0),
                            },
                        ],
                    };
                }
                return {
                    date: day,
                    workScheduleEntity: [
                        {
                            id: workScheduleEntity.id,
                            name: workScheduleEntity.name,
                            color: workScheduleEntity.color,
                            daySchedules: null,
                            assignees: Object.entries(assignees || {})
                                .slice(0, 5)
                                .reduce((result, [key, value]) => {
                                result[key] = value;
                                return result;
                            }, {}),
                            assigneesCount: Object.values(assignees).reduce((acc, arr) => acc + 1, 0),
                            groupAssignees: Object.entries(groupAssignees || {})
                                .slice(0, 5)
                                .reduce((result, [key, value]) => {
                                result[key] = value;
                                return result;
                            }, {}),
                            groupAssigneesCount: Object.values(groupAssignees).reduce((acc, arr) => acc + 1, 0),
                        },
                    ],
                };
            });
            return new dto_1.PaginationResponseDto({
                paginationDto: {
                    take,
                    page,
                    isSelectAll: false,
                },
                itemCount: listDayBetweenStartEnd.length,
                data: result,
            });
        }
        catch (err) {
            console.error('Error getting work schedule:', err);
            const result = listDays.map(day => {
                return { date: day, workScheduleEntity: [] };
            });
            return new dto_1.PaginationResponseDto({
                paginationDto: {
                    take,
                    page,
                    isSelectAll: false,
                },
                itemCount: listDayBetweenStartEnd.length,
                data: result,
            });
        }
    }
    async handleGetAllWorkScheduleFromToDate({ companyId, startDate, endDate, query, }) {
        const listDayBetweenStartEnd = startDate && endDate
            ? (0, common_2.getDaysBetweenDates)(startDate, endDate)
            : (0, common_2.getCurrentWeek)();
        const { take, page, isSelectAll, employeeIds } = query;
        const listDates = !isSelectAll
            ? (0, common_2.paginateArray)(listDayBetweenStartEnd, page, take)
            : listDayBetweenStartEnd;
        const listWorkSchedules = await this.getAllWorkScheduleOfManyEmployeesInDateRange({
            companyId,
            listDates,
            employeeIds: employeeIds ?? [],
        });
        if (!listWorkSchedules) {
            const result = listDates.map(day => ({
                date: day,
                workScheduleEntity: [],
            }));
            return new dto_1.PaginationResponseDto({
                paginationDto: {
                    take,
                    page,
                    isSelectAll: false,
                },
                itemCount: listDayBetweenStartEnd.length,
                data: result,
            });
        }
        const result = listDates.map(day => {
            const workScheduleEntity = listWorkSchedules[day];
            const workScheduleMap = workScheduleEntity?.map(ws => {
                const assignees = ws.assignees;
                const groupAssignees = ws.groupAssignees;
                if (ws?.daySchedules?.length > 0) {
                    const newDayScheduleEntity = ws?.daySchedules.filter(item => item.day === (0, common_2.convertDayToWeekDay)(day))[0];
                    return {
                        id: ws.id,
                        name: ws.name,
                        daySchedules: newDayScheduleEntity
                            ? {
                                id: newDayScheduleEntity.id,
                                from: moment
                                    .utc(newDayScheduleEntity.from, 'HH:mm:ss')
                                    .utcOffset(ws.utcOffset)
                                    .format('HH:mm:ssZ'),
                                to: moment
                                    .utc(newDayScheduleEntity.to, 'HH:mm:ss')
                                    .utcOffset(ws.utcOffset)
                                    .format('HH:mm:ssZ'),
                            }
                            : null,
                        color: ws.color,
                        assignees: Object.entries(assignees || {})
                            .slice(0, 5)
                            .reduce((result, [key, value]) => {
                            result[key] = value;
                            return result;
                        }, {}),
                        assigneesCount: Object.values(assignees).reduce((acc, arr) => acc + 1, 0),
                        groupAssignees: Object.entries(groupAssignees || {})
                            .slice(0, 5)
                            .reduce((result, [key, value]) => {
                            result[key] = value;
                            return result;
                        }, {}),
                        groupAssigneesCount: Object.values(groupAssignees).reduce((acc, arr) => acc + 1, 0),
                    };
                }
                return {
                    id: ws.id,
                    name: ws.name,
                    daySchedules: null,
                    color: ws?.color,
                    assignees: Object.entries(assignees || {})
                        .slice(0, 5)
                        .reduce((result, [key, value]) => {
                        result[key] = value;
                        return result;
                    }, {}),
                    assigneesCount: Object.values(assignees).reduce((acc, arr) => acc + 1, 0),
                    groupAssignees: Object.entries(groupAssignees || {})
                        .slice(0, 5)
                        .reduce((result, [key, value]) => {
                        result[key] = value;
                        return result;
                    }, {}),
                    groupAssigneesCount: Object.values(groupAssignees).reduce((acc, arr) => acc + 1, 0),
                };
            });
            return { date: day, workScheduleEntity: workScheduleMap ?? [] };
        });
        result.map(item => {
            const workSchedules = item.workScheduleEntity;
            const mergedWorkSchedules = workSchedules.reduce((acc, current) => {
                const existingItem = acc.find(item => item.id === current.id);
                if (existingItem) {
                    existingItem.assignees = {
                        ...existingItem.assignees,
                        ...current.assignees,
                    };
                    existingItem.groupAssignees = {
                        ...existingItem.groupAssignees,
                        ...current.groupAssignees,
                    };
                }
                else {
                    acc.push(current);
                }
                return acc;
            }, []);
            return {
                ...item,
                workScheduleEntity: mergedWorkSchedules,
            };
        });
        return new dto_1.PaginationResponseDto({
            paginationDto: {
                take,
                page,
                isSelectAll: false,
            },
            itemCount: listDayBetweenStartEnd.length,
            data: result,
        });
    }
    async checkInDefaultWorkSchedule(companyId, checkInDefaultWorkScheduleDto) {
        const { employeeIds = [], orgIds = [] } = checkInDefaultWorkScheduleDto;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.default`,
        ])
            .where(`${workScheduleAlias}.default = :default`, { default: true })
            .andWhere(`${workScheduleAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        const workScheduleDefault = await queryBuilder.getOne();
        if (!workScheduleDefault) {
            throw new Error('Default work schedule not found');
        }
        const assigneesArray = Object.entries(workScheduleDefault.assignees).map(([key, value]) => ({
            employeeId: Number(key),
            ...value,
        }));
        const groupAssigneesArray = Object.entries(workScheduleDefault?.groupAssignees).map(([key, value]) => ({
            orgPath: key,
            ...value,
        }));
        let existingEmployees = [];
        if (employeeIds.length > 0) {
            existingEmployees = assigneesArray.filter(assignee => employeeIds.includes(assignee.employeeId));
        }
        let existingGroups = [];
        if (orgIds.length > 0) {
            existingGroups = groupAssigneesArray.filter(groupAssignee => orgIds.includes(groupAssignee.id));
        }
        return {
            employees: existingEmployees ? existingEmployees : [],
            groups: existingGroups ? existingGroups : [],
            workScheduleDefaultId: workScheduleDefault?.id,
        };
    }
    async getDetailESSWorkSchedule(args) {
        const { companyId, workScheduleId } = args;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const daySchedulesAlias = database_1.ETableName.DAY_SCHEDULE;
        const queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.name`,
            `${workScheduleAlias}.color`,
            `${workScheduleAlias}.startDate`,
            `${workScheduleAlias}.endDate`,
            `${workScheduleAlias}.isDeleted`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.default`,
            `${workScheduleAlias}.utcOffset`,
            `${workScheduleAlias}.publishHistories`,
            `${workScheduleAlias}.state`,
            `${daySchedulesAlias}.id`,
            `${daySchedulesAlias}.isDeleted`,
            `${daySchedulesAlias}.createdBy`,
            `${daySchedulesAlias}.createdOn`,
            `${daySchedulesAlias}.updatedBy`,
            `${daySchedulesAlias}.updatedOn`,
            `${daySchedulesAlias}.day`,
            `${daySchedulesAlias}.from`,
            `${daySchedulesAlias}.to`,
            `${daySchedulesAlias}.duration`,
            `${daySchedulesAlias}.unitTime`,
            `${daySchedulesAlias}.companyId`,
            `${daySchedulesAlias}.workScheduleId`,
        ])
            .leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, daySchedulesAlias, `${daySchedulesAlias}.isDeleted = :isDeleted AND ${daySchedulesAlias}.work_schedule_id = :workScheduleId`, { isDeleted: false, workScheduleId })
            .andWhere(`${workScheduleAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${workScheduleAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        const workScheduleDetail = await queryBuilder.getOne();
        if (!workScheduleDetail) {
            return null;
        }
        const getAssigneeAndCount = this.countAndGetFirstFiveObjects(workScheduleDetail.assignees);
        const groupAssignees = this.countAndGetFirstFiveObjects(workScheduleDetail.groupAssignees);
        const { daySchedules, utcOffset, publishHistories } = workScheduleDetail;
        const formatDaySchedules = daySchedules?.map(item => {
            item.from = moment
                .utc(item.from, 'HH:mm:ss')
                .utcOffset(utcOffset)
                .format('HH:mm:ssZ');
            item.to = moment
                .utc(item.to, 'HH:mm:ss')
                .utcOffset(utcOffset * 60)
                .format('HH:mm:ssZ');
            return item;
        });
        let newestPublishHistoryTime = null;
        let publishInfo = null;
        if (publishHistories.length) {
            newestPublishHistoryTime =
                publishHistories?.[publishHistories.length - 1];
            publishInfo = {
                publisher: newestPublishHistoryTime?.updatedBy || '',
                publishedTime: moment(newestPublishHistoryTime?.updatedOn).format('YYYY-MM-DD HH:mm:ss') || '',
            };
        }
        const workScheduleDetailReturned = {
            id: workScheduleDetail.id,
            name: workScheduleDetail.name,
            color: workScheduleDetail.color,
            startDate: workScheduleDetail.startDate,
            endDate: workScheduleDetail.endDate,
            isDeleted: workScheduleDetail.isDeleted,
            state: workScheduleDetail.state,
            assignees: getAssigneeAndCount.firstFiveObjects,
            assigneesCount: getAssigneeAndCount.totalCount,
            groupAssignees: groupAssignees.firstFiveObjects,
            groupAssigneesCount: groupAssignees.totalCount,
            daySchedules: formatDaySchedules,
            publisher: publishInfo?.publisher || null,
            publishedTime: publishInfo?.publishedTime || null,
        };
        return workScheduleDetailReturned;
    }
    countAndGetFirstFiveObjects(jsonData) {
        const totalCount = Object.keys(jsonData).length;
        const firstFiveObjects = Object.fromEntries(Object.entries(jsonData).slice(0, 5));
        return {
            totalCount,
            firstFiveObjects,
        };
    }
    getScheduleForDate(date, daySchedules) {
        const dayString = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getUTCDay()];
        return daySchedules.find(schedule => schedule.day === dayString) || null;
    }
    async getAllWorkScheduleOfGroupByOrgId({ companyId, orgId, }) {
        const workSchedules = await this.getWorkScheduleIdByCompanyId(companyId);
        const groupWorkSchedules = await Promise.all(workSchedules?.map(async (workSchedule) => {
            const assignees = await this.getGroupAssigneesOfWorkScheduleWithoutPagination({
                workScheduleId: workSchedule.id,
                companyId,
            });
            const groupAssignee = assignees.find(assignee => assignee.id === orgId);
            if (groupAssignee) {
                const belongsToGroup = !!(groupAssignee.parentId && groupAssignee.parentGroupName);
                return {
                    workScheduleId: workSchedule.id,
                    workScheduleName: workSchedule.name,
                    state: workSchedule.state,
                    parentId: belongsToGroup ? groupAssignee.parentId : undefined,
                    parentGroupName: belongsToGroup
                        ? groupAssignee.parentGroupName
                        : undefined,
                };
            }
            return null;
        }));
        return groupWorkSchedules.filter(Boolean);
    }
    async getAllWorkScheduleOfEmployeeByEmployeeId({ companyId, employeeId, }) {
        const workSchedules = await this.getWorkScheduleIdByCompanyId(companyId);
        const employeeWorkSchedules = await Promise.all(workSchedules?.map(async (workSchedule) => {
            const assignees = await this.getAssigneesOfWorkScheduleWithoutPagination({
                workScheduleId: workSchedule.id,
                companyId,
            });
            const employeeAssignee = assignees.find(assignee => assignee.employeeId === employeeId);
            if (employeeAssignee) {
                const belongsToGroup = !!(employeeAssignee.groupId && employeeAssignee.groupName);
                return {
                    workScheduleId: workSchedule.id,
                    workScheduleName: workSchedule.name,
                    state: workSchedule.state,
                    groupId: belongsToGroup ? employeeAssignee.groupId : undefined,
                    groupName: belongsToGroup ? employeeAssignee.groupName : undefined,
                    startDate: workSchedule.startDate,
                    endDate: workSchedule.endDate,
                    default: workSchedule.default,
                };
            }
            return null;
        }));
        return employeeWorkSchedules.filter(Boolean);
    }
    getWorkScheduleQueryBuilder(args, options) {
        const { select = [
            'id',
            'assignees',
            'groupAssignees',
            'publishHistories',
            'ttWorkScheduleId',
            'name',
            'color',
            'breakType',
            'utcOffset',
            'workArrangement',
            'excludeEarlyClockIn',
            'weeklyHours',
            'publishType',
            'startDate',
            'endDate',
            'state',
            'default',
        ], query, parameters, } = args;
        const { autoDeduction, break: breakRule, daySchedule = true, } = options || {};
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const autoDeductionAlias = database_1.ETableName.AUTO_DEDUCTION;
        const breakRuleAlias = database_1.ETableName.BREAK;
        const dayScheduleAlias = database_1.ETableName.DAY_SCHEDULE;
        const fields = select.map(field => `${workScheduleAlias}.${field}`);
        let queryBuilder = this.workScheduleRepository
            .createQueryBuilder(workScheduleAlias)
            .select(fields);
        if (autoDeduction) {
            queryBuilder = queryBuilder.leftJoinAndSelect(`${workScheduleAlias}.autoDeductions`, autoDeductionAlias, `${autoDeductionAlias}.isDeleted = :isDeleted AND ${autoDeductionAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false });
        }
        if (breakRule) {
            queryBuilder = queryBuilder.leftJoinAndSelect(`${workScheduleAlias}.breaks`, breakRuleAlias, `${breakRuleAlias}.isDeleted = :isDeleted AND ${breakRuleAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false });
        }
        if (daySchedule) {
            queryBuilder = queryBuilder.leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, dayScheduleAlias, `${dayScheduleAlias}.isDeleted = :isDeleted AND ${dayScheduleAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false });
        }
        return queryBuilder.where(query, parameters);
    }
    async getAllPublishedGroupWorkScheduleOfEmployee(employeeId, companyId) {
        const employee = await this.employeeService.getEmployeeById(companyId, employeeId, {
            select: {
                orgPath: true,
            },
        });
        if (!employee) {
            return [];
        }
        const groupIds = employee.orgPath
            ?.split('/')
            .map(id => parseInt(id, 10))
            .filter(Boolean)
            .reverse() || [];
        const rootGroup = await this.organizationStructureService.orgStructureRepository.findOne({
            where: { parentId: 0, companyId, isDeleted: false },
            select: { id: true },
        });
        if (rootGroup) {
            groupIds.push(rootGroup.id);
        }
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const allWorkSchedules = (await this.getWorkScheduleQueryBuilder({
            query: `
          ${workScheduleAlias}.isDeleted = :isDeleted
          AND ${workScheduleAlias}.companyId = :companyId
          AND ${workScheduleAlias}.state = :state
        `,
            parameters: {
                companyId,
                isDeleted: false,
                state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
            },
        }).getMany()) || [];
        const groupWorkSchedules = allWorkSchedules.filter(item => {
            if ((0, utils_1.isEmptyObject)(item.groupAssignees))
                return false;
            const groupAssigneeIds = Object.values(item.groupAssignees).map(item => item.id);
            const theClosestGroup = groupIds.find(id => groupAssigneeIds.includes(id));
            return !!theClosestGroup;
        });
        return groupWorkSchedules;
    }
    getOldestLatestWorkSchedule(workSchedules, type) {
        let updatedOn = null;
        let workSchedule = null;
        workSchedules.forEach(schedule => {
            schedule.publishHistories.forEach(history => {
                const condition = !updatedOn ||
                    (type === 'latest'
                        ? new Date(history.updatedOn) > new Date(updatedOn)
                        : new Date(history.updatedOn) < new Date(updatedOn));
                if (condition) {
                    updatedOn = history.updatedOn;
                    workSchedule = schedule;
                }
            });
        });
        return workSchedule;
    }
    getMainWorkScheduleInDate(date, workSchedules) {
        if (workSchedules.length === 0)
            return null;
        const defaultWorkSchedule = workSchedules.find(item => item.default);
        const activeWorkSchedules = workSchedules.filter(schedule => {
            return (!schedule.default &&
                schedule.state === work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED &&
                moment(date).isBetween(schedule.startDate, schedule.endDate, null, '[]'));
        });
        if (activeWorkSchedules.length === 0)
            return null;
        const publishNewAndOverrideWorkSchedules = [];
        const publishNewWorkSchedules = [];
        activeWorkSchedules.forEach(schedule => {
            switch (schedule.publishType) {
                case work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_PUBLISH_NEW:
                    publishNewWorkSchedules.push(schedule);
                    break;
                case work_schedule_publish_type_enum_1.EWorkSchedulePublishType.PUBLISH_NEW_AND_OVERRIDE:
                    publishNewAndOverrideWorkSchedules.push(schedule);
                    break;
                default:
            }
        });
        if (publishNewAndOverrideWorkSchedules.length > 0) {
            return this.getOldestLatestWorkSchedule(publishNewAndOverrideWorkSchedules, 'latest');
        }
        if (publishNewWorkSchedules.length > 0) {
            return this.getOldestLatestWorkSchedule(publishNewWorkSchedules, 'oldest');
        }
        if (defaultWorkSchedule) {
            return defaultWorkSchedule;
        }
        return null;
    }
    getGroupWorkScheduleOfEmployeeOnGivenWorkSchedules(employee, workSchedules, rootGroupId) {
        if (!employee) {
            return [];
        }
        const groupIds = employee.orgPath
            ?.split('/')
            .map(id => parseInt(id, 10))
            .filter(Boolean)
            .reverse() || [];
        if (rootGroupId) {
            groupIds.push(rootGroupId);
        }
        const groupWorkSchedules = workSchedules.filter(item => {
            if ((0, utils_1.isEmptyObject)(item.groupAssignees))
                return false;
            const groupAssigneeIds = Object.values(item.groupAssignees).map(item => item.id);
            const theClosestGroup = groupIds.find(id => groupAssigneeIds.includes(id));
            return !!theClosestGroup;
        });
        return groupWorkSchedules;
    }
    async getAllWorkScheduleOfManyEmployeesInDateRange(params) {
        const { employeeIds, companyId, listDates, groupByEmployee } = params;
        const startDate = listDates[0];
        const endDate = listDates[listDates.length - 1];
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const allWorkSchedules = await this.getWorkScheduleQueryBuilder({
            query: `${workScheduleAlias}.isDeleted = :isDeleted
        AND ${workScheduleAlias}.companyId = :companyId
        AND ${workScheduleAlias}.state = :state
        AND (
          ${workScheduleAlias}.default = :default
          OR (
            ${workScheduleAlias}.default = :noDefault
            AND ${workScheduleAlias}.startDate <= :endDate
            AND ${workScheduleAlias}.endDate >= :startDate
          )
        )`,
            parameters: {
                companyId,
                isDeleted: false,
                state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
                startDate,
                endDate,
                default: true,
                noDefault: false,
            },
        }).getMany();
        const allEmployees = employeeIds.length
            ? await this.employeeService.getEmployeeByIds(employeeIds, {
                relations: [],
                select: {
                    id: true,
                    orgPath: true,
                },
            })
            : await this.employeeService.getAllEmployee(companyId, {
                relations: [],
                select: {
                    id: true,
                    orgPath: true,
                },
            });
        console.log({ allEmployees: allEmployees.length });
        const workScheduleByDate = {};
        await Promise.all(allEmployees.map(async (employee) => {
            let workScheduleAssignmentByDate = {};
            try {
                workScheduleAssignmentByDate =
                    await this.workScheduleAssignmentService.getWorkScheduleOfEmployeeMultipleDate({ employeeId: employee.id, date: listDates, companyId });
            }
            catch (error) {
                console.log('[ERROR] getWorkScheduleOfEmployeeMultipleDate: ', error.message);
            }
            const rootGroup = await this.organizationStructureService.orgStructureRepository.findOne({
                where: { parentId: 0, companyId, isDeleted: false },
                select: { id: true },
            });
            const groupWorkSchedules = this.getGroupWorkScheduleOfEmployeeOnGivenWorkSchedules(employee, allWorkSchedules, rootGroup?.id);
            const groupWorkScheduleIds = groupWorkSchedules.map(item => item.id);
            const assignedWorkSchedules = allWorkSchedules.filter(workSchedule => !groupWorkScheduleIds.includes(workSchedule.id) &&
                Object.keys(workSchedule.assignees).includes(employee.id.toString()));
            const workSchedules = [...groupWorkSchedules, ...assignedWorkSchedules];
            const uniqueWorkScheduleIds = new Set();
            listDates.forEach(date => {
                const workScheduleList = workScheduleByDate[date] || [];
                if (workScheduleAssignmentByDate[date]) {
                    if (!uniqueWorkScheduleIds.has(workScheduleAssignmentByDate[date].id)) {
                        workScheduleList.push(workScheduleAssignmentByDate[date]);
                        uniqueWorkScheduleIds.add(workScheduleAssignmentByDate[date].id);
                    }
                }
                else {
                    const workSchedule = this.getMainWorkScheduleInDate(date, workSchedules);
                    if (workSchedule && !uniqueWorkScheduleIds.has(workSchedule.id)) {
                        workScheduleList.push(workSchedule);
                        uniqueWorkScheduleIds.add(workSchedule.id);
                    }
                }
                workScheduleByDate[date] = workScheduleList;
            });
        }));
        return workScheduleByDate;
    }
    async getWorkScheduleOfManyEmployeesInDateRange(params) {
        const { employeeIds, companyId, startDate, groupByEmployee } = params;
        const endDate = params.endDate || startDate;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        if (employeeIds.length === 0) {
            throw new common_1.BadRequestException('No employees');
        }
        const allWorkSchedules = await this.getWorkScheduleQueryBuilder({
            query: `${workScheduleAlias}.isDeleted = :isDeleted
        AND ${workScheduleAlias}.companyId = :companyId
        AND ${workScheduleAlias}.state = :state
        AND (
          ${workScheduleAlias}.default = :default
          OR (
            ${workScheduleAlias}.default = :noDefault
            AND ${workScheduleAlias}.startDate <= :endDate
            AND ${workScheduleAlias}.endDate >= :startDate
          )
        )`,
            parameters: {
                companyId,
                isDeleted: false,
                state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
                startDate,
                endDate,
                default: true,
                noDefault: false,
            },
        }).getMany();
        const allEmployees = await this.employeeService.getEmployeeByIds(employeeIds, {
            relations: [],
            select: {
                id: true,
                orgPath: true,
            },
        });
        const listDates = (0, common_2.getDaysBetweenDates)(startDate, endDate);
        const workScheduleByDate = {};
        const workScheduleByEmployee = {};
        await Promise.all(allEmployees.map(async (employee) => {
            let workScheduleAssignmentByDate = {};
            try {
                workScheduleAssignmentByDate =
                    await this.workScheduleAssignmentService.getWorkScheduleOfEmployeeMultipleDate({ employeeId: employee.id, date: listDates, companyId });
            }
            catch (error) {
                console.log('[ERROR] getWorkScheduleOfEmployeeMultipleDate: ', error.message);
            }
            const rootGroup = await this.organizationStructureService.orgStructureRepository.findOne({
                where: { parentId: 0, companyId, isDeleted: false },
                select: { id: true },
            });
            const groupWorkSchedules = this.getGroupWorkScheduleOfEmployeeOnGivenWorkSchedules(employee, allWorkSchedules, rootGroup?.id);
            const groupWorkScheduleIds = groupWorkSchedules.map(item => item.id);
            const assignedWorkSchedules = allWorkSchedules.filter(workSchedule => !groupWorkScheduleIds.includes(workSchedule.id) &&
                Object.keys(workSchedule.assignees).includes(employee.id.toString()));
            const workSchedules = [...groupWorkSchedules, ...assignedWorkSchedules];
            listDates.forEach(date => {
                if (workScheduleAssignmentByDate[date]) {
                    if (groupByEmployee) {
                        (0, set_util_1.set)(workScheduleByEmployee, `${employee.id}.${date}`, workScheduleAssignmentByDate[date]);
                    }
                    else {
                        (0, set_util_1.set)(workScheduleByDate, `${date}.${employee.id}`, workScheduleAssignmentByDate[date]);
                    }
                    return;
                }
                const workSchedule = this.getMainWorkScheduleInDate(date, workSchedules);
                if (workSchedule) {
                    if (groupByEmployee) {
                        (0, set_util_1.set)(workScheduleByEmployee, `${employee.id}.${date}`, workSchedule);
                    }
                    else {
                        (0, set_util_1.set)(workScheduleByDate, `${date}.${employee.id}`, workSchedule);
                    }
                }
            });
        }));
        return groupByEmployee ? workScheduleByEmployee : workScheduleByDate;
    }
    async getWorkScheduleOfEmployeeInDateRange(params) {
        const { employeeId, companyId, startDate } = params;
        const endDate = params.endDate || startDate;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const groupWorkSchedules = await this.getAllPublishedGroupWorkScheduleOfEmployee(employeeId, companyId);
        const ws = await this.getWorkScheduleQueryBuilder({
            query: `${workScheduleAlias}.isDeleted = :isDeleted
        AND ${workScheduleAlias}.companyId = :companyId
        AND ${workScheduleAlias}.state = :state`,
            parameters: {
                employeeId: employeeId.toString(),
                companyId,
                isDeleted: false,
                state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
            },
        }).getMany();
        const assignedWorkSchedules = ws.filter(item => !!item.assignees?.[employeeId]);
        const workSchedules = [...groupWorkSchedules, ...assignedWorkSchedules];
        const listDates = (0, common_2.getDaysBetweenDates)(startDate, endDate);
        let workScheduleAssignmentByDate = {};
        try {
            workScheduleAssignmentByDate =
                await this.workScheduleAssignmentService.getWorkScheduleOfEmployeeMultipleDate({ employeeId, date: listDates, companyId });
        }
        catch (error) {
            console.error('[ERROR] getWorkScheduleOfEmployeeInDateRange: ', error);
        }
        const workScheduleByDate = {};
        listDates.forEach(date => {
            if (workScheduleAssignmentByDate[date]) {
                workScheduleByDate[date] = workScheduleAssignmentByDate[date];
                return;
            }
            const workSchedule = this.getMainWorkScheduleInDate(date, workSchedules);
            if (workSchedule) {
                workScheduleByDate[date] = workSchedule;
            }
        });
        return workScheduleByDate;
    }
    async getAllWorkSchedulePublishedForWsAssignment(companyId) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const dayScheduleAlias = database_1.ETableName.DAY_SCHEDULE;
        const queryBuilder = this.workScheduleRepository.createQueryBuilder(workScheduleAlias);
        queryBuilder
            .where(`${workScheduleAlias}.company_id = :companyId`, { companyId })
            .leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, dayScheduleAlias)
            .andWhere(`${workScheduleAlias}.is_deleted = :isDeleted`, {
            isDeleted: false,
        })
            .andWhere(`${workScheduleAlias}.state = :state`, {
            state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
        });
        queryBuilder.select([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.name`,
            `${workScheduleAlias}.default`,
            `${workScheduleAlias}.color`,
            `${workScheduleAlias}.startDate`,
            `${workScheduleAlias}.endDate`,
            `${workScheduleAlias}.state`,
            `${workScheduleAlias}.created_on`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.utcOffset`,
            `${workScheduleAlias}.publishType`,
            `${workScheduleAlias}.publishHistories`,
            `${dayScheduleAlias}.id`,
            `${dayScheduleAlias}.day`,
            `${dayScheduleAlias}.from`,
            `${dayScheduleAlias}.to`,
        ]);
        const workSchedules = await queryBuilder.getMany();
        const newWorkSchedule = workSchedules.map(ws => {
            const listOrganizationPaths = Object.keys(ws.groupAssignees) || [];
            return {
                ...ws,
                listOrganizationPaths,
            };
        });
        return newWorkSchedule;
    }
    async checkIsExistedWsDefaultAtFirstTime(args) {
        const { companyId } = args;
        const workSchedule = await this.workScheduleRepository.findOne({
            where: {
                companyId,
                default: true,
                isDeleted: false,
            },
        });
        if (!workSchedule) {
            try {
                const createWorkScheduleBody = {
                    name: 'Work Schedule Default',
                    utcOffset: 7,
                    workArrangement: common_2.WorkArrangement.FIXED,
                    default: true,
                    daySchedules: [
                        {
                            day: common_2.DayType.Mon,
                            from: '02:00:00 +00:00',
                            to: '10:00:00 +00:00',
                            duration: 0,
                            unitTime: common_2.UnitTime.MINUTE,
                        },
                        {
                            day: common_2.DayType.Tue,
                            from: '02:00:00 +00:00',
                            to: '10:00:00 +00:00',
                            duration: 0,
                            unitTime: common_2.UnitTime.MINUTE,
                        },
                        {
                            day: common_2.DayType.Wed,
                            from: '02:00:00 +00:00',
                            to: '10:00:00 +00:00',
                            duration: 0,
                            unitTime: common_2.UnitTime.MINUTE,
                        },
                        {
                            day: common_2.DayType.Thu,
                            from: '02:00:00 +00:00',
                            to: '10:00:00 +00:00',
                            duration: 0,
                            unitTime: common_2.UnitTime.MINUTE,
                        },
                        {
                            day: common_2.DayType.Fri,
                            from: '02:00:00 +00:00',
                            to: '10:00:00 +00:00',
                            duration: 0,
                            unitTime: common_2.UnitTime.MINUTE,
                        },
                    ],
                    unitTime: common_2.UnitTime.MINUTE,
                    excludeEarlyClockIn: true,
                    breakType: common_2.BreakType.Paid,
                    breaks: [],
                    autoDeductions: [],
                    overtime: {
                        endWorkDayAt: '17:00:00 +00:00',
                        timeRangeStyle: common_2.TimeRangeStyle.Hour,
                    },
                    color: '#ff6600',
                    state: work_schedule_state_enum_1.EWorkScheduleState.PUBLISHED,
                    locations: [],
                };
                const workScheduleDefault = await this.handleCreateWorkScheduleLeave(createWorkScheduleBody, companyId, 'system@hrforte.com');
                if (workScheduleDefault) {
                    const employeeList = await this.employeeService.getAllEmployeeByCompanyId(companyId);
                    const assigneesDto = employeeList.reduce((acc, employee) => {
                        acc[employee.id] = {
                            employeeRef: employee.employeeRef,
                            employeeNo: employee.employeeNo,
                            email: employee.email,
                            fullNameLocal: employee.fullNameLocal,
                            fullNameEn: employee.fullNameEn,
                        };
                        return acc;
                    }, {});
                    await this.updateAddAssigneesOfWorkSchedule(workScheduleDefault.workScheduleEntity.id, assigneesDto, companyId, 'system@hrforte.com');
                }
                return false;
            }
            catch (error) {
                console.error('[ERROR] Create work schedule first time fail', error);
            }
        }
        return true;
    }
};
exports.WorkScheduleService = WorkScheduleService;
exports.WorkScheduleService = WorkScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(database_1.WorkScheduleEntity)),
    __param(15, (0, config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService,
        typeorm_2.Repository,
        auto_deduction_service_1.AutoDeductionService,
        break_rule_service_1.BreakRuleService,
        day_schedule_service_1.DayScheduleService,
        location_work_schedule_service_1.LocationWorkScheduleService,
        company_mapping_service_1.CompanyMappingService,
        employee_service_1.EmployeeService,
        organization_structure_service_1.OrganizationStructureService,
        work_schedule_assignment_service_1.WorkScheduleAssignmentService,
        schedule_1.SchedulerRegistry,
        producers_1.LeaveWorkScheduleProducer,
        employee_mapping_service_1.EmployeeMappingService,
        group_mapping_service_1.GroupMappingService,
        producers_1.HrforteNotificationProducer, Object])
], WorkScheduleService);
//# sourceMappingURL=work-schedule.service.js.map
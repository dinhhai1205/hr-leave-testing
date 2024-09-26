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
exports.WorkScheduleAssignmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const chunk_array_util_1 = require("../../../../common/utils/chunk-array.util");
const config_1 = require("../../../../config");
const database_1 = require("../../../../core/database");
const work_schedule_assignment_entity_1 = require("../../../../core/database/entities/work-schedule-assignment.entity");
const producers_1 = require("../../../../core/queue/producers");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const normalize_date_1 = require("../../common/utils/normalize-date");
const work_schedule_publish_type_enum_1 = require("../work-schedule/enums/work-schedule-publish-type.enum");
const work_schedule_state_enum_1 = require("../work-schedule/enums/work-schedule-state.enum");
const work_schedule_service_1 = require("../work-schedule/work-schedule.service");
const work_schedule_assignment_hrforte_notification_mapper_1 = require("./mappers/work-schedule-assignment-hrforte-notification.mapper");
let WorkScheduleAssignmentService = class WorkScheduleAssignmentService extends database_1.TypeOrmBaseService {
    constructor(workScheduleAssignmentRepository, workScheduleAssignmentProducer, employeeService, hrforteNotificationProducer, workScheduleService, appConfig) {
        super(workScheduleAssignmentRepository);
        this.workScheduleAssignmentRepository = workScheduleAssignmentRepository;
        this.workScheduleAssignmentProducer = workScheduleAssignmentProducer;
        this.employeeService = employeeService;
        this.hrforteNotificationProducer = hrforteNotificationProducer;
        this.workScheduleService = workScheduleService;
        this.appConfig = appConfig;
    }
    async createManyWSAssignments(args) {
        const { assignments, userEmail, companyId } = args;
        return this.createMulti(assignments, {
            userEmail,
            companyId,
        });
    }
    async assignWorkScheduleToMultipleEmployees({ employeeIds, companyId, workScheduleId, specificDates, batchSize = 300, userEmail, }) {
        const normalizedDates = specificDates.map(date => moment(date).startOf('day').toDate());
        const existingAssignments = await this.workScheduleAssignmentRepository.find({
            where: {
                employeeId: (0, typeorm_2.In)(employeeIds),
                date: (0, typeorm_2.In)(normalizedDates.map(date => (0, normalize_date_1.normalizeDate)(date))),
                companyId,
                isDeleted: false,
            },
        });
        const assigneeIds = [];
        const assignmentsByEmployee = {};
        existingAssignments.forEach(assignment => {
            if (!assignmentsByEmployee[assignment.employeeId]) {
                assignmentsByEmployee[assignment.employeeId] = [];
            }
            assignmentsByEmployee[assignment.employeeId].push(assignment.date);
        });
        const allNewAssignments = [];
        for (const employeeId of employeeIds) {
            const existingAssignmentDates = assignmentsByEmployee[employeeId] || [];
            const datesToAssign = specificDates.filter(date => !existingAssignmentDates.some(existingDate => existingDate.getTime() === date.getTime()));
            if (datesToAssign.length > 0) {
                const newAssignments = datesToAssign.map(date => ({
                    companyId: companyId,
                    workScheduleId: workScheduleId,
                    employeeId: employeeId,
                    date: date,
                }));
                allNewAssignments.push(...newAssignments);
                if (!assigneeIds.includes(employeeId)) {
                    assigneeIds.push(employeeId);
                }
            }
        }
        for (let i = 0; i < allNewAssignments.length; i += batchSize) {
            const batch = allNewAssignments.slice(i, i + batchSize);
            this.createManyWSAssignments({
                assignments: batch,
                companyId,
                userEmail,
            });
        }
        return {
            message: 'All assignments have been processed.',
            assigneeIds,
        };
    }
    async deleteAssignmentsOfEmployeeIdsWithWorkScheduleIds(employeeWorkSchedules, companyId, userEmail) {
        const values = employeeWorkSchedules
            .map(e => `(${e.employeeId}, ${e.workScheduleId})`)
            .join(', ');
        if (!values) {
            return;
        }
        await this.workScheduleAssignmentRepository
            .createQueryBuilder()
            .update(work_schedule_assignment_entity_1.WorkScheduleAssignmentEntity)
            .set({
            isDeleted: true,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        })
            .where(`(employeeId, workScheduleId) IN (${values})`)
            .andWhere('companyId = :companyId', { companyId })
            .andWhere('isDeleted = :isDeleted', { isDeleted: false })
            .execute();
    }
    async removeWorkScheduleAssignment(args) {
        const batchUpdateSize = 300;
        const { workScheduleId, companyId, state } = args;
        let workScheduleAssignments = await this.workScheduleAssignmentRepository.find({
            where: { workScheduleId, companyId, isDeleted: false },
        });
        while (workScheduleAssignments.length > 0) {
            const batch = workScheduleAssignments.slice(0, batchUpdateSize);
            let payload = null;
            if (state && state === work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED) {
                payload = {
                    isDeleted: false,
                    isUnpublished: work_schedule_state_enum_1.EWorkScheduleState.UNPUBLISHED ? true : false,
                };
            }
            const removeAllWorkScheduleAssignments = batch.map(item => {
                return this.update(item.id, payload || {
                    isDeleted: true,
                });
            });
            await Promise.all(removeAllWorkScheduleAssignments);
            workScheduleAssignments = workScheduleAssignments.slice(batchUpdateSize);
        }
        return 'Work schedule assignments removed successfully';
    }
    async removeWorkScheduleAssignmentQueue(args) {
        const { workScheduleId, companyId, state } = args;
        await this.workScheduleAssignmentProducer.removeWorkScheduleAssignment(workScheduleId, companyId, state);
    }
    async getOneWorkScheduleAssignment(args) {
        const { workScheduleId, companyId } = args;
        const workScheduleAssignment = await this.workScheduleAssignmentRepository.findOne({
            where: { workScheduleId, companyId, isDeleted: false },
        });
        if (!workScheduleAssignment) {
            throw new common_1.NotFoundException('Work schedule assignment not found');
        }
        return workScheduleAssignment;
    }
    async getManyWorkScheduleAssignments(args) {
        const { workScheduleId, companyId } = args;
        const workScheduleAssignments = await this.workScheduleAssignmentRepository.find({
            where: { workScheduleId, companyId, isDeleted: false },
        });
        if (!workScheduleAssignments.length) {
            throw new common_1.NotFoundException('Work schedule assignment not found');
        }
        return workScheduleAssignments;
    }
    async checkIsRelatedActionsBelongToWorkScheduleAssignment(args) {
        const { workScheduleId, companyId } = args;
        let isExistedAnyRelatedActions = false;
        let relatedAction = '';
        const workScheduleAssignmentsSwapped = await this.workScheduleAssignmentRepository.find({
            where: { workScheduleId, companyId, isDeleted: false, isSwapped: true },
        });
        if (workScheduleAssignmentsSwapped.length) {
            isExistedAnyRelatedActions = true;
            relatedAction = 'swapped';
        }
        return {
            isExistedAnyRelatedActions,
            relatedAction,
        };
    }
    async getWorkScheduleAssignmentByCompanyId(args) {
        const { query, companyId } = args;
        const { startDate, endDate, employeeIds, orgPaths, page = 1, q, take = 20, workScheduleIds, } = query;
        const workSchedules = await this.workScheduleService.getAllWorkSchedulePublishedForWsAssignment(companyId);
        const employees = await this.employeeService.getAllEmployeeByCompanyId(companyId);
        let employeeSchedules = await this.processWorkSchedules(employees, workSchedules, companyId);
        if (employeeIds && employeeIds.length) {
            employeeSchedules = Object.fromEntries(Object.entries(employeeSchedules).filter(([key]) => employeeIds.map(Number).includes(Number(key))));
        }
        if (workScheduleIds && workScheduleIds.length) {
            employeeSchedules = this.filterByWorkScheduleIds(employeeSchedules, workScheduleIds);
        }
        if (orgPaths && orgPaths.length) {
            employeeSchedules = this.filterByOrgPaths(employeeSchedules, orgPaths);
        }
        if (q) {
            employeeSchedules = this.handleSearchAssignment(q, employeeSchedules);
        }
        return this.paginateResults(this.formatEmployeeSchedules(employeeSchedules, workSchedules, new Date(startDate), new Date(endDate)), page, take);
    }
    filterByWorkScheduleIds(employeeSchedules, workScheduleIds) {
        return Object.fromEntries(Object.entries(employeeSchedules)
            .map(([employeeId, employee]) => {
            const filteredSchedules = employee.schedules.filter((schedule) => workScheduleIds.map(Number).includes(schedule.workSchedule.id));
            if (filteredSchedules.length > 0) {
                return [employeeId, { ...employee, schedules: filteredSchedules }];
            }
            return undefined;
        })
            .filter((entry) => entry !== undefined));
    }
    filterByOrgPaths(employeeSchedules, orgPaths) {
        return Object.fromEntries(Object.entries(employeeSchedules)
            .map(([employeeId, employee]) => {
            const filteredSchedules = employee.schedules.filter((schedule) => schedule.workSchedule.listOrganizationPaths.some((path) => orgPaths.includes(path)));
            if (filteredSchedules.length > 0) {
                return [employeeId, { ...employee, schedules: filteredSchedules }];
            }
            return undefined;
        })
            .filter((entry) => entry !== undefined));
    }
    async processWorkSchedules(employees, workSchedules, companyId) {
        const employeeSchedules = {};
        const employeeGroupList = await this.getEmployeeGroupList(workSchedules, companyId);
        const workScheduleDefault = workSchedules.find(ws => ws.default === true) || null;
        employees.forEach(employee => {
            employeeSchedules[employee.id] = {
                id: employee.id,
                email: employee.email,
                fullName: employee.fullNameEn || employee.fullNameLocal,
                employeeRef: employee.employeeRef,
                isExistedInWorkScheduleDefault: this.checkIsInWorkScheduleDefault({
                    employeeId: Number(employee.id),
                    companyId,
                    workScheduleDefault,
                    employeeInGroupList: employeeGroupList[employee.id] || [],
                }),
                schedules: [],
            };
        });
        await Promise.all(workSchedules.map(async (workSchedule) => {
            const assignees = workSchedule.assignees;
            const groupEmployees = employeeGroupList[workSchedule.id] || [];
            const allEmployees = new Set([
                ...Object.keys(assignees),
                ...groupEmployees.map(emp => emp.employeeId),
            ]);
            await Promise.all(Array.from(allEmployees).map(async (employeeId) => {
                if (employeeSchedules[employeeId] &&
                    employeeSchedules[employeeId].isExistedInWorkScheduleDefault ===
                        false) {
                    const existingSchedule = employeeSchedules[employeeId].schedules.find((schedule) => schedule.workSchedule.id === workSchedule.id);
                    if (!existingSchedule) {
                        employeeSchedules[employeeId].schedules.push({
                            workSchedule: {
                                id: workSchedule.id,
                                name: workSchedule.name,
                                color: workSchedule.color,
                                startDate: workSchedule.startDate,
                                endDate: workSchedule.endDate,
                                utcOffset: workSchedule.utcOffset,
                                publishType: workSchedule.publishType,
                                publishHistories: workSchedule.publishHistories,
                                listOrganizationPaths: workSchedule.listOrganizationPaths,
                            },
                            daySchedules: workSchedule.daySchedules,
                        });
                    }
                    else {
                        existingSchedule.workSchedule = {
                            id: workSchedule.id,
                            name: workSchedule.name,
                            color: workSchedule.color,
                            startDate: workSchedule.startDate,
                            endDate: workSchedule.endDate,
                            utcOffset: workSchedule.utcOffset,
                            publishType: workSchedule.publishType,
                            publishHistories: workSchedule.publishHistories,
                            listOrganizationPaths: workSchedule.listOrganizationPaths,
                        };
                        existingSchedule.daySchedules = workSchedule.daySchedules;
                    }
                }
            }));
        }));
        return employeeSchedules;
    }
    async getEmployeeGroupList(workSchedules, companyId) {
        const employeeGroupList = {};
        await Promise.all(workSchedules.map(async (workSchedule) => {
            const groupEmployees = await this.workScheduleService.getAllEmployeesInGroupAndSubGroups(companyId, Object.keys(workSchedule.groupAssignees));
            employeeGroupList[workSchedule.id] = groupEmployees;
        }));
        return employeeGroupList;
    }
    formatEmployeeSchedules(employeeSchedules, workSchedules, startDate, endDate) {
        return Object.values(employeeSchedules).map(employee => ({
            id: employee.id,
            fullName: employee.fullName,
            employeeRef: employee.employeeRef,
            isExistedInWorkScheduleDefault: employee.isExistedInWorkScheduleDefault,
            days: employee.schedules.length === 0
                ? []
                : this.generateDaySchedules(employee.schedules, startDate, endDate, workSchedules),
        }));
    }
    generateDaySchedules(schedules, startDate, endDate, workSchedules) {
        const days = [];
        const currentDate = moment(startDate);
        const end = moment(endDate);
        while (currentDate.isSameOrBefore(end)) {
            const applicableSchedule = this.findApplicableSchedule(schedules, currentDate.toDate(), workSchedules);
            if (applicableSchedule) {
                const dayOfWeek = currentDate.day();
                const daySchedule = applicableSchedule?.daySchedules?.find((ds) => ds.day === this.mapDayOfWeek(dayOfWeek));
                days.push({
                    date: currentDate.format('YYYY-MM-DD'),
                    workSchedule: {
                        id: applicableSchedule.id,
                        name: applicableSchedule.name,
                        color: applicableSchedule.color,
                        startDate: applicableSchedule.startDate,
                        endDate: applicableSchedule.endDate,
                        utcOffset: applicableSchedule.utcOffset,
                        publishType: applicableSchedule.publishType,
                        listOrganizationPaths: applicableSchedule.listOrganizationPaths,
                    },
                    dayScheduleState: daySchedule ? 'Work day' : 'Rest day',
                    startTime: this.formatTime(daySchedule?.from, applicableSchedule.utcOffset) ||
                        null,
                    endTime: this.formatTime(daySchedule?.to, applicableSchedule.utcOffset) ||
                        null,
                });
            }
            currentDate.add(1, 'day');
        }
        return days;
    }
    findApplicableSchedule(schedules, date, workSchedules) {
        if (!schedules.length)
            return [];
        const targetDate = moment(date).startOf('day');
        const listWorkScheduleMatchTargetDate = workSchedules.filter(ws => {
            return targetDate.isBetween(moment(ws.startDate).startOf('day'), moment(ws.endDate).endOf('day'), null, '[]');
        });
        const applicableSchedule = listWorkScheduleMatchTargetDate.reduce((latest, schedule) => {
            if (schedule.publishType ===
                work_schedule_publish_type_enum_1.EWorkSchedulePublishType.PUBLISH_NEW_AND_OVERRIDE) {
                const publishHistory = schedule.publishHistories;
                if (!latest ||
                    moment(publishHistory[publishHistory.length - 1].updatedOn).isAfter(moment(latest.publishHistories[latest.publishHistories.length - 1]
                        .updatedOn))) {
                    return schedule;
                }
            }
            else if (schedule.publishType === work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_PUBLISH_NEW &&
                !latest) {
                return schedule;
            }
            return latest;
        }, null);
        return applicableSchedule;
    }
    handleSearchAssignment(searchString, employeeSchedules) {
        const lowercaseQuery = searchString.toLowerCase();
        return Object.values(employeeSchedules).filter(employee => {
            if (employee.employeeRef.toLowerCase().includes(lowercaseQuery) ||
                employee.fullName.toLowerCase().includes(lowercaseQuery)) {
                return true;
            }
            return false;
        });
    }
    checkIsInWorkScheduleDefault(args) {
        const { employeeId, workScheduleDefault, employeeInGroupList } = args;
        if (!workScheduleDefault) {
            return false;
        }
        const isAssigneeInWorkScheduleDefault = workScheduleDefault.assignees &&
            Object.keys(workScheduleDefault.assignees).includes(String(employeeId));
        const isAssigneeGroupInWorkScheduleDefault = employeeInGroupList.some(emp => emp.employeeId === employeeId);
        return (isAssigneeInWorkScheduleDefault || isAssigneeGroupInWorkScheduleDefault);
    }
    formatTime(time, utcOffset) {
        if (!time) {
            return null;
        }
        return moment
            .utc(time, 'HH:mm:ss')
            .utcOffset(utcOffset)
            .format('HH:mm:ssZ');
    }
    paginateResults(data, page, take) {
        const startIndex = (page - 1) * take;
        const endIndex = startIndex + take;
        const paginatedData = data.slice(startIndex, endIndex);
        return {
            page: +page,
            take: +take,
            itemCount: paginatedData.length,
            pageCount: Math.ceil(data.length / take),
            hasPreviousPage: page > 1,
            hasNextPage: endIndex < data.length,
            data: paginatedData,
        };
    }
    mapDayOfWeek(day) {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return days[day];
    }
    async publishWorkScheduleAssignment(params) {
        const { companyId, userEmail, workScheduleId, assigneeIds, startDate, endDate, } = params;
        const publishType = params?.publishType
            ? params?.publishType
            : work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_PUBLISH_NEW;
        const currentDate = new Date();
        const wsAssignmentAlias = database_1.ETableName.WORK_SCHEDULE_ASSIGNMENT;
        const wsAssignments = await this.workScheduleAssignmentRepository
            .createQueryBuilder(wsAssignmentAlias)
            .andWhere(`${wsAssignmentAlias}.isDeleted = :isDeleted
        AND ${wsAssignmentAlias}.employeeId IN (:...assigneeIds)
        AND ${wsAssignmentAlias}.date >= :startDate
        AND ${wsAssignmentAlias}.date <= :endDate
         `, { isDeleted: false, assigneeIds, startDate, endDate })
            .select([
            `${wsAssignmentAlias}.id`,
            `${wsAssignmentAlias}.date`,
            `${wsAssignmentAlias}.employeeId`,
        ])
            .getMany();
        const wsAssignmentTable = wsAssignments.reduce((table, { id, date, employeeId }) => {
            table[`${moment(date).format(constants_1.DATE_STRING)}:${employeeId}`] = id;
            return table;
        }, {});
        let insertWorkScheduleAssignments = [];
        const employeesSet = new Set();
        for (let date = moment(startDate).startOf('date'); date.isSameOrBefore(endDate); date.add(1, 'day')) {
            const dateString = date.format(constants_1.DATE_STRING);
            for (const assigneeId of assigneeIds) {
                const wsaId = wsAssignmentTable[`${dateString}:${assigneeId}`];
                const workScheduleAssignmentCreateDto = {
                    isDeleted: false,
                    companyId,
                    createdBy: userEmail,
                    createdOn: currentDate,
                    date: date.clone().startOf('date').toDate(),
                    employeeId: assigneeId,
                    workScheduleId,
                };
                switch (publishType) {
                    case work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_PUBLISH_NEW:
                        if (wsaId)
                            continue;
                        break;
                    case work_schedule_publish_type_enum_1.EWorkSchedulePublishType.PUBLISH_NEW_AND_OVERRIDE:
                        workScheduleAssignmentCreateDto.id = wsaId;
                        if (wsaId) {
                            workScheduleAssignmentCreateDto.updatedBy = userEmail;
                            workScheduleAssignmentCreateDto.updatedOn = new Date();
                            delete workScheduleAssignmentCreateDto.createdBy;
                            delete workScheduleAssignmentCreateDto.createdOn;
                        }
                        break;
                    case work_schedule_publish_type_enum_1.EWorkSchedulePublishType.JUST_OVERRIDE:
                        if (!wsaId)
                            continue;
                        workScheduleAssignmentCreateDto.id = wsaId;
                        workScheduleAssignmentCreateDto.updatedBy = userEmail;
                        workScheduleAssignmentCreateDto.updatedOn = new Date();
                        delete workScheduleAssignmentCreateDto.createdBy;
                        delete workScheduleAssignmentCreateDto.createdOn;
                        break;
                    default:
                        break;
                }
                if (insertWorkScheduleAssignments.length === 250) {
                    await this.workScheduleAssignmentRepository.save(insertWorkScheduleAssignments);
                    insertWorkScheduleAssignments = [];
                }
                insertWorkScheduleAssignments.push(workScheduleAssignmentCreateDto);
                employeesSet.add(assigneeId);
            }
        }
        await this.workScheduleAssignmentRepository.save(insertWorkScheduleAssignments);
        await this.sendWorkScheduleNotification({
            employeeIds: Array.from(employeesSet),
            companyId,
            userEmail,
            dateFrom: startDate,
            dateTo: endDate,
            workScheduleId,
            verb: `has just published a work schedule. Check it out now`,
            workScheduleName: '',
        });
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
                verb,
                workScheduleName,
            });
            await this.hrforteNotificationProducer.addSendBulkJob({
                companyId,
                params: notificationParams,
            });
        }
    }
    async getWorkScheduleAssignmentsByEmployeeIdWithDate(employeeId, companyId, date) {
        return this.workScheduleAssignmentRepository.findOne({
            where: { employeeId, companyId, date: new Date(date) },
            select: ['companyId', 'employeeId', 'workScheduleId', 'id'],
        });
    }
    async getWorkScheduleAssignmentsByEmployeeId(employeeId, companyId) {
        return this.workScheduleAssignmentRepository.find({
            where: { employeeId, companyId },
            select: ['companyId', 'employeeId', 'workScheduleId', 'id'],
        });
    }
    async getAllAssignmentsOfCompany(companyId) {
        return this.workScheduleAssignmentRepository.find({
            where: {
                companyId,
                isDeleted: false,
            },
            select: {
                employeeId: true,
                workScheduleId: true,
                date: true,
                isSwapped: true,
                isUnpublished: true,
            },
        });
    }
    async getWorkScheduleOfEmployeeMultipleDate(params) {
        const workScheduleAssignmentAlias = database_1.ETableName.WORK_SCHEDULE_ASSIGNMENT;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const autoDeductionAlias = database_1.ETableName.AUTO_DEDUCTION;
        const breakRuleAlias = database_1.ETableName.BREAK;
        const dayScheduleAlias = database_1.ETableName.DAY_SCHEDULE;
        const { employeeId, date, companyId } = params;
        const queryBuilder = this.workScheduleAssignmentRepository
            .createQueryBuilder(workScheduleAssignmentAlias)
            .leftJoinAndSelect(`${workScheduleAssignmentAlias}.workSchedule`, workScheduleAlias, `${workScheduleAlias}.isDeleted = :isDeleted 
        AND 
        ${workScheduleAlias}.id = ${workScheduleAssignmentAlias}.work_schedule_id`, {
            isDeleted: false,
        })
            .leftJoinAndSelect(`${workScheduleAlias}.autoDeductions`, autoDeductionAlias, `${autoDeductionAlias}.isDeleted = :isDeleted AND ${autoDeductionAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.breaks`, breakRuleAlias, `${breakRuleAlias}.isDeleted = :isDeleted AND ${breakRuleAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .leftJoinAndSelect(`${workScheduleAlias}.daySchedules`, dayScheduleAlias, `${dayScheduleAlias}.isDeleted = :isDeleted AND ${dayScheduleAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .where(`${workScheduleAssignmentAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .andWhere(`${workScheduleAssignmentAlias}.employeeId = :employeeId`, {
            employeeId,
        })
            .andWhere(`${workScheduleAssignmentAlias}.date IN (:...date)`, { date })
            .andWhere(`${workScheduleAssignmentAlias}.companyId = :companyId`, {
            companyId,
        })
            .andWhere(`${workScheduleAssignmentAlias}.is_unpublished = :isUnpublished`, {
            isUnpublished: false,
        });
        const result = await queryBuilder.getMany();
        if (!result || result.length === 0) {
            throw new common_1.BadRequestException('No work schedules found for the given employee and dates.');
        }
        const workScheduleMap = {};
        result.forEach(assignment => {
            const workSchedule = assignment.workSchedule;
            const assignmentDate = moment(assignment.date).format(constants_1.DATE_STRING);
            workScheduleMap[assignmentDate] = workSchedule;
        });
        return workScheduleMap;
    }
    async getAllWorkScheduleOfMultipleDate(params) {
        const workScheduleAssignmentAlias = database_1.ETableName.WORK_SCHEDULE_ASSIGNMENT;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const dayScheduleAlias = database_1.ETableName.DAY_SCHEDULE;
        const { date, companyId, employeeIds } = params;
        const queryBuilder = this.workScheduleAssignmentRepository
            .createQueryBuilder(workScheduleAssignmentAlias)
            .select([
            `${workScheduleAssignmentAlias}.id`,
            `${workScheduleAssignmentAlias}.employeeId`,
            `${workScheduleAssignmentAlias}.workScheduleId`,
            `${workScheduleAssignmentAlias}.date`,
        ])
            .leftJoin(`${workScheduleAssignmentAlias}.workSchedule`, workScheduleAlias, `${workScheduleAlias}.isDeleted = :isDeleted 
        AND 
        ${workScheduleAlias}.id = ${workScheduleAssignmentAlias}.work_schedule_id`, {
            isDeleted: false,
        })
            .addSelect([
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.name`,
            `${workScheduleAlias}.color`,
            `${workScheduleAlias}.assignees`,
            `${workScheduleAlias}.groupAssignees`,
            `${workScheduleAlias}.utcOffset`,
        ])
            .leftJoin(`${workScheduleAlias}.daySchedules`, dayScheduleAlias, `${dayScheduleAlias}.isDeleted = :isDeleted AND ${dayScheduleAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .addSelect([
            `${dayScheduleAlias}.id`,
            `${dayScheduleAlias}.from`,
            `${dayScheduleAlias}.to`,
            `${dayScheduleAlias}.day`,
        ])
            .where(`${workScheduleAssignmentAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .andWhere(`${workScheduleAssignmentAlias}.date IN (:...date)`, { date })
            .andWhere(`${workScheduleAssignmentAlias}.companyId = :companyId`, {
            companyId,
        });
        if (employeeIds && employeeIds?.length > 0) {
            queryBuilder.andWhere(`${workScheduleAssignmentAlias}.employeeId IN (:...employeeIds)`, { employeeIds });
        }
        const result = await queryBuilder.getMany();
        if (!result || result.length === 0) {
            throw new common_1.BadRequestException('No work schedules found for the given employee and dates.');
        }
        const workScheduleMap = {};
        result.forEach(assignment => {
            const workSchedule = assignment.workSchedule;
            const assignmentDate = moment(assignment.date).format(constants_1.DATE_STRING);
            if (!workScheduleMap[assignmentDate]) {
                workScheduleMap[assignmentDate] = [];
            }
            const existingSchedule = workScheduleMap[assignmentDate].find(schedule => schedule.id === workSchedule.id);
            if (!existingSchedule) {
                workScheduleMap[assignmentDate].push(workSchedule);
            }
        });
        return workScheduleMap;
    }
};
exports.WorkScheduleAssignmentService = WorkScheduleAssignmentService;
exports.WorkScheduleAssignmentService = WorkScheduleAssignmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_schedule_assignment_entity_1.WorkScheduleAssignmentEntity)),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => work_schedule_service_1.WorkScheduleService))),
    __param(5, (0, config_1.InjectAppConfig)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        producers_1.LeaveWorkScheduleAssignmentProducer,
        employee_service_1.EmployeeService,
        producers_1.HrforteNotificationProducer,
        work_schedule_service_1.WorkScheduleService, Object])
], WorkScheduleAssignmentService);
//# sourceMappingURL=work-schedule-assignment.service.js.map
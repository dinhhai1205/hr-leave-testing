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
exports.TimeSheetAdjustmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const database_1 = require("../../../../../core/database");
const payroll_timesheet_entity_1 = require("../../../../../core/database/entities/payroll-timesheet.entity");
const prtrx_hdr_service_1 = require("../../../../payroll/modules/prtrx-hdr/prtrx-hdr.service");
const services_1 = require("../../../../time-off/modules/leave/services");
const employee_service_1 = require("../../../../user/modules/employee/employee.service");
const common_2 = require("../../../common");
const api_service_1 = require("../../../libs/api/api.service");
const employee_mapping_service_1 = require("../../employee-mapping/employee-mapping.service");
const pay_element_mapping_service_1 = require("../../pay-element-mapping/pay-element-mapping.service");
const work_schedule_1 = require("../../work-schedule");
const constants_1 = require("../constants");
const payroll_group_service_1 = require("../../../../payroll/modules/payroll-group/payroll-group.service");
const work_schedule_assignment_service_1 = require("../../work-schedule-assignment/work-schedule-assignment.service");
let TimeSheetAdjustmentService = class TimeSheetAdjustmentService extends database_1.TypeOrmBaseService {
    constructor(timeSheetAdjustmentRepository, payrollTimesheetRepository, cyclePeriodHeaderRepository, cyclePeriodDetailRepository, workScheduleService, employeeMappingService, apiService, leaveService, employeeService, prtrxHdrService, payElementMappingService, payrollGroupService, workScheduleAssignmentService) {
        super(timeSheetAdjustmentRepository);
        this.timeSheetAdjustmentRepository = timeSheetAdjustmentRepository;
        this.payrollTimesheetRepository = payrollTimesheetRepository;
        this.cyclePeriodHeaderRepository = cyclePeriodHeaderRepository;
        this.cyclePeriodDetailRepository = cyclePeriodDetailRepository;
        this.workScheduleService = workScheduleService;
        this.employeeMappingService = employeeMappingService;
        this.apiService = apiService;
        this.leaveService = leaveService;
        this.employeeService = employeeService;
        this.prtrxHdrService = prtrxHdrService;
        this.payElementMappingService = payElementMappingService;
        this.payrollGroupService = payrollGroupService;
        this.workScheduleAssignmentService = workScheduleAssignmentService;
        this.getMultipleTimesheetAdjustments = async (ids) => {
            const newTimesheetAdjustments = await this.timeSheetAdjustmentRepository.find({
                where: {
                    id: (0, typeorm_2.In)(ids),
                },
                relations: ['payroll'],
            });
            return newTimesheetAdjustments;
        };
    }
    async createAdjustment(createAdjustmentDto, companyId, userEmail) {
        const { startDate, endDate, adjustmentType, hour, payrollTimesheetId, timeSheetType, } = createAdjustmentDto;
        if (timeSheetType !== database_1.TimeSheetAdjustmentType.Unpaid) {
            const payrollHeader = await this.prtrxHdrService.getPayrollHeaderByPayrollTimesheetId(payrollTimesheetId);
            if (!payrollHeader)
                throw new common_1.BadRequestException('Payroll Header not found');
            if (moment(startDate, 'YYYY-MM-DD').isSameOrAfter(moment(payrollHeader.dateFrom, 'YYYY-MM-DD')) ||
                moment(endDate, 'YYYY-MM-DD').isSameOrAfter(moment(payrollHeader.dateFrom, 'YYYY-MM-DD'))) {
                throw new common_1.BadRequestException('Invalid dates');
            }
        }
        if (!startDate || !endDate) {
            throw new common_1.BadRequestException('startDate and endDate are required for adjustments');
        }
        const days = (0, common_2.getDaysBetweenDates)(startDate, endDate);
        if (adjustmentType === database_1.TimeAdjustmentType.Date) {
            const result = [];
            for (const day of days) {
                const adjustmentFromLeaveExisted = await this.getOne({
                    where: {
                        status: (0, typeorm_2.Not)(database_1.AdjustmentStatus.Manual),
                        date: day,
                        isDeleted: false,
                        companyId,
                        payrollTimesheetId,
                        timeSheetType: createAdjustmentDto.timeSheetType,
                        adjustmentType: createAdjustmentDto.adjustmentType,
                    },
                });
                if (adjustmentFromLeaveExisted) {
                    throw new common_1.BadRequestException("Can't create new adjustment existed from leave or time tracker");
                }
            }
            for (const day of days) {
                await this.timeSheetAdjustmentRepository.update({
                    companyId,
                    status: database_1.AdjustmentStatus.Manual,
                    date: day,
                    isDeleted: false,
                    payrollTimesheetId,
                    timeSheetType: createAdjustmentDto.timeSheetType,
                    adjustmentType: createAdjustmentDto.adjustmentType,
                }, {
                    isDeleted: true,
                    updatedBy: userEmail,
                    updatedOn: moment.utc().toDate(),
                });
                const daysToProrate = await this.getDayToProrateV2(payrollTimesheetId, companyId, day);
                const newAdjustment = this.createEntity({
                    ...createAdjustmentDto,
                    startDate: undefined,
                    endDate: undefined,
                    date: day,
                    day: 1,
                    uuid: (0, crypto_1.randomUUID)(),
                    daysToProrate: daysToProrate.totalProrationDays,
                    workScheduleSetting: JSON.stringify(daysToProrate.workScheduleEntity),
                }, { companyId, userEmail });
                result.push(await this.create(newAdjustment));
            }
            return result;
        }
        if (!hour) {
            throw new common_1.BadRequestException('Hour is required for hour adjustments');
        }
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const queryBuilder = await this.payrollTimesheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.id = ${payrollAlias}.employee_id`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.id = :payrollTimesheetId AND ${payrollAlias}.is_deleted = :isDeleted`, { isDeleted: false, payrollTimesheetId })
            .getOne();
        if (!queryBuilder)
            throw new common_1.NotFoundException('Not found payroll timesheet');
        if (queryBuilder.employee.payrollGroups.hourPerDay < hour)
            throw new common_1.BadRequestException("Hour is not allowed to be greater than employee's hour per day");
        const result = [];
        for (const day of days) {
            const adjustmentFromLeaveExisted = await this.getOne({
                where: {
                    status: (0, typeorm_2.Not)(database_1.AdjustmentStatus.Manual),
                    date: day,
                    isDeleted: false,
                    companyId,
                    payrollTimesheetId,
                    timeSheetType: createAdjustmentDto.timeSheetType,
                    adjustmentType: createAdjustmentDto.adjustmentType,
                },
            });
            if (adjustmentFromLeaveExisted) {
                throw new common_1.BadRequestException("Can't create new adjustment existed from leave or time tracker");
            }
        }
        for (const day of days) {
            await this.timeSheetAdjustmentRepository.update({
                companyId,
                status: database_1.AdjustmentStatus.Manual,
                date: day,
                isDeleted: false,
                payrollTimesheetId,
                timeSheetType: createAdjustmentDto.timeSheetType,
                adjustmentType: createAdjustmentDto.adjustmentType,
            }, {
                isDeleted: true,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            });
            const daysToProrate = await this.getDayToProrateV2(payrollTimesheetId, companyId, day);
            const newAdjustment = this.createEntity({
                ...createAdjustmentDto,
                startDate: undefined,
                endDate: undefined,
                date: day,
                day: queryBuilder.employee.payCalcMet === 1
                    ? hour / queryBuilder.employee.payrollGroups.hourPerDay
                    : undefined,
                uuid: (0, crypto_1.randomUUID)(),
                daysToProrate: daysToProrate.totalProrationDays,
                workScheduleSetting: JSON.stringify(daysToProrate.workScheduleEntity),
            }, { companyId, userEmail });
            result.push(await this.create(newAdjustment));
        }
        return result;
    }
    async createAdjustmentWithDtos(createAdjustmentDtos, companyId, userEmail) {
        const createDtos = [];
        for (const dto of createAdjustmentDtos) {
            const { payrollTimesheetId, startDate } = dto;
            if (!startDate)
                throw new common_1.BadRequestException('date must be provided');
            const daysToProrate = await this.getDayToProrateV2(payrollTimesheetId, companyId, startDate);
            createDtos.push({
                ...dto,
                date: startDate,
                startDate: undefined,
                endDate: undefined,
                uuid: (0, crypto_1.randomUUID)(),
                daysToProrate: daysToProrate.totalProrationDays,
                workScheduleSetting: JSON.stringify(daysToProrate.workScheduleEntity),
            });
        }
        const result = this.createMulti(createDtos, {
            userEmail: userEmail,
            companyId: companyId,
        });
        return result;
    }
    async createMultiAdjustments(createAdjustmentDto, companyId, userEmail) {
        const { startDate, endDate, adjustmentType, hour, payrollIds, timeSheetType, } = createAdjustmentDto;
        const createDtos = [];
        if (!startDate || !endDate) {
            throw new common_1.BadRequestException('startDate and endDate are required for date adjustments');
        }
        const days = (0, common_2.getDaysBetweenDates)(startDate, endDate);
        if (adjustmentType === database_1.TimeAdjustmentType.Date) {
            for (const day of days) {
                for (const payrollId of payrollIds) {
                    if (timeSheetType !== database_1.TimeSheetAdjustmentType.Unpaid) {
                        const payrollHeader = await this.prtrxHdrService.getPayrollHeaderByPayrollTimesheetId(payrollId);
                        if (!payrollHeader)
                            throw new common_1.BadRequestException('Payroll Header not found');
                        if (moment(startDate, 'YYYY-MM-DD').isSameOrAfter(moment(payrollHeader.dateFrom, 'YYYY-MM-DD')) ||
                            moment(endDate, 'YYYY-MM-DD').isSameOrAfter(moment(payrollHeader.dateFrom, 'YYYY-MM-DD'))) {
                            throw new common_1.BadRequestException('Invalid dates');
                        }
                    }
                    const adjustmentFromLeaveExisted = await this.getOne({
                        where: {
                            status: (0, typeorm_2.Not)(database_1.AdjustmentStatus.Manual),
                            date: day,
                            isDeleted: false,
                            companyId,
                            payrollTimesheetId: payrollId,
                            timeSheetType: createAdjustmentDto.timeSheetType,
                            adjustmentType: createAdjustmentDto.adjustmentType,
                        },
                    });
                    if (adjustmentFromLeaveExisted) {
                        throw new common_1.BadRequestException("Can't create new adjustment existed from leave or time tracker");
                    }
                }
            }
            for (const day of days) {
                const adjustments = await Promise.all(payrollIds.map(async (payrollId) => {
                    await this.timeSheetAdjustmentRepository.update({
                        companyId,
                        status: database_1.AdjustmentStatus.Manual,
                        date: day,
                        isDeleted: false,
                        payrollTimesheetId: payrollId,
                        timeSheetType: createAdjustmentDto.timeSheetType,
                        adjustmentType: createAdjustmentDto.adjustmentType,
                    }, {
                        isDeleted: true,
                        updatedBy: userEmail,
                        updatedOn: moment.utc().toDate(),
                    });
                    const daysToProrate = await this.getDayToProrateV2(payrollId, companyId, day);
                    const newAdjustment = this.createEntity({
                        ...createAdjustmentDto,
                        payrollIds: undefined,
                        payrollTimesheetId: payrollId,
                        startDate: undefined,
                        endDate: undefined,
                        date: day,
                        day: 1,
                        uuid: (0, crypto_1.randomUUID)(),
                        daysToProrate: daysToProrate.totalProrationDays,
                        workScheduleSetting: JSON.stringify(daysToProrate.workScheduleEntity),
                    }, { companyId, userEmail });
                    return newAdjustment;
                }));
                createDtos.push(...adjustments);
            }
            const timesheetAdjustments = await this.createMulti(createDtos);
            const tsAdjustmentIds = timesheetAdjustments.map(item => item.id);
            return this.getMultipleTimesheetAdjustments(tsAdjustmentIds);
        }
        if (!hour) {
            throw new common_1.BadRequestException('Hour is required for hour adjustments');
        }
        for (const day of days) {
            for (const payrollId of payrollIds) {
                if (timeSheetType !== database_1.TimeSheetAdjustmentType.Unpaid) {
                    const payrollHeader = await this.prtrxHdrService.getPayrollHeaderByPayrollTimesheetId(payrollId);
                    if (!payrollHeader)
                        throw new common_1.BadRequestException('Payroll Header not found');
                    if (moment(startDate, 'YYYY-MM-DD').isSameOrAfter(moment(payrollHeader.dateFrom, 'YYYY-MM-DD')) ||
                        moment(endDate, 'YYYY-MM-DD').isSameOrAfter(moment(payrollHeader.dateFrom, 'YYYY-MM-DD'))) {
                        throw new common_1.BadRequestException('Invalid dates');
                    }
                }
                const adjustmentFromLeaveExisted = await this.getOne({
                    where: {
                        status: (0, typeorm_2.Not)(database_1.AdjustmentStatus.Manual),
                        date: day,
                        isDeleted: false,
                        companyId,
                        payrollTimesheetId: payrollId,
                        timeSheetType: createAdjustmentDto.timeSheetType,
                        adjustmentType: createAdjustmentDto.adjustmentType,
                    },
                });
                if (adjustmentFromLeaveExisted) {
                    throw new common_1.BadRequestException("Can't create new adjustment existed from leave or time tracker");
                }
            }
        }
        for (const day of days) {
            const adjustments = await Promise.all(payrollIds.map(async (payrollId) => {
                const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
                const employeeAlias = 'employee';
                const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
                const queryBuilder = await this.payrollTimesheetRepository
                    .createQueryBuilder(payrollAlias)
                    .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.id = ${payrollAlias}.employee_id`, { isDeleted: false })
                    .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
                    .where(`${payrollAlias}.id = :payrollTimesheetId AND ${payrollAlias}.is_deleted = :isDeleted`, { isDeleted: false, payrollTimesheetId: payrollId })
                    .getOne();
                if (!queryBuilder)
                    throw new common_1.NotFoundException('Not found payroll timesheet');
                if (queryBuilder.employee.payrollGroups.hourPerDay < hour)
                    throw new common_1.BadRequestException("Hour is not allowed to be greater than employee's hour per day");
                await this.timeSheetAdjustmentRepository.update({
                    companyId,
                    status: database_1.AdjustmentStatus.Manual,
                    date: day,
                    isDeleted: false,
                    payrollTimesheetId: payrollId,
                    timeSheetType: createAdjustmentDto.timeSheetType,
                    adjustmentType: createAdjustmentDto.adjustmentType,
                }, {
                    isDeleted: true,
                    updatedBy: userEmail,
                    updatedOn: moment.utc().toDate(),
                });
                const daysToProrate = await this.getDayToProrateV2(payrollId, companyId, day);
                const newAdjustment = this.createEntity({
                    ...createAdjustmentDto,
                    payrollIds: undefined,
                    payrollTimesheetId: payrollId,
                    startDate: undefined,
                    endDate: undefined,
                    date: day,
                    day: queryBuilder.employee.payCalcMet === 1
                        ? hour / queryBuilder.employee.payrollGroups.hourPerDay
                        : undefined,
                    uuid: (0, crypto_1.randomUUID)(),
                    daysToProrate: daysToProrate.totalProrationDays,
                    workScheduleSetting: JSON.stringify(daysToProrate.workScheduleEntity),
                }, { companyId, userEmail });
                return newAdjustment;
            }));
            createDtos.push(...adjustments);
        }
        const timesheetAdjustments = await this.createMulti(createDtos);
        const tsAdjustmentIds = timesheetAdjustments.map(item => item.id);
        return this.getMultipleTimesheetAdjustments(tsAdjustmentIds);
    }
    async createMultiAdjustmentsFromTimeTracker(createAdjustmentDto, prtrxHdrId, companyId, userEmail) {
        const createDtos = [];
        const employeeIds = Object.keys(createAdjustmentDto).filter(record => record);
        for (const employeeId of employeeIds) {
            const leaveEntries = createAdjustmentDto[employeeId].filter(te => te);
            const employeeIdNumber = typeof employeeId === 'string' ? parseInt(employeeId, 10) : employeeId;
            if (isNaN(employeeIdNumber)) {
                throw new Error(`Invalid employee ID: ${employeeId}`);
            }
            const payrollTimesheet = await this.employeeService.getPayrollTimesheetOfEmployeeByPrtrxHdr(employeeIdNumber, prtrxHdrId, companyId);
            if (!payrollTimesheet)
                continue;
            const payElementMappingId = await this.payElementMappingService.getPayElementMappingIdSysGenByName('Unpaid Days (Current cycle)', companyId);
            const workSchedule = await this.workScheduleService.getWorkScheduleByEmployeeId(employeeIdNumber);
            if (leaveEntries.length !== 0) {
                for (const leaveEntry of leaveEntries) {
                    const adjustmentFromLeaveExisted = await this.getOne({
                        where: {
                            status: (0, typeorm_2.Not)(database_1.AdjustmentStatus.Manual),
                            date: leaveEntry.day,
                            timeSheetType: database_1.TimeSheetAdjustmentType.Unpaid,
                            isDeleted: false,
                            companyId,
                            payrollTimesheetId: payrollTimesheet?.id,
                            adjustmentType: database_1.TimeAdjustmentType.Date,
                        },
                    });
                    if (adjustmentFromLeaveExisted) {
                        continue;
                    }
                    const daysToProrate = await this.getDayToProrateV2(payrollTimesheet.id, companyId, leaveEntry.day);
                    const createEntity = this.createEntity({
                        date: leaveEntry.day,
                        timeSheetType: database_1.TimeSheetAdjustmentType.Unpaid,
                        status: database_1.AdjustmentStatus.SyncFromLeave,
                        payrollTimesheetId: payrollTimesheet?.id,
                        leaveId: leaveEntry.leaveId,
                        workScheduleSetting: JSON.stringify(workSchedule),
                        adjustmentType: database_1.TimeAdjustmentType.Date,
                        payElementMappingId: payElementMappingId?.id,
                        day: leaveEntry.unPaidDay,
                        uuid: (0, crypto_1.randomUUID)(),
                        daysToProrate: daysToProrate.totalProrationDays,
                    }, {
                        companyId,
                        userEmail,
                    });
                    createDtos.push(createEntity);
                }
            }
        }
        for (const createDto of createDtos) {
            await this.timeSheetAdjustmentRepository.update({
                companyId,
                status: database_1.AdjustmentStatus.Manual,
                date: createDto.date,
                isDeleted: false,
                payrollTimesheetId: createDto.payrollTimesheetId,
                timeSheetType: database_1.TimeSheetAdjustmentType.Unpaid,
                adjustmentType: database_1.TimeAdjustmentType.Date,
            }, {
                isDeleted: true,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            });
        }
        return this.createMulti(createDtos);
    }
    async archiveAdjustment(id, userEmail) {
        const adjustment = await this.getOne({
            where: { id, isDeleted: false },
        });
        if (!adjustment) {
            throw new common_1.NotFoundException('Adjustment not found');
        }
        await this.delete(id, {
            userEmail,
        });
        return adjustment;
    }
    async archiveMultiAdjustment(ids, userEmail) {
        const adjustments = await this.timeSheetAdjustmentRepository.find({
            where: { id: (0, typeorm_2.In)(ids), isDeleted: false },
        });
        if (adjustments.length < ids.length) {
            throw new common_1.NotFoundException('Adjustment not found');
        }
        return this.timeSheetAdjustmentRepository.update({
            id: (0, typeorm_2.In)(ids),
            isDeleted: false,
        }, {
            isDeleted: true,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
    }
    async restoreAdjustment(id, userEmail) {
        const adjustment = await this.timeSheetAdjustmentRepository.findOne({
            where: { id, isDeleted: true },
        });
        if (!adjustment) {
            throw new common_1.NotFoundException('Adjustment not found');
        }
        await this.timeSheetAdjustmentRepository.update({
            id,
            isDeleted: true,
        }, {
            isDeleted: false,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        return adjustment;
    }
    async updateAdjustment(id, updatePayload, userEmail) {
        const { hour, date } = updatePayload;
        const timesheetAlias = database_1.ETableName.TIME_SHEET_ADJUSTMENT;
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const queryBuilder = await this.timeSheetAdjustmentRepository
            .createQueryBuilder(timesheetAlias)
            .leftJoinAndSelect(`${timesheetAlias}.payroll`, payrollAlias, `${payrollAlias}.id = ${timesheetAlias}.payroll_timesheet_id`, { isDeleted: false })
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.id = ${payrollAlias}.employee_id`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${timesheetAlias}.id = :id AND ${timesheetAlias}.is_deleted = :isDeleted`, { isDeleted: false, id })
            .getOne();
        if (!queryBuilder)
            throw new common_1.NotFoundException('Not found payroll timesheet');
        if (date) {
            const adjustmentFromLeaveExisted = await this.getOne({
                where: {
                    status: (0, typeorm_2.Not)(database_1.AdjustmentStatus.Manual),
                    date: date,
                    isDeleted: false,
                    companyId: queryBuilder.companyId,
                    payrollTimesheetId: queryBuilder.payrollTimesheetId,
                    timeSheetType: queryBuilder.timeSheetType,
                    adjustmentType: queryBuilder.adjustmentType,
                },
            });
            if (adjustmentFromLeaveExisted) {
                throw new common_1.BadRequestException("Can't create new adjustment existed from leave or time tracker");
            }
            const daysToProrate = await this.getDayToProrateV2(queryBuilder.payrollTimesheetId, queryBuilder.companyId, date);
            updatePayload.daysToProrate = daysToProrate.totalProrationDays;
            updatePayload.workScheduleSetting = JSON.stringify(daysToProrate.workScheduleEntity);
        }
        if (hour) {
            const hourPerDay = queryBuilder?.payroll?.employee?.payrollGroups?.hourPerDay;
            if (hourPerDay < hour)
                throw new common_1.BadRequestException("Hour is not allowed to be greater than employee's hour per day");
            updatePayload.day = hour / hourPerDay;
        }
        await this.timeSheetAdjustmentRepository.update({
            id,
            isDeleted: false,
        }, {
            ...updatePayload,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        const updatedTimesheetAdjustment = await this.getAdjustmentById(id, queryBuilder.companyId);
        return updatedTimesheetAdjustment;
    }
    async getAllAdjustments(companyId, paginationQueryDto) {
        const adjustmentAlias = database_1.ETableName.TIME_SHEET_ADJUSTMENT;
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const queryBuilder = this.timeSheetAdjustmentRepository
            .createQueryBuilder(adjustmentAlias)
            .leftJoinAndSelect(`${adjustmentAlias}.payroll`, payrollAlias, `${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.id = ${adjustmentAlias}.payroll_timesheet_id`, { isDeleted: false })
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.id = ${payrollAlias}.employee_id`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false });
        queryBuilder.andWhere('TimeSheetAdjustmentEntity.companyId = :companyId', {
            companyId,
        });
        const { q: querySearchString, querySearchFields = [
            constants_1.QUERY_FIELDS.FULL_NAME_LOCAL,
        ], filterUUID, } = paginationQueryDto;
        if (filterUUID) {
            queryBuilder.andWhere('TimeSheetAdjustmentEntity.uuid = :uuid', {
                uuid: filterUUID,
            });
        }
        const uuidFields = querySearchFields.filter(field => field.includes('id'));
        const remainingQuerySearchFields = querySearchFields.filter(field => !field.includes('id'));
        let rawResult;
        if (uuidFields?.length && querySearchString) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                for (const field of uuidFields) {
                    qb.orWhere(`${field} = :querySearchString`, {
                        querySearchString: `${querySearchString.trim()}`,
                    });
                }
            }));
        }
        if (remainingQuerySearchFields?.length && querySearchString) {
            rawResult = await this.getEntitiesByQuery({
                queryBuilder,
                paginationQueryDto,
                querySearchFields: remainingQuerySearchFields,
            });
        }
        else {
            rawResult = await this.getEntitiesByQuery({
                queryBuilder,
                paginationQueryDto,
            });
        }
        const datas = rawResult.data;
        const result = datas.map(data => {
            return {
                ...data,
                employeeRef: data?.payroll?.employee?.employeeRef || null,
                fullNameLocal: data?.payroll?.employee?.fullNameLocal || null,
                fullNameEn: data?.payroll?.employee?.fullNameEn || null,
                orgElements: data?.payroll?.employee?.orgStructure?.name || null,
                payrollGroup: data?.payroll?.employee?.payrollGroups?.code || null,
                costCenter: data?.payroll?.employee?.costCenter?.name || null,
                payroll: undefined,
                payCalcMet: data?.payroll?.employee?.payCalcMet || null,
            };
        });
        return {
            ...rawResult,
            data: result,
        };
    }
    async getAdjustmentById(id, companyId) {
        return this.getOneOrFail({ where: { id, companyId }, relations: ['payroll'] }, { errMsg: 'Adjustment not found' });
    }
    async getAdjustmentsByPayrollId(payrollId, companyId, adjustmentType) {
        if (adjustmentType) {
            return this.timeSheetAdjustmentRepository.find({
                where: {
                    payrollTimesheetId: payrollId,
                    companyId,
                    adjustmentType,
                    isDeleted: false,
                },
                order: { date: 'ASC' },
            });
        }
        return this.timeSheetAdjustmentRepository.find({
            where: {
                payrollTimesheetId: payrollId,
                companyId,
                isDeleted: false,
            },
            order: { date: 'ASC' },
        });
    }
    async getAdjustmentsByPayrollHeaderIdWithoutPagination(prtrxHdrId, companyId, adjustmentType) {
        const timesheetAdjustments = await this.timeSheetAdjustmentRepository.find({
            where: {
                companyId: companyId,
                payroll: {
                    prtrxHdrId: prtrxHdrId,
                },
                isDeleted: false,
            },
        });
        return timesheetAdjustments;
    }
    async getAdjustmentsByPayrollIds(payrollIds, companyId, adjustmentType) {
        if (adjustmentType) {
            return this.timeSheetAdjustmentRepository.find({
                where: {
                    payrollTimesheetId: (0, typeorm_2.In)(payrollIds),
                    companyId,
                    adjustmentType,
                    isDeleted: false,
                },
                order: { date: 'ASC' },
            });
        }
        return this.timeSheetAdjustmentRepository.find({
            where: {
                payrollTimesheetId: (0, typeorm_2.In)(payrollIds),
                companyId,
                isDeleted: false,
            },
            order: { date: 'ASC' },
        });
    }
    async getAdjustmentsByPayrollHeaderId(prtrxHdrId, companyId, paginationQueryDto, userEmail, timeTrackerCompanyId = '', adjustmentType) {
        const timesheetAdjustment = await this.timeSheetAdjustmentRepository.find({
            select: {
                id: true,
            },
            where: {
                companyId: companyId,
                payroll: {
                    prtrxHdrId: prtrxHdrId,
                },
                isDeleted: false,
            },
        });
        if (timesheetAdjustment?.length === 0 && timeTrackerCompanyId) {
            await this.handleRecompute(companyId, timeTrackerCompanyId, userEmail, prtrxHdrId);
        }
        const adjustmentAlias = database_1.ETableName.TIME_SHEET_ADJUSTMENT;
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const queryBuilder = this.timeSheetAdjustmentRepository
            .createQueryBuilder(adjustmentAlias)
            .leftJoinAndSelect(`${adjustmentAlias}.payroll`, payrollAlias, `${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.id = ${adjustmentAlias}.payroll_timesheet_id`, { isDeleted: false })
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.id = ${payrollAlias}.employee_id`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${adjustmentAlias}.company_id = :companyId AND ${payrollAlias}.prtrx_hdr_id = :prtrxHdrId`, { companyId: companyId, prtrxHdrId })
            .andWhere(`${adjustmentAlias}.is_deleted = :isDeleted`, {
            isDeleted: false,
        });
        if (adjustmentType) {
            queryBuilder.andWhere(`${adjustmentAlias}.adjustment_type = :adjustmentType`, {
                adjustmentType,
            });
        }
        const { q: querySearchString, querySearchFields = [
            constants_1.QUERY_FIELDS.FULL_NAME_LOCAL,
        ], filterUUID, } = paginationQueryDto;
        if (filterUUID) {
            queryBuilder.andWhere(`${adjustmentAlias}.uuid = :uuid`, {
                uuid: filterUUID,
            });
        }
        const uuidFields = querySearchFields.filter(field => field.includes('id'));
        const remainingQuerySearchFields = querySearchFields.filter(field => !field.includes('id'));
        let rawResult;
        if (uuidFields?.length && querySearchString) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                for (const field of uuidFields) {
                    qb.orWhere(`${field} = :querySearchString`, {
                        querySearchString: `${querySearchString.trim()}`,
                    });
                }
            }));
        }
        if (remainingQuerySearchFields?.length && querySearchString) {
            rawResult = await this.getEntitiesByQuery({
                queryBuilder,
                paginationQueryDto,
                querySearchFields: remainingQuerySearchFields,
            });
        }
        else {
            rawResult = await this.getEntitiesByQuery({
                queryBuilder,
                paginationQueryDto,
            });
        }
        const datas = rawResult.data;
        const result = datas.map(data => {
            return {
                ...data,
                employeeRef: data?.payroll?.employee?.employeeRef || null,
                fullNameLocal: data?.payroll?.employee?.fullNameLocal || null,
                fullNameEn: data?.payroll?.employee?.fullNameEn || null,
                orgElements: data?.payroll?.employee?.orgStructure?.name || null,
                payrollGroup: data?.payroll?.employee?.payrollGroups?.code || null,
                costCenter: data?.payroll?.employee?.costCenter?.name || null,
                payroll: undefined,
                payCalcMet: data?.payroll?.employee?.payCalcMet || null,
            };
        });
        return {
            ...rawResult,
            data: result,
        };
    }
    async getTimesheetAdjustmentByIds(ids) {
        return this.timeSheetAdjustmentRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids),
                isDeleted: false,
            },
        });
    }
    async getTimesheetAdjustmentByPayrollHeaderId(prtrxHdrId, companyId, paginationQueryDto, adjustmentType) {
        const adjustmentAlias = database_1.ETableName.TIME_SHEET_ADJUSTMENT;
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const queryBuilder = this.timeSheetAdjustmentRepository
            .createQueryBuilder(adjustmentAlias)
            .leftJoinAndSelect(`${adjustmentAlias}.payroll`, payrollAlias, `${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.id = ${adjustmentAlias}.payroll_timesheet_id`, { isDeleted: false })
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.id = ${payrollAlias}.employee_id`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${adjustmentAlias}.company_id = :companyId AND ${payrollAlias}.prtrx_hdr_id = :prtrxHdrId`, { companyId: companyId, prtrxHdrId })
            .andWhere(`${adjustmentAlias}.is_deleted = :isDeleted`, {
            isDeleted: false,
        });
        if (adjustmentType) {
            queryBuilder.andWhere(`${adjustmentAlias}.adjustment_type = :adjustmentType`, {
                adjustmentType,
            });
        }
        const { q: querySearchString, querySearchFields = [
            constants_1.QUERY_FIELDS.FULL_NAME_LOCAL,
        ], } = paginationQueryDto;
        const uuidFields = querySearchFields.filter(field => field.includes('uuid'));
        const remainingQuerySearchFields = querySearchFields.filter(field => !field.includes('uuid'));
        let rawResult;
        if (uuidFields?.length && querySearchString) {
            queryBuilder.andWhere(new typeorm_2.Brackets(qb => {
                for (const field of uuidFields) {
                    qb.orWhere(`${field} = :querySearchString`, {
                        querySearchString: `${querySearchString.trim()}`,
                    });
                }
            }));
        }
        if (remainingQuerySearchFields?.length && querySearchString) {
            rawResult = await this.getEntitiesByQuery({
                queryBuilder,
                paginationQueryDto,
                querySearchFields: remainingQuerySearchFields,
            });
        }
        rawResult = await this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto: { ...paginationQueryDto, isSelectAll: true },
        });
        const datas = rawResult.data;
        const result = datas.map(data => {
            return {
                ...data,
                employeeRef: data?.payroll?.employee?.employeeRef || null,
                fullNameLocal: data?.payroll?.employee?.fullNameLocal || null,
                fullNameEn: data?.payroll?.employee?.fullNameEn || null,
                orgElements: data?.payroll?.employee?.orgStructure?.name || null,
                payrollGroup: data?.payroll?.employee?.payrollGroups?.code || null,
                costCenter: data?.payroll?.employee?.costCenter?.name || null,
                payroll: undefined,
                payCalcMet: data?.payroll?.employee?.payCalcMet || null,
            };
        });
        return result;
    }
    async handleCalculateUnpaidDaysTimeTracker(listEmployeeIds, startDate, endDate, companyId, ttCompanyId) {
        const listEmployeesInfo = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: listEmployeeIds,
        });
        if (listEmployeesInfo.length === 0)
            throw new common_1.BadRequestException('Not found employee in time tracker');
        const listTTEmployeeIds = listEmployeesInfo.map(employee => employee.timeTrackerEmployeeId);
        const listDayBetweenStartEnd = startDate && endDate
            ? (0, common_2.getDaysBetweenDates)(startDate, endDate)
            : (0, common_2.getCurrentWeek)();
        const { data: listEmployeesTrackedInfo } = await this.apiService.request({
            type: 'GET_COUNT_TRACK_TIME',
            segments: { companyId: ttCompanyId },
            params: {
                employeeIds: listTTEmployeeIds,
                startDate,
                endDate,
            },
        });
        const listEmloyeeLeaveInfo = await this.leaveService.getTotalUnpaidDays({
            companyId: companyId,
            employeeIds: listEmployeeIds,
            startDate,
            endDate,
        });
        const listEmloyeePaidLeaveInfo = await this.leaveService.getTotalUnpaidDays({
            companyId: companyId,
            employeeIds: listEmployeeIds,
            startDate,
            endDate,
            paidLeave: true,
        });
        const result = listEmployeesInfo.reduce((acc, employee) => {
            const employeeLeaves = listEmloyeeLeaveInfo[employee.employeeId];
            const employeePaidLeaves = listEmloyeePaidLeaveInfo[employee.employeeId];
            const listDaysOff = employeeLeaves?.flatMap(leave => leave.daysOff.map(dayOff => ({
                id: leave.id,
                dayOff,
            })));
            const listWorkingFullDays = employeeLeaves?.flatMap(leave => leave.workingFullDay.map(workingFullDay => ({
                id: leave.id,
                workingFullDay,
            })));
            const listWorkingHalfDays = employeeLeaves?.flatMap(leave => leave.workingHalfDay.map(workingHalfDay => ({
                id: leave.id,
                workingHalfDay,
            })));
            const listPaidFullDays = employeePaidLeaves?.flatMap(leave => leave.workingFullDay.map(workingFullDay => ({
                id: leave.id,
                workingFullDay,
            })));
            const listPaidHalfDays = employeePaidLeaves?.flatMap(leave => leave.workingHalfDay.map(workingHalfDay => ({
                id: leave.id,
                workingHalfDay,
            })));
            const employeePaidInfo = listDayBetweenStartEnd.map(day => {
                const findDayOff = listDaysOff?.find(dayOff => dayOff.dayOff === day);
                if (findDayOff) {
                    return {
                        leaveId: findDayOff.id,
                        day: findDayOff.dayOff,
                        unPaidDay: 0,
                    };
                }
                if (listEmployeesTrackedInfo[employee.timeTrackerEmployeeId][day]
                    ?.listTimeEntries.length !== 0 ||
                    listEmployeesTrackedInfo[employee.timeTrackerEmployeeId][day]
                        ?.totalAddHour) {
                    return { day, unPaidDay: 0 };
                }
                const findWorkingFullDay = listWorkingFullDays?.find(fullDay => fullDay.workingFullDay === day);
                if (findWorkingFullDay) {
                    return {
                        day,
                        unPaidDay: 1,
                        leaveId: findWorkingFullDay.id,
                    };
                }
                const findWorkingHalfDay = listWorkingHalfDays
                    ?.filter(halfDay => halfDay.workingHalfDay === day)
                    .map(halfDay => ({
                    leaveId: halfDay.id,
                    day: halfDay.workingHalfDay,
                    unPaidDay: 0.5,
                }));
                if (findWorkingHalfDay?.length !== 0) {
                    return findWorkingHalfDay;
                }
                const findPaidFullDay = listPaidFullDays?.find(fullDay => fullDay.workingFullDay === day);
                if (findPaidFullDay) {
                    return {
                        day,
                        unPaidDay: 0,
                        leaveId: findPaidFullDay.id,
                    };
                }
                const findPaidHalfDay = listPaidHalfDays
                    ?.filter(halfDay => halfDay.workingHalfDay === day)
                    .map(halfDay => ({
                    leaveId: halfDay.id,
                    day: halfDay.workingHalfDay,
                    unPaidDay: 0.5,
                }));
                if (findPaidHalfDay?.length >= 2) {
                    return {
                        day: day,
                        unPaidDay: 0,
                    };
                }
                else if (findPaidHalfDay?.length !== 0)
                    return findPaidHalfDay;
                return {
                    day: day,
                    unPaidDay: 1,
                };
            });
            acc[employee.employeeId] = employeePaidInfo
                .flatMap(item => item)
                .filter(item => item?.unPaidDay !== 0);
            return acc;
        }, {});
        return {
            UnpaidInfo: result,
            LeaveInfo: listEmloyeeLeaveInfo,
            trackedInfo: listEmployeesTrackedInfo,
        };
    }
    async handleRecompute(companyId, ttCompanyId, userEmail, payrollHeaderId) {
        const payrollHeader = await this.prtrxHdrService.getPayrollHeaderById(payrollHeaderId);
        if (!payrollHeader?.syncTimeTracker) {
            return [];
        }
        const startDate = payrollHeader?.dateFrom
            ? moment(payrollHeader.dateFrom).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const endDate = payrollHeader?.dateTo
            ? moment(payrollHeader.dateTo).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const employeeIds = await this.prtrxHdrService.getEmployeesOfPrtrxHdr(payrollHeaderId);
        const data = await this.handleCalculateUnpaidDaysTimeTracker(employeeIds, startDate, endDate, companyId, ttCompanyId);
        const unPaidDayData = data.UnpaidInfo;
        const result = await this.createMultiAdjustmentsFromTimeTracker(unPaidDayData, payrollHeaderId, companyId, userEmail);
        return { result };
    }
    async handleCalculateUnpaidDaysFromLeave(listEmployeeIds, startDate, endDate, companyId) {
        const listDayBetweenStartEnd = startDate && endDate
            ? (0, common_2.getDaysBetweenDates)(startDate, endDate)
            : (0, common_2.getCurrentWeek)();
        const listEmloyeeLeaveInfo = await this.leaveService.getTotalUnpaidDays({
            companyId: companyId,
            employeeIds: listEmployeeIds,
            startDate,
            endDate,
        });
        const result = listEmployeeIds.reduce((acc, employeeId) => {
            const employeeLeaves = listEmloyeeLeaveInfo[employeeId];
            const listDaysOff = employeeLeaves?.flatMap(leave => leave.daysOff.map(dayOff => ({
                id: leave.id,
                dayOff,
            })));
            const listWorkingFullDays = employeeLeaves?.flatMap(leave => leave.workingFullDay.map(workingFullDay => ({
                id: leave.id,
                workingFullDay,
            })));
            const listWorkingHalfDays = employeeLeaves?.flatMap(leave => leave.workingHalfDay.map(workingHalfDay => ({
                id: leave.id,
                workingHalfDay,
            })));
            const employeePaidInfo = listDayBetweenStartEnd.map(day => {
                const findDayOff = listDaysOff?.find(dayOff => dayOff.dayOff === day);
                if (findDayOff) {
                    return {
                        leaveId: findDayOff.id,
                        day: findDayOff.dayOff,
                        unPaidDay: 0,
                    };
                }
                const findWorkingFullDay = listWorkingFullDays?.find(fullDay => fullDay.workingFullDay === day);
                if (findWorkingFullDay) {
                    return {
                        day,
                        unPaidDay: 1,
                        leaveId: findWorkingFullDay.id,
                    };
                }
                const findWorkingHalfDay = listWorkingHalfDays
                    ?.filter(halfDay => halfDay.workingHalfDay === day)
                    .map(halfDay => ({
                    leaveId: halfDay.id,
                    day: halfDay.workingHalfDay,
                    unPaidDay: 0.5,
                }));
                if (findWorkingHalfDay?.length !== 0) {
                    return findWorkingHalfDay;
                }
                return {
                    day: day,
                    unPaidDay: 0,
                };
            });
            acc[employeeId] = employeePaidInfo
                .flatMap(item => item)
                .filter(item => item?.unPaidDay !== 0);
            return acc;
        }, {});
        return {
            UnpaidInfo: result,
            LeaveInfo: listEmloyeeLeaveInfo,
        };
    }
    async handleRecomputeFromLeave(companyId, userEmail, payrollHeaderId) {
        const payrollHeader = await this.prtrxHdrService.getPayrollHeaderById(payrollHeaderId);
        const startDate = payrollHeader?.dateFrom
            ? moment(payrollHeader.dateFrom).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const endDate = payrollHeader?.dateTo
            ? moment(payrollHeader.dateTo).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const employeeIds = await this.prtrxHdrService.getEmployeesOfPrtrxHdr(payrollHeaderId);
        const data = await this.handleCalculateUnpaidDaysFromLeave(employeeIds, startDate, endDate, companyId);
        const unPaidDayData = data.UnpaidInfo;
        const result = await this.createMultiAdjustmentsFromTimeTracker(unPaidDayData, payrollHeaderId, companyId, userEmail);
        const updatedResults = [];
        for (const entity of result) {
            const updatedResult = this.getAdjustmentById(entity.id, companyId);
            updatedResults.push(updatedResult);
        }
        return Promise.all(updatedResults);
    }
    async getCycleDateRange(employeeId, companyId, date, employeeEntity) {
        let employee = null;
        if (!employeeEntity) {
            employee = await this.employeeService.getEmployeeById(companyId, employeeId);
            if (!employee) {
                throw new common_1.NotFoundException('Employee not found');
            }
        }
        else
            employee = employeeEntity;
        const year = moment(date).year();
        const cyclePeriodHeaderList = await this.cyclePeriodHeaderRepository.find();
        const cyclePeriodDetailList = await this.cyclePeriodDetailRepository.find();
        const cycPrdHdrIds = cyclePeriodHeaderList
            .filter(hdr => hdr.cycleFrequencyId === employee.payrollFrequencyId &&
            (hdr.year === year || hdr.year === year - 1))
            .map(hdr => hdr.id);
        if (!cycPrdHdrIds || cycPrdHdrIds.length === 0) {
            throw new common_1.NotFoundException(`cycPrdHdrIds is null in getCycleDateRange based on date = ${moment(date).format('YYYY-MM-DD')} for Employee Ref = ${employee.employeeRef}`);
        }
        const cycPrdDtlList = cyclePeriodDetailList.filter(dtl => cycPrdHdrIds.includes(dtl.cyclePeriodHeaderId));
        if (!cycPrdDtlList || cycPrdDtlList.length === 0) {
            throw new common_1.NotFoundException(`cycPrdDtlList is null in getCycleDateRange based on date = ${moment(date).format('YYYY-MM-DD')}`);
        }
        const dateMoment = moment(date);
        const cyclePeriodDetail = cycPrdDtlList.find(dtl => dateMoment.isBetween(moment(dtl.dateFrom, 'YYYY-MM-DD'), moment(dtl.dateTo, 'YYYY-MM-DD'), 'days', '[]'));
        if (cyclePeriodDetail) {
            return {
                dateFrom: moment(cyclePeriodDetail.dateFrom).format('YYYY-MM-DD'),
                dateTo: moment(cyclePeriodDetail.dateTo).format('YYYY-MM-DD'),
            };
        }
        throw new common_1.NotFoundException(`No cycle period detail found for the given date ${moment(date).format('YYYY-MM-DD')}`);
    }
    async getDayToProrate(payrollId, companyId, date) {
        const employee = await this.employeeService.getEmployeeByPayrollTimesheetId(payrollId, companyId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        const payrollGroup = await this.payrollGroupService.getPayrollGroupById(companyId, employee.payrollGroupId);
        const { dateFrom, dateTo } = await this.getCycleDateRange(employee.id, companyId, date, employee);
        const workScheduleEntity = await this.workScheduleService.getWorkScheduleOfEmployee(employee.id, companyId, employee);
        const listDayBetweenStartEnd = dateFrom && dateTo
            ? (0, common_2.getDaysBetweenDates)(dateFrom, dateTo)
            : (0, common_2.getCurrentWeek)();
        let totalScheduledWorkHours = 0;
        let totalScheduledWorkDays = 0;
        for (const trackingInfo of listDayBetweenStartEnd) {
            const weekDay = (0, common_2.convertDayToWeekDay)(trackingInfo);
            const daySchedule = workScheduleEntity?.daySchedules?.find(item => item.day === weekDay);
            if (daySchedule) {
                totalScheduledWorkDays++;
                if (workScheduleEntity.workArrangement === common_2.WorkArrangement.FIXED) {
                    totalScheduledWorkHours +=
                        (0, database_1.getDiffStringTimeFromTo)(daySchedule.from, daySchedule.to) / 60;
                }
                else if (workScheduleEntity.workArrangement === common_2.WorkArrangement.FLEXIBLE) {
                    totalScheduledWorkHours +=
                        daySchedule.unitTime === common_2.UnitTime.MINUTE
                            ? Math.floor(daySchedule.duration / 60)
                            : daySchedule.unitTime === common_2.UnitTime.SECOND
                                ? Math.floor(daySchedule.duration / 3600)
                                : daySchedule.duration;
                }
            }
        }
        const totalDayInCycle = moment(dateTo, 'YYYY-MM-DD').diff(moment(dateFrom, 'YYYY-MM-DD'), 'days') + 1;
        const halfMonth = totalDayInCycle <= 20;
        let result = totalDayInCycle;
        if (payrollGroup.useStdWorkDay) {
            result = payrollGroup.stdWorkDay;
            if (payrollGroup.stdDayByYear)
                result = payrollGroup.stdWorkDay / 12;
            if (halfMonth) {
                result /= 2;
            }
            return {
                workScheduleEntity,
                totalProrationDays: employee.payCalcMet === 1 ? result : result * payrollGroup.hourPerDay,
            };
        }
        else if (payrollGroup.useCalendarDay)
            return {
                workScheduleEntity,
                totalProrationDays: employee.payCalcMet === 1 ? result : result * payrollGroup.hourPerDay,
            };
        return {
            workScheduleEntity,
            totalProrationDays: employee.payCalcMet === 1
                ? totalScheduledWorkDays
                : totalScheduledWorkHours,
        };
    }
    async getDayToProrateV2(payrollId, companyId, date) {
        const employee = await this.employeeService.getEmployeeByPayrollTimesheetId(payrollId, companyId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        const payrollGroup = await this.payrollGroupService.getPayrollGroupById(companyId, employee.payrollGroupId);
        const { dateFrom, dateTo } = await this.getCycleDateRange(employee.id, companyId, date, employee);
        const listDayBetweenStartEnd = dateFrom && dateTo
            ? (0, common_2.getDaysBetweenDates)(dateFrom, dateTo)
            : (0, common_2.getCurrentWeek)();
        let dateWorkScheduleEntity = {};
        let totalScheduledWorkHours = 0;
        let totalScheduledWorkDays = 0;
        const workScheduleMap = await this.workScheduleService.getWorkScheduleOfEmployeeInDateRange({
            employeeId: employee.id,
            companyId,
            startDate: dateFrom,
            endDate: dateTo,
        });
        for (const trackingInfo of listDayBetweenStartEnd) {
            const workScheduleEntity = workScheduleMap[trackingInfo];
            if (!workScheduleEntity)
                continue;
            if (moment(trackingInfo).format('YYYY-MM-DD') ===
                moment(date).format('YYYY-MM-DD')) {
                dateWorkScheduleEntity = workScheduleEntity;
            }
            const weekDay = (0, common_2.convertDayToWeekDay)(trackingInfo);
            const daySchedule = workScheduleEntity?.daySchedules?.find(item => item.day === weekDay);
            if (daySchedule) {
                totalScheduledWorkDays++;
                if (workScheduleEntity.workArrangement === common_2.WorkArrangement.FIXED) {
                    totalScheduledWorkHours +=
                        (0, database_1.getDiffStringTimeFromTo)(daySchedule.from, daySchedule.to) / 60;
                }
                else if (workScheduleEntity.workArrangement === common_2.WorkArrangement.FLEXIBLE) {
                    totalScheduledWorkHours +=
                        daySchedule.unitTime === common_2.UnitTime.MINUTE
                            ? Math.floor(daySchedule.duration / 60)
                            : daySchedule.unitTime === common_2.UnitTime.SECOND
                                ? Math.floor(daySchedule.duration / 3600)
                                : daySchedule.duration;
                }
            }
        }
        const totalDayInCycle = moment(dateTo, 'YYYY-MM-DD').diff(moment(dateFrom, 'YYYY-MM-DD'), 'days') + 1;
        const halfMonth = totalDayInCycle <= 20;
        let result = totalDayInCycle;
        if (payrollGroup.useStdWorkDay) {
            result = payrollGroup.stdWorkDay;
            if (payrollGroup.stdDayByYear)
                result = payrollGroup.stdWorkDay / 12;
            if (halfMonth) {
                result /= 2;
            }
            return {
                workScheduleEntity: dateWorkScheduleEntity,
                totalProrationDays: employee.payCalcMet === 1 ? result : result * payrollGroup.hourPerDay,
            };
        }
        else if (payrollGroup.useCalendarDay)
            return {
                workScheduleEntity: dateWorkScheduleEntity,
                totalProrationDays: employee.payCalcMet === 1 ? result : result * payrollGroup.hourPerDay,
            };
        return {
            workScheduleEntity: dateWorkScheduleEntity,
            totalProrationDays: employee.payCalcMet === 1
                ? totalScheduledWorkDays
                : totalScheduledWorkHours,
        };
    }
};
exports.TimeSheetAdjustmentService = TimeSheetAdjustmentService;
exports.TimeSheetAdjustmentService = TimeSheetAdjustmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.TimeSheetAdjustmentEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(payroll_timesheet_entity_1.PayrollTimeSheetEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(database_1.CyclePeriodHeaderEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(database_1.CyclePeriodDetailEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        work_schedule_1.WorkScheduleService,
        employee_mapping_service_1.EmployeeMappingService,
        api_service_1.TimeTrackerApiService,
        services_1.LeaveService,
        employee_service_1.EmployeeService,
        prtrx_hdr_service_1.PrtrxHdrService,
        pay_element_mapping_service_1.PayElementMappingService,
        payroll_group_service_1.PayRollGroupService,
        work_schedule_assignment_service_1.WorkScheduleAssignmentService])
], TimeSheetAdjustmentService);
//# sourceMappingURL=timesheet-adjustment.service.js.map
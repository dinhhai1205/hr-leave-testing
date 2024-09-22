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
exports.PayrollTimeSheetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exceljs_1 = require("exceljs");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const database_1 = require("../../../../core/database");
const payroll_timesheet_entity_1 = require("../../../../core/database/entities/payroll-timesheet.entity");
const payroll_group_service_1 = require("../../../payroll/modules/payroll-group/payroll-group.service");
const prtrx_emp_service_1 = require("../../../payroll/modules/prtrx-emp/prtrx-emp.service");
const prtrx_hdr_service_1 = require("../../../payroll/modules/prtrx-hdr/prtrx-hdr.service");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const common_2 = require("../../common");
const constants_1 = require("../timesheet-adjustment/constants");
const services_1 = require("../timesheet-adjustment/services");
const work_schedule_1 = require("../work-schedule");
const constants_2 = require("./constants");
const payrolll_timesheet_sample_data_constant_1 = require("./constants/payrolll-timesheet-sample-data.constant");
let PayrollTimeSheetService = class PayrollTimeSheetService extends database_1.TypeOrmBaseService {
    constructor(payrollTimeSheetRepository, timeSheetAdjustmentService, workScheduleService, employeeService, prtrxHdrService, prtrxEmpService, payrollGroupService) {
        super(payrollTimeSheetRepository);
        this.payrollTimeSheetRepository = payrollTimeSheetRepository;
        this.timeSheetAdjustmentService = timeSheetAdjustmentService;
        this.workScheduleService = workScheduleService;
        this.employeeService = employeeService;
        this.prtrxHdrService = prtrxHdrService;
        this.prtrxEmpService = prtrxEmpService;
        this.payrollGroupService = payrollGroupService;
    }
    async createPayroll(createPayrollDto, companyId, userEmail) {
        const { employeeId, prtrxHdrId } = createPayrollDto;
        const employeeEntity = await this.employeeService.getEmployeeById(companyId, employeeId);
        if (!employeeEntity) {
            throw new common_1.NotFoundException('Employee not found');
        }
        if (!prtrxHdrId) {
            throw new common_1.BadRequestException('Payroll header id must be provided');
        }
        const payroll = await this.payrollTimeSheetRepository.findOne({
            where: {
                employeeId: employeeId,
                prtrxHdrId,
            },
        });
        if (payroll)
            throw new common_1.BadRequestException('Payroll with payroll transaction header have already existed');
        const payrollGroup = await this.employeeService.getPayrollGroupByEmployeeId(employeeId, companyId);
        const payrollHeader = await this.prtrxHdrService.getPayrollHeaderById(prtrxHdrId);
        const startDate = payrollHeader?.dateFrom
            ? moment(payrollHeader.dateFrom).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const endDate = payrollHeader?.dateTo
            ? moment(payrollHeader.dateTo).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const listDayBetweenStartEnd = startDate && endDate
            ? (0, common_2.getDaysBetweenDates)(startDate, endDate)
            : (0, common_2.getCurrentWeek)();
        const workScheduleEntity = await this.workScheduleService.getWorkScheduleOfEmployee(employeeId, companyId, employeeEntity);
        let totalScheduledWorkHours = 0;
        let totalScheduledWorkDays = 0;
        listDayBetweenStartEnd.forEach(trackingInfo => {
            const weekDay = (0, common_2.convertDayToWeekDay)(trackingInfo);
            const daySchedule = workScheduleEntity?.daySchedules?.find(item => {
                return item.day === weekDay;
            });
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
        });
        const totalProrationDays = await this.getDayToProrate(companyId, employeeEntity.payrollGroupId, startDate, endDate);
        const finalTotalScheduledWorkDays = totalProrationDays !== -1 ? totalProrationDays : totalScheduledWorkDays;
        const finalTotalScheduledWorkHours = totalProrationDays !== -1
            ? totalProrationDays * payrollGroup?.hourPerDay
            : totalScheduledWorkHours;
        return this.create({
            employeeId,
            prtrxHdrId: createPayrollDto?.prtrxHdrId,
            totalScheduledWorkDays: finalTotalScheduledWorkDays,
            totalScheduledWorkHours: finalTotalScheduledWorkHours,
            totalPayrollRegularWorkDays: employeeEntity.payCalcMet === 1
                ? finalTotalScheduledWorkDays
                : finalTotalScheduledWorkHours,
        }, {
            companyId,
            userEmail,
        });
    }
    async createMultiPayrolls(createPayrollDto, companyId, userEmail) {
        const { employeeIds, prtrxHdrId } = createPayrollDto;
        if (!prtrxHdrId) {
            throw new common_1.BadRequestException('Payroll header id must be provided');
        }
        const payrollHeader = await this.prtrxHdrService.getPayrollHeaderById(prtrxHdrId);
        const startDate = payrollHeader?.dateFrom
            ? moment(payrollHeader.dateFrom).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const endDate = payrollHeader?.dateTo
            ? moment(payrollHeader.dateTo).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const listDayBetweenStartEnd = startDate && endDate
            ? (0, common_2.getDaysBetweenDates)(startDate, endDate)
            : (0, common_2.getCurrentWeek)();
        const employees = await Promise.all(employeeIds.map(async (employeeId) => {
            const employeeEntity = await this.employeeService.getEmployeeById(companyId, employeeId);
            if (!employeeEntity) {
                return null;
            }
            const payroll = await this.payrollTimeSheetRepository.findOne({
                where: {
                    employeeId: employeeId,
                    prtrxHdrId,
                    isDeleted: false,
                },
            });
            if (payroll)
                return null;
            return employeeEntity;
        }));
        const employeeEntities = employees.filter(employee => employee !== null);
        const workScheduleEntities = await Promise.all(employeeEntities.map(async (employeeEntity) => {
            const workScheduleEntity = await this.workScheduleService.getWorkScheduleOfEmployee(employeeEntity.id, companyId, employeeEntity);
            const totalProrationDays = await this.getDayToProrate(companyId, employeeEntity.payrollGroupId, startDate, endDate);
            return {
                employeeId: employeeEntity.id,
                payCalcMet: employeeEntity.payCalcMet,
                totalProrationDays,
                ...workScheduleEntity,
            };
        }));
        const createDtos = await Promise.all(workScheduleEntities.map(async (workScheduleEntity) => {
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
            const payrollGroup = await this.employeeService.getPayrollGroupByEmployeeId(workScheduleEntity.employeeId, companyId);
            const finalTotalScheduledWorkDays = workScheduleEntity.totalProrationDays !== -1
                ? workScheduleEntity.totalProrationDays
                : totalScheduledWorkDays;
            const finalTotalScheduledWorkHours = workScheduleEntity.totalProrationDays !== -1
                ? workScheduleEntity.totalProrationDays * payrollGroup.hourPerDay
                : totalScheduledWorkHours;
            return {
                employeeId: workScheduleEntity.employeeId,
                prtrxHdrId: createPayrollDto?.prtrxHdrId,
                totalScheduledWorkDays: finalTotalScheduledWorkDays,
                totalScheduledWorkHours: finalTotalScheduledWorkHours,
                totalPayrollRegularWorkDays: workScheduleEntity.payCalcMet === 1
                    ? finalTotalScheduledWorkDays
                    : finalTotalScheduledWorkHours,
            };
        }));
        return this.createMulti(createDtos, {
            companyId,
            userEmail,
        });
    }
    async createMultiPayrollsV2(createPayrollDto, companyId, userEmail) {
        const { employeeIds, prtrxHdrId } = createPayrollDto;
        if (!prtrxHdrId) {
            throw new common_1.BadRequestException('Payroll header id must be provided');
        }
        const payrollHeader = await this.prtrxHdrService.getPayrollHeaderById(prtrxHdrId);
        const startDate = payrollHeader?.dateFrom
            ? moment(payrollHeader.dateFrom).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const endDate = payrollHeader?.dateTo
            ? moment(payrollHeader.dateTo).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const listDayBetweenStartEnd = startDate && endDate
            ? (0, common_2.getDaysBetweenDates)(startDate, endDate)
            : (0, common_2.getCurrentWeek)();
        const employees = await this.employeeService.getEmployeeByIdsWithoutRelations(employeeIds);
        const existingPayrolls = await this.payrollTimeSheetRepository.find({
            where: { prtrxHdrId, employeeId: (0, typeorm_2.In)(employeeIds), isDeleted: false },
        });
        const existingPayrollEmployeeIds = new Set(existingPayrolls.map(p => p.employeeId));
        const employeeEntities = employees.filter(employee => !existingPayrollEmployeeIds.has(employee.id));
        if (employeeEntities.length === 0) {
            return [];
        }
        const workScheduleEntities = await Promise.all(employeeEntities.map(async (employeeEntity) => {
            const workScheduleEntity = await this.workScheduleService.getWorkScheduleOfEmployee(employeeEntity.id, companyId, employeeEntity);
            const totalProrationDays = await this.getDayToProrate(companyId, employeeEntity.payrollGroupId, startDate, endDate);
            return {
                employeeId: employeeEntity.id,
                payCalcMet: employeeEntity.payCalcMet,
                totalProrationDays,
                payrollGroupId: employeeEntity.payrollGroupId,
                ...workScheduleEntity,
            };
        }));
        const payrollGroups = await this.employeeService.getPayrollGroupsByEmployeeIds(employeeEntities.map(e => e.id), companyId);
        const createDtos = workScheduleEntities.map(workScheduleEntity => {
            let totalScheduledWorkHours = 0;
            let totalScheduledWorkDays = 0;
            const payrollGroup = payrollGroups.find(pg => pg.id === workScheduleEntity.payrollGroupId);
            if (!payrollGroup)
                throw new common_1.NotFoundException(`Not found payroll groups for employee: ${workScheduleEntity.employeeId}`);
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
            const finalTotalScheduledWorkDays = workScheduleEntity.totalProrationDays !== -1
                ? workScheduleEntity.totalProrationDays
                : totalScheduledWorkDays;
            const finalTotalScheduledWorkHours = workScheduleEntity.totalProrationDays !== -1
                ? workScheduleEntity.totalProrationDays * payrollGroup.hourPerDay
                : totalScheduledWorkHours;
            return {
                employeeId: workScheduleEntity.employeeId,
                prtrxHdrId: createPayrollDto?.prtrxHdrId,
                totalScheduledWorkDays: finalTotalScheduledWorkDays,
                totalScheduledWorkHours: finalTotalScheduledWorkHours,
                totalPayrollRegularWorkDays: workScheduleEntity.payCalcMet === 1
                    ? finalTotalScheduledWorkDays
                    : finalTotalScheduledWorkHours,
            };
        });
        return this.createMulti(createDtos, {
            companyId,
            userEmail,
        });
    }
    async createPayrollsForEmployeesInPrtrxHdr(createQuery, prtrxHdrId, companyId, userEmail) {
        const employees = await this.prtrxEmpService.getEmployeesByPrtrxHdrId(prtrxHdrId, true);
        const employeeIds = employees.map(employee => employee.employeeId);
        if (employeeIds.length === 0)
            return [];
        await this.createMultiPayrollsV2({
            employeeIds,
            prtrxHdrId,
        }, companyId, userEmail);
        return this.getPayrollsByHeaderIdV2(prtrxHdrId, companyId, createQuery?.payrollCalculationMethod || database_1.PayCalculationMethod.Daily, createQuery);
    }
    async archivePayroll(payrollId, userEmail) {
        const payroll = await this.getOne({
            where: {
                id: payrollId,
                isDeleted: false,
            },
        });
        if (!payroll)
            throw new common_1.NotFoundException('Payroll not found');
        await this.delete(payrollId, {
            userEmail,
        });
        return payroll;
    }
    async restorePayroll(payrollId, userEmail) {
        const payroll = await this.payrollTimeSheetRepository.findOne({
            where: {
                id: payrollId,
                isDeleted: true,
            },
        });
        if (!payroll)
            throw new common_1.NotFoundException('Payroll not found');
        await this.payrollTimeSheetRepository.update({
            id: payrollId,
            isDeleted: true,
        }, {
            isDeleted: false,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        return payroll;
    }
    async updatePayroll(payrollId, updatePayload, userEmail) {
        const payroll = await this.payrollTimeSheetRepository.findOne({
            where: {
                id: payrollId,
                isDeleted: false,
            },
        });
        if (!payroll)
            throw new common_1.NotFoundException('Payroll not found');
        await this.payrollTimeSheetRepository.update({
            id: payrollId,
            isDeleted: false,
        }, {
            ...updatePayload,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        return payroll;
    }
    async getEntityUpdatePayrollRegularWorkDays(payrollId, companyId, userEmail) {
        const payroll = await this.payrollTimeSheetRepository.findOne({
            where: {
                id: payrollId,
                isDeleted: false,
                companyId,
            },
        });
        if (!payroll)
            throw new common_1.NotFoundException('Payroll not found');
        const totalPayrollRegularWorkDays = await this.calculatePayrollRegularWorkDays(payrollId, companyId);
        if (totalPayrollRegularWorkDays !== -1 &&
            totalPayrollRegularWorkDays !== payroll.totalPayrollRegularWorkDays) {
            return {
                id: payroll.id,
                totalPayrollRegularWorkDays: totalPayrollRegularWorkDays,
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
            };
        }
        return null;
    }
    async updatePayrollsWorksheduledDays(prtrxHdrId, companyId, userEmail) {
        const employeesInPrtrxHdr = await this.prtrxEmpService.getEmployeesByPrtrxHdrId(prtrxHdrId, true);
        const employeeIds = employeesInPrtrxHdr.map(employee => employee.employeeId);
        if (employeeIds.length === 0)
            return [];
        const payrollHeader = await this.prtrxHdrService.getPayrollHeaderById(prtrxHdrId);
        const startDate = payrollHeader?.dateFrom
            ? moment(payrollHeader.dateFrom).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const endDate = payrollHeader?.dateTo
            ? moment(payrollHeader.dateTo).format('YYYY-MM-DD')
            : moment(Date.now()).format('YYYY-MM-DD');
        const listDayBetweenStartEnd = startDate && endDate
            ? (0, common_2.getDaysBetweenDates)(startDate, endDate)
            : (0, common_2.getCurrentWeek)();
        const employees = await Promise.all(employeeIds.map(async (employeeId) => {
            const employeeEntity = await this.employeeService.getEmployeeById(companyId, employeeId);
            if (!employeeEntity) {
                return null;
            }
            return employeeEntity;
        }));
        const employeeEntities = employees.filter(employee => employee !== null);
        const workScheduleEntities = await Promise.all(employeeEntities.map(async (employeeEntity) => {
            const workScheduleEntity = await this.workScheduleService.getWorkScheduleOfEmployee(employeeEntity.id, companyId, employeeEntity);
            const totalProrationDays = await this.getDayToProrate(companyId, employeeEntity.payrollGroupId, startDate, endDate);
            const payrollTimesheet = await this.payrollTimeSheetRepository.findOne({
                where: {
                    employeeId: employeeEntity.id,
                    prtrxHdrId: prtrxHdrId,
                    companyId,
                },
            });
            return {
                employeeId: employeeEntity.id,
                payCalcMet: employeeEntity.payCalcMet,
                totalProrationDays,
                payrollTimesheetEntity: payrollTimesheet
                    ? payrollTimesheet
                    : undefined,
                ...workScheduleEntity,
            };
        }));
        const createDtos = await Promise.all(workScheduleEntities.map(async (workScheduleEntity) => {
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
            const payrollGroup = await this.employeeService.getPayrollGroupByEmployeeId(workScheduleEntity.employeeId, companyId);
            const prId = workScheduleEntity.payrollTimesheetEntity?.id;
            return {
                id: prId,
                totalScheduledWorkDays: workScheduleEntity.totalProrationDays !== -1
                    ? workScheduleEntity.totalProrationDays
                    : totalScheduledWorkDays,
                totalScheduledWorkHours: workScheduleEntity.totalProrationDays !== -1
                    ? workScheduleEntity.totalProrationDays * payrollGroup.hourPerDay
                    : totalScheduledWorkHours,
                createdBy: !prId ? userEmail : undefined,
                createdOn: !prId ? moment.utc().toDate() : undefined,
                updatedBy: prId ? userEmail : undefined,
                updatedOn: prId ? moment.utc().toDate() : undefined,
            };
        }));
        const updatedPayroll = await this.payrollTimeSheetRepository.save(createDtos);
        return updatedPayroll;
    }
    async getAllPayrollsOfCompany(companyId, payrollCalculationMethod = database_1.PayCalculationMethod.Daily, paginationQueryDto) {
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const queryBuilder = await this.payrollTimeSheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.is_deleted = :isDeleted AND ${employeeAlias}.id = ${payrollAlias}.employee_id AND ${employeeAlias}.active = :isActive`, { isDeleted: false, isActive: true })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.is_deleted = :isDeleted AND ${employeeAlias}.pay_calc_met = :calculationMethod`, {
            companyId: companyId,
            isDeleted: false,
            calculationMethod: payrollCalculationMethod === database_1.PayCalculationMethod.Daily ? 1 : 2,
        });
        const { q: querySearchString, querySearchFields = [
            constants_2.QUERY_FIELDS.FULL_NAME_LOCAL,
        ], } = paginationQueryDto;
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
        const payrolls = rawResult.data;
        const updatedDtos = [];
        for (const payroll of payrolls) {
            const updatedDto = await this.getEntityUpdatePayrollRegularWorkDays(payroll.id, companyId, payroll.createdBy);
            if (updatedDto !== null) {
                updatedDtos.push(updatedDto);
                payroll.totalPayrollRegularWorkDays =
                    updatedDto.totalPayrollRegularWorkDays;
            }
        }
        if (updatedDtos.length > 0) {
            await this.payrollTimeSheetRepository.save(updatedDtos);
        }
        const results = payrolls.map(async (value) => {
            const adjustments = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollId(value.id, companyId, payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? database_1.TimeAdjustmentType.Date
                : database_1.TimeAdjustmentType.Hour);
            const unpaid = [];
            const adjustmentDaysAddition = [];
            const adjustmentDaysDeduction = [];
            for (const adjustment of adjustments) {
                switch (adjustment.timeSheetType) {
                    case database_1.TimeSheetAdjustmentType.Unpaid:
                        unpaid.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition:
                        adjustmentDaysAddition.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction:
                        adjustmentDaysDeduction.push(adjustment);
                        break;
                    default:
                        break;
                }
            }
            const adjustmentDaysAdditionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysAddition.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysAddition.reduce((acc, day) => (acc += day.hour), 0);
            const adjustmentDaysDeductionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysDeduction.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysDeduction.reduce((acc, day) => (acc += day.hour), 0);
            const unpaidDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? unpaid.reduce((acc, day) => (acc += day.day), 0)
                : unpaid.reduce((acc, day) => (acc += day.hour), 0);
            return {
                fullNameLocal: value?.employee?.fullNameLocal || null,
                fullNameEn: value?.employee?.fullNameEn || null,
                employeeRef: value?.employee?.employeeRef || null,
                orgElement: value?.employee?.orgStructure?.name || null,
                payrollGroup: value?.employee?.payrollGroups?.code || null,
                costCenter: value?.employee?.costCenter?.name || null,
                totalScheduledWorkDays: payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                    ? value.totalScheduledWorkDays
                    : undefined,
                totalScheduledWorkHours: payrollCalculationMethod === database_1.PayCalculationMethod.Hourly
                    ? value.totalScheduledWorkHours
                    : undefined,
                adjustmentDaysAdditionDays,
                adjustmentDaysDeductionDays,
                unpaidDays,
                totalPayrollRegularWorkDays: value.totalPayrollRegularWorkDays,
                adjustments,
            };
        });
        const updatedData = await Promise.all(results);
        return {
            ...rawResult,
            data: updatedData,
        };
    }
    async getAllPayrollsOfEmployee(employeeId, companyId, payrollCalculationMethod = database_1.PayCalculationMethod.Daily, paginationQueryDto) {
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const queryBuilder = await this.payrollTimeSheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.is_deleted = :isDeleted AND ${employeeAlias}.id = ${payrollAlias}.employee_id AND ${employeeAlias}.active = :isActive`, { isDeleted: false, isActive: true })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.employee_id = :employeeId AND ${employeeAlias}.pay_calc_met = :calculationMethod`, {
            companyId: companyId,
            isDeleted: false,
            employeeId: employeeId,
            calculationMethod: payrollCalculationMethod === database_1.PayCalculationMethod.Daily ? 1 : 2,
        });
        const { q: querySearchString, querySearchFields = [
            constants_2.QUERY_FIELDS.FULL_NAME_LOCAL,
        ], } = paginationQueryDto;
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
        const payrolls = rawResult.data;
        const updatedDtos = [];
        for (const payroll of payrolls) {
            const updatedDto = await this.getEntityUpdatePayrollRegularWorkDays(payroll.id, companyId, payroll.createdBy);
            if (updatedDto !== null) {
                updatedDtos.push(updatedDto);
                payroll.totalPayrollRegularWorkDays =
                    updatedDto.totalPayrollRegularWorkDays;
            }
        }
        if (updatedDtos.length > 0) {
            await this.payrollTimeSheetRepository.save(updatedDtos);
        }
        const results = payrolls.map(async (value) => {
            const adjustments = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollId(value.id, companyId, payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? database_1.TimeAdjustmentType.Date
                : database_1.TimeAdjustmentType.Hour);
            const unpaid = [];
            const adjustmentDaysAddition = [];
            const adjustmentDaysDeduction = [];
            for (const adjustment of adjustments) {
                switch (adjustment.timeSheetType) {
                    case database_1.TimeSheetAdjustmentType.Unpaid:
                        unpaid.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition:
                        adjustmentDaysAddition.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction:
                        adjustmentDaysDeduction.push(adjustment);
                        break;
                    default:
                        break;
                }
            }
            const adjustmentDaysAdditionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysAddition.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysAddition.reduce((acc, day) => (acc += day.hour), 0);
            const adjustmentDaysDeductionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysDeduction.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysDeduction.reduce((acc, day) => (acc += day.hour), 0);
            const unpaidDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? unpaid.reduce((acc, day) => (acc += day.day), 0)
                : unpaid.reduce((acc, day) => (acc += day.hour), 0);
            return {
                fullNameLocal: value?.employee?.fullNameLocal || null,
                fullNameEn: value?.employee?.fullNameEn || null,
                employeeRef: value?.employee?.employeeRef || null,
                orgElement: value?.employee?.orgStructure?.name || null,
                payrollGroup: value?.employee?.payrollGroups?.code || null,
                costCenter: value?.employee?.costCenter?.name || null,
                totalScheduledWorkDays: payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                    ? value.totalScheduledWorkDays
                    : undefined,
                totalScheduledWorkHours: payrollCalculationMethod === database_1.PayCalculationMethod.Hourly
                    ? value.totalScheduledWorkHours
                    : undefined,
                adjustmentDaysAdditionDays,
                adjustmentDaysDeductionDays,
                unpaidDays,
                totalPayrollRegularWorkDays: value.totalPayrollRegularWorkDays,
                adjustments,
            };
        });
        const updatedData = await Promise.all(results);
        return {
            ...rawResult,
            data: updatedData,
        };
    }
    async getPayrollsByHeaderId(payrollHeaderId, companyId, payrollCalculationMethod = database_1.PayCalculationMethod.Daily, paginationQueryDto) {
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const prtrxEmpAlias = database_1.ETableName.PRTRX_EMP;
        const queryBuilder = await this.payrollTimeSheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.is_deleted = :isDeleted AND ${employeeAlias}.id = ${payrollAlias}.employee_id AND ${employeeAlias}.active = :isActive`, { isDeleted: false, isActive: true })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.prtrxEmps`, prtrxEmpAlias, `${prtrxEmpAlias}.employee_id = ${employeeAlias}.id AND ${prtrxEmpAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.prtrx_hdr_id = :prtrxHdrId AND ${employeeAlias}.pay_calc_met = :calculationMethod AND ${prtrxEmpAlias}.included = :included AND ${prtrxEmpAlias}.payroll_trx_header_id = :prtrxHdrId`, {
            companyId: companyId,
            isDeleted: false,
            prtrxHdrId: payrollHeaderId,
            calculationMethod: payrollCalculationMethod === database_1.PayCalculationMethod.Daily ? 1 : 2,
            included: true,
        });
        const { q: querySearchString, querySearchFields = [
            constants_2.QUERY_FIELDS.FULL_NAME_LOCAL,
        ], } = paginationQueryDto;
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
        const payrolls = rawResult.data;
        const updatedDtos = [];
        for (const payroll of payrolls) {
            const updatedDto = await this.getEntityUpdatePayrollRegularWorkDays(payroll.id, companyId, payroll.createdBy);
            if (updatedDto !== null) {
                updatedDtos.push(updatedDto);
                payroll.totalPayrollRegularWorkDays =
                    updatedDto.totalPayrollRegularWorkDays;
            }
        }
        if (updatedDtos.length > 0) {
            await this.payrollTimeSheetRepository.save(updatedDtos);
        }
        const results = payrolls.map(async (value) => {
            const adjustments = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollId(value.id, companyId, payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? database_1.TimeAdjustmentType.Date
                : database_1.TimeAdjustmentType.Hour);
            const unpaid = [];
            const adjustmentDaysAddition = [];
            const adjustmentDaysDeduction = [];
            for (const adjustment of adjustments) {
                switch (adjustment.timeSheetType) {
                    case database_1.TimeSheetAdjustmentType.Unpaid:
                        unpaid.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition:
                        adjustmentDaysAddition.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction:
                        adjustmentDaysDeduction.push(adjustment);
                        break;
                    default:
                        break;
                }
            }
            const adjustmentDaysAdditionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysAddition.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysAddition.reduce((acc, day) => (acc += day.hour), 0);
            const adjustmentDaysDeductionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysDeduction.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysDeduction.reduce((acc, day) => (acc += day.hour), 0);
            const unpaidDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? unpaid.reduce((acc, day) => (acc += day.day), 0)
                : unpaid.reduce((acc, day) => (acc += day.hour), 0);
            return {
                id: value.id,
                employeeId: value?.employeeId,
                fullNameLocal: value?.employee?.fullNameLocal || null,
                fullNameEn: value?.employee?.fullNameEn || null,
                employeeRef: value?.employee?.employeeRef || null,
                orgElement: value?.employee?.orgStructure?.name || null,
                payrollGroup: value?.employee?.payrollGroups?.code || null,
                costCenter: value?.employee?.costCenter?.name || null,
                payrollHeader: value?.prtrxHdrId || null,
                totalScheduledWorkDays: payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                    ? value.totalScheduledWorkDays
                    : undefined,
                totalScheduledWorkHours: payrollCalculationMethod === database_1.PayCalculationMethod.Hourly
                    ? value.totalScheduledWorkHours
                    : undefined,
                adjustmentDaysAdditionDays,
                adjustmentDaysDeductionDays,
                unpaidDays,
                totalPayrollRegularWorkDays: value.totalPayrollRegularWorkDays,
                adjustments,
            };
        });
        const updatedData = await Promise.all(results);
        return {
            ...rawResult,
            data: updatedData,
        };
    }
    async getPayrollsByHeaderIdV2(payrollHeaderId, companyId, payrollCalculationMethod = database_1.PayCalculationMethod.Daily, paginationQueryDto) {
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const prtrxEmpAlias = database_1.ETableName.PRTRX_EMP;
        const queryBuilder = await this.payrollTimeSheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.is_deleted = :isDeleted AND ${employeeAlias}.id = ${payrollAlias}.employee_id AND ${employeeAlias}.active = :isActive`, { isDeleted: false, isActive: true })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.prtrxEmps`, prtrxEmpAlias, `${prtrxEmpAlias}.employee_id = ${employeeAlias}.id AND ${prtrxEmpAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.prtrx_hdr_id = :prtrxHdrId AND ${employeeAlias}.pay_calc_met = :calculationMethod AND ${prtrxEmpAlias}.included = :included AND ${prtrxEmpAlias}.payroll_trx_header_id = :prtrxHdrId`, {
            companyId: companyId,
            isDeleted: false,
            prtrxHdrId: payrollHeaderId,
            calculationMethod: payrollCalculationMethod === database_1.PayCalculationMethod.Daily ? 1 : 2,
            included: true,
        });
        const { q: querySearchString, querySearchFields = [
            constants_2.QUERY_FIELDS.FULL_NAME_LOCAL,
        ], } = paginationQueryDto;
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
        const payrolls = rawResult.data;
        const updatedDtos = [];
        for (const payroll of payrolls) {
            const updatedDto = await this.getEntityUpdatePayrollRegularWorkDays(payroll.id, companyId, payroll.createdBy);
            if (updatedDto !== null) {
                updatedDtos.push(updatedDto);
                payroll.totalPayrollRegularWorkDays =
                    updatedDto.totalPayrollRegularWorkDays;
            }
        }
        if (updatedDtos.length > 0) {
            await this.payrollTimeSheetRepository.save(updatedDtos);
        }
        const payrollIds = payrolls.map(p => p.id);
        const adjustmentsMap = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollIds(payrollIds, companyId, payrollCalculationMethod === database_1.PayCalculationMethod.Daily
            ? database_1.TimeAdjustmentType.Date
            : database_1.TimeAdjustmentType.Hour);
        const results = payrolls.map(value => {
            const adjustments = adjustmentsMap.filter(adjustment => adjustment.payrollTimesheetId === value.id) || [];
            const unpaid = [];
            const adjustmentDaysAddition = [];
            const adjustmentDaysDeduction = [];
            for (const adjustment of adjustments) {
                switch (adjustment.timeSheetType) {
                    case database_1.TimeSheetAdjustmentType.Unpaid:
                        unpaid.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition:
                        adjustmentDaysAddition.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction:
                        adjustmentDaysDeduction.push(adjustment);
                        break;
                    default:
                        break;
                }
            }
            const adjustmentDaysAdditionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysAddition.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysAddition.reduce((acc, day) => (acc += day.hour), 0);
            const adjustmentDaysDeductionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysDeduction.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysDeduction.reduce((acc, day) => (acc += day.hour), 0);
            const unpaidDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? unpaid.reduce((acc, day) => (acc += day.day), 0)
                : unpaid.reduce((acc, day) => (acc += day.hour), 0);
            return {
                id: value.id,
                employeeId: value?.employeeId,
                fullNameLocal: value?.employee?.fullNameLocal || null,
                fullNameEn: value?.employee?.fullNameEn || null,
                employeeRef: value?.employee?.employeeRef || null,
                orgElement: value?.employee?.orgStructure?.name || null,
                payrollGroup: value?.employee?.payrollGroups?.code || null,
                costCenter: value?.employee?.costCenter?.name || null,
                payrollHeader: value?.prtrxHdrId || null,
                totalScheduledWorkDays: payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                    ? value.totalScheduledWorkDays
                    : undefined,
                totalScheduledWorkHours: payrollCalculationMethod === database_1.PayCalculationMethod.Hourly
                    ? value.totalScheduledWorkHours
                    : undefined,
                adjustmentDaysAdditionDays,
                adjustmentDaysDeductionDays,
                unpaidDays,
                totalPayrollRegularWorkDays: value.totalPayrollRegularWorkDays,
                adjustments,
            };
        });
        return {
            ...rawResult,
            data: results,
        };
    }
    async getPayrollsByHeaderIdWithoutPagination(payrollHeaderId, companyId, payrollCalculationMethod = database_1.PayCalculationMethod.Daily, paginationQueryDto) {
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const queryBuilder = this.payrollTimeSheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.is_deleted = :isDeleted AND ${employeeAlias}.id = ${payrollAlias}.employee_id AND ${employeeAlias}.active = :isActive`, { isDeleted: false, isActive: true })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.prtrx_hdr_id = :prtrxHdrId AND ${employeeAlias}.pay_calc_met = :calculationMethod`, {
            companyId: companyId,
            isDeleted: false,
            prtrxHdrId: payrollHeaderId,
            calculationMethod: payrollCalculationMethod === database_1.PayCalculationMethod.Daily ? 1 : 2,
        });
        const rawResult = await this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto: { ...paginationQueryDto, isSelectAll: true },
            querySearchFields: ['employee.fullNameLocal', 'employee.fullNameLocal'],
        });
        const payrolls = rawResult.data;
        const updatedDtos = [];
        for (const payroll of payrolls) {
            const updatedDto = await this.getEntityUpdatePayrollRegularWorkDays(payroll.id, companyId, payroll.createdBy);
            if (updatedDto !== null) {
                updatedDtos.push(updatedDto);
                payroll.totalPayrollRegularWorkDays =
                    updatedDto.totalPayrollRegularWorkDays;
            }
        }
        if (updatedDtos.length > 0) {
            await this.payrollTimeSheetRepository.save(updatedDtos);
        }
        const results = payrolls.map(async (value) => {
            const adjustments = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollId(value.id, companyId, payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? database_1.TimeAdjustmentType.Date
                : database_1.TimeAdjustmentType.Hour);
            const unpaid = [];
            const adjustmentDaysAddition = [];
            const adjustmentDaysDeduction = [];
            for (const adjustment of adjustments) {
                switch (adjustment.timeSheetType) {
                    case database_1.TimeSheetAdjustmentType.Unpaid:
                        unpaid.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition:
                        adjustmentDaysAddition.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction:
                        adjustmentDaysDeduction.push(adjustment);
                        break;
                    default:
                        break;
                }
            }
            const adjustmentDaysAdditionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysAddition.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysAddition.reduce((acc, day) => (acc += day.hour), 0);
            const adjustmentDaysDeductionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysDeduction.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysDeduction.reduce((acc, day) => (acc += day.hour), 0);
            const unpaidDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? unpaid.reduce((acc, day) => (acc += day.day), 0)
                : unpaid.reduce((acc, day) => (acc += day.hour), 0);
            return {
                id: value.id,
                employeeId: value?.employeeId,
                fullNameLocal: value?.employee?.fullNameLocal || null,
                fullNameEn: value?.employee?.fullNameEn || null,
                employeeRef: value?.employee?.employeeRef || null,
                orgElement: value?.employee?.orgStructure?.name || null,
                payrollGroup: value?.employee?.payrollGroups?.code || null,
                costCenter: value?.employee?.costCenter?.name || null,
                payrollHeader: value?.prtrxHdrId || null,
                totalScheduledWorkDays: payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                    ? value.totalScheduledWorkDays
                    : undefined,
                totalScheduledWorkHours: payrollCalculationMethod === database_1.PayCalculationMethod.Hourly
                    ? value.totalScheduledWorkHours
                    : undefined,
                adjustmentDaysAdditionDays,
                adjustmentDaysDeductionDays,
                unpaidDays,
                totalPayrollRegularWorkDays: value.totalPayrollRegularWorkDays,
                adjustments,
            };
        });
        const updatedData = await Promise.all(results);
        return updatedData;
    }
    async getAllPayrollsByHeaderId(payrollHeaderId, companyId, paginationQueryDto) {
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const queryBuilder = await this.payrollTimeSheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.is_deleted = :isDeleted AND ${employeeAlias}.id = ${payrollAlias}.employee_id AND ${employeeAlias}.active = :isActive`, { isDeleted: false, isActive: true })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.prtrx_hdr_id = :prtrxHdrId`, {
            companyId: companyId,
            isDeleted: false,
            prtrxHdrId: payrollHeaderId,
        });
        const { q: querySearchString, querySearchFields = [
            constants_2.QUERY_FIELDS.FULL_NAME_LOCAL,
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
        else {
            rawResult = await this.getEntitiesByQuery({
                queryBuilder,
                paginationQueryDto,
            });
        }
        const payrolls = rawResult.data;
        const updatedDtos = [];
        for (const payroll of payrolls) {
            const updatedDto = await this.getEntityUpdatePayrollRegularWorkDays(payroll.id, companyId, payroll.createdBy);
            if (updatedDto !== null) {
                updatedDtos.push(updatedDto);
                payroll.totalPayrollRegularWorkDays =
                    updatedDto.totalPayrollRegularWorkDays;
            }
        }
        if (updatedDtos.length > 0) {
            await this.payrollTimeSheetRepository.save(updatedDtos);
        }
        const results = payrolls.map(async (value) => {
            const adjustments = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollId(value.id, companyId);
            const unpaid = [];
            const adjustmentDaysAddition = [];
            const adjustmentDaysDeduction = [];
            for (const adjustment of adjustments) {
                switch (adjustment.timeSheetType) {
                    case database_1.TimeSheetAdjustmentType.Unpaid:
                        unpaid.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition:
                        adjustmentDaysAddition.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction:
                        adjustmentDaysDeduction.push(adjustment);
                        break;
                    default:
                        break;
                }
            }
            const adjustmentDaysAdditionDays = value.employee.payCalcMet === 1
                ? adjustmentDaysAddition.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysAddition.reduce((acc, day) => (acc += day.hour), 0);
            const adjustmentDaysDeductionDays = value.employee.payCalcMet === 1
                ? adjustmentDaysDeduction.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysDeduction.reduce((acc, day) => (acc += day.hour), 0);
            const unpaidDays = value.employee.payCalcMet === 1
                ? unpaid.reduce((acc, day) => (acc += day.day), 0)
                : unpaid.reduce((acc, day) => (acc += day.hour), 0);
            return {
                id: value.id,
                employeeId: value?.employeeId,
                fullNameLocal: value?.employee?.fullNameLocal || null,
                fullNameEn: value?.employee?.fullNameEn || null,
                employeeRef: value?.employee?.employeeRef || null,
                orgElement: value?.employee?.orgStructure?.name || null,
                payrollGroup: value?.employee?.payrollGroups?.code || null,
                costCenter: value?.employee?.costCenter?.name || null,
                payrollHeader: value?.prtrxHdrId || null,
                totalScheduledWorkDays: value.employee.payCalcMet === 1
                    ? value.totalScheduledWorkDays
                    : undefined,
                totalScheduledWorkHours: value.employee.payCalcMet === 2
                    ? value.totalScheduledWorkHours
                    : undefined,
                adjustmentDaysAdditionDays,
                adjustmentDaysDeductionDays,
                unpaidDays,
                totalPayrollRegularWorkDays: value.totalPayrollRegularWorkDays,
                adjustments,
            };
        });
        const updatedData = await Promise.all(results);
        return {
            ...rawResult,
            data: updatedData,
        };
    }
    async getDayToProrate(companyId, payrollGroupId, dateFrom, dateTo) {
        const payrollGroup = await this.payrollGroupService.getPayrollGroupById(companyId, payrollGroupId);
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
            return result;
        }
        else if (payrollGroup.useCalendarDay)
            return result;
        return -1;
    }
    async getPayrollTimesheetIdByPrtrxHdrId(prtrxHdrId, companyId) {
        const result = this.payrollTimeSheetRepository.find({
            select: {
                id: true,
            },
            where: {
                prtrxHdrId: prtrxHdrId,
                companyId: companyId,
            },
        });
        return result;
    }
    async getPayrollTimesheetIdByEidPrtrxHdrId(employeeIds, prtrxHdrId) {
        const result = this.payrollTimeSheetRepository.find({
            select: { id: true, employeeId: true },
            where: {
                prtrxHdrId: prtrxHdrId,
                employeeId: (0, typeorm_2.In)(employeeIds),
            },
        });
        return result;
    }
    async handleValidateHeader(actualHeaders, type) {
        if (type === database_1.PayCalculationMethod.Hourly) {
            const isValidHeader = constants_2.PAYROLL_TIMESHEET_FILE_CONFIG_HOUR.every((header, index) => {
                return header.name === actualHeaders[index];
            });
            if (!isValidHeader) {
                throw new common_1.BadRequestException('Invalid header format');
            }
        }
        else {
            const isValidHeader = constants_2.PAYROLL_TIMESHEET_FILE_CONFIG_DAY.every((header, index) => {
                return header.name === actualHeaders[index];
            });
            if (!isValidHeader) {
                throw new common_1.BadRequestException('Invalid header format');
            }
        }
    }
    async handleValidateAndFormatData(companyId, payrollHeaderId, data, type) {
        const listEmployeeRef = data.map(itemData => {
            return itemData[constants_1.EMPLOYEE_REF];
        });
        const employees = await this.employeeService.getEmployeeByEmployeeRef(companyId, listEmployeeRef);
        const result = [];
        const listErrorRows = [];
        if (type === database_1.PayCalculationMethod.Hourly) {
            for (let index = 0; index < data.length; index++) {
                const itemData = data[index];
                const employeeRef = itemData[constants_1.EMPLOYEE_REF] ?? '';
                const totalScheduledWorkHours = itemData[constants_2.TOTAL_SCHEDULE_WORK_HOUR];
                const foundEmployee = employees.find(item => {
                    return item.employeeRef === employeeRef;
                });
                if (!foundEmployee) {
                    listErrorRows.push(`Not found Employee with Employee Ref: ${employeeRef} at row ${index + 2}`);
                    continue;
                }
                if (totalScheduledWorkHours === '' ||
                    isNaN(Number(totalScheduledWorkHours)) ||
                    totalScheduledWorkHours < 0) {
                    listErrorRows.push(`Total Scheduled Work Hours is incorrect at row ${index + 2}`);
                    continue;
                }
                const payrollTimesheet = foundEmployee.payrollTimeSheets.find(item => {
                    return item.prtrxHdrId === payrollHeaderId;
                });
                if (!payrollTimesheet) {
                    listErrorRows.push(`Not found prtrxHdrId at row ${index + 2}`);
                    continue;
                }
                if (payrollTimesheet) {
                    const prtrxEmps = payrollTimesheet?.prtrxHdr?.prtrxEmps.find(prtrxEmp => prtrxEmp.included === false &&
                        prtrxEmp.employeeId === foundEmployee.id);
                    if (prtrxEmps) {
                        listErrorRows.push(`Employee does not belong to prtrxHdrId at row ${index + 2}`);
                        continue;
                    }
                }
                result.push({
                    employeeId: foundEmployee.id,
                    prtrxHdrId: payrollHeaderId,
                    totalScheduledWorkHours: totalScheduledWorkHours,
                });
            }
            if (listErrorRows.length !== 0) {
                throw new common_1.BadRequestException(listErrorRows);
            }
            return result;
        }
        for (let index = 0; index < data.length; index++) {
            const itemData = data[index];
            const employeeRef = itemData[constants_1.EMPLOYEE_REF] ?? '';
            const totalScheduledWorkDays = itemData[constants_2.TOTAL_SCHEDULE_WORK_DAY];
            const foundEmployee = employees.find(item => {
                return item.employeeRef === employeeRef;
            });
            if (!foundEmployee) {
                listErrorRows.push(`Not found Employee with Employee Ref: ${employeeRef} at row ${index + 2}`);
                continue;
            }
            if (totalScheduledWorkDays === '' ||
                isNaN(totalScheduledWorkDays) ||
                totalScheduledWorkDays < 0) {
                listErrorRows.push(`Total Scheduled Work Days is incorrect at row ${index + 2}`);
                continue;
            }
            const payrollTimesheet = foundEmployee.payrollTimeSheets.find(item => {
                return item.prtrxHdrId === payrollHeaderId;
            });
            if (!payrollTimesheet) {
                listErrorRows.push(`Not found prtrxHdrId at row ${index + 2}`);
                continue;
            }
            if (payrollTimesheet) {
                const prtrxEmps = payrollTimesheet?.prtrxHdr?.prtrxEmps.find(prtrxEmp => prtrxEmp.included === false &&
                    prtrxEmp.employeeId === foundEmployee.id);
                if (prtrxEmps) {
                    listErrorRows.push(`Employee does not belong to prtrxHdrId at row ${index + 2}`);
                    continue;
                }
            }
            result.push({
                employeeId: foundEmployee.id,
                prtrxHdrId: payrollHeaderId,
                totalScheduledWorkDays: totalScheduledWorkDays,
            });
        }
        if (listErrorRows.length !== 0) {
            throw new common_1.BadRequestException(listErrorRows);
        }
        return result;
    }
    async handleCreateRawFile(type, payrollHeaderId) {
        const workbook = new exceljs_1.Workbook();
        const currentTime = moment().utc().format('YYYYDDMMhhmm');
        const fileName = payrollHeaderId
            ? constants_2.PAYROLL_TIMESHEET_FILE_NAME + `-${payrollHeaderId}-${currentTime}`
            : constants_2.PAYROLL_TIMESHEET_FILE_NAME + `-${currentTime}`;
        const worksheet = workbook.addWorksheet(fileName);
        const headers = type === database_1.PayCalculationMethod.Hourly
            ? constants_2.PAYROLL_TIMESHEET_FILE_HEADER_HOUR
            : constants_2.PAYROLL_TIMESHEET_FILE_HEADER_DAY;
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell(cell => {
            cell.font = { bold: true };
        });
        if (type === database_1.PayCalculationMethod.Hourly) {
            worksheet.columns = constants_2.PAYROLL_TIMESHEET_FILE_CONFIG_HOUR.map(col => ({
                header: col.name,
                key: col.key,
                width: col.width,
            }));
        }
        else {
            worksheet.columns = constants_2.PAYROLL_TIMESHEET_FILE_CONFIG_DAY.map(col => ({
                header: col.name,
                key: col.key,
                width: col.width,
            }));
        }
        return { workbook, worksheet, fileName };
    }
    async handleCreateSampleFile(type, payrollHeaderId) {
        const workbook = new exceljs_1.Workbook();
        const currentTime = moment().utc().format('YYYYDDMMhhmm');
        const fileName = payrollHeaderId
            ? constants_2.PAYROLL_TIMESHEET_FILE_NAME + `-${payrollHeaderId}-${currentTime}`
            : constants_2.PAYROLL_TIMESHEET_FILE_NAME + `-${currentTime}`;
        const worksheet = workbook.addWorksheet(fileName);
        const headers = type === database_1.PayCalculationMethod.Hourly
            ? constants_2.PAYROLL_TIMESHEET_FILE_HEADER_HOUR_SAMPLE
            : constants_2.PAYROLL_TIMESHEET_FILE_HEADER_DAY_SAMPLE;
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell(cell => {
            cell.font = { bold: true };
        });
        if (type === database_1.PayCalculationMethod.Hourly) {
            worksheet.columns = constants_2.PAYROLL_TIMESHEET_FILE_CONFIG_HOUR_SAMPLE.map(col => ({
                header: col.name,
                key: col.key,
                width: col.width,
            }));
        }
        else {
            worksheet.columns = constants_2.PAYROLL_TIMESHEET_FILE_CONFIG_DAY_SAMPLE.map(col => ({
                header: col.name,
                key: col.key,
                width: col.width,
            }));
        }
        return { workbook, worksheet, fileName };
    }
    async handleExportFilePayrollTimesheet(companyId, payrollHeaderId, type, query) {
        const { workbook, worksheet, fileName } = await this.handleCreateRawFile(type, payrollHeaderId);
        const payrollTimesheetDatas = await this.getPayrollsByHeaderIdWithoutPagination(payrollHeaderId, companyId, type, query);
        const listData = payrollTimesheetDatas.map(payrollTimesheet => {
            const fullNameLocal = payrollTimesheet?.fullNameLocal;
            const fullNameEn = payrollTimesheet?.fullNameEn;
            const employeeRef = payrollTimesheet?.employeeRef;
            const orgElements = payrollTimesheet?.orgElement;
            const costCenter = payrollTimesheet.costCenter;
            const payrollGroup = payrollTimesheet?.payrollGroup;
            const totalScheduledWorkDays = payrollTimesheet?.totalScheduledWorkDays;
            const totalScheduledWorkHours = payrollTimesheet?.totalScheduledWorkHours;
            const adjustmentDaysAdditionDays = payrollTimesheet?.adjustmentDaysAdditionDays;
            const adjustmentDaysDeductionDays = payrollTimesheet?.adjustmentDaysDeductionDays;
            const unpaidDays = payrollTimesheet?.unpaidDays;
            const totalPayrollRegularWorkDays = payrollTimesheet.totalPayrollRegularWorkDays;
            if (type === database_1.PayCalculationMethod.Hourly) {
                return {
                    fullNameLocal,
                    fullNameEn,
                    employeeRef,
                    orgElements,
                    costCenter,
                    payrollGroup,
                    totalScheduledWorkHours,
                    adjustmentDaysAdditionDays,
                    adjustmentDaysDeductionDays,
                    unpaidDays,
                    totalPayrollRegularWorkDays,
                };
            }
            return {
                fullNameLocal,
                fullNameEn,
                employeeRef,
                orgElements,
                costCenter,
                payrollGroup,
                totalScheduledWorkDays,
                adjustmentDaysAdditionDays,
                adjustmentDaysDeductionDays,
                unpaidDays,
                totalPayrollRegularWorkDays,
            };
        });
        listData.forEach(data => {
            const row = type === database_1.PayCalculationMethod.Hourly
                ? constants_2.PAYROLL_TIMESHEET_FILE_CONFIG_HOUR.map(config => data[config.key])
                : constants_2.PAYROLL_TIMESHEET_FILE_CONFIG_DAY.map(config => data[config.key]);
            worksheet.addRow(row);
        });
        const buffer = await workbook.xlsx.writeBuffer();
        return { buffer, fileName };
    }
    async handleImportFilePayrollTimesheetFile(companyId, payrollHeaderId, file, userEmail, type) {
        if (!file?.buffer) {
            throw new common_1.BadRequestException('Do not find any file sent');
        }
        const workbook = new exceljs_1.Workbook();
        await workbook.xlsx.load(file.buffer);
        const worksheet = workbook.worksheets[0];
        const data = [];
        const actualHeaders = [];
        worksheet.getRow(1).eachCell((cell, colNumber) => {
            actualHeaders.push(cell.value);
        });
        await this.handleValidateHeader(actualHeaders, type);
        worksheet.eachRow((row, rowNumber) => {
            const rowData = {};
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const header = worksheet.getRow(1).getCell(colNumber).value;
                rowData[header] = cell.value;
            });
            data.push(rowData);
        });
        data.shift();
        const formatData = await this.handleValidateAndFormatData(companyId, payrollHeaderId, data, type);
        const employeeIds = formatData
            .map(itemData => itemData.employeeId)
            .filter(item => item !== undefined);
        const payrollTimesheetUpdated = await this.getPayrollTimesheetIdByEidPrtrxHdrId(employeeIds, payrollHeaderId);
        const updatedDtos = [];
        for (const payroll of payrollTimesheetUpdated) {
            const updatedDto = await this.getEntityUpdatePayrollRegularWorkDays(payroll.id, companyId, payroll.createdBy);
            if (updatedDto !== null) {
                updatedDtos.push(updatedDto);
                payroll.totalPayrollRegularWorkDays =
                    updatedDto.totalPayrollRegularWorkDays;
            }
        }
        if (type === database_1.PayCalculationMethod.Hourly) {
            await this.payrollTimeSheetRepository.save(payrollTimesheetUpdated.map(payrollTimesheet => {
                return {
                    id: payrollTimesheet.id,
                    totalScheduledWorkHours: formatData.find(itemData => itemData.employeeId === payrollTimesheet.employeeId)?.totalScheduledWorkHours ?? 0,
                    updateBy: userEmail,
                    totalPayrollRegularWorkDays: updatedDtos.find(value => value.id === payrollTimesheet.id)
                        ?.totalPayrollRegularWorkDays || undefined,
                };
            }));
        }
        else {
            await this.payrollTimeSheetRepository.save(payrollTimesheetUpdated.map(payrollTimesheet => {
                return {
                    id: payrollTimesheet.id,
                    totalScheduledWorkDays: formatData.find(itemData => itemData.employeeId === payrollTimesheet.employeeId)?.totalScheduledWorkDays ?? 0,
                    updateBy: userEmail,
                    totalPayrollRegularWorkDays: updatedDtos.find(value => value.id === payrollTimesheet.id)
                        ?.totalPayrollRegularWorkDays || undefined,
                };
            }));
        }
        return { message: 'Import successfully' };
    }
    async handleGetSampleData(payrollCalculationMethod, companyId, headerId) {
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const organizationStructureAlias = database_1.ETableName.ORGANIZATION_STRUCTURE;
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const costCenterAlias = database_1.ETableName.COST_CENTER;
        const queryBuilder = await this.payrollTimeSheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.is_deleted = :isDeleted AND ${employeeAlias}.id = ${payrollAlias}.employee_id AND ${employeeAlias}.active = :isActive`, { isDeleted: false, isActive: true })
            .leftJoinAndSelect(`${employeeAlias}.orgStructure`, organizationStructureAlias, `${organizationStructureAlias}.id = ${employeeAlias}.organization_element_id AND ${organizationStructureAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.id = ${employeeAlias}.payroll_group_id AND ${payrollGroupAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .leftJoinAndSelect(`${employeeAlias}.costCenter`, costCenterAlias, `${costCenterAlias}.id = ${employeeAlias}.cost_center_id AND ${costCenterAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.is_deleted = :isDeleted AND ${payrollAlias}.prtrx_hdr_id = :prtrxHdrId AND ${employeeAlias}.pay_calc_met = :calculationMethod`, {
            companyId: companyId,
            isDeleted: false,
            prtrxHdrId: headerId,
            calculationMethod: payrollCalculationMethod === database_1.PayCalculationMethod.Daily ? 1 : 2,
        })
            .getMany();
        if (!queryBuilder) {
            return null;
        }
        const payrolls = queryBuilder;
        const updatedDtos = [];
        for (const payroll of payrolls) {
            const updatedDto = await this.getEntityUpdatePayrollRegularWorkDays(payroll.id, companyId, payroll.createdBy);
            if (updatedDto !== null) {
                updatedDtos.push(updatedDto);
                payroll.totalPayrollRegularWorkDays =
                    updatedDto.totalPayrollRegularWorkDays;
            }
        }
        if (updatedDtos.length > 0) {
            await this.payrollTimeSheetRepository.save(updatedDtos);
        }
        const results = payrolls.map(async (value) => {
            const adjustments = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollId(value.id, companyId, payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? database_1.TimeAdjustmentType.Date
                : database_1.TimeAdjustmentType.Hour);
            const unpaid = [];
            const adjustmentDaysAddition = [];
            const adjustmentDaysDeduction = [];
            for (const adjustment of adjustments) {
                switch (adjustment.timeSheetType) {
                    case database_1.TimeSheetAdjustmentType.Unpaid:
                        unpaid.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition:
                        adjustmentDaysAddition.push(adjustment);
                        break;
                    case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction:
                        adjustmentDaysDeduction.push(adjustment);
                        break;
                    default:
                        break;
                }
            }
            const adjustmentDaysAdditionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysAddition.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysAddition.reduce((acc, day) => (acc += day.hour), 0);
            const adjustmentDaysDeductionDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? adjustmentDaysDeduction.reduce((acc, day) => (acc += day.day), 0)
                : adjustmentDaysDeduction.reduce((acc, day) => (acc += day.hour), 0);
            const unpaidDays = payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                ? unpaid.reduce((acc, day) => (acc += day.day), 0)
                : unpaid.reduce((acc, day) => (acc += day.hour), 0);
            return {
                id: value.id,
                employeeId: value?.employeeId,
                fullNameLocal: value?.employee?.fullNameLocal || null,
                fullNameEn: value?.employee?.fullNameEn || null,
                employeeRef: value?.employee?.employeeRef || null,
                orgElement: value?.employee?.orgStructure?.name || null,
                payrollGroup: value?.employee?.payrollGroups?.code || null,
                costCenter: value?.employee?.costCenter?.name || null,
                payrollHeader: value?.prtrxHdrId || null,
                totalScheduledWorkDays: payrollCalculationMethod === database_1.PayCalculationMethod.Daily
                    ? value.totalScheduledWorkDays
                    : undefined,
                totalScheduledWorkHours: payrollCalculationMethod === database_1.PayCalculationMethod.Hourly
                    ? value.totalScheduledWorkHours
                    : undefined,
                adjustmentDaysAdditionDays,
                adjustmentDaysDeductionDays,
                unpaidDays,
                totalPayrollRegularWorkDays: value.totalPayrollRegularWorkDays,
                adjustments,
            };
        });
        const updatedData = await Promise.all(results);
        return updatedData;
    }
    async handleGeneratePayrollTimesheetExcelFile(type, companyId, headerId) {
        const { workbook, worksheet, fileName } = await this.handleCreateSampleFile(type);
        const sampleData = await this.handleGetSampleData(type, companyId, headerId);
        if (sampleData) {
            const listData = sampleData.map(payrollTimesheet => {
                const fullNameLocal = payrollTimesheet?.fullNameLocal;
                const fullNameEn = payrollTimesheet?.fullNameEn;
                const employeeRef = payrollTimesheet?.employeeRef;
                const orgElements = payrollTimesheet?.orgElement;
                const costCenter = payrollTimesheet.costCenter;
                const payrollGroup = payrollTimesheet?.payrollGroup;
                const totalScheduledWorkDays = payrollTimesheet?.totalScheduledWorkDays;
                const totalScheduledWorkHours = payrollTimesheet?.totalScheduledWorkHours;
                if (type === database_1.PayCalculationMethod.Hourly) {
                    return {
                        fullNameLocal,
                        fullNameEn,
                        employeeRef,
                        orgElements,
                        costCenter,
                        payrollGroup,
                        totalScheduledWorkHours,
                    };
                }
                return {
                    fullNameLocal,
                    fullNameEn,
                    employeeRef,
                    orgElements,
                    costCenter,
                    payrollGroup,
                    totalScheduledWorkDays,
                };
            });
            listData.forEach(data => {
                worksheet.addRow(Object.values(data));
            });
            const buffer = await workbook.xlsx.writeBuffer();
            return { buffer, fileName };
        }
        const fakeData = type === database_1.PayCalculationMethod.Hourly
            ? payrolll_timesheet_sample_data_constant_1.PAYROLL_TIMESHEET_SAMPLE_DATA_HOUR
            : payrolll_timesheet_sample_data_constant_1.PAYROLL_TIMESHEET_SAMPLE_DATA_DAY;
        fakeData.forEach(data => {
            worksheet.addRow(Object.values(data));
        });
        const buffer = await workbook.xlsx.writeBuffer();
        return { buffer, fileName };
    }
    async archiveAllPayrollTimesheets(prtrxHdrId, companyId, userEmail) {
        const employees = await this.prtrxEmpService.getEmployeesByPrtrxHdrId(prtrxHdrId);
        const employeeIds = employees.map(employee => employee.employeeId);
        return this.archiveMultiPayrollTimesheet(employeeIds, prtrxHdrId, companyId, userEmail);
    }
    async archiveMultiPayrollTimesheet(employeeIds, prtrxHdrId, companyId, userEmail) {
        const payrolls = await this.payrollTimeSheetRepository.find({
            where: {
                employeeId: (0, typeorm_2.In)(employeeIds),
                companyId,
                prtrxHdrId,
                isDeleted: false,
            },
        });
        const ids = payrolls.map(p => p.id);
        const adjustmentIds = [];
        for (const id of ids) {
            const adjustments = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollId(id, companyId);
            adjustmentIds.push(...adjustments.map(a => a.id));
        }
        const updatedPayroll = await this.payrollTimeSheetRepository.update({
            id: (0, typeorm_2.In)(ids),
            isDeleted: false,
        }, {
            isDeleted: true,
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        });
        await this.timeSheetAdjustmentService.archiveMultiAdjustment(adjustmentIds, userEmail);
        return updatedPayroll;
    }
    async calculatePayrollRegularWorkDays(payrollId, companyId) {
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const employeeAlias = 'employee';
        const queryBuilder = await this.payrollTimeSheetRepository
            .createQueryBuilder(payrollAlias)
            .leftJoinAndSelect(`${payrollAlias}.employee`, employeeAlias, `${employeeAlias}.is_deleted = :isDeleted AND ${employeeAlias}.id = ${payrollAlias}.employee_id AND ${employeeAlias}.active = :isActive`, { isDeleted: false, isActive: true })
            .where(`${payrollAlias}.id = :id AND ${payrollAlias}.is_deleted = :isDeleted`, {
            id: payrollId,
            isDeleted: false,
        })
            .getOne();
        const payroll = queryBuilder;
        if (!payroll)
            return -1;
        const adjustments = await this.timeSheetAdjustmentService.getAdjustmentsByPayrollId(payroll.id, companyId, payroll.employee.payCalcMet === 1
            ? database_1.TimeAdjustmentType.Date
            : database_1.TimeAdjustmentType.Hour);
        const unpaid = [];
        const adjustmentDaysAddition = [];
        const adjustmentDaysDeduction = [];
        for (const adjustment of adjustments) {
            switch (adjustment.timeSheetType) {
                case database_1.TimeSheetAdjustmentType.Unpaid:
                    unpaid.push(adjustment);
                    break;
                case database_1.TimeSheetAdjustmentType.AdjustmentDaysAddition:
                    adjustmentDaysAddition.push(adjustment);
                    break;
                case database_1.TimeSheetAdjustmentType.AdjustmentDaysDeduction:
                    adjustmentDaysDeduction.push(adjustment);
                    break;
                default:
                    break;
            }
        }
        const unpaidDays = payroll.employee.payCalcMet === 1
            ? unpaid.reduce((acc, day) => (acc += day.day), 0)
            : unpaid.reduce((acc, day) => (acc += day.hour), 0);
        const totalProrations = payroll.employee.payCalcMet === 1
            ? payroll.totalScheduledWorkDays
            : payroll.totalScheduledWorkHours;
        return totalProrations - unpaidDays;
    }
};
exports.PayrollTimeSheetService = PayrollTimeSheetService;
exports.PayrollTimeSheetService = PayrollTimeSheetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payroll_timesheet_entity_1.PayrollTimeSheetEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        services_1.TimeSheetAdjustmentService,
        work_schedule_1.WorkScheduleService,
        employee_service_1.EmployeeService,
        prtrx_hdr_service_1.PrtrxHdrService,
        prtrx_emp_service_1.PrtrxEmpService,
        payroll_group_service_1.PayRollGroupService])
], PayrollTimeSheetService);
//# sourceMappingURL=payroll-timesheet.service.js.map
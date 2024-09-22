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
exports.OvertimeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const database_1 = require("../../../../core/database");
const moment = require("moment");
const work_schedule_1 = require("../../../time-tracker/modules/work-schedule");
const common_2 = require("../../../time-tracker/common");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const payroll_group_service_1 = require("../../../payroll/modules/payroll-group/payroll-group.service");
const overtime_detail_entity_1 = require("../../../../core/database/entities/overtime-detail.entity");
const overtime_hdr_entity_1 = require("../../../../core/database/entities/overtime-hdr.entity");
const work_schedule_assignment_service_1 = require("../../../time-tracker/modules/work-schedule-assignment/work-schedule-assignment.service");
let OvertimeService = class OvertimeService {
    constructor(cyclePeriodHeaderRepository, cyclePeriodDetailRepository, overtimeDetailRepository, overtimeHeaderRepository, workScheduleService, employeeService, payrollGroupService, workScheduleAssignmentService) {
        this.cyclePeriodHeaderRepository = cyclePeriodHeaderRepository;
        this.cyclePeriodDetailRepository = cyclePeriodDetailRepository;
        this.overtimeDetailRepository = overtimeDetailRepository;
        this.overtimeHeaderRepository = overtimeHeaderRepository;
        this.workScheduleService = workScheduleService;
        this.employeeService = employeeService;
        this.payrollGroupService = payrollGroupService;
        this.workScheduleAssignmentService = workScheduleAssignmentService;
    }
    async getCycleDateRange(employeeId, companyId, date, employeeEntity) {
        let employee = null;
        if (!employeeEntity) {
            employee = await this.employeeService.getEmployeeById(companyId, employeeId);
            if (!employee) {
                throw new common_1.BadRequestException('Employee not found');
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
            console.error(`cycPrdHdrIds is null in getCycleDateRange based on date = ${moment(date).format('YYYY-MM-DD')} for Employee Ref = ${employee.employeeRef}`);
            throw new common_1.BadRequestException(`Cycle period not found on date ${moment(date).format('YYYY-MM-DD')} (Employee Ref: ${employee.employeeRef})`);
        }
        const cycPrdDtlList = cyclePeriodDetailList.filter(dtl => cycPrdHdrIds.includes(dtl.cyclePeriodHeaderId));
        if (!cycPrdDtlList || cycPrdDtlList.length === 0) {
            console.error(`cycPrdDtlList is null in getCycleDateRange based on date = ${moment(date).format('YYYY-MM-DD')}`);
            throw new common_1.BadRequestException(`Cycle period not found on date ${moment(date).format('YYYY-MM-DD')}`);
        }
        const dateMoment = moment(date);
        const cyclePeriodDetail = cycPrdDtlList.find(dtl => dateMoment.isBetween(moment(dtl.dateFrom, 'YYYY-MM-DD'), moment(dtl.dateTo, 'YYYY-MM-DD'), 'days', '[]'));
        if (cyclePeriodDetail) {
            return {
                dateFrom: moment(cyclePeriodDetail.dateFrom).format('YYYY-MM-DD'),
                dateTo: moment(cyclePeriodDetail.dateTo).format('YYYY-MM-DD'),
            };
        }
        throw new common_1.BadRequestException(`No cycle period detail found for the given date ${moment(date).format('YYYY-MM-DD')}`);
    }
    async getDayToProrate(data, companyId) {
        const result = await Promise.all(data.map(async (item) => this.getDayToProrateOfAnEmployeeV2(item, companyId)));
        return result;
    }
    async getDayToProrateOfAnEmployee(payload, companyId) {
        const { employeeId, date, overtimeDetailId } = payload;
        const employee = await this.employeeService.getEmployeeById(companyId, employeeId);
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
        if (payrollGroup.otUseStdWorkDay) {
            result = payrollGroup.otStdWorkDay;
            if (payrollGroup.otStdDayByYear)
                result = payrollGroup.otStdWorkDay / 12;
            if (halfMonth) {
                result /= 2;
            }
            return {
                overtimeDetailId,
                employeeId,
                dayToProrate: employee.payCalcMet === 1 ? result : result * payrollGroup.hourPerDay,
            };
        }
        else if (payrollGroup.otUseCalendarDay)
            return {
                overtimeDetailId,
                employeeId,
                dayToProrate: employee.payCalcMet === 1 ? result : result * payrollGroup.hourPerDay,
            };
        return {
            overtimeDetailId,
            employeeId,
            dayToProrate: employee.payCalcMet === 1
                ? totalScheduledWorkDays
                : totalScheduledWorkHours,
        };
    }
    async getDayToProrateOfAnEmployeeV2(payload, companyId) {
        const { employeeId, date, overtimeDetailId } = payload;
        const employee = await this.employeeService.getEmployeeById(companyId, employeeId);
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        const payrollGroup = await this.payrollGroupService.getPayrollGroupById(companyId, employee.payrollGroupId);
        const { dateFrom, dateTo } = await this.getCycleDateRange(employee.id, companyId, date, employee);
        const listDayBetweenStartEnd = dateFrom && dateTo
            ? (0, common_2.getDaysBetweenDates)(dateFrom, dateTo)
            : (0, common_2.getCurrentWeek)();
        let totalScheduledWorkHours = 0;
        let totalScheduledWorkDays = 0;
        const workScheduleMap = await this.workScheduleService.getWorkScheduleOfMultipleDates(employee.id, companyId, listDayBetweenStartEnd);
        for (const trackingInfo of listDayBetweenStartEnd) {
            const workScheduleEntity = workScheduleMap[trackingInfo];
            if (!workScheduleEntity)
                continue;
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
        if (payrollGroup.otUseStdWorkDay) {
            result = payrollGroup.otStdWorkDay;
            if (payrollGroup.otStdDayByYear)
                result = payrollGroup.otStdWorkDay / 12;
            if (halfMonth) {
                result /= 2;
            }
            return {
                overtimeDetailId,
                employeeId,
                dayToProrate: employee.payCalcMet === 1 ? result : result * payrollGroup.hourPerDay,
            };
        }
        else if (payrollGroup.otUseCalendarDay)
            return {
                overtimeDetailId,
                employeeId,
                dayToProrate: employee.payCalcMet === 1 ? result : result * payrollGroup.hourPerDay,
            };
        return {
            overtimeDetailId,
            employeeId,
            dayToProrate: employee.payCalcMet === 1
                ? totalScheduledWorkDays
                : totalScheduledWorkHours,
        };
    }
    async getDayToProrateOfEmployeeOvertimeHeader(companyId, overtimeHeaderId, overtimeDetailIds) {
        let query = {
            companyId,
            overtimeHdrId: overtimeHeaderId,
            isDeleted: false,
        };
        if (overtimeDetailIds && overtimeDetailIds?.length > 0) {
            query = { ...query, id: (0, typeorm_2.In)(overtimeDetailIds) };
        }
        const overtimeDetails = await this.overtimeDetailRepository.find({
            where: query,
            select: {
                employeeId: true,
                id: true,
                overtimeHdrId: true,
                companyId: true,
                date: true,
            },
        });
        const dayToProrates = overtimeDetails.map(item => ({
            date: moment(item.date).format('YYYY-MM-DD'),
            employeeId: item.employeeId,
            overtimeDetailId: item.id,
        }));
        const result = await this.getDayToProrate(dayToProrates, companyId);
        const transformedResponse = result.map(item => ({
            id: item.overtimeDetailId,
            daysToProrate: item.dayToProrate,
        }));
        return transformedResponse;
    }
};
exports.OvertimeService = OvertimeService;
exports.OvertimeService = OvertimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.CyclePeriodHeaderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(database_1.CyclePeriodDetailEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(overtime_detail_entity_1.OvertimeDetailEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(overtime_hdr_entity_1.OvertimeHeaderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        work_schedule_1.WorkScheduleService,
        employee_service_1.EmployeeService,
        payroll_group_service_1.PayRollGroupService,
        work_schedule_assignment_service_1.WorkScheduleAssignmentService])
], OvertimeService);
//# sourceMappingURL=overtime.service.js.map
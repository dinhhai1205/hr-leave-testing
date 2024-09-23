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
exports.TimeEntryService = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("../../../../time-off/modules/leave/services");
const common_2 = require("../../../common");
const api_service_1 = require("../../../libs/api/api.service");
const employee_mapping_service_1 = require("../../employee-mapping/employee-mapping.service");
const services_2 = require("../../timesheet-adjustment/services");
const work_schedule_1 = require("../../work-schedule");
const moment = require("moment");
const prtrx_hdr_service_1 = require("../../../../payroll/modules/prtrx-hdr/prtrx-hdr.service");
const group_mapping_service_1 = require("../../group-mapping/group-mapping.service");
const employee_service_1 = require("../../employee/employee.service");
let TimeEntryService = class TimeEntryService {
    constructor(apiService, employeeMappingService, workScheduleService, leaveService, timeSheetAdjustmentService, prtrxHdrService, groupMappingService, timeTrackerEmployeeService) {
        this.apiService = apiService;
        this.employeeMappingService = employeeMappingService;
        this.workScheduleService = workScheduleService;
        this.leaveService = leaveService;
        this.timeSheetAdjustmentService = timeSheetAdjustmentService;
        this.prtrxHdrService = prtrxHdrService;
        this.groupMappingService = groupMappingService;
        this.timeTrackerEmployeeService = timeTrackerEmployeeService;
    }
    async createTimeEntry(createTimeEntryBodyDto, ttCompanyId, companyId) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [createTimeEntryBodyDto.employeeId],
        });
        const ttEmployeeId = employeeMapping[0].timeTrackerEmployeeId;
        const createDto = { ...createTimeEntryBodyDto, employeeId: ttEmployeeId };
        const { data } = await this.apiService.request({
            type: 'CREATE_TIME_ENTRY',
            data: createDto,
            segments: { companyId: ttCompanyId },
        });
        return data;
    }
    async handleSummaryWeekLyTrackedHour(companyId, ttCompanyId, employeeId, startDate, endDate) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        const ttEmployeeId = employeeMapping[0].timeTrackerEmployeeId;
        const { data } = await this.apiService.request({
            type: 'GET_WEEKLY_SUMMARY_OF_USER',
            segments: { companyId: ttCompanyId, employeeId: ttEmployeeId },
            params: { startDate, endDate },
        });
        let hrLeaveWorkScheduleId;
        if (data.workScheduleEntity) {
            const hrLeaveWorkSchedule = await this.workScheduleService.getWorkScheduleByTTIds([data?.workScheduleEntity?.id], companyId);
            hrLeaveWorkScheduleId = hrLeaveWorkSchedule[0]?.id;
        }
        return {
            ...data,
            workScheduleEntity: {
                ...data.workScheduleEntity,
                id: hrLeaveWorkScheduleId,
            },
        };
    }
    async handleGetTimeEntriesSummarizeInDate(companyId, ttCompanyId, employeeId, query) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        const ttEmployeeId = employeeMapping[0]?.timeTrackerEmployeeId;
        const { data: dataDetail } = await this.apiService.request({
            type: 'GET_SUMMARIZE_TIME_ENTRY_IN_DATE',
            segments: { employeeId: ttEmployeeId, companyId: ttCompanyId },
            params: query,
        });
        if (!dataDetail)
            throw new common_1.BadRequestException('Time Entry not found');
        let hrLeaveWorkScheduleId;
        if (dataDetail.workScheduleEntity) {
            const hrLeaveWorkSchedule = await this.workScheduleService.getWorkScheduleByTTIds([dataDetail?.workScheduleEntity?.ttWorkScheduleId], companyId);
            hrLeaveWorkScheduleId = hrLeaveWorkSchedule[0]?.id;
        }
        return {
            ...dataDetail,
            workScheduleEntity: {
                ...dataDetail.workScheduleEntity,
                id: hrLeaveWorkScheduleId,
            },
            employeeInfo: {
                ...dataDetail.employeeInfo,
                id: employeeId,
            },
        };
    }
    async handleGetListTimeEntriesInDate(companyId, ttCompanyId, employeeId, query) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        const ttEmployeeId = employeeMapping[0]?.timeTrackerEmployeeId;
        const { data: dataDetail } = await this.apiService.request({
            type: 'GET_LIST_TIME_ENTRY_IN_DATE',
            segments: { employeeId: ttEmployeeId, companyId: ttCompanyId },
            params: query,
        });
        return dataDetail;
    }
    async handleGetTimeEntriesDetail(companyId, ttCompanyId, employeeId, query) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        const ttEmployeeId = employeeMapping[0]?.timeTrackerEmployeeId;
        const { data: dataDetail } = await this.apiService.request({
            type: 'GET_TIME_ENTRY_DETAIL',
            segments: { employeeId: ttEmployeeId, companyId: ttCompanyId },
            params: query,
        });
        const { data } = dataDetail || {};
        if (!data)
            throw new Error('Time Entry not found');
        let hrLeaveWorkScheduleId;
        if (data.workScheduleEntity) {
            const hrLeaveWorkSchedule = await this.workScheduleService.getWorkScheduleByTTIds([data?.workScheduleEntity?.ttWorkScheduleId], companyId);
            hrLeaveWorkScheduleId = hrLeaveWorkSchedule[0]?.id;
        }
        return {
            ...data,
            workScheduleEntity: {
                ...data.workScheduleEntity,
                id: hrLeaveWorkScheduleId,
            },
            employeeInfo: {
                ...data.employeeInfo,
                id: employeeId,
            },
        };
    }
    async handleSummarizeOverviewTimeEntries(companyId, ttCompanyId, query) {
        const { employeeIds = [], workScheduleIds = [], groupIds = [] } = query;
        let ttEmployeeIdsQuery = [];
        if (employeeIds?.length > 0) {
            const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
                companyId,
                employeeIds,
            });
            if (employeeMappings?.length === 0) {
                throw new common_1.BadRequestException('Employee mapping(s) not found');
            }
            ttEmployeeIdsQuery = employeeMappings?.map(e => e.timeTrackerEmployeeId);
        }
        let ttWorkScheduleIdsQuery = [];
        if (workScheduleIds?.length > 0) {
            const workSchedules = await this.workScheduleService.getTTWorkSchedulesByWorkScheduleIds(workScheduleIds, companyId);
            if (workSchedules?.length === 0) {
                throw new common_1.BadRequestException('Work schedule(s) not found!');
            }
            ttWorkScheduleIdsQuery = workSchedules?.map(ws => ws.ttWorkScheduleId);
        }
        let ttGroupIdsQuery = [];
        if (groupIds?.length > 0) {
            const groupMappings = await this.groupMappingService.getGroupMappings(groupIds, companyId);
            if (groupMappings?.length === 0) {
                throw new common_1.BadRequestException('Group mapping(s) not found');
            }
            ttGroupIdsQuery = groupMappings?.map(g => g.timeTrackerGroupId);
        }
        const { data: dataOverview } = await this.apiService.request({
            type: 'GET_TIME_ENTRY_OVERVIEW_SUMMARIZE',
            segments: { companyId: ttCompanyId },
            params: {
                ...query,
                groupIds: ttGroupIdsQuery ? ttGroupIdsQuery : [],
                employeeIds: ttEmployeeIdsQuery ? ttEmployeeIdsQuery : [],
                workScheduleIds: ttWorkScheduleIdsQuery ? ttWorkScheduleIdsQuery : [],
            },
        });
        return dataOverview;
    }
    async handleGetOverviewTimeEntries(companyId, ttCompanyId, query) {
        const { employeeIds = [], workScheduleIds = [], groupIds = [] } = query;
        let ttEmployeeIdsQuery = [];
        if (employeeIds?.length > 0) {
            const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
                companyId,
                employeeIds,
            });
            if (employeeMappings?.length === 0) {
                throw new common_1.BadRequestException('Employee mapping(s) not found');
            }
            ttEmployeeIdsQuery = employeeMappings?.map(e => e.timeTrackerEmployeeId);
        }
        let ttWorkScheduleIdsQuery = [];
        if (workScheduleIds?.length > 0) {
            const workSchedules = await this.workScheduleService.getTTWorkSchedulesByWorkScheduleIds(workScheduleIds, companyId);
            if (workSchedules?.length === 0) {
                throw new common_1.BadRequestException('Work schedule(s) not found!');
            }
            ttWorkScheduleIdsQuery = workSchedules?.map(ws => ws.ttWorkScheduleId);
        }
        let ttGroupIdsQuery = [];
        if (groupIds?.length > 0) {
            const groupMappings = await this.groupMappingService.getGroupMappings(groupIds, companyId);
            if (groupMappings?.length === 0) {
                throw new common_1.BadRequestException('Group mapping(s) not found');
            }
            ttGroupIdsQuery = groupMappings?.map(g => g.timeTrackerGroupId);
        }
        const { data: dataOverview } = await this.apiService.request({
            type: 'GET_TIME_ENTRY_OVERVIEW',
            segments: { companyId: ttCompanyId },
            params: {
                ...query,
                groupIds: ttGroupIdsQuery ? ttGroupIdsQuery : [],
                employeeIds: ttEmployeeIdsQuery ? ttEmployeeIdsQuery : [],
                workScheduleIds: ttWorkScheduleIdsQuery ? ttWorkScheduleIdsQuery : [],
            },
        });
        const { data, ...paginationQueryDto } = dataOverview;
        const ttWorkScheduleIds = [];
        const ttEmployeeIds = [];
        data.forEach(item => {
            ttEmployeeIds.push(item.employeeInfo.id);
            if (item.workSchedule) {
                ttWorkScheduleIds.push(item?.workSchedule?.id);
            }
        });
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByTTIds({
            ttEmployeeIds,
            companyId,
        });
        const normalizedEmployeeMapping = {};
        employeeMapping.forEach(item => {
            if (item.timeTrackerEmployeeId &&
                !normalizedEmployeeMapping?.[item.timeTrackerEmployeeId]) {
                normalizedEmployeeMapping[item.timeTrackerEmployeeId] = item.employeeId;
            }
        });
        const empIds = employeeMapping.map(item => item.employeeId);
        const normalizedWorkScheduleMapping = await this.workScheduleService.getNormalizedWorkScheduleByEmployee(empIds, companyId);
        const employeeInfo = await this.timeTrackerEmployeeService.getEmployeeRefAndEmailUsingEIds(empIds);
        const employeeRecord = employeeInfo.reduce((acc, employee) => {
            acc[employee.id] = {
                email: employee.email,
                employeeRef: employee.employeeRef,
            };
            return acc;
        }, {});
        const result = data?.map(item => {
            if (item.employeeInfo) {
                const ttEmployeeId = item.employeeInfo.id || '';
                const employeeId = normalizedEmployeeMapping[ttEmployeeId];
                const overview = {
                    ...item,
                    workSchedule: normalizedWorkScheduleMapping[employeeId],
                    employeeInfo: {
                        ...item?.employeeInfo,
                        id: employeeId,
                        email: employeeRecord[employeeId].email,
                        employeeRef: employeeRecord[employeeId].employeeRef,
                    },
                };
                return overview;
            }
            return item;
        });
        return { ...paginationQueryDto, data: result };
    }
    async handleGetOverviewTimeEntriesOfEmployee(companyId, ttCompanyId, employeeId, query) {
        let ttEmployeeIdsQuery = [];
        if (employeeId) {
            const employeeMappings = await this.employeeMappingService.getManyEmployeeMappingByIds({
                companyId,
                employeeIds: [employeeId],
            });
            if (employeeMappings?.length === 0) {
                throw new common_1.BadRequestException('Employee mapping(s) not found');
            }
            ttEmployeeIdsQuery = employeeMappings?.map(e => e.timeTrackerEmployeeId);
        }
        const { data: dataOverview } = await this.apiService.request({
            type: 'GET_TIME_ENTRY_OVERVIEW_EMPLOYEE',
            segments: { companyId: ttCompanyId, employeeId: ttEmployeeIdsQuery[0] },
            params: {
                ...query,
            },
        });
        return dataOverview;
    }
    async getLastActivityByEmployeeId(employeeId, companyId, ttCompanyId) {
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: [employeeId],
        });
        const ttEmployeeId = employeeMapping[0].timeTrackerEmployeeId;
        const { data } = await this.apiService.request({
            type: 'GET_LAST_ACTIVITY_OF_USER',
            segments: { employeeId: ttEmployeeId, companyId: ttCompanyId },
        });
        return data;
    }
    async deleteTimeEntry(deleteTimeEntryDto, timeTrackerCompanyId) {
        const { data } = await this.apiService.request({
            type: 'DELETE_TIME_ENTRY',
            data: deleteTimeEntryDto,
            segments: { companyId: timeTrackerCompanyId },
        });
        return data;
    }
    async updateTimeEntry(updateTimeEntryDto, timeTrackerCompanyId, companyId) {
        const employeeIds = updateTimeEntryDto.map(value => value.employeeId);
        const employeeMapping = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: employeeIds,
        });
        const updateDtos = updateTimeEntryDto.map(entry => {
            return {
                ...entry,
                employeeId: employeeMapping[0]?.timeTrackerEmployeeId,
            };
        });
        const { data } = await this.apiService.request({
            type: 'UPDATE_TIME_ENTRY',
            segments: { companyId: timeTrackerCompanyId },
            data: updateDtos,
        });
        return data;
    }
    async handleCalculateUnpaidDaysTimeTracker(listEmployeeIds, startDate, endDate, companyId, ttCompanyId) {
        const listEmployeesInfo = await this.employeeMappingService.getManyEmployeeMappingByIds({
            companyId,
            employeeIds: listEmployeeIds,
        });
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
        const [listEmployeeLeaveInfo, listEmployeePaidLeaveInfo] = await Promise.all([
            this.leaveService.getTotalUnpaidDays({
                companyId: companyId,
                employeeIds: listEmployeeIds,
                startDate,
                endDate,
            }),
            this.leaveService.getTotalUnpaidDays({
                companyId: companyId,
                employeeIds: listEmployeeIds,
                startDate,
                endDate,
                paidLeave: true,
            }),
        ]);
        const result = listEmployeesInfo.reduce((acc, employee) => {
            const employeeLeaves = listEmployeeLeaveInfo[employee.employeeId];
            const employeePaidLeaves = listEmployeePaidLeaveInfo[employee.employeeId];
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
            LeaveInfo: listEmployeeLeaveInfo,
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
        const result = await this.timeSheetAdjustmentService.createMultiAdjustmentsFromTimeTracker(unPaidDayData, payrollHeaderId, companyId, userEmail);
        return { result };
    }
};
exports.TimeEntryService = TimeEntryService;
exports.TimeEntryService = TimeEntryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_service_1.TimeTrackerApiService,
        employee_mapping_service_1.EmployeeMappingService,
        work_schedule_1.WorkScheduleService,
        services_1.LeaveService,
        services_2.TimeSheetAdjustmentService,
        prtrx_hdr_service_1.PrtrxHdrService,
        group_mapping_service_1.GroupMappingService,
        employee_service_1.TimeTrackerEmployeeService])
], TimeEntryService);
//# sourceMappingURL=time-entry.service.js.map
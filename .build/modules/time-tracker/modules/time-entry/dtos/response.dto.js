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
exports.GetTimesheetOfEmployeeResponseDto = exports.TimesheetDto = exports.EmployeeInfoDto = exports.GetLastActivityResponseDto = exports.TimeEntryDTO = exports.SummarizeOverviewTimeEntriesResponseDto = exports.GetTimeEntriesDetailResponseDto = exports.SummaryWeekLyTrackedHourResponseDto = exports.TimeEntriesRecordDTO = exports.SummaryWeeklyDTO = exports.PayrollHourDTO = exports.TrackedHourDTO = exports.OverTimeDTO = exports.TimeEntryDetailResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TimeEntryDetailResponseDto {
}
exports.TimeEntryDetailResponseDto = TimeEntryDetailResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Function)
], TimeEntryDetailResponseDto.prototype, "employeeInfo", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], TimeEntryDetailResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], TimeEntryDetailResponseDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], TimeEntryDetailResponseDto.prototype, "timeEntries", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], TimeEntryDetailResponseDto.prototype, "trackedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], TimeEntryDetailResponseDto.prototype, "payrollHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], TimeEntryDetailResponseDto.prototype, "splitTime", void 0);
class OverTimeDTO {
}
exports.OverTimeDTO = OverTimeDTO;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], OverTimeDTO.prototype, "regular", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], OverTimeDTO.prototype, "dailyOvertime", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], OverTimeDTO.prototype, "dailyDoubleOvertime", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], OverTimeDTO.prototype, "weeklyOvertime", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], OverTimeDTO.prototype, "restDayOvertime", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], OverTimeDTO.prototype, "publicHolidayOvertime", void 0);
class TrackedHourDTO {
}
exports.TrackedHourDTO = TrackedHourDTO;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TrackedHourDTO.prototype, "trackedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TrackedHourDTO.prototype, "workedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TrackedHourDTO.prototype, "breakHour", void 0);
class PayrollHourDTO {
}
exports.PayrollHourDTO = PayrollHourDTO;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], PayrollHourDTO.prototype, "payrollHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], PayrollHourDTO.prototype, "workedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", OverTimeDTO)
], PayrollHourDTO.prototype, "overTime", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], PayrollHourDTO.prototype, "breakPaid", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], PayrollHourDTO.prototype, "autoDeduction", void 0);
class SummaryWeeklyDTO {
}
exports.SummaryWeeklyDTO = SummaryWeeklyDTO;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", TrackedHourDTO)
], SummaryWeeklyDTO.prototype, "trackedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", PayrollHourDTO)
], SummaryWeeklyDTO.prototype, "payrollHour", void 0);
class TimeEntriesRecordDTO {
}
exports.TimeEntriesRecordDTO = TimeEntriesRecordDTO;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", TimeEntryDetailResponseDto)
], TimeEntriesRecordDTO.prototype, "trackingInDay", void 0);
class SummaryWeekLyTrackedHourResponseDto {
}
exports.SummaryWeekLyTrackedHourResponseDto = SummaryWeekLyTrackedHourResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], SummaryWeekLyTrackedHourResponseDto.prototype, "timeEntries", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", SummaryWeeklyDTO)
], SummaryWeekLyTrackedHourResponseDto.prototype, "summaryWeekly", void 0);
class GetTimeEntriesDetailResponseDto {
}
exports.GetTimeEntriesDetailResponseDto = GetTimeEntriesDetailResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], GetTimeEntriesDetailResponseDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], GetTimeEntriesDetailResponseDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetTimeEntriesDetailResponseDto.prototype, "theLatestClockIn", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetTimeEntriesDetailResponseDto.prototype, "firstIn", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetTimeEntriesDetailResponseDto.prototype, "lastOut", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], GetTimeEntriesDetailResponseDto.prototype, "timeEntries", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetTimeEntriesDetailResponseDto.prototype, "employeeInfo", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetTimeEntriesDetailResponseDto.prototype, "workScheduleEntity", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetTimeEntriesDetailResponseDto.prototype, "trackedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetTimeEntriesDetailResponseDto.prototype, "payrollHour", void 0);
class SummarizeOverviewTimeEntriesResponseDto {
}
exports.SummarizeOverviewTimeEntriesResponseDto = SummarizeOverviewTimeEntriesResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], SummarizeOverviewTimeEntriesResponseDto.prototype, "trackedHours", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], SummarizeOverviewTimeEntriesResponseDto.prototype, "payrollHours", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], SummarizeOverviewTimeEntriesResponseDto.prototype, "scheduledWorkHours", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], SummarizeOverviewTimeEntriesResponseDto.prototype, "breakHours", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], SummarizeOverviewTimeEntriesResponseDto.prototype, "autoDeduction", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], SummarizeOverviewTimeEntriesResponseDto.prototype, "scheduledWorkHoursUnitTime", void 0);
class TimeEntryDTO {
}
exports.TimeEntryDTO = TimeEntryDTO;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], TimeEntryDTO.prototype, "timeEntryType", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Date)
], TimeEntryDTO.prototype, "timeEntry", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Function)
], TimeEntryDTO.prototype, "project", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Function)
], TimeEntryDTO.prototype, "activity", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], TimeEntryDTO.prototype, "splitTime", void 0);
class GetLastActivityResponseDto {
}
exports.GetLastActivityResponseDto = GetLastActivityResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetLastActivityResponseDto.prototype, "penultimate", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], GetLastActivityResponseDto.prototype, "last", void 0);
class EmployeeInfoDto {
}
exports.EmployeeInfoDto = EmployeeInfoDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], EmployeeInfoDto.prototype, "lastName", void 0);
class TimesheetDto {
}
exports.TimesheetDto = TimesheetDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], TimesheetDto.prototype, "day", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", String)
], TimesheetDto.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], TimesheetDto.prototype, "totalWorkScheduleHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TimesheetDto.prototype, "trackedHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TimesheetDto.prototype, "payrollHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TimesheetDto.prototype, "breakHour", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Number)
], TimesheetDto.prototype, "autoDeduction", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], TimesheetDto.prototype, "trackedHourDay", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Object)
], TimesheetDto.prototype, "payrollHourDay", void 0);
class GetTimesheetOfEmployeeResponseDto {
}
exports.GetTimesheetOfEmployeeResponseDto = GetTimesheetOfEmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", EmployeeInfoDto)
], GetTimesheetOfEmployeeResponseDto.prototype, "employeeInfo", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)(),
    __metadata("design:type", Array)
], GetTimesheetOfEmployeeResponseDto.prototype, "timesheet", void 0);
//# sourceMappingURL=response.dto.js.map
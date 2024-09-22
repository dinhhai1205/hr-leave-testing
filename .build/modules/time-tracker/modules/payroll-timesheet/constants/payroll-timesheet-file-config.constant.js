"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYROLL_TIMESHEET_FILE_CONFIG_DAY_SAMPLE = exports.PAYROLL_TIMESHEET_FILE_CONFIG_HOUR_SAMPLE = exports.PAYROLL_TIMESHEET_FILE_HEADER_HOUR_SAMPLE = exports.PAYROLL_TIMESHEET_FILE_HEADER_HOUR = exports.PAYROLL_TIMESHEET_FILE_HEADER_DAY_SAMPLE = exports.PAYROLL_TIMESHEET_FILE_HEADER_DAY = exports.PAYROLL_TIMESHEET_FILE_CONFIG_HOUR = exports.PAYROLL_TIMESHEET_FILE_CONFIG_DAY = exports.TOTAL_PAYROLL_REGULAR_WORK_HOURS = exports.UNPAID_HOURS = exports.ADJUSTMENT_HOURS_DEDUCTION = exports.ADJUSTMENT_HOURS_ADDITION = exports.TOTAL_SCHEDULE_WORK_HOUR = exports.TOTAL_PAYROLL_REGULAR_WORK_DAYS = exports.UNPAID_DAYS = exports.ADJUSTMENT_DAYS_DEDUCTION = exports.ADJUSTMENT_DAYS_ADDITION = exports.TOTAL_SCHEDULE_WORK_DAY = exports.PAYROLL_TIMESHEET_FILE_NAME = void 0;
const constants_1 = require("../../timesheet-adjustment/constants");
exports.PAYROLL_TIMESHEET_FILE_NAME = 'Payroll-Timesheet';
exports.TOTAL_SCHEDULE_WORK_DAY = 'Total Scheduled Work Days';
exports.ADJUSTMENT_DAYS_ADDITION = 'Adjustment Days Addition (previous period) Days';
exports.ADJUSTMENT_DAYS_DEDUCTION = 'Adjustment Days Deduction (previous period) Days';
exports.UNPAID_DAYS = 'Unpaid Days';
exports.TOTAL_PAYROLL_REGULAR_WORK_DAYS = 'Total Payroll Regular Work Days';
exports.TOTAL_SCHEDULE_WORK_HOUR = 'Total Scheduled Work Hours';
exports.ADJUSTMENT_HOURS_ADDITION = 'Adjustment Days Addition (previous period) Hours';
exports.ADJUSTMENT_HOURS_DEDUCTION = 'Adjustment Days Deduction (previous period) Hours';
exports.UNPAID_HOURS = 'Unpaid Hours';
exports.TOTAL_PAYROLL_REGULAR_WORK_HOURS = 'Total Payroll Regular Work Hours';
exports.PAYROLL_TIMESHEET_FILE_CONFIG_DAY = [
    { name: constants_1.FULL_NAME_LOCAL, key: 'fullNameLocal', width: 20 },
    { name: constants_1.FULL_NAME_ENGLISH, key: 'fullNameEn', width: 20 },
    { name: constants_1.EMPLOYEE_REF, key: 'employeeRef', width: 15 },
    { name: constants_1.ORG_ELEMENTS, key: 'orgElements', width: 15 },
    { name: constants_1.COST_CENTER, key: 'costCenter', width: 15 },
    { name: constants_1.PAYROLL_GROUP, key: 'payrollGroup', width: 15 },
    { name: exports.TOTAL_SCHEDULE_WORK_DAY, key: 'totalScheduledWorkDays', width: 25 },
    {
        name: exports.ADJUSTMENT_DAYS_ADDITION,
        key: 'adjustmentDaysAdditionDays',
        width: 25,
    },
    {
        name: exports.ADJUSTMENT_DAYS_DEDUCTION,
        key: 'adjustmentDaysDeductionDays',
        width: 25,
    },
    { name: exports.UNPAID_DAYS, key: 'unpaidDays', width: 15 },
    {
        name: exports.TOTAL_PAYROLL_REGULAR_WORK_DAYS,
        key: 'totalPayrollRegularWorkDays',
        width: 25,
    },
];
exports.PAYROLL_TIMESHEET_FILE_CONFIG_HOUR = [
    { name: constants_1.FULL_NAME_LOCAL, key: 'fullNameLocal', width: 20 },
    { name: constants_1.FULL_NAME_ENGLISH, key: 'fullNameEn', width: 20 },
    { name: constants_1.EMPLOYEE_REF, key: 'employeeRef', width: 15 },
    { name: constants_1.ORG_ELEMENTS, key: 'orgElements', width: 15 },
    { name: constants_1.COST_CENTER, key: 'costCenter', width: 15 },
    { name: constants_1.PAYROLL_GROUP, key: 'payrollGroup', width: 15 },
    { name: exports.TOTAL_SCHEDULE_WORK_HOUR, key: 'totalScheduledWorkHours', width: 25 },
    {
        name: exports.ADJUSTMENT_HOURS_ADDITION,
        key: 'adjustmentDaysAdditionDays',
        width: 25,
    },
    {
        name: exports.ADJUSTMENT_HOURS_DEDUCTION,
        key: 'adjustmentDaysDeductionDays',
        width: 25,
    },
    { name: exports.UNPAID_HOURS, key: 'unpaidDays', width: 15 },
    {
        name: exports.TOTAL_PAYROLL_REGULAR_WORK_HOURS,
        key: 'totalPayrollRegularWorkDays',
        width: 25,
    },
];
exports.PAYROLL_TIMESHEET_FILE_HEADER_DAY = [
    constants_1.FULL_NAME_LOCAL,
    constants_1.FULL_NAME_ENGLISH,
    constants_1.EMPLOYEE_REF,
    constants_1.ORG_ELEMENTS,
    constants_1.COST_CENTER,
    constants_1.PAYROLL_GROUP,
    exports.TOTAL_SCHEDULE_WORK_DAY,
    exports.ADJUSTMENT_DAYS_ADDITION,
    exports.ADJUSTMENT_DAYS_DEDUCTION,
    exports.UNPAID_DAYS,
    exports.TOTAL_PAYROLL_REGULAR_WORK_DAYS,
];
exports.PAYROLL_TIMESHEET_FILE_HEADER_DAY_SAMPLE = [
    constants_1.FULL_NAME_LOCAL,
    constants_1.FULL_NAME_ENGLISH,
    constants_1.EMPLOYEE_REF,
    constants_1.ORG_ELEMENTS,
    constants_1.COST_CENTER,
    constants_1.PAYROLL_GROUP,
    exports.TOTAL_SCHEDULE_WORK_DAY,
];
exports.PAYROLL_TIMESHEET_FILE_HEADER_HOUR = [
    constants_1.FULL_NAME_LOCAL,
    constants_1.FULL_NAME_ENGLISH,
    constants_1.EMPLOYEE_REF,
    constants_1.ORG_ELEMENTS,
    constants_1.COST_CENTER,
    constants_1.PAYROLL_GROUP,
    exports.TOTAL_SCHEDULE_WORK_HOUR,
    exports.ADJUSTMENT_HOURS_ADDITION,
    exports.ADJUSTMENT_HOURS_DEDUCTION,
    exports.UNPAID_HOURS,
    exports.TOTAL_PAYROLL_REGULAR_WORK_HOURS,
];
exports.PAYROLL_TIMESHEET_FILE_HEADER_HOUR_SAMPLE = [
    constants_1.FULL_NAME_LOCAL,
    constants_1.FULL_NAME_ENGLISH,
    constants_1.EMPLOYEE_REF,
    constants_1.ORG_ELEMENTS,
    constants_1.COST_CENTER,
    constants_1.PAYROLL_GROUP,
    exports.TOTAL_SCHEDULE_WORK_HOUR,
];
exports.PAYROLL_TIMESHEET_FILE_CONFIG_HOUR_SAMPLE = [
    { name: constants_1.FULL_NAME_LOCAL, key: 'fullNameLocal', width: 20 },
    { name: constants_1.FULL_NAME_ENGLISH, key: 'fullNameEn', width: 20 },
    { name: constants_1.EMPLOYEE_REF, key: 'employeeRef', width: 15 },
    { name: constants_1.ORG_ELEMENTS, key: 'orgElements', width: 15 },
    { name: constants_1.COST_CENTER, key: 'costCenter', width: 15 },
    { name: constants_1.PAYROLL_GROUP, key: 'payrollGroup', width: 15 },
    { name: exports.TOTAL_SCHEDULE_WORK_HOUR, key: 'totalScheduledWorkHours', width: 25 },
];
exports.PAYROLL_TIMESHEET_FILE_CONFIG_DAY_SAMPLE = [
    { name: constants_1.FULL_NAME_LOCAL, key: 'fullNameLocal', width: 20 },
    { name: constants_1.FULL_NAME_ENGLISH, key: 'fullNameEn', width: 20 },
    { name: constants_1.EMPLOYEE_REF, key: 'employeeRef', width: 15 },
    { name: constants_1.ORG_ELEMENTS, key: 'orgElements', width: 15 },
    { name: constants_1.COST_CENTER, key: 'costCenter', width: 15 },
    { name: constants_1.PAYROLL_GROUP, key: 'payrollGroup', width: 15 },
    { name: exports.TOTAL_SCHEDULE_WORK_DAY, key: 'totalScheduledWorkDays', width: 25 },
];
//# sourceMappingURL=payroll-timesheet-file-config.constant.js.map
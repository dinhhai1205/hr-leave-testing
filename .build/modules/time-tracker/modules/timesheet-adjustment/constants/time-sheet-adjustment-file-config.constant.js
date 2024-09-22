"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAY_ELEMENT_MAPPING_NAME = exports.TIME_SHEET_ADJUSTMENT_FILE_HEADER = exports.TIME_SHEET_ADJUSTMENT_FILE_CONFIG = exports.HOURS = exports.DATE = exports.PAY_ELEMENT_MAPPING_CODE = exports.PAY_ELEMENT_MAPPING = exports.ADDJUSTMENT_TYPES = exports.PAYROLL_GROUP = exports.COST_CENTER = exports.ORG_ELEMENTS = exports.EMPLOYEE_REF = exports.FULL_NAME_ENGLISH = exports.FULL_NAME_LOCAL = exports.TIME_SHEET_ADJUSTMENT_FILE_NAME = void 0;
exports.TIME_SHEET_ADJUSTMENT_FILE_NAME = 'Timesheet-Ajustment';
exports.FULL_NAME_LOCAL = 'Full Name (Local)';
exports.FULL_NAME_ENGLISH = 'Full Name (English)';
exports.EMPLOYEE_REF = 'Employee Ref';
exports.ORG_ELEMENTS = 'Org Elements';
exports.COST_CENTER = 'Cost Center';
exports.PAYROLL_GROUP = 'Payroll Group';
exports.ADDJUSTMENT_TYPES = 'Adjustment Types';
exports.PAY_ELEMENT_MAPPING = 'Pay element Mapping';
exports.PAY_ELEMENT_MAPPING_CODE = 'Pay element Mapping Code';
exports.DATE = 'Date';
exports.HOURS = 'Hours';
exports.TIME_SHEET_ADJUSTMENT_FILE_CONFIG = [
    { name: exports.FULL_NAME_LOCAL, key: 'fullNameLocal', width: 20 },
    { name: exports.FULL_NAME_ENGLISH, key: 'fullNameEn', width: 20 },
    { name: exports.EMPLOYEE_REF, key: 'employeeRef', width: 15 },
    { name: exports.ORG_ELEMENTS, key: 'orgElements', width: 15 },
    { name: exports.COST_CENTER, key: 'costCenter', width: 15 },
    { name: exports.PAYROLL_GROUP, key: 'payrollGroup', width: 15 },
    { name: exports.ADDJUSTMENT_TYPES, key: 'adjustmentType', width: 15 },
    { name: exports.PAY_ELEMENT_MAPPING, key: 'payElementMapping', width: 20 },
    { name: exports.PAY_ELEMENT_MAPPING_CODE, key: 'payElementMappingCode', width: 30 },
    { name: exports.DATE, key: 'date', width: 15 },
    { name: exports.HOURS, key: 'hours', width: 15 },
];
exports.TIME_SHEET_ADJUSTMENT_FILE_HEADER = [
    exports.FULL_NAME_LOCAL,
    exports.FULL_NAME_ENGLISH,
    exports.EMPLOYEE_REF,
    exports.ORG_ELEMENTS,
    exports.COST_CENTER,
    exports.PAYROLL_GROUP,
    exports.ADDJUSTMENT_TYPES,
    exports.PAY_ELEMENT_MAPPING,
    exports.PAY_ELEMENT_MAPPING_CODE,
    exports.DATE,
    exports.HOURS,
];
exports.PAY_ELEMENT_MAPPING_NAME = {
    unpaidDaysCC: 'Unpaid Days (Current cycle)',
    adjAdditionPrevMonth: 'Adjustment addition (previous cycle)',
    adjDeductionPrevMonth: 'Adjustment deduction (previous cycle)',
};
//# sourceMappingURL=time-sheet-adjustment-file-config.constant.js.map
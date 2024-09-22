"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTypeTestData = void 0;
const common_test_data_1 = require("./common.test-data");
const company_test_data_1 = require("./company.test-data");
exports.leaveTypeTestData = [
    {
        id: 2528,
        companyId: company_test_data_1.companyTestData.id,
        code: 'TEST',
        name: 'Testing Leave',
        remark: '',
        paidLeave: true,
        color: '#FFFFFF',
        startDate: new Date('0001-01-01T00:00:00.000Z'),
        endDate: new Date('2100-01-30T00:00:00.000Z'),
        allowApplyExceed: true,
        allowFutureDates: true,
        daysFromNow: 9999999999,
        allowPastDates: true,
        daysAgo: 0,
        daysInAdvance: 0,
        maxDayApply: 999999,
        maxConsecutive: 999999,
        allowApplyHalfDay: true,
        includePublicHoliday: false,
        includeNonWorkingDay: false,
        isSpecial: false,
        cfRoundTo: 0,
        active: true,
        activeForEss: true,
        parentId: 0,
        parent: null,
        children: [],
        ...common_test_data_1.commonTestData,
        company: {},
        leaves: [],
        leaveTypePolicies: [],
        leaveTypeBalances: [],
        leaveTypeAssignment: {},
        leaveTransactions: [],
        employeeLeaveTypeBalance: {},
    },
];
//# sourceMappingURL=leave-type.test-data.js.map
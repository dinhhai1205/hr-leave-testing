"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTestData = void 0;
const enums_1 = require("../enums");
const common_test_data_1 = require("../test-data/common.test-data");
const leave = {
    leaveNo: 42,
    companyId: 477,
    employeeId: 154690,
    leaveTypeId: 2528,
    reason: '',
    statusId: enums_1.ELeaveStatusId.DRAFT,
    fromFdHd: enums_1.ELeaveDuration.FULL_DAY,
    toFdHd: enums_1.ELeaveDuration.FULL_DAY,
    effDayOfLeave: 0,
    allMustApprove: false,
    approvedOn: null,
    approvedBy: '',
    cancelledOn: null,
    cancelledBy: null,
    declinedOn: null,
    declinedBy: null,
    fileCount: 0,
    ...common_test_data_1.commonTestData,
    employee: {},
    leaveType: {},
    company: {},
    approverTrx: [
        {
            id: 7069,
            companyId: 477,
            moduleId: 2,
            approverLevel: 1,
            userEmail: 'trunglm@zigvy.com',
        },
    ],
};
exports.leaveTestData = [
    {
        ...leave,
        id: 1602,
        dateFrom: new Date('2023-11-03T00:00:00.000Z'),
        dateTo: new Date('2023-11-03T00:00:00.000Z'),
    },
    {
        ...leave,
        id: 1603,
        dateFrom: new Date('2023-11-10T00:00:00.000Z'),
        dateTo: new Date('2023-11-10T00:00:00.000Z'),
    },
    {
        ...leave,
        id: 1604,
        dateFrom: new Date('2023-11-11T00:00:00.000Z'),
        dateTo: new Date('2023-11-11T00:00:00.000Z'),
    },
    {
        ...leave,
        id: 1605,
        dateFrom: new Date('2023-11-12T00:00:00.000Z'),
        dateTo: new Date('2023-11-12T00:00:00.000Z'),
    },
    {
        ...leave,
        id: 1606,
        dateFrom: new Date('2023-11-13T00:00:00.000Z'),
        dateTo: new Date('2023-11-13T00:00:00.000Z'),
    },
    {
        ...leave,
        id: 1607,
        dateFrom: new Date('2023-11-14T00:00:00.000Z'),
        dateTo: new Date('2023-11-14T00:00:00.000Z'),
    },
];
//# sourceMappingURL=leave.test-data.js.map
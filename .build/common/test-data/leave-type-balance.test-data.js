"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTypeBalanceTestData = void 0;
const defaultRelations = {
    company: {},
    employee: {},
    leaveType: {},
    employeeLeaveType: {},
    leaveTransactions: [],
};
exports.leaveTypeBalanceTestData = [
    {
        id: 4874,
        isDeleted: false,
        companyId: 162,
        employeeId: 4163,
        leaveTypeId: 839,
        balance: 5,
        createdBy: 'triln@zigvy.com',
        createdOn: new Date('2023-08-09T04:10:41Z'),
        updatedBy: 'cronjob@hrforte.com',
        updatedOn: new Date('2023-12-01T06:42:49.640436Z'),
        ...defaultRelations,
    },
    {
        id: 4664,
        isDeleted: false,
        companyId: 162,
        employeeId: 4171,
        leaveTypeId: 839,
        balance: 5.67,
        createdBy: 'triln@zigvy.com',
        createdOn: new Date('2023-08-09T04:10:41Z'),
        updatedBy: 'cronjob@hrforte.com',
        updatedOn: new Date('2023-12-01T06:56:47.217075Z'),
        ...defaultRelations,
    },
    {
        id: 4734,
        isDeleted: false,
        companyId: 162,
        employeeId: 4169,
        leaveTypeId: 839,
        balance: 5.33,
        createdBy: 'triln@zigvy.com',
        createdOn: new Date('2023-08-09T04:10:41Z'),
        updatedBy: 'cronjob@hrforte.com',
        updatedOn: new Date('2023-12-01T06:56:47.217075Z'),
        ...defaultRelations,
    },
];
//# sourceMappingURL=leave-type-balance.test-data.js.map
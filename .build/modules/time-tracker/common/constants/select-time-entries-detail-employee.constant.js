"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SELECT_TIME_ENTRIES_DETAIL_EMPLOYEE = void 0;
exports.SELECT_TIME_ENTRIES_DETAIL_EMPLOYEE = {
    id: true,
    timeEntryType: true,
    timeEntry: true,
    description: true,
    employee: {
        id: true,
        lastName: true,
        firstName: true,
        roleName: true,
    },
    locationWorkSchedule: {
        id: true,
        location: {
            id: true,
            name: true,
        },
    },
    project: {
        id: true,
        name: true,
    },
    activity: {
        id: true,
        name: true,
    },
    workSchedule: {
        id: true,
        name: true,
        breakType: true,
    },
    company: {
        id: true,
        name: true,
    },
    breakRule: {
        id: true,
        name: true,
    },
    nextTimeEntryId: true,
    previousTimeEntryId: true,
    offset: true,
    localDate: true,
    status: true,
    totalDuration: true,
    unitTime: true,
    createdBy: true,
    createdOn: true,
    updatedBy: true,
};
//# sourceMappingURL=select-time-entries-detail-employee.constant.js.map
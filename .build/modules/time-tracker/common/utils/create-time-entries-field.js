"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimeEntriesField = void 0;
const enums_1 = require("../enums");
const createTimeEntriesField = (createTimeEntryBodyDto, localDate, timeEntry, isManual, workScheduleId, belongsToDate, companyId) => {
    const { activityId, projectId, employeeId, breakId, timeEntryType, utcOffset, description, endBreakTime, locationWorkScheduleId, } = createTimeEntryBodyDto;
    if (timeEntryType === enums_1.TimeEntryType.OUT) {
        return {
            description,
            endBreakTime,
            timeEntryType: timeEntryType,
            unitTime: enums_1.UnitTime.MINUTE,
            utcOffset,
            locationWorkSchedule: {
                id: locationWorkScheduleId,
            },
            employee: {
                id: employeeId,
            },
            workSchedule: {
                id: workScheduleId,
            },
            company: {
                id: companyId,
            },
            breakRule: {
                id: breakId,
            },
            localDate,
            timeEntry,
            status: enums_1.StatusTimeEntry.Active,
            isManual,
            belongsToDate,
        };
    }
    return {
        description,
        endBreakTime,
        timeEntryType: timeEntryType,
        unitTime: enums_1.UnitTime.MINUTE,
        utcOffset,
        locationWorkSchedule: {
            id: locationWorkScheduleId,
        },
        activity: {
            id: activityId,
        },
        employee: {
            id: employeeId,
        },
        project: {
            id: projectId,
        },
        workSchedule: {
            id: workScheduleId,
        },
        company: {
            id: companyId,
        },
        breakRule: {
            id: breakId,
        },
        localDate,
        timeEntry,
        status: enums_1.StatusTimeEntry.Active,
        isManual,
        belongsToDate,
    };
};
exports.createTimeEntriesField = createTimeEntriesField;
//# sourceMappingURL=create-time-entries-field.js.map
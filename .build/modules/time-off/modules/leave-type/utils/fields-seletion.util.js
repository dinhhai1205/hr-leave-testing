"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTypeFieldsSelectForLeaveValidate = void 0;
const leaveTypeFieldsSelectForLeaveValidate = (ltAlias) => {
    return [
        `${ltAlias}.id`,
        `${ltAlias}.startDate`,
        `${ltAlias}.endDate`,
        `${ltAlias}.allowApplyExceed`,
        `${ltAlias}.allowFutureDates`,
        `${ltAlias}.daysFromNow`,
        `${ltAlias}.allowPastDates`,
        `${ltAlias}.daysAgo`,
        `${ltAlias}.daysInAdvance`,
        `${ltAlias}.maxDayApply`,
        `${ltAlias}.maxConsecutive`,
        `${ltAlias}.allowApplyHalfDay`,
        `${ltAlias}.includePublicHoliday`,
        `${ltAlias}.includeNonWorkingDay`,
        `${ltAlias}.parentId`,
    ];
};
exports.leaveTypeFieldsSelectForLeaveValidate = leaveTypeFieldsSelectForLeaveValidate;
//# sourceMappingURL=fields-seletion.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTypeFieldsForGetLeave = leaveTypeFieldsForGetLeave;
function leaveTypeFieldsForGetLeave(alias) {
    return [
        `${alias}.id`,
        `${alias}.code`,
        `${alias}.name`,
        `${alias}.remark`,
        `${alias}.paidLeave`,
        `${alias}.color`,
        `${alias}.startDate`,
        `${alias}.endDate`,
        `${alias}.allowApplyExceed`,
        `${alias}.allowFutureDates`,
        `${alias}.daysFromNow`,
        `${alias}.allowPastDates`,
        `${alias}.daysAgo`,
        `${alias}.daysInAdvance`,
        `${alias}.maxDayApply`,
        `${alias}.maxConsecutive`,
        `${alias}.allowApplyHalfDay`,
        `${alias}.includePublicHoliday`,
        `${alias}.includeNonWorkingDay`,
        `${alias}.isSpecial`,
        `${alias}.cfRoundTo`,
        `${alias}.parentId`,
    ];
}
//# sourceMappingURL=leave-type-fields-for-get-leave.util.js.map
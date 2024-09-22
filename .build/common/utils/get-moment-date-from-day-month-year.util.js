"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMomentDateFromDayMonthYear = getMomentDateFromDayMonthYear;
const moment = require("moment");
function getMomentDateFromDayMonthYear(args) {
    const { day, month, year, utcOffset } = args;
    let cloneDay = new Number(day).valueOf();
    const isLeapYear = moment.utc(`${year}-04-01`).isLeapYear();
    if (!isLeapYear && day === 29 && month === 2) {
        cloneDay = 28;
    }
    return moment
        .utc({
        year,
        month: month - 1,
        day: cloneDay,
    })
        .utcOffset(utcOffset || 0, true);
}
//# sourceMappingURL=get-moment-date-from-day-month-year.util.js.map
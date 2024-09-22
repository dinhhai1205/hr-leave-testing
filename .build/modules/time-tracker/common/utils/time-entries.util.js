"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateArray = exports.addHourToIsoString = exports.getCurrentWeek = exports.formatDate = exports.getDaysBetweenDates = exports.mappedResultTimeEntry = exports.nextDayFromISOString = exports.convertDateTimeString = exports.convertDayToWeekDay = exports.getHoursAndMinutesFormat = exports.getAllDayInMonthFromDate = exports.getAllDayInWeekFormDate = exports.formatDifferenceMinute = void 0;
const moment = require("moment");
const constants_1 = require("../constants");
const formatDifferenceMinute = (differenceInMinute) => {
    const hours = Math.floor(differenceInMinute / 60);
    const minutes = differenceInMinute % 60;
    return `${hours}h ${minutes}m`;
};
exports.formatDifferenceMinute = formatDifferenceMinute;
const getAllDayInWeekFormDate = (date) => {
    const startDate = new Date(date);
    const nextSevenDays = [];
    nextSevenDays.push(moment(startDate).format('yyyy-MM-DD'));
    for (let i = 0; i < 6; i++) {
        const newDate = new Date(nextSevenDays[i]);
        newDate.setDate(newDate.getDate() + 1);
        nextSevenDays.push(moment(newDate).format('yyyy-MM-DD'));
    }
    return nextSevenDays;
};
exports.getAllDayInWeekFormDate = getAllDayInWeekFormDate;
const getAllDayInMonthFromDate = (date) => {
    const [year, month] = date.split('-').map(Number);
    const daysOfMonth = [];
    const lastDay = new Date(year, month, 0).getDate();
    for (let day = 1; day <= lastDay; day++) {
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
        daysOfMonth.push(formattedDate);
    }
    return daysOfMonth;
};
exports.getAllDayInMonthFromDate = getAllDayInMonthFromDate;
const getHoursAndMinutesFormat = (date, offset) => {
    const currentDate = new Date(date);
    const hours = currentDate.getHours() + offset;
    const minutes = currentDate.getMinutes();
    return `${hours}h ${minutes}m`;
};
exports.getHoursAndMinutesFormat = getHoursAndMinutesFormat;
const convertDayToWeekDay = (dateString) => {
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormatRegex.test(dateString)) {
        throw new Error(`${dateString} does not have the correct format (YYYY-MM-DD).`);
    }
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return constants_1.weekdays[dayOfWeek];
};
exports.convertDayToWeekDay = convertDayToWeekDay;
const convertDateTimeString = (dateString, timeString) => {
    const isoDateTimeString = `${dateString}T${timeString}`;
    const date = new Date(isoDateTimeString).toISOString();
    return date;
};
exports.convertDateTimeString = convertDateTimeString;
const nextDayFromISOString = (isoDateTimeString) => {
    const endDateTime = new Date(isoDateTimeString);
    endDateTime.setDate(endDateTime.getDate() + 1);
    return endDateTime.toISOString();
};
exports.nextDayFromISOString = nextDayFromISOString;
const mappedResultTimeEntry = (timeEntry) => {
    return {
        id: timeEntry.id,
        timeEntryType: timeEntry.timeEntryType,
        utcOffset: timeEntry.utcOffset,
        timeEntry: timeEntry.timeEntry,
        description: timeEntry.description,
        localDate: timeEntry.localDate,
        totalDuration: timeEntry.totalDuration,
        status: timeEntry.status,
        nextTimeEntryId: timeEntry.nextTimeEntryId,
        previousTimeEntryId: timeEntry.previousTimeEntryId,
        breakId: timeEntry.breakRuleId,
        employeeId: timeEntry.employeeId,
        workScheduleId: timeEntry.workScheduleId,
        companyId: timeEntry.companyId,
        projectId: timeEntry?.projectId,
        activityId: timeEntry?.activityId,
        reasonDelete: timeEntry.reasonDelete,
        unitTime: timeEntry.unitTime,
        isManual: timeEntry.isManual,
        belongsToDate: timeEntry.belongsToDate,
    };
};
exports.mappedResultTimeEntry = mappedResultTimeEntry;
const getDaysBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];
    const currentDate = start;
    while (currentDate <= end) {
        dates.push(new Date(currentDate).toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};
exports.getDaysBetweenDates = getDaysBetweenDates;
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
exports.formatDate = formatDate;
const getCurrentWeek = () => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    const weekDates = [];
    for (let d = new Date(startOfWeek); d <= endOfWeek; d.setDate(d.getDate() + 1)) {
        weekDates.push((0, exports.formatDate)(new Date(d)));
    }
    return weekDates;
};
exports.getCurrentWeek = getCurrentWeek;
const addHourToIsoString = (isoString, utcOffSet) => {
    const date = new Date(isoString);
    date.setHours(date.getHours() + utcOffSet);
    return date.toISOString();
};
exports.addHourToIsoString = addHourToIsoString;
const paginateArray = (array, page, pageSize) => {
    const startIndex = (page - 1) * pageSize;
    return array.slice(startIndex, startIndex + pageSize);
};
exports.paginateArray = paginateArray;
//# sourceMappingURL=time-entries.util.js.map
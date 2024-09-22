"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiffStringTimeFromTo = exports.getDiffTimeFromTo = void 0;
const moment = require("moment");
const getDiffTimeFromTo = (timeStart, timeEnd) => {
    if (!(timeStart instanceof Date)) {
        timeStart = new Date(timeStart);
    }
    if (!(timeEnd instanceof Date)) {
        timeEnd = new Date(timeEnd);
    }
    const time1 = moment(timeStart);
    const time2 = moment(timeEnd);
    const differenceInMinute = time2.diff(time1, 'minutes');
    return differenceInMinute;
};
exports.getDiffTimeFromTo = getDiffTimeFromTo;
const getDiffStringTimeFromTo = (timeStart, timeEnd) => {
    const momentTime1 = moment(timeStart, 'HH:mm:ss Z');
    const momentTime2 = moment(timeEnd, 'HH:mm:ss Z');
    const difference = momentTime2.diff(momentTime1, 'minutes');
    return difference;
};
exports.getDiffStringTimeFromTo = getDiffStringTimeFromTo;
//# sourceMappingURL=get-diff-time-from-to.utils.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHrforteDay = isValidHrforteDay;
exports.isValidHrforteMonth = isValidHrforteMonth;
exports.isValidHrforteDayMonth = isValidHrforteDayMonth;
const enums_1 = require("../enums");
function isValidHrforteDay(day = 0) {
    return day > 0 && day <= enums_1.ELastDayOfMonth.EACH_MONTH;
}
function isValidHrforteMonth(month = 0) {
    return month > 0 && month <= 12;
}
function isValidHrforteDayMonth(dateInfo) {
    const { day = 0, month = 0 } = dateInfo;
    return isValidHrforteDay(day) && isValidHrforteMonth(month);
}
//# sourceMappingURL=is-valid-day-month.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYearsInRange = getYearsInRange;
const moment = require("moment");
const constants_1 = require("../constants");
function getYearsInRange(yearFrom, yearTo) {
    const years = [];
    const startDate = moment(`${yearFrom}-01-01`, constants_1.DATE_STRING);
    const endDate = moment(`${yearTo}-12-31`, constants_1.DATE_STRING);
    const currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
        years.push(currentDate.year());
        currentDate.add(1, 'year');
    }
    return years;
}
//# sourceMappingURL=get-years-in-range.util.js.map
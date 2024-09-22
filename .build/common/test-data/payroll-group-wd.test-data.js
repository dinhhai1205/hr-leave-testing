"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payrollGroupWdTestData = void 0;
const enums_1 = require("../enums");
function defaultWordDays() {
    const wd = {};
    for (let i = 2; i < 366; i++) {
        const isWd = (i - 2) % 7 < 5 ? enums_1.EWorkDay.WORKING_DAY : enums_1.EWorkDay.DAY_OFF;
        wd[`value_${i}`] = isWd;
    }
    return wd;
}
exports.payrollGroupWdTestData = {
    id: 1027,
    year: 2023,
    value_1: enums_1.EWorkDay.DAY_OFF,
    ...defaultWordDays(),
    value_366: enums_1.EWorkDay.DAY_OFF,
};
//# sourceMappingURL=payroll-group-wd.test-data.js.map
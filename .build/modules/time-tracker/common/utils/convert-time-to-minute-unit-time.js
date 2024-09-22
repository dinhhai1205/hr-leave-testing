"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimeToMinuteUnitTime = void 0;
const enums_1 = require("../enums");
const convertTimeToMinuteUnitTime = (duration, unitTime) => {
    if (unitTime === enums_1.UnitTime.HOUR) {
        return duration * 60;
    }
    if (unitTime === enums_1.UnitTime.SECOND) {
        return Math.floor(duration / 60);
    }
    return duration;
};
exports.convertTimeToMinuteUnitTime = convertTimeToMinuteUnitTime;
//# sourceMappingURL=convert-time-to-minute-unit-time.js.map
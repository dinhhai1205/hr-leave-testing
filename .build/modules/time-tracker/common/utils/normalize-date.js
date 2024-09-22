"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeDate = void 0;
const moment = require("moment");
const normalizeDate = (date) => {
    return moment(date).startOf('day').toDate();
};
exports.normalizeDate = normalizeDate;
//# sourceMappingURL=normalize-date.js.map
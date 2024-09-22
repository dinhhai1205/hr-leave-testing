"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTime = getCurrentTime;
const moment = require("moment");
function getCurrentTime(type) {
    let start;
    let end;
    switch (type) {
        case 'week':
            start = moment().startOf('isoWeek').format('YYYY-MM-DD');
            end = moment().endOf('isoWeek').format('YYYY-MM-DD');
            break;
        case 'month':
            start = moment().startOf('month').format('YYYY-MM-DD');
            end = moment().endOf('month').format('YYYY-MM-DD');
            break;
        case 'day':
            start = moment().startOf('day').format('YYYY-MM-DD');
            end = moment().endOf('day').format('YYYY-MM-DD');
            break;
        default:
            throw new Error('Invalid type');
    }
    return {
        start,
        end,
    };
}
//# sourceMappingURL=get-current-time.js.map
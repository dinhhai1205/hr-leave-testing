"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetimeWithoutTimezoneTransformer = datetimeWithoutTimezoneTransformer;
const moment = require("moment");
function datetimeWithoutTimezoneTransformer() {
    return {
        to(value) {
            return value ? moment.utc(value).toDate() : value;
        },
        from(value) {
            if (typeof value === 'string') {
                return moment.utc(value).toDate();
            }
            return value;
        },
    };
}
//# sourceMappingURL=datetime-without-timezone.transformer.js.map
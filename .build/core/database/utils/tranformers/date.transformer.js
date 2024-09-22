"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateTransformer = dateTransformer;
const moment = require("moment");
function dateTransformer() {
    return {
        to(value) {
            return value;
        },
        from(value) {
            if (typeof value === 'string') {
                return moment.utc(value).toDate();
            }
            return value;
        },
    };
}
//# sourceMappingURL=date.transformer.js.map
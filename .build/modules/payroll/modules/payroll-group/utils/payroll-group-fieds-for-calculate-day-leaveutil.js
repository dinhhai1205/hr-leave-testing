"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payrollGroupFieldsForCalculateDayLeave = payrollGroupFieldsForCalculateDayLeave;
function payrollGroupFieldsForCalculateDayLeave(alias) {
    return [
        `${alias}.id`,
        `${alias}.mon`,
        `${alias}.tue`,
        `${alias}.wed`,
        `${alias}.thu`,
        `${alias}.fri`,
        `${alias}.sat`,
        `${alias}.sun`,
        `${alias}.pgType`,
    ];
}
//# sourceMappingURL=payroll-group-fieds-for-calculate-day-leaveutil.js.map
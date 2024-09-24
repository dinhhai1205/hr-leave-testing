"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTypeBalanceFieldsForCommonInfo = leaveTypeBalanceFieldsForCommonInfo;
function leaveTypeBalanceFieldsForCommonInfo(alias) {
    return [
        `${alias}.id`,
        `${alias}.companyId`,
        `${alias}.employeeId`,
        `${alias}.leaveTypeId`,
        `${alias}.balance`,
        `${alias}.createdOn`,
    ];
}
//# sourceMappingURL=leave-type-balance-fields-for-common-info.util.js.map
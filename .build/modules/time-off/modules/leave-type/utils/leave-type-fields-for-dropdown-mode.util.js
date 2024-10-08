"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTypeFieldsForDropdownMode = leaveTypeFieldsForDropdownMode;
function leaveTypeFieldsForDropdownMode(alias) {
    return [
        `${alias}.id`,
        `${alias}.name`,
        `${alias}.code`,
        `${alias}.color`,
        `${alias}.remark`,
        `${alias}.isSpecial`,
        `${alias}.parentId`,
        `${alias}.createdOn`,
    ];
}
//# sourceMappingURL=leave-type-fields-for-dropdown-mode.util.js.map
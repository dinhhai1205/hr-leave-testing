"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQueryBuilderForActionLeaveRecord = buildQueryBuilderForActionLeaveRecord;
const database_1 = require("../../../../../core/database");
const assignment_fields_for_leave_validate_util_1 = require("../../leave-type-assigment/utils/assignment-fields-for-leave-validate.util");
const fields_seletion_util_1 = require("./fields-seletion.util");
function buildQueryBuilderForActionLeaveRecord(params) {
    const { ltQueryBuilder, ltId } = params;
    const ltAlias = ltQueryBuilder.alias;
    const assignmentAlias = database_1.ETableName.LEAVE_TYPE_ASSIGNMENT;
    const ltParentAlias = `parent_${ltAlias}`;
    const parentAssignmentAlias = `parent_${assignmentAlias}`;
    return ltQueryBuilder
        .andWhere(`${ltAlias}.id = :ltId
        AND ${ltAlias}.isDeleted = :isDeleted
        AND ${ltAlias}.active = :active
      `, { ltId, isDeleted: false, active: true })
        .select((0, fields_seletion_util_1.leaveTypeFieldsSelectForLeaveValidate)(ltAlias))
        .leftJoin(`${ltAlias}.leaveTypeAssignment`, assignmentAlias, `${assignmentAlias}.isDeleted = :isDeleted`)
        .addSelect((0, assignment_fields_for_leave_validate_util_1.assignmentFieldsForLeaveValidate)(assignmentAlias))
        .leftJoin(`${ltAlias}.parent`, ltParentAlias, `${ltParentAlias}.isDeleted = :isDeleted`)
        .addSelect((0, fields_seletion_util_1.leaveTypeFieldsSelectForLeaveValidate)(ltParentAlias))
        .leftJoin(`${ltParentAlias}.leaveTypeAssignment`, parentAssignmentAlias, `${parentAssignmentAlias}.isDeleted = :isDeleted`)
        .addSelect((0, assignment_fields_for_leave_validate_util_1.assignmentFieldsForLeaveValidate)(parentAssignmentAlias));
}
//# sourceMappingURL=get-lt-querybuilder-for-leave-record-action.util.js.map
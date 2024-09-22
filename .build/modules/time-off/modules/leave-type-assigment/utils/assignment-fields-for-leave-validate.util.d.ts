import type { LeaveTypeAssignmentEntity } from '../../../../../core/database';
type AssignmentField = keyof Pick<LeaveTypeAssignmentEntity, 'id' | 'genderIds' | 'mariStsIds' | 'jobGradeIds' | 'orgEleIds' | 'contractTypeIds' | 'employeeIds'>;
export declare function assignmentFieldsForLeaveValidate<Prefix extends string>(alias: Prefix): Array<`${Prefix}.${AssignmentField}`>;
export {};

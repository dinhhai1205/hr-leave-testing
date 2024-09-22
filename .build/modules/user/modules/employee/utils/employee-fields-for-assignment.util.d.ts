import type { EmployeeEntity } from '../../../../../core/database';
type EmployeeField = keyof Pick<EmployeeEntity, 'id' | 'maritalStatusId' | 'jobGradeId' | 'contractType' | 'organizationElementId' | 'gender'>;
export declare function employeeFieldsForAssignment<Prefix extends string>(alias: Prefix): Array<`${Prefix}.${EmployeeField}`>;
export {};

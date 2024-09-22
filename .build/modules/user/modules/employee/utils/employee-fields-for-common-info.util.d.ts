import type { EmployeeEntity } from '../../../../../core/database';
type EmployeeField = keyof Pick<EmployeeEntity, 'id' | 'payrollGroupId' | 'email' | 'employeeRef' | 'employeeNo' | 'fullNameEn' | 'fullNameLocal'>;
export declare function employeeFieldsForCommonInfo<Prefix extends string>(alias: Prefix): Array<`${Prefix}.${EmployeeField}`>;
export {};

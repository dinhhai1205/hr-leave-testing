import type { LeaveTypeBalanceEntity } from '../../../../../core/database';
type LeaveTypeBalanceField = keyof Pick<LeaveTypeBalanceEntity, 'id' | 'companyId' | 'employeeId' | 'leaveTypeId' | 'balance' | 'createdOn'>;
export declare function leaveTypeBalanceFieldsForCommonInfo<Prefix extends string>(alias: Prefix): Array<`${Prefix}.${LeaveTypeBalanceField}`>;
export {};

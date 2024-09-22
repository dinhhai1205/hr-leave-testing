import type { LeaveTypeEntity } from '../../../../../core/database';
type LeaveTypeField = keyof Omit<LeaveTypeEntity, 'createdBy' | 'createdOn' | 'updatedBy' | 'updatedOn' | 'isDeleted'>;
export declare function leaveTypeFieldsForGetLeave<Prefix extends string>(alias: Prefix): Array<`${Prefix}.${LeaveTypeField}`>;
export {};

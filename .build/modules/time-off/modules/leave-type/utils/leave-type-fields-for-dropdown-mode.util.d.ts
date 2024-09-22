import type { LeaveTypeEntity } from '../../../../../core/database';
type LeaveTypeField = keyof Pick<LeaveTypeEntity, 'id' | 'name' | 'color' | 'isSpecial' | 'parentId' | 'createdOn'>;
export declare function leaveTypeFieldsForDropdownMode<Prefix extends string>(alias: Prefix): Array<`${Prefix}.${LeaveTypeField}`>;
export {};

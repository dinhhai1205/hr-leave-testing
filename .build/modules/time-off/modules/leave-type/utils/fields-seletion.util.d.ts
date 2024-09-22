import type { LeaveTypeEntity } from '../../../../../core/database';
type LeaveTypeField = keyof Pick<LeaveTypeEntity, 'id' | 'startDate' | 'endDate' | 'allowApplyExceed' | 'allowFutureDates' | 'daysFromNow' | 'allowPastDates' | 'daysAgo' | 'daysInAdvance' | 'maxDayApply' | 'maxConsecutive' | 'allowApplyHalfDay' | 'includePublicHoliday' | 'includeNonWorkingDay' | 'parentId'>;
export declare const leaveTypeFieldsSelectForLeaveValidate: <Prefix extends string>(ltAlias: Prefix) => Array<`${Prefix}.${LeaveTypeField}`>;
export {};

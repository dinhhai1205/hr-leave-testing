import type { PayrollGroupEntity } from '../../../../../core/database';
type PayrollGroupField = keyof Pick<PayrollGroupEntity, 'id' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' | 'pgType'>;
export declare function payrollGroupFieldsForCalculateDayLeave<Prefix extends string>(alias: Prefix): Array<`${Prefix}.${PayrollGroupField}`>;
export {};

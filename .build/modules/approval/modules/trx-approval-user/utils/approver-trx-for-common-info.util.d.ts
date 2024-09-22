import type { TrxApprovalUserEntity } from '../../../../../core/database';
type ApproverTrxField = keyof Pick<TrxApprovalUserEntity, 'id' | 'moduleId' | 'recordId' | 'approverLevel' | 'userEmail'>;
export declare function approverTrxFieldsForCommonInfo<Prefix extends string>(alias: Prefix): Array<`${Prefix}.${ApproverTrxField}`>;
export {};

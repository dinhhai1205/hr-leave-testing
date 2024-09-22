import type { EApprovalActions } from '../enums';
export type ApprovalAction = Lowercase<keyof typeof EApprovalActions>;

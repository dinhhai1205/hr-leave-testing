import { DocumentOperationType, DocumentActionStatus } from '../enums';
export declare const OPERATION_TYPE_ACTION_STATUS_MAPPING: {
    [auditOperationType in DocumentOperationType]?: DocumentActionStatus;
};

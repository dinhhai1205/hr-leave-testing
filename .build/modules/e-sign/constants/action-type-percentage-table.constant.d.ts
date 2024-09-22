import { DocumentActionType, DocumentActionStatus } from '../enums';
import type { ValueOf } from '../../../common/types';
export declare const ACTION_TYPE_PERCENTAGE_TABLE: {
    [type in ValueOf<typeof DocumentActionType>]: {
        [status in ValueOf<typeof DocumentActionStatus>]?: number;
    };
};

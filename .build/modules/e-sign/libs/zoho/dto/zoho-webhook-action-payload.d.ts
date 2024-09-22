import type { DocumentActionStatus, DocumentActionType } from '../../../enums';
export declare class ZohoWebHooKActionPayload {
    verify_recipient: boolean;
    action_type: DocumentActionType;
    action_id: string;
    is_revoked: boolean;
    recipient_email: string;
    is_embedded: boolean;
    signing_order: number;
    recipient_name: string;
    allow_signing: boolean;
    recipient_phonenumber: string;
    recipient_countrycode: string;
    action_status: DocumentActionStatus;
}

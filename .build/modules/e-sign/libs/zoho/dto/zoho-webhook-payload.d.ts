import { DocumentOperationType } from '../../../enums';
import { ZohoWebHooKActionPayload } from './zoho-webhook-action-payload';
import { ZohoWebHooKFilePayload } from './zoho-webhook-file-payload';
export declare class ZohoWebHooKPayload {
    requests: {
        request_status: string;
        owner_email: string;
        document_ids: ZohoWebHooKFilePayload[];
        self_sign: boolean;
        owner_id: string;
        request_name: string;
        modified_time: number;
        action_time: number;
        is_deleted: boolean;
        is_sequential: boolean;
        owner_first_name: string;
        request_type_name: string;
        owner_last_name: string;
        request_id: string;
        request_type_id: string;
        actions: ZohoWebHooKActionPayload[];
    };
    notifications: {
        performed_by_email: string;
        performed_at: number;
        country: string;
        reason?: string;
        activity: string;
        operation_type: DocumentOperationType;
        action_id: string;
        latitude: number;
        longitude: number;
        ip_address: string;
        performed_by_name: string;
        signing_order: number;
    };
}

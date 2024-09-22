import { ZohoRequestActionDto } from './zoho-request-action.dto';
export declare class SendZohoRequest {
    requestId: string;
    requests: {
        request_name: string;
        is_sequential: boolean;
        actions: ZohoRequestActionDto[];
    };
}

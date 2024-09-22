import { IRequestTemplate } from '../interface/create-request.interface';
import { ZohoBulkActionDto } from './value-objects/zoho-bulk-action.dto';
import { ZohoRequestActionDto } from './zoho-request-action.dto';
export declare class ZohoRequestDto implements IRequestTemplate {
    request_name: string;
    is_sequential: boolean;
    validity: number;
    description?: string;
    expiration_days: number;
    email_reminders: boolean;
    reminder_period: number;
    notes?: string;
    redirect_pages: {
        sign_success: string;
        sign_completed: string;
        sign_declined: string;
        sign_later: string;
    };
    actions: ZohoRequestActionDto[];
    is_bulk: boolean;
    bulk_actions: ZohoBulkActionDto[];
}

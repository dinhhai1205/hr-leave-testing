import type { ZohoRequestActionDto } from '../dto/zoho-request-action.dto';
export interface IRequestTemplate {
    request_name: string;
    is_sequential: boolean;
    notes?: string;
    description?: string;
    expiration_days?: number;
    email_reminders?: boolean;
    reminder_period?: number;
    validity?: number;
    actions?: ZohoRequestActionDto[];
    redirect_pages?: {
        sign_success: string;
        sign_completed: string;
        sign_declined: string;
        sign_later: string;
    };
}

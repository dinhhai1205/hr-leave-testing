import { DocumentActionType } from '../../../enums';
import { ZohoRequestActionDto } from './zoho-request-action.dto';
declare const SubmitZohoRequestActionBodyDto_base: import("@nestjs/common").Type<Pick<ZohoRequestActionDto, "fields">>;
export declare class SubmitZohoRequestActionBodyDto extends SubmitZohoRequestActionBodyDto_base {
    action_id: string;
    action_type: DocumentActionType;
    recipient_name: string;
    recipient_email: string;
    in_person_name?: string;
    in_person_email?: string;
}
export {};

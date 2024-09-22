import { DocumentActionDeliveryMode, DocumentActionLanguageCode, DocumentActionType, DocumentActionVerificationType } from '../../../enums';
import { ZohoRequestActionFieldDto } from './zoho-request-action-field.dto';
export declare class ZohoRequestActionDto {
    action_type: DocumentActionType;
    recipient_email: string;
    recipient_name: string;
    signing_order: number;
    in_person_name: string;
    in_person_email?: string;
    delivery_mode?: DocumentActionDeliveryMode;
    private_notes?: string;
    recipient_countrycode?: string;
    recipient_countrycode_iso?: string;
    recipient_phonenumber?: string;
    verify_recipient: boolean;
    verification_type?: DocumentActionVerificationType;
    verification_code?: string;
    language?: DocumentActionLanguageCode;
    fields?: ZohoRequestActionFieldDto;
    is_bulk: boolean;
}

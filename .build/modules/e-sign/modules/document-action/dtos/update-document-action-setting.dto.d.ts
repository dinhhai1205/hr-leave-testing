import { DocumentActionType, DocumentActionStatus, DocumentActionDeliveryMode, DocumentActionLanguageCode, DocumentActionVerificationType } from '../../../enums';
import { FieldSettingsDto } from '../../../modules/document-action-field/dtos';
export declare class UpdateDocumentActionSettingDto {
    id?: number;
    documentId?: number;
    recipientName?: string;
    recipientEmail?: string;
    signingOrder?: number;
    recipientIndex: number;
    type?: DocumentActionType;
    inPersonName?: string;
    inPersonEmail?: string;
    status?: DocumentActionStatus;
    deliveryMode?: DocumentActionDeliveryMode;
    recipientCountrycode?: string;
    recipientCountrycodeIso?: string;
    recipientPhonenumber?: string;
    privateNote?: string;
    language?: DocumentActionLanguageCode;
    verificationType?: DocumentActionVerificationType;
    verifyRecipient?: boolean;
    isBulk?: boolean;
    verificationCode?: string;
    fieldSettings?: FieldSettingsDto[];
}

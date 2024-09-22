import { DocumentActionDeliveryMode, DocumentActionLanguageCode, DocumentActionStatus, DocumentActionType, DocumentActionVerificationType } from '../../../modules/e-sign/enums';
import { BaseAppEntity } from './base-app.entity';
import { DocumentEntity } from './document.entity';
export declare class DocumentActionEntity extends BaseAppEntity {
    companyId: number;
    type: DocumentActionType;
    recipientName: string;
    recipientEmail: string;
    signingOrder: number;
    inPersonName: string;
    inPersonEmail: string;
    status: DocumentActionStatus;
    deliveryMode: DocumentActionDeliveryMode;
    privateNote: string;
    zohoActionId: string;
    recipientCountrycode: string;
    recipientCountrycodeIso: string;
    recipientPhonenumber: string;
    verifyRecipient: boolean;
    verificationType: DocumentActionVerificationType;
    verificationCode: string;
    language: DocumentActionLanguageCode;
    fields: string | null;
    recipientIndex: number;
    isBulk: boolean;
    documentId: number;
    document: DocumentEntity;
}

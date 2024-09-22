import { DocumentActionType, DocumentActionStatus, DocumentActionDeliveryMode, DocumentActionLanguageCode, DocumentActionVerificationType } from '../../../enums';
import { BaseEntityResponseDto } from '../../../../../common/dto';
export declare class DocumentActionResponseDto extends BaseEntityResponseDto {
    recipientName: string;
    recipientEmail: string;
    type: DocumentActionType;
    status?: DocumentActionStatus;
    allowSigning?: boolean;
    deliveryMode?: DocumentActionDeliveryMode;
    privateNote?: string;
    language?: DocumentActionLanguageCode;
    sendCompletedDocument?: boolean;
    signingOrder: number;
    verifyRecipient: boolean;
    verificationType: DocumentActionVerificationType;
    verificationCode?: string;
    employeeId: number;
    documentId: number;
}

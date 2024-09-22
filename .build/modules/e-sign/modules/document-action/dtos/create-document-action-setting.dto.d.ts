import { DocumentActionDeliveryMode, DocumentActionLanguageCode, DocumentActionStatus, DocumentActionType, DocumentActionVerificationType } from '../../../enums';
import { BaseParamDto } from '../../../../../common/dto';
export declare class CreateDocumentActionSettingDto extends BaseParamDto {
    recipientName: string;
    recipientEmail: string;
    signingOrder: number;
    documentId: number;
    type?: DocumentActionType;
    status?: DocumentActionStatus;
    deliveryMode?: DocumentActionDeliveryMode;
    privateNote?: string;
    language?: DocumentActionLanguageCode;
    verificationType?: DocumentActionVerificationType;
    verificationCode?: string;
    recipientIndex: number;
}

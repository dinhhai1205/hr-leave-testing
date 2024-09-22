import { UpdateDocumentActionSettingDto } from '../../document-action/dtos/update-document-action-setting.dto';
declare const UpdateDocumentActionTemplateDto_base: import("@nestjs/common").Type<Pick<UpdateDocumentActionSettingDto, "recipientName" | "recipientEmail" | "deliveryMode" | "privateNote" | "language" | "verifyRecipient" | "verificationType" | "verificationCode" | "recipientCountrycode" | "recipientCountrycodeIso" | "recipientPhonenumber">>;
export declare class UpdateDocumentActionTemplateDto extends UpdateDocumentActionTemplateDto_base {
    recipientIndex: number;
}
export {};

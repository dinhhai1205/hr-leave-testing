import { CreateDocumentFilePayloadDto } from '../../document-file/dtos/create-document-file-payload.dto';
declare const ReplaceDocumentTemplateFilePayloadDto_base: import("@nestjs/common").Type<Omit<CreateDocumentFilePayloadDto, "order">>;
export declare class ReplaceDocumentTemplateFilePayloadDto extends ReplaceDocumentTemplateFilePayloadDto_base {
    companyId: number;
    documentTemplateId: number;
    documentFileId: number;
    userEmail: string;
}
export {};

import { CreateDocumentFilePayloadDto } from './create-document-file-payload.dto';
declare const ReplaceDocumentFilePayloadDto_base: import("@nestjs/common").Type<Omit<CreateDocumentFilePayloadDto, "order">>;
export declare class ReplaceDocumentFilePayloadDto extends ReplaceDocumentFilePayloadDto_base {
    companyId: number;
    documentId: number;
    documentFileId: number;
    userEmail: string;
}
export {};

import { GetDocumentByIdPayloadDto } from './get-document-by-id-payload.dto';
import { ExtendDocumentBodyDto } from './extend-document-body.dto';
declare const ExtendDocumentPayloadDto_base: import("@nestjs/common").Type<ExtendDocumentBodyDto & GetDocumentByIdPayloadDto>;
export declare class ExtendDocumentPayloadDto extends ExtendDocumentPayloadDto_base {
    userEmail: string;
}
export {};

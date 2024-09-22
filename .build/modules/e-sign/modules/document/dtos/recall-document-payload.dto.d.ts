import { GetDocumentByIdPayloadDto } from './get-document-by-id-payload.dto';
export declare class RecallDocumentPayload extends GetDocumentByIdPayloadDto {
    userEmail: string;
    reason: string;
}

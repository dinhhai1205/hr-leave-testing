import type { DocumentTemplateEntity } from '../../../core/database/entities';
import { DocumentEntity } from '../../../core/database/entities';
import { ZohoRequestDto } from '../libs/zoho';
import type { CreateDocumentFromTemplateBodyDto } from '../modules/document-template/dtos/create-document-from-template-body.dto';
export declare class DocumentMapper {
    static toZohoRequest(document: DocumentEntity): ZohoRequestDto;
    static fromTemplate(userEmail: string, documentTemplate: DocumentTemplateEntity, customTemplatePayload?: CreateDocumentFromTemplateBodyDto): DocumentEntity;
}

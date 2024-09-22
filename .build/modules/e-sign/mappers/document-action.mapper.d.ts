import type { DocumentTemplateEntity } from '../../../core/database/entities';
import { DocumentActionEntity } from '../../../core/database/entities';
import type { ZohoResponseDto } from '../libs/zoho';
import { SubmitZohoRequestActionBodyDto, ZohoRequestActionDto } from '../libs/zoho';
import type { UpdateDocumentActionTemplateDto } from '../modules/document-template/dtos/update-documnet-action-template.dto';
export declare class DocumentActionMapper {
    static toZohoRequestAction(documentAction: DocumentActionEntity): ZohoRequestActionDto;
    static toZohoRequestActionSubmit(documentActions: DocumentActionEntity[], zohoResponseDto: ZohoResponseDto, documentFileZohoIdTable: {
        [documentFileId: string]: string;
    }, userEmail: string): {
        submitZohoRequestActionsDto: SubmitZohoRequestActionBodyDto[];
        updateZohoActionsDto: {
            id: number;
            zohoActionId: string;
            updatedOn: Date;
            updatedBy: string;
        }[];
    };
    static fromTemplate(documentId: number, userEmail: string, documentTemplate: DocumentTemplateEntity, templateFileMappingFileTable: {
        [templateId: string]: number;
    }, customDocumentActions?: UpdateDocumentActionTemplateDto[]): DocumentActionEntity[];
    private static sortAscDocumentActions;
}

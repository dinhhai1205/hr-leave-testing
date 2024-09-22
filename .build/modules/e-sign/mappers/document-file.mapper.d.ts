import type { DocumentTemplateEntity } from '../../../core/database/entities';
import { DocumentFileEntity } from '../../../core/database/entities';
export declare class DocumentFileMapper {
    static fromTemplate(documentId: number, userEmail: string, documentTemplate: DocumentTemplateEntity, copySourceBucket: string): {
        fileDtos: DocumentFileEntity[];
        copySourceKeys: string[];
    };
}

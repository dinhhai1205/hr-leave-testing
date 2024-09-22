import { BaseAppEntity } from './base-app.entity';
import { DocumentTemplateEntity } from './document-template.entity';
import { DocumentEntity } from './document.entity';
export declare class DocumentFileEntity extends BaseAppEntity {
    name: string;
    size: number;
    order: number;
    imageString: string;
    originalname: string;
    documentId: number;
    documentTemplateId: number;
    companyId: number;
    document: DocumentEntity;
    documentTemplate: DocumentTemplateEntity;
}

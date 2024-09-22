import { BaseAppEntity } from './base-app.entity';
import { DocumentEntity } from './document.entity';
export declare class DocumentShareEntity extends BaseAppEntity {
    documentId: number;
    companyId: number;
    sharedWithEmail: string;
    sharedByUser: string;
    notes: string;
    document: DocumentEntity;
}

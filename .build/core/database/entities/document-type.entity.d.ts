import { BaseAppEntity } from './base-app.entity';
import { DocumentEntity } from './document.entity';
export declare class DocumentTypeEntity extends BaseAppEntity {
    name: string;
    companyId: number;
    documents: DocumentEntity[];
}

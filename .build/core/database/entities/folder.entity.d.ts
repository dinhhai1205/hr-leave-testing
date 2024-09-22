import { BaseAppEntity } from './base-app.entity';
import { DocumentEntity } from './document.entity';
export declare class FolderEntity extends BaseAppEntity {
    companyId: number;
    name: string;
    documents: DocumentEntity[];
}

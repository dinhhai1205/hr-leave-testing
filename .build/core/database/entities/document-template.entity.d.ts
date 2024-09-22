import { BulkActionDto } from '../../../modules/e-sign/modules/document';
import { BaseAppEntity } from './base-app.entity';
import { DocumentActionEntity } from './document-action.entity';
import { DocumentFileEntity } from './document-file.entity';
import { DocumentTypeEntity } from './document-type.entity';
import { DocumentEntity } from './document.entity';
import { FolderEntity } from './folder.entity';
export declare class DocumentTemplateEntity extends BaseAppEntity {
    companyId: number;
    name: string;
    isSequential: boolean;
    expirationDays: number;
    validity: number;
    description: string;
    emailReminders: boolean;
    reminderPeriod: number;
    notes: string;
    owner: string;
    documentActions: DocumentActionEntity[];
    isBulk: boolean;
    bulkActions: BulkActionDto[] | string | null;
    folderId: number;
    documentTypeId: number;
    folder: FolderEntity;
    documentType: DocumentTypeEntity;
    document: DocumentEntity;
    documentFiles: DocumentFileEntity[];
}

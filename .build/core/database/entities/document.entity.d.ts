import { DocumentStatus } from '../../../modules/e-sign/enums';
import { BulkActionDto } from '../../../modules/e-sign/modules/document/dtos';
import { BaseAppEntity } from './base-app.entity';
import { DocumentActionEntity } from './document-action.entity';
import { DocumentAuditEntity } from './document-audit.entity';
import { DocumentFileEntity } from './document-file.entity';
import { DocumentShareEntity } from './document-share.entity';
import { DocumentTemplateEntity } from './document-template.entity';
import { DocumentTypeEntity } from './document-type.entity';
import { FolderEntity } from './folder.entity';
export declare class DocumentEntity extends BaseAppEntity {
    companyId: number;
    name: string;
    status: DocumentStatus;
    recordNo: number;
    isSequential: boolean;
    expirationDays: number;
    validity: number;
    description: string;
    emailReminders: boolean;
    reminderPeriod: number;
    notes: string;
    signSubmittedTime: Date;
    requestId: string;
    completedOn: Date;
    declinedOn: Date;
    declinedReason: string;
    recalledOn: Date;
    recalledReason: string;
    expiredOn: Date;
    extendedDate: Date;
    owner: string;
    isBulk: boolean;
    bulkActions: BulkActionDto[] | string | null;
    folderId: number;
    documentTypeId: number;
    documentTemplateId: number;
    folder: FolderEntity;
    documentType: DocumentTypeEntity;
    documentTemplate: DocumentTemplateEntity;
    documentActions: DocumentActionEntity[];
    documentFiles: DocumentFileEntity[];
    documentShares: DocumentShareEntity[];
    documentAudits: DocumentAuditEntity[];
}

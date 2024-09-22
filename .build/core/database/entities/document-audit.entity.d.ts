import { DocumentOperationType, DocumentStatus } from '../../../modules/e-sign/enums';
import { BaseAppEntity } from './base-app.entity';
import { DocumentEntity } from './document.entity';
export declare class DocumentAuditEntity extends BaseAppEntity {
    companyId: number;
    documentId: number;
    documentStatus: DocumentStatus;
    documentName: string;
    activity: string;
    operationType: DocumentOperationType;
    ipAddress: string;
    latitude: string;
    longitude: string;
    payload: string;
    data: string;
    document: DocumentEntity;
}

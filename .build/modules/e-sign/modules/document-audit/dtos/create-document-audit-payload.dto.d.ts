import { DocumentOperationType, DocumentStatus } from '../../../enums';
export declare class CreateDocumentAuditPayloadDto {
    companyId: number;
    documentId: number;
    documentName?: string;
    userEmail: string;
    documentStatus: DocumentStatus;
    activity: string;
    operationType: DocumentOperationType;
    ipAddress?: string;
    latitude?: string;
    longitude?: string;
    payload?: string;
    data?: string;
}

import { DocumentOperationType, DocumentStatus } from '../../../enums';
import { BaseEntityResponseDto } from '../../../../../common/dto';
export declare class DocumentAuditResponseDto extends BaseEntityResponseDto {
    documentStatus: DocumentStatus;
    activity: string;
    operationType: DocumentOperationType;
    ipAddress?: string;
    latitude?: string;
    longitude?: string;
    documentId: number;
}

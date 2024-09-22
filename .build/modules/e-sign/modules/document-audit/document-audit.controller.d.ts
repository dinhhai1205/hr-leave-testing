import { DocumentAuditResponseDto, GetAllDocumentAuditsQueryDto } from '../../modules/document-audit/dtos';
import { DocumentAuditService } from './document-audit.service';
export declare class DocumentAuditController {
    private readonly documentAuditService;
    constructor(documentAuditService: DocumentAuditService);
    getAllDocumentAudits(companyId: number, documentId: number, query: GetAllDocumentAuditsQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<DocumentAuditResponseDto>>;
}

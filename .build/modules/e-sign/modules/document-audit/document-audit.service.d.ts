import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto';
import { DocumentAuditEntity } from '../../../../core/database/entities/document-audit.entity';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { CreateDocumentAuditPayloadDto, DocumentAuditResponseDto, GetAllDocumentAuditsPayloadDto } from '../../modules/document-audit/dtos';
export declare class DocumentAuditService extends TypeOrmBaseService<DocumentAuditEntity> {
    private documentAuditRepository;
    constructor(documentAuditRepository: Repository<DocumentAuditEntity>);
    baseQueryBuilder(companyId: number, documentId: number, opts?: Partial<{
        selectDocument: boolean;
    }>): {
        queryBuilder: import("typeorm").SelectQueryBuilder<DocumentAuditEntity>;
        documentAlias: string;
        documentAuditAlias: string;
    };
    createDocumentAudit(createDocumentAuditPayloadDto: CreateDocumentAuditPayloadDto): Promise<DocumentAuditEntity>;
    getAllDocumentAudits(paginationQueryDto: GetAllDocumentAuditsPayloadDto): Promise<PaginationResponseDto<DocumentAuditResponseDto>>;
}

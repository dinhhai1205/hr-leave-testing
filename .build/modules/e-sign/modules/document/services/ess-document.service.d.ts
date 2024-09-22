import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../../common/dto';
import { DocumentEntity } from '../../../../../core/database/entities/document.entity';
import { TypeOrmBaseService } from '../../../../../core/database/services';
import { DocumentBaseResponse, ESignBaseResponseDto } from '../../../dtos';
import { EssGetDocumentFileContentPayloadDto } from '../../../modules/document-file/dtos/ess-get-document-file-content-payload.dto';
import { DocumentFileService } from '../../../modules/document-file/services';
import { DownloadDocumentsResponseDto, EssDownloadDocumentsPayloadDto, GetAllEssDocumentsPayloadDto, GetEssDocumentByIdPayloadDto } from '../../../modules/document/dtos';
import { DocumentService } from './document.service';
export declare class EssDocumentService extends TypeOrmBaseService<DocumentEntity> {
    private readonly documentRepository;
    private readonly documentService;
    private readonly documentFileService;
    constructor(documentRepository: Repository<DocumentEntity>, documentService: DocumentService, documentFileService: DocumentFileService);
    private baseQueryBuilderGetEssDocument;
    getAllEssDocuments(paginationQueryDto: GetAllEssDocumentsPayloadDto): Promise<PaginationResponseDto<DocumentEntity>>;
    getEssDocumentById(getEssDocumentByIdPayload: GetEssDocumentByIdPayloadDto): Promise<DocumentEntity>;
    downloadEssDocuments(payload: EssDownloadDocumentsPayloadDto): Promise<ESignBaseResponseDto<DownloadDocumentsResponseDto & DocumentBaseResponse>>;
    getEssDocumentFileContent(payload: EssGetDocumentFileContentPayloadDto): Promise<{
        fileBuffer: Buffer;
        mineType: "application/pdf";
        name: string;
        size: number;
    }>;
}

import { Repository } from 'typeorm';
import { DocumentShareEntity } from '../../../../core/database/entities';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { DocumentBaseResponse, ESignBaseResponseDto } from '../../dtos';
import { CreateDocumentSharePayloadDto } from '../../modules/document-share/dtos/create-document-share-payload.dto';
import { DeleteDocumentShareByIdPayloadDto } from '../../modules/document-share/dtos/delete-document-share-payload.dto';
import { GetAllDocumentSharesPayloadDto } from '../../modules/document-share/dtos/get-all-document-shares-payload.dto';
import { DocumentActionService } from '../document-action/document-action.service';
import { DocumentService } from '../document/services/document.service';
export declare class DocumentShareService extends TypeOrmBaseService<DocumentShareEntity> {
    private documentShareRepository;
    private readonly documentService;
    private readonly documentActionService;
    constructor(documentShareRepository: Repository<DocumentShareEntity>, documentService: DocumentService, documentActionService: DocumentActionService);
    createDocumentShare(createDocumentSharePayloadDto: CreateDocumentSharePayloadDto): Promise<ESignBaseResponseDto<DocumentBaseResponse & DocumentShareEntity>>;
    deleteDocumentShareById(deleteDocumentShareByIdPayloadDto: DeleteDocumentShareByIdPayloadDto): Promise<ESignBaseResponseDto<DocumentBaseResponse & {
        message: string;
    }>>;
    getAllDocumentShares(payload: GetAllDocumentSharesPayloadDto): Promise<import("../../../../common/dto").PaginationResponseDto<DocumentShareEntity>>;
}

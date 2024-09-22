import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto';
import { DocumentTypeEntity } from '../../../../core/database/entities';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { CreateDocumentTypePayloadDto } from './dtos/create-document-type-payload.dto';
import { GetAllDocumentTypesPayloadDto } from './dtos/get-all-document-types-payload.dto';
export declare class DocumentTypeService extends TypeOrmBaseService<DocumentTypeEntity> {
    private readonly documentTypeRepository;
    constructor(documentTypeRepository: Repository<DocumentTypeEntity>);
    createDocumentType(createDocumentTypeDto: CreateDocumentTypePayloadDto): Promise<DocumentTypeEntity>;
    getAllDocumentTypes(paginationQueryDto: GetAllDocumentTypesPayloadDto): Promise<PaginationResponseDto<DocumentTypeEntity>>;
}

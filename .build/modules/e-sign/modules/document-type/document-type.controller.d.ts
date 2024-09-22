import { BaseParamDto, PaginationQueryDto } from '../../../../common/dto';
import { IActiveUserData } from '../../../../core/iam/interfaces';
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeBodyDto } from './dtos/create-document-type-body.dto';
export declare class DocumentTypeController {
    private readonly documentTypeService;
    constructor(documentTypeService: DocumentTypeService);
    createDocumentType({ companyId }: BaseParamDto, body: CreateDocumentTypeBodyDto, { userEmail }: IActiveUserData): Promise<import("../../../../core/database").DocumentTypeEntity>;
    getAllDocumentTypes({ companyId }: BaseParamDto, query: PaginationQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").DocumentTypeEntity>>;
}

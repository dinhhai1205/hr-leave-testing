import { Repository } from 'typeorm';
import { DocumentActionEntity, DocumentEntity, DocumentFileEntity, DocumentTemplateEntity } from '../../../../core/database/entities';
import { TypeOrmBaseService } from '../../../../core/database/services';
import { CreateDocumentFromTemplatePayloadDto } from '../../modules/document-template/dtos/create-document-from-template-payload.dto';
import { CreateDocumentTemplatePayloadDto } from '../../modules/document-template/dtos/create-document-template-payload.dto';
import { DeleteMultipleDocumentTemplatesPayloadDto } from '../../modules/document-template/dtos/delete-multiple-document-templates-payload.dto';
import { GetAllDocumentsTemplatePayloadDto } from '../../modules/document-template/dtos/get-all-documents-template-payload.dto';
import { GetDocumentTemplateByIdPayloadDto } from '../../modules/document-template/dtos/get-document-template-by-id-payload.dto';
import { GetDocumentTemplateFileContentPayloadDto } from '../../modules/document-template/dtos/get-document-template-file-content.payload';
import { ReplaceDocumentTemplateFilePayloadDto } from '../../modules/document-template/dtos/replace-document-template-file-payload.dto';
import { UpdateDOcumentTemplateSettingPayloadDto } from '../../modules/document-template/dtos/update-document-template-setting.payload.dto';
import { UpdateNewTemplateFilePayloadDto } from '../../modules/document-template/dtos/update-new-template-file-payload.dto';
import { DocumentActionService } from '../document-action/document-action.service';
import { DocumentFileService } from '../document-file/services';
import { DocumentService } from '../document/services';
import { BaseQueryBuilderGetDocumentOpt } from '../document/types/base-query-builder-get-document-opts.type';
export declare class DocumentTemplateService extends TypeOrmBaseService<DocumentTemplateEntity> {
    private readonly documentTemplateRepository;
    private readonly documentService;
    private readonly documentFileService;
    private readonly documentActionService;
    private readonly currDocFileBucket;
    private readonly currDocFilePrefixKey;
    private readonly currTemplateFileBucket;
    private readonly currTemplateFilePrefixKey;
    constructor(documentTemplateRepository: Repository<DocumentTemplateEntity>, documentService: DocumentService, documentFileService: DocumentFileService, documentActionService: DocumentActionService);
    baseQueryBuilderGetDocumentTemplate(companyId?: number, opts?: Partial<BaseQueryBuilderGetDocumentOpt>): {
        queryBuilder: import("typeorm").SelectQueryBuilder<DocumentTemplateEntity>;
        documentTemplateAlias: string;
        folderAlias: string;
        documentTypeAlias: string;
        documentFileAlias: string;
    };
    createDocumentTemplate(payload: CreateDocumentTemplatePayloadDto): Promise<DocumentTemplateEntity>;
    getAllDocumentTemplates(paginationQueryDto: GetAllDocumentsTemplatePayloadDto): Promise<import("../../../../common/dto").PaginationResponseDto<DocumentTemplateEntity>>;
    getDocumentTemplateById(payload: GetDocumentTemplateByIdPayloadDto, opts?: Partial<BaseQueryBuilderGetDocumentOpt>): Promise<DocumentTemplateEntity>;
    updateNewTemplateFile(payload: UpdateNewTemplateFilePayloadDto): Promise<DocumentTemplateEntity>;
    updateDocumentTemplateSetting(payload: UpdateDOcumentTemplateSettingPayloadDto): Promise<DocumentTemplateEntity>;
    deleteMultipleDocumentTemplates(payload: DeleteMultipleDocumentTemplatesPayloadDto): Promise<{
        message: string;
    }>;
    getDocumentTemplateFileContent(payload: GetDocumentTemplateFileContentPayloadDto): Promise<import("../document-file/dtos/get-document-file-content-response.dto").GetDocumentFileResponseDto>;
    replaceDocumentTemplateFile(payload: ReplaceDocumentTemplateFilePayloadDto): Promise<import("../../dtos").ESignBaseResponseDto<import("../../dtos").DocumentBaseResponse & DocumentFileEntity>>;
    deleteDocumentTemplateFile(payload: {
        documentTemplateId: number;
        documentFileId: number;
        companyId: number;
        userEmail: string;
    }): Promise<string>;
    createDocumentFromTemplate(payload: CreateDocumentFromTemplatePayloadDto): Promise<DocumentEntity>;
    createDocumentAndCopyFileFromTemplate(args: {
        documentEntity: DocumentEntity;
        documentTemplateEntity: DocumentTemplateEntity;
        userEmail: string;
        companyId: number;
    }): Promise<{
        document: DocumentEntity;
        documentActions: DocumentActionEntity[];
        documentFiles: DocumentFileEntity[];
    }>;
}

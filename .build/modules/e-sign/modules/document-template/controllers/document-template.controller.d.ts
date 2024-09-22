import { StreamableFile } from '@nestjs/common';
import { BaseParamDto } from '../../../../../common/dto';
import { IActiveUserData } from '../../../../../core/iam/interfaces';
import { UpdateNewDocumentFileBodyDto } from '../../../modules/document';
import { IMulterFileUploaded } from '../../../../../common/interfaces';
import { DocumentTemplateService } from '../../../modules/document-template/document-template.service';
import { CreateDocumentFromTemplateBodyDto } from '../../../modules/document-template/dtos/create-document-from-template-body.dto';
import { CreateDocumentTemplateBodyDto } from '../../../modules/document-template/dtos/create-document-template-body.dto';
import { DeleteMultipleDocumentTemplatesBodyDto } from '../../../modules/document-template/dtos/delete-multiple-document-templates-body.dto';
import { GetAllDocumentsTemplateQueryDto } from '../../../modules/document-template/dtos/get-all-documents-template-query.dto';
import { UpdateDOcumentTemplateSettingBodyDto } from '../../../modules/document-template/dtos/update-document-template-setting-body.dto';
import { ReplaceDocumentFileBodyDto } from '../../document-file/dtos/replace-document-file-body.dto';
export declare class DocumentTemplateController {
    private readonly documentTemplateService;
    constructor(documentTemplateService: DocumentTemplateService);
    createDocumentTemplate({ companyId }: BaseParamDto, { name, isSequential }: CreateDocumentTemplateBodyDto, file: IMulterFileUploaded, { userEmail }: IActiveUserData): Promise<import("../../../../../core/database").DocumentTemplateEntity>;
    getDocumentTemplateFileContent(companyId: number, documentTemplateId: number, documentFileId: number): Promise<StreamableFile>;
    getDocumentTemplateById(companyId: number, documentTemplateId: number): Promise<import("../../../../../core/database").DocumentTemplateEntity>;
    getAllDocumentTemplates(companyId: number, query: GetAllDocumentsTemplateQueryDto): Promise<import("../../../../../common/dto").PaginationResponseDto<import("../../../../../core/database").DocumentTemplateEntity>>;
    updateDocumentTemplateSetting(companyId: number, documentTemplateId: number, body: UpdateDOcumentTemplateSettingBodyDto, { userEmail }: IActiveUserData): Promise<import("../../../../../core/database").DocumentTemplateEntity>;
    deleteMultipleDocumentTemplates({ companyId }: BaseParamDto, body: DeleteMultipleDocumentTemplatesBodyDto, { userEmail }: IActiveUserData): Promise<{
        message: string;
    }>;
    updateNewTemplateFile(companyId: number, documentTemplateId: number, { name, order }: UpdateNewDocumentFileBodyDto, file: IMulterFileUploaded, { userEmail }: IActiveUserData): Promise<import("../../../../../core/database").DocumentTemplateEntity>;
    replaceDocumentFile(companyId: number, documentFileId: number, documentTemplateId: number, body: ReplaceDocumentFileBodyDto, file: IMulterFileUploaded, { userEmail }: IActiveUserData): Promise<import("../../../dtos").DocumentBaseResponse & import("../../../../../core/database").DocumentFileEntity>;
    deleteDocumentFile(companyId: number, documentTemplateId: number, documentFileId: number, { userEmail }: IActiveUserData): Promise<string>;
    createDocumentFromTemplate(companyId: number, documentTemplateId: number, { userEmail }: IActiveUserData, body: CreateDocumentFromTemplateBodyDto): Promise<import("../../../../../core/database").DocumentEntity>;
}

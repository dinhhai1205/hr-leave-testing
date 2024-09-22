import { StreamableFile } from '@nestjs/common';
import { BaseParamDto } from '../../../../../common/dto';
import { IMulterFileUploaded } from '../../../../../common/interfaces';
import { IActiveUserData } from '../../../../../core/iam/interfaces';
import { DownloadFileType } from '../../../enums';
import { CreateDocumentBodyDto, DeleteMultipleDocumentsBodyDto, ExtendDocumentBodyDto, GetAllDocumentsQueryDto, RecallDocumentBodyDto, UpdateDocumentSettingBodyDto, UpdateNewDocumentFileBodyDto } from '../../../modules/document/dtos';
import { DocumentService } from '../services/document.service';
export declare class DocumentController {
    private documentService;
    constructor(documentService: DocumentService);
    createDocument({ companyId }: BaseParamDto, { name, isSequential }: CreateDocumentBodyDto, file: IMulterFileUploaded, { userEmail }: IActiveUserData): Promise<import("../../../dtos").ESignBaseResponseDto<import("../../../../../core/database").DocumentEntity>>;
    submitDocument(companyId: number, documentId: number, { userEmail }: IActiveUserData): Promise<import("../../../dtos").ESignBaseResponseDto<import("../../../../../core/database").DocumentEntity & import("../../../dtos").DocumentBaseResponse>>;
    getAllDocuments({ companyId }: BaseParamDto, query: GetAllDocumentsQueryDto): Promise<import("../../../../../common/dto").PaginationResponseDto<import("../../../../../core/database").DocumentEntity>>;
    getDocumentAsNew(companyId: number, documentId: number): Promise<Partial<import("../../../../../core/database").DocumentEntity>>;
    getDocumentById(companyId: number, documentId: number): Promise<import("../../../../../core/database").DocumentEntity>;
    downloadDocuments(documentId: number, companyId: number, type: DownloadFileType, userEmail: string): Promise<StreamableFile>;
    recallDocument(companyId: number, documentId: number, { userEmail }: IActiveUserData, { reason }: RecallDocumentBodyDto): Promise<import("../../../dtos").ESignBaseResponseDto<import("../../../libs/zoho").ZohoCommonResponse & import("../../../dtos").DocumentBaseResponse>>;
    remindRecipients(companyId: number, documentId: number, { userEmail }: IActiveUserData): Promise<import("../../../dtos").ESignBaseResponseDto<import("../../../libs/zoho").ZohoCommonResponse & import("../../../dtos").DocumentBaseResponse>>;
    extendDocument(companyId: number, documentId: number, { extendedDate }: ExtendDocumentBodyDto, { userEmail }: IActiveUserData): Promise<import("../../../dtos").ESignBaseResponseDto<import("../../../libs/zoho").ZohoCommonResponse & import("../../../dtos").DocumentBaseResponse>>;
    updateDocumentSetting(companyId: number, documentId: number, body: UpdateDocumentSettingBodyDto, { userEmail }: IActiveUserData): Promise<import("../../../dtos").ESignBaseResponseDto<import("../../../../../core/database").DocumentEntity & import("../../../dtos").DocumentBaseResponse>>;
    deleteMultipleDocuments({ companyId }: BaseParamDto, body: DeleteMultipleDocumentsBodyDto, { userEmail }: IActiveUserData): Promise<{
        message: string;
    }>;
    updateNewDocumentFile(companyId: number, documentId: number, { name, order }: UpdateNewDocumentFileBodyDto, file: IMulterFileUploaded, { userEmail }: IActiveUserData): Promise<import("../../../dtos").ESignBaseResponseDto<import("../../../../../core/database").DocumentEntity & import("../../../dtos").DocumentBaseResponse>>;
}

import { StreamableFile } from '@nestjs/common';
import { BaseParamDto } from '../../../../../common/dto';
import { IActiveEssData, IActiveUserData } from '../../../../../core/iam/interfaces';
import { DownloadFileType } from '../../../enums';
import { GetAllEssDocumentsQueryDto } from '../../../modules/document/dtos';
import { EssDocumentService } from '../services/ess-document.service';
export declare class EssDocumentController {
    private readonly essDocumentService;
    constructor(essDocumentService: EssDocumentService);
    getAllEssDocuments({ companyId }: BaseParamDto, query: GetAllEssDocumentsQueryDto, { userEmail }: IActiveUserData): Promise<import("../../../../../common/dto").PaginationResponseDto<import("../../../../../core/database").DocumentEntity>>;
    getDocumentById(companyId: number, documentId: number, { userEmail }: IActiveUserData): Promise<import("../../../../../core/database").DocumentEntity>;
    downloadDocument(documentId: number, companyId: number, type: DownloadFileType, { email }: IActiveEssData): Promise<StreamableFile>;
    getDocumentFileContent(companyId: number, documentId: number, documentFileId: number, { email }: IActiveEssData): Promise<StreamableFile>;
}

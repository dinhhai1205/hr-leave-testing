import { StreamableFile } from '@nestjs/common';
import { IMulterFileUploaded } from '../../../../../common/interfaces';
import { IActiveUserData } from '../../../../../core/iam/interfaces';
import { ReplaceDocumentFileBodyDto } from '../../../modules/document-file/dtos/replace-document-file-body.dto';
import { DocumentFileService } from '../services/document-file.service';
export declare class DocumentFileController {
    private readonly documentFileService;
    constructor(documentFileService: DocumentFileService);
    getDocumentFileContent(companyId: number, documentId: number, documentFileId: number): Promise<StreamableFile>;
    replaceDocumentFile(companyId: number, documentId: number, documentFileId: number, body: ReplaceDocumentFileBodyDto, file: IMulterFileUploaded, { userEmail }: IActiveUserData): Promise<import("../../../dtos").ESignBaseResponseDto<import("../../../dtos").DocumentBaseResponse & import("../../../../../core/database").DocumentFileEntity>>;
    deleteDocumentFile(companyId: number, documentId: number, documentFileId: number, { userEmail }: IActiveUserData): Promise<string>;
}

import { IActiveUserData } from '../../../../core/iam/interfaces';
import { CreateDocumentShareBodyDto } from '../../modules/document-share/dtos/create-document-share-body.dto';
import { GetAllDocumentSharesBodyDto } from '../../modules/document-share/dtos/get-all-document-shares-body.dto';
import { DocumentShareService } from './document-share.service';
export declare class DocumentShareController {
    private documentShareService;
    constructor(documentShareService: DocumentShareService);
    createDocumentShare(companyId: number, documentId: number, { userEmail }: IActiveUserData, body: CreateDocumentShareBodyDto): Promise<import("../../dtos").ESignBaseResponseDto<import("../../dtos").DocumentBaseResponse & import("../../../../core/database").DocumentShareEntity>>;
    getAllDocumentShares(companyId: number, documentId: number, body: GetAllDocumentSharesBodyDto, { userEmail }: IActiveUserData): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").DocumentShareEntity>>;
    deleteDocumentFile(companyId: number, documentId: number, documentShareId: number, { userEmail }: IActiveUserData): Promise<import("../../dtos").ESignBaseResponseDto<import("../../dtos").DocumentBaseResponse & {
        message: string;
    }>>;
}

import { PaginationQueryDto } from '../../../../../common/dto';
export declare class GetAllDocumentSharesPayloadDto extends PaginationQueryDto {
    companyId: number;
    documentId: number;
    userEmail: string;
}

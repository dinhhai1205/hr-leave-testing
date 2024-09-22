import { PaginationQueryDto } from '../../../../../common/dto';
export declare class GetAllDocumentsTemplateQueryDto extends PaginationQueryDto {
    queryOwner?: string;
    queryFolderName?: string;
    queryDocumentTypeName?: string;
}

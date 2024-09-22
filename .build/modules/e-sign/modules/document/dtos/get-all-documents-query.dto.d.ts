import { DocumentStatus } from '../../../enums';
import { PaginationQueryDto } from '../../../../../common/dto';
export declare class GetAllDocumentsQueryDto extends PaginationQueryDto {
    queryFolderName?: string;
    queryDocumentTypeName?: string;
    queryOwner?: string;
    queryRecipients?: string;
    filterStatus?: DocumentStatus;
}

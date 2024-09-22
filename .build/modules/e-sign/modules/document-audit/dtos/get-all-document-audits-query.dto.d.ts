import { DocumentOperationType } from '../../../enums';
import { PaginationQueryDto } from '../../../../../common/dto';
export declare class GetAllDocumentAuditsQueryDto extends PaginationQueryDto {
    filterOperationType: DocumentOperationType;
}

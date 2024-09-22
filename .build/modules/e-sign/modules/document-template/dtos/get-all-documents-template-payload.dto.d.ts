import { BaseParamDto, PaginationQueryDto } from '../../../../../common/dto';
declare const GetAllDocumentsTemplatePayloadDto_base: import("@nestjs/common").Type<BaseParamDto & PaginationQueryDto>;
export declare class GetAllDocumentsTemplatePayloadDto extends GetAllDocumentsTemplatePayloadDto_base {
    queryOwner?: string;
    queryFolderName?: string;
    queryDocumentTypeName?: string;
}
export {};

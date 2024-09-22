import { BaseEntityResponseDto } from '../../../../../common/dto';
declare const DocumentTypeResponseDto_base: import("@nestjs/common").Type<Pick<BaseEntityResponseDto, "createdOn" | "id" | "companyId">>;
export declare class DocumentTypeResponseDto extends DocumentTypeResponseDto_base {
    name: string;
}
export {};

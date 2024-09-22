import { BaseEntityResponseDto } from '../../../../../common/dto';
declare const FolderResponseDto_base: import("@nestjs/common").Type<Pick<BaseEntityResponseDto, "createdOn" | "id" | "companyId">>;
export declare class FolderResponseDto extends FolderResponseDto_base {
    name: string;
}
export {};

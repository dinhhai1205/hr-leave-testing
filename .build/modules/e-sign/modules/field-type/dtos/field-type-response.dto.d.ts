import { FieldCategory, FieldTypeName } from '../../../enums';
import { BaseEntityResponseDto } from '../../../../../common/dto';
declare const FieldTypeResponseDto_base: import("@nestjs/common").Type<Pick<BaseEntityResponseDto, "createdOn" | "id" | "companyId">>;
export declare class FieldTypeResponseDto extends FieldTypeResponseDto_base {
    fieldCategory: FieldCategory;
    fieldTypeName: FieldTypeName;
    isMandatory: boolean;
}
export {};

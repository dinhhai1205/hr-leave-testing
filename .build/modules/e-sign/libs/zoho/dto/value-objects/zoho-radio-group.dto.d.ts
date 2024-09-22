import { ZohoFieldCommonProperty } from './zoho-field-common-property.dto';
import { ZohoRadioGroupSubFieldDto } from './zoho-radio-group-sub-field.dto';
declare const ZohoRadioGroupDto_base: import("@nestjs/common").Type<Pick<ZohoFieldCommonProperty, "document_id" | "field_name" | "field_label" | "field_type_name" | "action_id" | "is_mandatory" | "page_no" | "default_value">>;
export declare class ZohoRadioGroupDto extends ZohoRadioGroupDto_base {
    sub_fields: ZohoRadioGroupSubFieldDto[];
    static getKeys(): Array<keyof ZohoRadioGroupDto>;
}
export {};

import { ZohoFieldCommonProperty } from './zoho-field-common-property.dto';
declare const ZohoRadioGroupSubFieldDto_base: import("@nestjs/common").Type<Pick<ZohoFieldCommonProperty, "width" | "height" | "document_id" | "x_coord" | "y_coord" | "x_value" | "y_value" | "abs_width" | "abs_height" | "page_no">>;
export declare class ZohoRadioGroupSubFieldDto extends ZohoRadioGroupSubFieldDto_base {
    sub_field_name: string;
}
export {};

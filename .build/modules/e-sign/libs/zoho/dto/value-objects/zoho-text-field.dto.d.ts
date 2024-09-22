import { ZohoFieldCommonProperty } from './zoho-field-common-property.dto';
import { ZohoTextPropertyDto } from './zoho-text-property.dto';
export declare class ZohoTextFieldDto extends ZohoFieldCommonProperty {
    name_format?: string;
    text_property: ZohoTextPropertyDto;
    static getKeys(): Array<keyof ZohoTextFieldDto>;
}

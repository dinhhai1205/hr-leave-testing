import { ZohoDropdownValueDto } from './zoho-dropdown-value.dto';
import { ZohoFieldCommonProperty } from './zoho-field-common-property.dto';
export declare class ZohoDropdownDto extends ZohoFieldCommonProperty {
    dropdown_values: ZohoDropdownValueDto[];
    static getKeys(): Array<keyof ZohoDropdownDto>;
}

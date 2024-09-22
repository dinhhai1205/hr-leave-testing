import type { ZohoCheckBoxDto } from './value-objects/zoho-checkbox.dto';
import type { ZohoDateFieldDto } from './value-objects/zoho-date-field.dto';
import type { ZohoDropdownDto } from './value-objects/zoho-dropdown.dto';
import type { ZohoImageFieldDto } from './value-objects/zoho-image-field.dto';
import type { ZohoRadioGroupDto } from './value-objects/zoho-radio-group.dto';
import type { ZohoTextFieldDto } from './value-objects/zoho-text-field.dto';
export declare class ZohoRequestActionFieldDto {
    check_boxes?: ZohoCheckBoxDto[];
    text_fields?: ZohoTextFieldDto[];
    image_fields?: ZohoImageFieldDto[];
    date_fields?: ZohoDateFieldDto[];
    radio_groups?: ZohoRadioGroupDto[];
    dropdown_fields?: ZohoDropdownDto[];
}

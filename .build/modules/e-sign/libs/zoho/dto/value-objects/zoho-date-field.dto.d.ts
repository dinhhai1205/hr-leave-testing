import { ZohoFieldCommonProperty } from './zoho-field-common-property.dto';
import { ZohoTextPropertyDto } from './zoho-text-property.dto';
declare const ZohoDateFieldDto_base: import("@nestjs/common").Type<Omit<ZohoFieldCommonProperty, "default_value">>;
export declare class ZohoDateFieldDto extends ZohoDateFieldDto_base {
    date_format?: string;
    text_property: ZohoTextPropertyDto;
    time_zone_offset?: number;
    time_zone?: string;
    static getKeys(): Array<keyof ZohoDateFieldDto>;
}
export {};

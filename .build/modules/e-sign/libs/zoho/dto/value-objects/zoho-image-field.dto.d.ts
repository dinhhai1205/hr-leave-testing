import { ZohoFieldCommonProperty } from './zoho-field-common-property.dto';
declare const ZohoImageFieldDto_base: import("@nestjs/common").Type<Omit<ZohoFieldCommonProperty, "default_value" | "description_tooltip">>;
export declare class ZohoImageFieldDto extends ZohoImageFieldDto_base {
    is_resizable?: boolean;
    is_draggable?: boolean;
    static getKeys(): Array<keyof ZohoImageFieldDto>;
}
export {};

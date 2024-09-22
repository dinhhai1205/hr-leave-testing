import { FieldTypeName } from '../../../../enums';
export declare class ZohoFieldCommonProperty {
    field_name: string;
    field_label?: string;
    field_type_name: FieldTypeName;
    document_id: string;
    action_id: string;
    is_mandatory: boolean;
    x_coord?: number;
    y_coord?: number;
    x_value: number;
    y_value: number;
    width: number;
    height: number;
    abs_width?: number;
    abs_height?: number;
    page_no: number;
    default_value?: string;
    description_tooltip?: string;
}

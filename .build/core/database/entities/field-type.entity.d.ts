import { FieldCategory, FieldTypeName } from '../../../modules/e-sign/enums';
import { BaseAppEntity } from './base-app.entity';
export declare class FieldTypeEntity extends BaseAppEntity {
    fieldCategory: FieldCategory;
    fieldTypeName: FieldTypeName;
    isMandatory: boolean;
}

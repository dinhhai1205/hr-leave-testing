import { FieldSettingsDto } from '../../modules/document-action-field/dtos';
import { FieldTypeService } from '../field-type/field-type.service';
export declare class DocumentActionFieldService {
    private readonly fieldTypeService;
    constructor(fieldTypeService: FieldTypeService);
    validateDocumentActionField(fields: FieldSettingsDto[]): Promise<void>;
    private checkFieldCategory;
}

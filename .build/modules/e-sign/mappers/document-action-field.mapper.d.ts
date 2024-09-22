import type { ZohoRequestActionFieldDto } from '../libs/zoho';
import type { FieldSettingsDto } from '../modules/document-action-field';
export declare class DocumentActionFieldMapper {
    static toZohoRequestActionField(actionId: string, documentFileZohoIdTable: {
        [documentFileId: string]: string;
    }, documentActionFields: FieldSettingsDto[]): ZohoRequestActionFieldDto;
}

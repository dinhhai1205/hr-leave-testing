import { UpdateDocumentActionSettingDto } from '../../../modules/document-action/dtos/update-document-action-setting.dto';
import { UpdateDocumentFileSettingDto } from '../../../modules/document-file/dtos/update-document-file-setting.dto';
import { BulkActionDto } from '../../../modules/document/dtos/bulk-action.dto';
export declare class UpdateDocumentSettingBodyDto {
    name?: string;
    isSequential?: boolean;
    expirationDays?: number;
    validity?: number;
    description?: string;
    emailReminders?: boolean;
    reminderPeriod?: number;
    notes?: string;
    documentTypeId?: number;
    folderId?: number;
    isBulk?: boolean;
    bulkActions?: BulkActionDto[];
    documentFileSettings?: UpdateDocumentFileSettingDto[];
    documentActionSettings?: UpdateDocumentActionSettingDto[];
    deletedActions?: number[];
}

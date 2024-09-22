import { UpdateDocumentActionSettingDto } from '../../document-action/dtos/update-document-action-setting.dto';
export declare class CreateDocumentFromTemplateBodyDto {
    documentName?: string;
    folderId?: number;
    documentActions?: UpdateDocumentActionSettingDto[];
    notes?: string;
    submitDocument?: boolean;
}

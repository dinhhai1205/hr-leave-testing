import { BaseEntityResponseDto } from '../../../../../common/dto';
import { DocumentActionResponseDto } from '../../document-action/dtos/document-action-response.dto';
import { DocumentFileResponseDto } from '../../document-file/dtos/document-file-response.dto';
import { DocumentTypeResponseDto } from '../../document-type/dtos/document-type-response.dto';
import { FolderResponseDto } from '../../folder/dtos/folder-response.dto';
export declare class DocumentTemplateResponseDto extends BaseEntityResponseDto {
    name: string;
    isSequential: boolean;
    expirationDays: number;
    validity: number;
    description: string;
    emailReminders: boolean;
    reminderPeriod: number;
    notes: string;
    documentTypeId: number;
    folderId: number;
    folder: FolderResponseDto;
    documentType: DocumentTypeResponseDto;
    documentAction: DocumentActionResponseDto[];
    documentFiles: DocumentFileResponseDto[];
}

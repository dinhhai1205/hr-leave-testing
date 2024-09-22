import { DocumentStatus } from '../../../enums';
import { DocumentActionResponseDto } from '../../../modules/document-action/dtos/document-action-response.dto';
import { DocumentFileResponseDto } from '../../../modules/document-file/dtos/document-file-response.dto';
import { DocumentTypeResponseDto } from '../../../modules/document-type/dtos/document-type-response.dto';
import { FolderResponseDto } from '../../../modules/folder/dtos/folder-response.dto';
import { BaseEntityResponseDto } from '../../../../../common/dto';
export declare class DocumentResponseDto extends BaseEntityResponseDto {
    name: string;
    status: DocumentStatus;
    isSequential: boolean;
    expirationDays: number;
    validity: number;
    description: string;
    emailReminders: boolean;
    reminderPeriod: number;
    notes: string;
    selfSign: boolean;
    signSubmittedTime: Date;
    signPercentage: number;
    documentTypeId: number;
    folderId: number;
    folder: FolderResponseDto;
    documentType: DocumentTypeResponseDto;
    documentAction: DocumentActionResponseDto[];
    documentFiles: DocumentFileResponseDto[];
}

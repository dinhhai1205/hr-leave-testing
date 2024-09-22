import { DownloadFileType } from '../../../enums';
export declare class DownloadDocumentsPayloadDto {
    documentId: number;
    companyId: number;
    downloadType: DownloadFileType;
    userEmail?: string;
}

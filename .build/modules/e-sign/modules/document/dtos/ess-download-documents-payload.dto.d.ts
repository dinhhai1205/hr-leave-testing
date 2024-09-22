import { DownloadFileType } from '../../../enums';
export declare class EssDownloadDocumentsPayloadDto {
    documentId: number;
    companyId: number;
    downloadType: DownloadFileType;
    userEmail: string;
}

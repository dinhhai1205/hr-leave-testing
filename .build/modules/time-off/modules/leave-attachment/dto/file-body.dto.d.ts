import { IMulterFileUploaded } from '../../../../../common/interfaces';
export declare class FileBodyDto {
    file: IMulterFileUploaded;
    encryptedSymmetricKey?: string;
    encryptedIv?: string;
}
export declare class FilesBodyDto {
    files: IMulterFileUploaded[];
    encryptedSymmetricKey?: string;
    encryptedIv?: string;
}

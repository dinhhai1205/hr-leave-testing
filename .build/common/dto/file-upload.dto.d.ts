import { IMulterFileUploaded } from '../../common/interfaces/multer-file-uploaded.interface';
import { EncryptedFileInfoDto } from './encrypted-file-info.dto';
declare const FileUploadDto_base: import("@nestjs/common").Type<Partial<EncryptedFileInfoDto>>;
export declare class FileUploadDto extends FileUploadDto_base {
    file: IMulterFileUploaded;
}
export {};

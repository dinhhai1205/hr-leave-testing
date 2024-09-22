import { IMulterFileUploaded } from '../../common/interfaces/multer-file-uploaded.interface';
import { EncryptedFileInfoDto } from './encrypted-file-info.dto';
declare const FilesUploadDto_base: import("@nestjs/common").Type<Partial<EncryptedFileInfoDto>>;
export declare class FilesUploadDto extends FilesUploadDto_base {
    files: IMulterFileUploaded[];
}
export {};

import type { Type } from '@nestjs/common';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
interface IFileUploadOption {
    singleUpload: boolean;
    maxFileCount?: number;
    customFieldName?: string;
    multerOptions?: MulterOptions;
    summary?: string;
    decryptFile?: boolean;
    additionBodyDto?: Type<unknown>;
}
export declare function FilesUpload(option?: IFileUploadOption): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};

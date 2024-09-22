import type { Request } from 'express';
import type { IAuthInfo } from './auth-info.interface';
import type { IMulterFileUploaded } from './multer-file-uploaded.interface';
export interface IRequest extends Request {
    authInfo: IAuthInfo;
    file: IMulterFileUploaded;
    files: IMulterFileUploaded[];
}

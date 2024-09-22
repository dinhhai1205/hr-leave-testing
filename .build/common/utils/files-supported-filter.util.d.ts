import type { CONTENT_TYPE } from '../../common/constants';
import type { IMulterFileUploaded } from '../../common/interfaces/multer-file-uploaded.interface';
import type { ValueOf } from '../../common/types';
export declare const filesSupportedFilter: <T extends ValueOf<typeof CONTENT_TYPE>>(mimetypeList: T[]) => (req: any, file: IMulterFileUploaded, callback: (error: Error | null, acceptFile: boolean) => void) => void;

import { IMulterFileUploaded } from '../interfaces';
export declare class MulterFileUploadedDto implements Omit<IMulterFileUploaded, 'fieldname' | 'encoding'> {
    size: number;
    originalname: string;
    mimetype: string;
    buffer: Buffer;
}

import { Pdf2PicOptions } from './types';
export declare class PdfToImageService {
    convertToBase64(fileBuffer: Buffer, options?: Partial<Pdf2PicOptions>): Promise<string>;
    multiConvertToBase64(fileBuffers: Buffer[], options?: Partial<Pdf2PicOptions>): Promise<string[]>;
}

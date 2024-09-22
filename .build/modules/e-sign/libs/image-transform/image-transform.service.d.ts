export declare class ImageTransformService {
    PDF_SIZES: {
        [key: string]: [number, number];
    };
    toBase64(fileBuffer: Buffer): Promise<string>;
    multiToBase64(fileBuffers: Buffer[]): Promise<string[]>;
    toPdf(fileBuffer: Buffer): Promise<Buffer>;
}

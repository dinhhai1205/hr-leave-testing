export declare class ZipService {
    createZip(files: {
        name: string;
        buffer: Buffer;
    }[]): Buffer;
    unzipToArrayBuffers(fileBuffer: Buffer): Buffer[];
}

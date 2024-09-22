import type { Readable } from 'stream';
import type { IAwsS3ObjectContentResponse } from '../interfaces/aws-s3-object-content-response.interface';
import type { IAwsS3ObjectStreamingResponse } from '../interfaces/aws-s3-object-streaming-response.interface';
export declare class AwsS3ObjectResponseMapper {
    static toObjectContent(args: {
        fileBuffer: Buffer;
        objectKey: string;
        contentType?: string;
    }): IAwsS3ObjectContentResponse;
    static toObjectStreaming(args: {
        readableStream: Readable;
        objectKey: string;
        contentType?: string;
        contentLength?: number;
    }): IAwsS3ObjectStreamingResponse;
}

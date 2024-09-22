import type { PassThrough } from 'stream';
export interface IAwsS3ObjectStreamingResponse {
    name: string;
    passthroughStream: PassThrough;
    length: number;
    type: string;
    disposition: string;
}

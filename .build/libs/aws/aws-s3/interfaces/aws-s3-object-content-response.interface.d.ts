export interface IAwsS3ObjectContentResponse {
    name: string;
    buffer: Buffer;
    length: number;
    type: string;
    disposition: string;
}

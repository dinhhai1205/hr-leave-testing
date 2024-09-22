import { CopyObjectCommandInput, DeleteObjectsCommandOutput, GetObjectCommandInput, GetObjectCommandOutput, ListObjectsV2CommandInput, ListObjectsV2CommandOutput, PutObjectCommandInput, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { AppConfig } from '../../../config';
import { AwsConfig } from '../../../config/aws.config';
import { IAwsS3ModuleOptions } from './interfaces/aws-s3-module-options.interface';
import { IAwsS3ObjectContentResponse } from './interfaces/aws-s3-object-content-response.interface';
import { IAwsS3ObjectStreamingResponse } from './interfaces/aws-s3-object-streaming-response.interface';
export declare class AwsS3Service {
    private readonly awsConfig;
    private readonly awsS3ConfigOptions;
    private readonly appConfig;
    private readonly s3Client;
    bucketName: string;
    prefixKey: string;
    constructor(awsConfig: AwsConfig, awsS3ConfigOptions: IAwsS3ModuleOptions, appConfig: Pick<AppConfig, 'appType'>);
    private buildBucketName;
    private buildPrefixKey;
    private addPrefixKey;
    putObjectToS3(input: Omit<PutObjectCommandInput, 'Bucket'> & Partial<{
        Bucket: string;
    }>): Promise<PutObjectCommandOutput>;
    deleteObjectsS3(objectKeys: string[]): Promise<DeleteObjectsCommandOutput>;
    getListObject(input: Omit<ListObjectsV2CommandInput, 'Bucket'>): Promise<ListObjectsV2CommandOutput>;
    getObjectResponse(input: Omit<GetObjectCommandInput, 'Bucket'> & Partial<{
        Bucket: string;
    }>): Promise<GetObjectCommandOutput>;
    copyObjectS3(input: Omit<CopyObjectCommandInput, 'Bucket'> & Partial<{
        Bucket: string;
    }>): Promise<import("@aws-sdk/client-s3").CopyObjectCommandOutput>;
    getObjectContent(objectKey: string, input?: Omit<GetObjectCommandInput, 'Bucket' | 'Key'> & Partial<{
        Bucket: string;
    }>): Promise<IAwsS3ObjectContentResponse>;
    getObjectContents(objectKeys: string[], input?: Omit<GetObjectCommandInput, 'Bucket' | 'Key'> & Partial<{
        Bucket: string;
    }>): Promise<Array<IAwsS3ObjectContentResponse>>;
    getObjectStreamingReadable(objectKey: string, input?: Omit<GetObjectCommandInput, 'Bucket' | 'Key'> & Partial<{
        Bucket: string;
    }>): Promise<IAwsS3ObjectStreamingResponse>;
}

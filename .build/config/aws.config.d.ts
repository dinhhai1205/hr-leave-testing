import type { ConfigType } from '@nestjs/config';
interface IAwsConfig {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucketPrefix?: string;
}
export declare const awsConfig: (() => IAwsConfig) & import("@nestjs/config").ConfigFactoryKeyHost<IAwsConfig>;
export type AwsConfig = ConfigType<typeof awsConfig>;
export declare const InjectAwsConfig: () => PropertyDecorator & ParameterDecorator;
export {};

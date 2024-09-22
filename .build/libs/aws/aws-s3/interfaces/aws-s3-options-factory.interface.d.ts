import type { IAwsS3ModuleOptions } from './aws-s3-module-options.interface';
export interface IAwsS3OptionsFactory {
    createAwsS3Options(): Promise<IAwsS3ModuleOptions> | IAwsS3ModuleOptions;
}

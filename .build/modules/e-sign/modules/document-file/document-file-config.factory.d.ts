import { AppConfig } from '../../../../config';
import { IAwsS3OptionsFactory } from '../../../../libs/aws';
import { IDocumentFileModuleOptions } from './interfaces';
export declare class DocumentFileConfigFactory implements IAwsS3OptionsFactory {
    private readonly appConfig;
    private readonly documentFileModuleOptions;
    constructor(appConfig: AppConfig, documentFileModuleOptions: IDocumentFileModuleOptions);
    createAwsS3Options(): {
        bucketName: string;
        objectKeyPrefix: string;
    };
}

import { TranslateClient } from '@aws-sdk/client-translate';
import { AwsConfig } from '../../../config/aws.config';
export declare class AwsTranslateService {
    private readonly awsConfig;
    readonly translateClient: TranslateClient;
    constructor(awsConfig: AwsConfig);
}

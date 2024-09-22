import { DynamicModule } from '@nestjs/common';
import { ASYNC_OPTIONS_TYPE, ConfigurableModuleClass, OPTIONS_TYPE } from './constants/aws-s3-module.definition';
export declare class AwsS3Module extends ConfigurableModuleClass {
    static register(options: typeof OPTIONS_TYPE): DynamicModule;
    static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}

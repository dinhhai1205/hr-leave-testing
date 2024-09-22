import type { ConfigType } from '@nestjs/config';
import { EAppType, ENodeEnv } from '../common/enums';
export declare const appConfig: (() => {
    containerId: string;
    currentTimezone: string;
    appType: EAppType;
    appPort: string;
    apiKey: string;
    nodeEnv: ENodeEnv;
    clientUrl: string;
    octoClientUrl: string;
    imageName: string;
    containerName: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    containerId: string;
    currentTimezone: string;
    appType: EAppType;
    appPort: string;
    apiKey: string;
    nodeEnv: ENodeEnv;
    clientUrl: string;
    octoClientUrl: string;
    imageName: string;
    containerName: string;
}>;
export type AppConfig = ConfigType<typeof appConfig>;
export declare const InjectAppConfig: () => PropertyDecorator & ParameterDecorator;

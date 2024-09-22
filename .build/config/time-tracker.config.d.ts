import type { ConfigType } from '@nestjs/config';
export declare const timeTrackerConfig: (() => {
    apiUrl: string;
    apiVersion: string;
    masterApiKey: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    apiUrl: string;
    apiVersion: string;
    masterApiKey: string;
}>;
export type TimeTrackerConfig = ConfigType<typeof timeTrackerConfig>;
export declare const InjectTimeTrackerConfig: () => PropertyDecorator & ParameterDecorator;

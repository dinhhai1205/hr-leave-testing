import type { ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
export declare const timeTrackerConfig: (() => {
    apiUrl: string;
    masterApiKey: string | undefined;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    apiUrl: string;
    masterApiKey: string | undefined;
}>;
export type TimeTrackerConfig = ConfigType<typeof timeTrackerConfig>;
export declare const InjectTimeTrackerConfig: () => PropertyDecorator & ParameterDecorator;
export declare const TimeTrackerValidationSchema: {
    TIME_TRACKER_API_KEY: Joi.StringSchema<string>;
    TIME_TRACKER_API_URL: Joi.StringSchema<string>;
    TIME_TRACKER_API_VERSION: Joi.StringSchema<string>;
};

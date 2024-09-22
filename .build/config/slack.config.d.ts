import type { ConfigType } from '@nestjs/config';
interface ISlackConfig {
    botToken: string;
    signingSecret: string;
}
export declare const slackConfig: (() => ISlackConfig) & import("@nestjs/config").ConfigFactoryKeyHost<ISlackConfig>;
export type SlackConfig = ConfigType<typeof slackConfig>;
export declare const InjectSlackConfig: () => PropertyDecorator & ParameterDecorator;
export {};

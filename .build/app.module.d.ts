import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppConfig } from './config/app.config';
import { SlackService } from './libs/slack/slack.service';
export declare class AppModule implements NestModule {
    private readonly appConfig;
    private readonly slackService;
    private nodeEnv;
    constructor(appConfig: AppConfig, slackService: SlackService);
    configure(consumer: MiddlewareConsumer): void;
    beforeApplicationShutdown(): Promise<void>;
    onModuleInit(): Promise<void>;
    private postMessage;
    private applicationMessage;
}

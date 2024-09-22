import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { AppConfig } from '../../config/app.config';
import { LeaveModuleApiLogProducer } from '../../core/queue/producers';
import { SlackProducer } from '../../core/queue/producers/slack.producer';
export declare class GlobalFilter implements ExceptionFilter {
    private readonly appConfig;
    private readonly leaveModuleApiLogProducer;
    private readonly slackProducer;
    private logger;
    constructor(appConfig: AppConfig, leaveModuleApiLogProducer: LeaveModuleApiLogProducer, slackProducer: SlackProducer);
    catch(exception: any, host: ArgumentsHost): Promise<void>;
    private transformException;
    private slackChannels;
    private postSlackMessage;
    extractStackTrace(exception: any): string | null;
}

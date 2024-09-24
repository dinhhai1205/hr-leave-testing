import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { AppConfig } from '../../config/app.config';
import { EncryptionService } from '../../core/encryption';
import { LeaveModuleApiLogProducer } from '../../core/queue/producers';
import { SlackProducer } from '../../core/queue/producers/slack.producer';
export declare class GlobalFilter implements ExceptionFilter {
    private readonly appConfig;
    private readonly leaveModuleApiLogProducer;
    private readonly slackProducer;
    private readonly encryptionService;
    private logger;
    constructor(appConfig: AppConfig, leaveModuleApiLogProducer: LeaveModuleApiLogProducer, slackProducer: SlackProducer, encryptionService: EncryptionService);
    catch(exception: any, host: ArgumentsHost): Promise<void>;
    private transformException;
    private slackChannels;
    private postSlackMessage;
    private getFileUploaded;
    extractStackTrace(exception: any): string | null;
}

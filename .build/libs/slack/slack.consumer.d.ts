import { Job } from 'bullmq';
import { AppConfig } from '../../config';
import { WorkerHostProcessor } from '../../core/queue';
import { IPostMessage } from './interfaces/post-message.interface';
import { SlackService } from './slack.service';
export declare class SlackConsumer extends WorkerHostProcessor {
    private appConfig;
    private slackService;
    private PROCESS;
    constructor(appConfig: Pick<AppConfig, 'nodeEnv'>, slackService: SlackService);
    process(job: Job, token?: string): Promise<any>;
    postMessage(jobData: IPostMessage): Promise<void>;
}

import { JobsOptions, Queue } from 'bullmq';
import { IPostMessage } from '../../../libs/slack/interfaces/post-message.interface';
export declare class SlackProducer {
    private readonly queue;
    private logger;
    constructor(queue: Queue);
    addPostMessageJob(jobData: IPostMessage, opts?: JobsOptions): Promise<void>;
}

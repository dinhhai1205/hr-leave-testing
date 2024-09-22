import { SlackConfig } from '../../config/slack.config';
import { IPostMessage } from './interfaces/post-message.interface';
export declare class SlackService {
    private readonly slackConfig;
    private readonly web;
    constructor(slackConfig: SlackConfig);
    postMessage({ channel, text, blocks }: IPostMessage): Promise<void>;
}

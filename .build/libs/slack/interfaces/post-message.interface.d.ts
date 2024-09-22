import type { SectionBlock } from '@slack/web-api';
export interface IPostMessage {
    channel?: string;
    text: string;
    blocks?: SectionBlock[];
}

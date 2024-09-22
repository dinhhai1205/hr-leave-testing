import { SharedBullConfigurationFactory } from '@nestjs/bullmq';
import { QueueOptions } from 'bullmq';
import { RedisConfig } from '../../../config';
export declare class BullConfigFactory implements SharedBullConfigurationFactory {
    private readonly redisConfig;
    constructor(redisConfig: RedisConfig);
    createSharedConfiguration(): QueueOptions;
}

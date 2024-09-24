import { Queue } from 'bullmq';
import { AppConfig } from '../../../config';
import { LeaveModuleApiLogEntity } from '../../database';
export declare class LeaveModuleApiLogProducer {
    private readonly queue;
    private readonly appConfig;
    private logger;
    constructor(queue: Queue, appConfig: AppConfig);
    addCreateLeaveModuleApiLogJob(jobData: Partial<LeaveModuleApiLogEntity>): Promise<void>;
    private isCannotFoundApiPathError;
}

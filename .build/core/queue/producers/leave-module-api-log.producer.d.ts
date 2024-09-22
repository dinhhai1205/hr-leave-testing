import { Queue } from 'bullmq';
import { LeaveModuleApiLogEntity } from '../../database';
export declare class LeaveModuleApiLogProducer {
    private readonly queue;
    private logger;
    constructor(queue: Queue);
    addCreateLeaveModuleApiLogJob(jobData: Partial<LeaveModuleApiLogEntity>): Promise<void>;
}

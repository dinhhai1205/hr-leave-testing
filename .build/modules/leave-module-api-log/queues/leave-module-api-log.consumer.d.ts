import { Job } from 'bullmq';
import { LeaveModuleApiLogEntity } from '../../../core/database';
import { WorkerHostProcessor } from '../../../core/queue';
import { LeaveModuleApiLogService } from '../leave-module-api-log.service';
export declare class LeaveModuleApiLogConsumer extends WorkerHostProcessor {
    private leaveModuleApiLogService;
    constructor(leaveModuleApiLogService: LeaveModuleApiLogService);
    process(job: Job<LeaveModuleApiLogEntity>): Promise<any>;
    createApiLog(jobData: Partial<LeaveModuleApiLogEntity>): Promise<void>;
}

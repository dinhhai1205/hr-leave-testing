import { WorkerHostProcessor } from '../../../../../core/queue';
import { Job } from 'bullmq';
import { WorkScheduleService } from '../work-schedule.service';
export declare class WorkScheduleProcessor extends WorkerHostProcessor {
    private readonly workScheduleService;
    constructor(workScheduleService: WorkScheduleService);
    process(job: Job<any, any, string>): Promise<any>;
    handlePublishedWorkSchedule(jobData: {
        endDate: string;
        startDate: string;
        ttCompanyId: string;
        workScheduleId: string;
    }): Promise<any>;
    handleUnpublishedWorkSchedule(jobData: {
        workScheduleId: string;
        ttCompanyId: string;
    }): Promise<void>;
    handleExpiredWorkSchedule(jobData: {
        workScheduleId: string;
        ttCompanyId: string;
    }): Promise<void>;
}

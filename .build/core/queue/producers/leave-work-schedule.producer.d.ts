import { Queue } from 'bullmq';
export declare class LeaveWorkScheduleProducer {
    private readonly queue;
    constructor(queue: Queue);
    publishedWorkSchedule(args: {
        ttCompanyId: string;
        workScheduleId: string;
        startDate: string;
        endDate: string;
    }): Promise<void>;
    unpublishedWorkSchedule(args: {
        workScheduleId: string;
        ttCompanyId: string;
    }): Promise<void>;
    expiredWorkSchedule(args: {
        ttCompanyId: string;
        workScheduleId: string;
    }): Promise<void>;
}

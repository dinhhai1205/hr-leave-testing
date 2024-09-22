import { Job } from 'bullmq';
import { WorkerHostProcessor } from '../../../../../core/queue';
import { HrforteNotificationService } from '../hrforte-notification.service';
import { IHrforteNotificationParam } from '../interfaces';
export declare class SendBulkConsumer extends WorkerHostProcessor {
    private readonly hrforteNotificationService;
    private readonly JOB_NAME;
    constructor(hrforteNotificationService: HrforteNotificationService);
    process(job: Job<{
        companyId: number;
        params: IHrforteNotificationParam[];
    }>): Promise<{
        data: string;
        status: number;
    } | undefined>;
}

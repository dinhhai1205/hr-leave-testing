import { Queue } from 'bullmq';
import { IHrforteNotificationParam } from '../../../libs/hrforte/modules/hrforte-notification/interfaces';
export declare class HrforteNotificationProducer {
    private readonly queue;
    constructor(queue: Queue);
    addSendBulkJob(jobData: {
        companyId: number;
        params: IHrforteNotificationParam[];
    }): Promise<import("bullmq").Job<any, any, string>>;
}

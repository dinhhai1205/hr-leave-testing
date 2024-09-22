import { WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
export declare abstract class WorkerHostProcessor extends WorkerHost {
    protected readonly logger: Logger;
    onCompleted(job: Job): void;
    onProgress(job: Job): void;
    onFailed(job: Job): void;
    onActive(job: Job): void;
}

import { WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import 'dotenv/config';
export declare abstract class WorkerHostProcessor extends WorkerHost {
    protected readonly logger: Logger | {
        log: (lg: string) => string;
        error: (msg: any) => any;
    };
    onCompleted(job: Job): void;
    onProgress(job: Job): void;
    onFailed(job: Job): void;
    onActive(job: Job): void;
}

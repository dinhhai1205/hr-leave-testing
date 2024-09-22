import { Queue } from 'bullmq';
export declare class LeaveTypePolicyProducer {
    queue: Queue;
    constructor(queue: Queue);
    addCreditJob(jobData: {
        currentDateNoTime: string;
        index: number;
        batchSize: number;
        skip: number;
    }): Promise<void>;
    addDeductionJob(jobData: Partial<{
        amountLeaveDeduct: number;
        leaveTypeId: number;
        leaveId: number;
        companyId: number;
        employeeId: number;
        authMail: string;
    }>): Promise<void>;
    addRevertingJob(jobData: Partial<{
        leaveId: number;
        companyId: number;
        employeeId: number;
        authMail: string;
    }>): Promise<void>;
}

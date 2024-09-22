import { Job } from 'bullmq';
import { WorkerHostProcessor } from '../../../../../core/queue';
import { LeaveTypePolicyService } from '../leave-type-policy.service';
export declare class LeaveTypePolicyProcessor extends WorkerHostProcessor {
    private readonly leaveTypePolicyService;
    constructor(leaveTypePolicyService: LeaveTypePolicyService);
    process(job: Job<any, any, string>): Promise<any>;
    creditLeaveBalancePolicy(jobData: {
        batchSize: number;
        skip: number;
    }): Promise<void>;
    deductLeaveTypePolicyCredit(jobData: {
        amountLeaveDeduct: number;
        leaveTypeId: number;
        leaveId: number;
        companyId: number;
        employeeId: number;
        authMail: string;
    }): Promise<void>;
    revertLeaveTypePolicyCredit(jobData: {
        leaveId: number;
        companyId: number;
        employeeId: number;
        authMail: string;
    }): Promise<void>;
}

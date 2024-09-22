import { WorkerHostProcessor } from '../../../../../core/queue';
import { Job } from 'bullmq';
import { WorkScheduleAssignmentService } from '../work-schedule-assignment.service';
import { EWorkScheduleState } from '../../work-schedule/enums/work-schedule-state.enum';
export declare class WorkScheduleAssignmentProcessor extends WorkerHostProcessor {
    private readonly workScheduleAssignmentService;
    constructor(workScheduleAssignmentService: WorkScheduleAssignmentService);
    process(job: Job<any, any, string>): Promise<any>;
    handleRemoveWorkScheduleAssignment(jobData: {
        workScheduleId: number;
        companyId: number;
        state: EWorkScheduleState;
    }): Promise<void>;
}

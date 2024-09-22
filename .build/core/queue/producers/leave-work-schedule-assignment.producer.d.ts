import { Queue } from 'bullmq';
import { EWorkScheduleState } from '../../../modules/time-tracker/modules/work-schedule/enums/work-schedule-state.enum';
export declare class LeaveWorkScheduleAssignmentProducer {
    private readonly queue;
    constructor(queue: Queue);
    removeWorkScheduleAssignment(workScheduleId: number, companyId: number, state: EWorkScheduleState): Promise<void>;
}

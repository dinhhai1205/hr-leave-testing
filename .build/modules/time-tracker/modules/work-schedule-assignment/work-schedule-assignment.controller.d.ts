import { WorkScheduleAssignmentService } from './work-schedule-assignment.service';
import { WorkAssignmentQueryDto } from './dtos';
export declare class WorkScheduleAssignmentController {
    private readonly workScheduleAssignmentService;
    constructor(workScheduleAssignmentService: WorkScheduleAssignmentService);
    getAllWorkScheduleAssignments(query: WorkAssignmentQueryDto, companyId: number): Promise<{}>;
}

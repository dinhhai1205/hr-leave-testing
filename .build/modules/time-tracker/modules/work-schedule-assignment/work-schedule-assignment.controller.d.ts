import { WorkScheduleAssignmentService } from './work-schedule-assignment.service';
import { WorkAssignmentQueryDto } from './dtos';
export declare class WorkScheduleAssignmentController {
    private readonly workScheduleAssignmentService;
    constructor(workScheduleAssignmentService: WorkScheduleAssignmentService);
    getAllWorkScheduleAssignments(query: WorkAssignmentQueryDto, companyId: number): Promise<{
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        data: any[];
    }>;
}

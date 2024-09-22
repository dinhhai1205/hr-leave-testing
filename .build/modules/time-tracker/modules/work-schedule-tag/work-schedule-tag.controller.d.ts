import { WorkScheduleTagService } from './work-schedule-tag.service';
import { CreateWorkScheduleTagDto, RemoveWorkScheduleTagDto, WorkScheduleTagDto } from './dtos';
export declare class WorkScheduleTagController {
    private readonly workScheduleTagService;
    constructor(workScheduleTagService: WorkScheduleTagService);
    getTagsOfWorkSchedule(WorkScheduleId: number, companyId: number): Promise<WorkScheduleTagDto[]>;
    assignTagsForWorkSchedule(createWorkScheduleTagDtos: CreateWorkScheduleTagDto[], companyId: number, userEmail: string): Promise<WorkScheduleTagDto[]>;
    restoreWorkScheduleTag(removeWorkScheduleTagDtos: RemoveWorkScheduleTagDto[], companyId: number, userEmail: string): Promise<WorkScheduleTagDto[]>;
    removeWorkScheduleTag(removeWorkScheduleTagDto: RemoveWorkScheduleTagDto, companyId: number, isArchived: boolean, userEmail: string): Promise<WorkScheduleTagDto>;
}

import { TypeOrmBaseService, WorkScheduleEntity, WorkScheduleTagEntity } from '../../../../core/database';
import { Repository } from 'typeorm';
import { CreateWorkScheduleTagDto, UpdateWorkScheduleTagDto, WorkScheduleTagDto } from './dtos';
import { TimeTrackerTagService } from '../time-tracker-tag';
export declare class WorkScheduleTagService extends TypeOrmBaseService<WorkScheduleTagEntity> {
    private readonly workScheduleTagRepository;
    private readonly workScheduleRepository;
    private readonly timeTrackerTagService;
    constructor(workScheduleTagRepository: Repository<WorkScheduleTagEntity>, workScheduleRepository: Repository<WorkScheduleEntity>, timeTrackerTagService: TimeTrackerTagService);
    assignTagForWorkSchedule(createWorkScheduleTagDto: CreateWorkScheduleTagDto, companyId: number, userEmail: string): Promise<WorkScheduleTagDto>;
    assignMultipleTagForWorkSchedules(createWorkScheduleTagDtos: CreateWorkScheduleTagDto[], companyId: number, userEmail: string): Promise<WorkScheduleTagDto[]>;
    archiveWorkScheduleTag(tagId: number, workScheduleId: number, companyId: number, userEmail: string): Promise<WorkScheduleTagDto>;
    removeWorkScheduleTag(tagId: number, workScheduleId: number, companyId: number): Promise<WorkScheduleTagDto>;
    updateMultipleWorkScheduleTag(updateWorkScheduleTagDtos: UpdateWorkScheduleTagDto[], companyId: number, userEmail: string): Promise<WorkScheduleTagDto[]>;
    getTagsOfWorkSchedule(workScheduleId: number, companyId: number): Promise<WorkScheduleTagDto[]>;
}

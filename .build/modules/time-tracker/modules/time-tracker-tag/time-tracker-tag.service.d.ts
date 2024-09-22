import { Repository } from 'typeorm';
import { PaginationQueryDto, PaginationResponseDto } from '../../../../common/dto';
import { CreateTagDto, TagResponseDto, UpdateTagDto } from './dtos';
import { TimeTrackerTagEntity, TypeOrmBaseService } from '../../../../core/database';
export declare class TimeTrackerTagService extends TypeOrmBaseService<TimeTrackerTagEntity> {
    private readonly timeTrackerTagRepository;
    constructor(timeTrackerTagRepository: Repository<TimeTrackerTagEntity>);
    getAllTags(companyId: number, paginationQueryDto: PaginationQueryDto, keywords?: string): Promise<PaginationResponseDto<TimeTrackerTagEntity>>;
    getTagById(id: number, companyId: number): Promise<TimeTrackerTagEntity>;
    createTag(createTagDto: CreateTagDto, companyId: number): Promise<TagResponseDto>;
    updateTag(id: number, updateTagDto: UpdateTagDto, companyId: number): Promise<TagResponseDto>;
    archiveTag(id: number, companyId: number, userEmail: string): Promise<TagResponseDto>;
    restoreTag(id: number, companyId: number, userEmail: string): Promise<TagResponseDto>;
    removeTag(id: number, companyId: number): Promise<TagResponseDto>;
}

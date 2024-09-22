import { PaginationResponseDto } from '../../../../common/dto';
import { TagQueryDto } from './dtos/tag-query.dto';
import { TimeTrackerTagEntity } from '../../../../core/database';
import { TimeTrackerTagService } from './time-tracker-tag.service';
import { CreateTagDto, TagResponseDto, UpdateTagDto } from './dtos';
export declare class TimeTrackerTagController {
    private readonly tagService;
    constructor(tagService: TimeTrackerTagService);
    getTag(tagId: number, companyId: number): Promise<TagResponseDto>;
    getAllTags(companyId: number, query: TagQueryDto): Promise<PaginationResponseDto<TimeTrackerTagEntity>>;
    createTag(companyId: number, createTagDto: CreateTagDto): Promise<TagResponseDto>;
    restoreTag(tagId: number, companyId: number, userEmail: string): Promise<TagResponseDto>;
    updateTag(tagId: number, companyId: number, updateTagDto: UpdateTagDto): Promise<TagResponseDto>;
    removeTag(tagId: number, companyId: number, isArchived: boolean, userEmail: string): Promise<TagResponseDto>;
}

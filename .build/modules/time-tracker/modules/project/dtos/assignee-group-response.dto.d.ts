import { BaseEntityResponseDto } from '../../../../time-tracker/common/dtos';
import { GroupResponseDto } from '../../group/dtos/group-response.dto';
import { ProjectResponseDto } from './project-response.dto';
export declare class AssigneeGroupResponseDto extends BaseEntityResponseDto {
    groupId: string;
    projectId: string;
    group: GroupResponseDto;
    project: ProjectResponseDto;
}

import { BaseEntityResponseDto } from '../../../../../common/dto';
import { AssigneeEmployeeResponseDto } from './assignee-employee-response.dto';
import { AssigneeGroupResponseDto } from './assignee-group-response.dto';
export declare class ProjectResponseDto extends BaseEntityResponseDto {
    name: string;
    logo: string;
    description: string;
    code: string;
    active: boolean;
    clientId: string;
    locationId: string;
    assigneeEmployees: AssigneeEmployeeResponseDto[];
    assigneeGroups: AssigneeGroupResponseDto[];
}

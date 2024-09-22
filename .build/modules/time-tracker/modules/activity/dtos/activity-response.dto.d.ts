import { BaseEntityResponseDto } from '../../../../../common/dto';
import { ActivityGroup } from './activity-group-response.dto';
export declare class ActivityResponseDto extends BaseEntityResponseDto {
    name: string;
    activityCode: string;
    description: string;
    color: string;
    activityGroups: ActivityGroup[];
}

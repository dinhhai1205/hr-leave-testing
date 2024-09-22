import { WorkScheduleResponseDto } from '../../work-schedule/dtos';
import { MemberResponseDto } from '../../member/dtos';
import { ActivityResponseDto } from '../../activity/dtos';
import { BaseEntityResponseDto } from '../../../common/dtos/base-entity-response.dto';
import { ProjectResponseDto } from '../../project/dtos';
export declare class EmployeeInfoForClockDto extends BaseEntityResponseDto {
    workScheduleId: string;
    userId: string;
    roleId: string;
    roleName: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    phone: string;
    address: string;
    age: number;
    gender: string;
    country: string;
    timezone: string;
    active: boolean;
    workSchedule: WorkScheduleResponseDto;
    members: MemberResponseDto[];
    activities?: ActivityResponseDto[];
    project?: ProjectResponseDto;
    assigneeGroups?: {
        project: ProjectResponseDto;
    };
    projects?: ProjectResponseDto[];
}

import { BaseEntityResponseDto } from '../../../common';
import { MemberResponseDto } from '../../member/dtos';
export declare class GroupResponseDto extends BaseEntityResponseDto {
    workScheduleId: string;
    name: string;
    description: string;
    active: boolean;
    members: MemberResponseDto[];
}

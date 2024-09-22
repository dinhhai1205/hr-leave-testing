import { PaginationResponseDto } from '../../../../../common/dto';
import type { GroupResponseDto } from '../../group/dtos';
import type { MemberResponseDto } from './member-response.dto';
export declare class GetAllMembersResponseDto extends PaginationResponseDto<MemberResponseDto> {
    groups: GroupResponseDto;
}

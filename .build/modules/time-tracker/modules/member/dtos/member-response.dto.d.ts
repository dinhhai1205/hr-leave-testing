import { BaseEntityResponseDto, RoleGroup } from '../../../common';
import { GroupResponseDto } from '../../group/dtos';
import { EmployeeResponseDto } from '../../employee/dtos';
export declare class MemberResponseDto extends BaseEntityResponseDto {
    groupId: string;
    employeeId: string;
    role: RoleGroup;
    group: GroupResponseDto;
    employee: EmployeeResponseDto;
}

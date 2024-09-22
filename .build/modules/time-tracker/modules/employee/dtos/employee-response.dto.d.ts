import { BaseEntityResponseDto } from '../../../common';
import { MemberResponseDto } from '../../member/dtos';
import { WorkScheduleResponseDto } from '../../work-schedule/dtos';
export declare class EmployeeResponseDto extends BaseEntityResponseDto {
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
}

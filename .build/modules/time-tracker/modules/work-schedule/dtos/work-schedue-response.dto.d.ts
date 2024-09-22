import { BaseEntityResponseDto, BreakType, UnitTime, WorkArrangement } from '../../../common';
import { EmployeeResponseDto } from '../../employee/dtos';
import { GroupResponseDto } from '../../group/dtos';
export declare class WorkScheduleResponseDto extends BaseEntityResponseDto {
    name: string;
    workArrangement: WorkArrangement;
    breakType: BreakType;
    default: boolean;
    weeklyHours: number;
    unitTime: UnitTime;
    excludeEarlyClockIn: boolean;
    employees: EmployeeResponseDto[];
    groups: GroupResponseDto[];
}

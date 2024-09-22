import { EWorkScheduleState } from '../../work-schedule/enums/work-schedule-state.enum';
export declare class WorkAssignmentQueryDto {
    groupIds?: number[];
    state?: EWorkScheduleState;
    workScheduleIds?: number[];
    employeeIds?: number[];
    orgPaths?: string[];
    startDate: string;
    endDate: string;
    q?: string;
    page?: number;
    take?: number;
}

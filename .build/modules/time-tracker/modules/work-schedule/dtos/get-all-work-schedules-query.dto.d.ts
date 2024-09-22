import { EWorkScheduleState } from '../../work-schedule/enums/work-schedule-state.enum';
export declare class WorkScheduleQueryDto {
    state?: EWorkScheduleState;
    q?: string;
    page?: number;
    take?: number;
    sort?: 'ASC' | 'DESC';
}

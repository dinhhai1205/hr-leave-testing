import type { ObjectLiteral } from 'typeorm';
import type { WorkScheduleEntity } from '../../../../core/database';
export type GetWorkScheduleArguments = {
    select?: (keyof WorkScheduleEntity)[];
    query: string;
    parameters?: ObjectLiteral;
};
export type GetWorkScheduleOptions = {
    daySchedule?: boolean;
    break?: boolean;
    autoDeduction?: boolean;
};

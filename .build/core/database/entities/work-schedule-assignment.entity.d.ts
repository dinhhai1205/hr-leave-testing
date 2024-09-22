import { EmployeeEntity } from '.';
import { BaseAppEntity } from './base-app.entity';
import { WorkScheduleEntity } from './work-schedule.entity';
export declare class WorkScheduleAssignmentEntity extends BaseAppEntity {
    companyId: number;
    workScheduleId: number;
    employeeId: number;
    date: Date;
    isSwapped: boolean;
    isUnpublished: boolean;
    workSchedule: WorkScheduleEntity;
    employee: EmployeeEntity;
}

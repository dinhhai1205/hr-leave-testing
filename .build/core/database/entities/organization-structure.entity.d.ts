import { AbstractEntity } from './abstract.entity';
import { EmployeeEntity } from './employee.entity';
import { WorkScheduleEntity } from './work-schedule.entity';
export declare class OrganizationStructureEntity extends AbstractEntity {
    id: number;
    companyId: number;
    name: string;
    code: string;
    parentId: number;
    headCount: number;
    head: number;
    orgPath: string;
    workScheduleId: number;
    employees: EmployeeEntity[];
    workSchedule: WorkScheduleEntity;
}

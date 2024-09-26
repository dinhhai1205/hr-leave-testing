import { BaseEntityResponseDto } from '../../../common/dtos/base-entity-response.dto';
import { EmployeeEntity } from '../../employee/employee.entity';
import { ActivityResponseDto } from './activity-response.dto';
export declare class AssigneeActivityEmployeeResponseDto extends BaseEntityResponseDto {
    activityId: string;
    employeeId: string;
    activity: ActivityResponseDto;
    employee: EmployeeEntity;
}
export interface IActivityInterface {
    activityId: string;
    activity: {
        id?: string;
        name?: string;
        description?: string;
        activityCode?: string;
    };
    employeeId: string;
}
export type ActivitiesData = IActivityInterface[];
export interface IActivityDetails {
    id?: string;
    name?: string;
    description?: string;
    ttEmployeeId?: string;
    employeeId?: string;
    activityCode?: string;
}
export type EmployeeActivitiesMap = {
    [employeeId: string]: IActivityDetails[];
};

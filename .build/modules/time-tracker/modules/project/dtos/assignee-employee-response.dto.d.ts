import { BaseEntityResponseDto } from '../../../common/dtos/base-entity-response.dto';
import { ProjectResponseDto } from './project-response.dto';
import { EmployeeEntity } from '../../employee/employee.entity';
export declare class AssigneeEmployeeResponseDto extends BaseEntityResponseDto {
    projectId: string;
    employeeId: string;
    project: ProjectResponseDto;
    employee: EmployeeEntity;
}
export interface IProjectInterface {
    projectId: string;
    project: {
        name: string;
        description: string;
        logo?: string;
    };
    employeeId: string;
}
export type ProjectsData = IProjectInterface[];
export interface IProjectDetails {
    id?: string;
    name?: string;
    description?: string;
    ttEmployeeId?: string;
    employeeId?: string;
    logo?: string;
}
export type EmployeeProjectsMap = {
    [employeeId: string]: IProjectDetails[];
};

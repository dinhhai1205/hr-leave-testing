import type { EmployeeResponseDto } from './employee-response.dto';
import type { TTEmployeeResponseDto } from './tt-employee-mapping.dto';
export declare class OrganizationStructureDto {
    id: number;
    companyId: number;
    name: string;
    code: string;
    parentId: number;
    headCount: number;
    head: number;
    orgPath: string;
    employees: EmployeeResponseDto[];
    employeesMap?: TTEmployeeResponseDto[];
    children?: OrganizationStructureDto[];
    adminMappingIds?: string[];
    workScheduleId?: number;
}
export interface IActivityInterface {
    groupId: string;
    activity: IActivityDetails;
    activityId: string;
}
export type ActivitiesData = IActivityInterface[];
export interface IActivityDetails {
    id?: string;
    name?: string;
    description?: string;
    logo?: string;
    activityCode?: string;
    color?: string;
}
export type GroupActivitiesMap = {
    [groupId: string]: IActivityDetails[];
};
export interface IProjectInterface {
    groupId: string;
    project: IProjectDetails;
    projectId: string;
}
export type ProjectsData = IProjectInterface[];
export interface IProjectDetails {
    id?: string;
    name?: string;
    description?: string;
    logo?: string;
}
export type GroupProjectsMap = {
    [groupId: string]: IProjectDetails[];
};

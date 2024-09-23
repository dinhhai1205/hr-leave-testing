import { IMulterFileUploaded } from '../../../../common/interfaces';
import { PaginationQueryDto } from '../../common';
import { GeneralOptions } from '../../common/types';
import { TimeTrackerApiService } from '../../libs/api/api.service';
import { CompanyMappingService } from '../company-mapping/company-mapping.service';
import { EmployeeMappingService } from '../employee-mapping/employee-mapping.service';
import { GroupMappingService } from '../group-mapping/group-mapping.service';
import { TimeTrackerStreamImgService } from '../time-tracker-stream-img/time-tracker-stream-img.service';
import { AddNewAssigneeDto, AssigneesProjectQueryDto, CreateProjectBodyDto, DeleteProjectsDto, ProjectResponseDto, ProjectStatusResponseDto, RemoveAssigneesDto, UpdateProjectInfoDto } from './dtos';
export declare class ProjectService {
    private readonly apiService;
    private readonly employeeMappingService;
    private readonly groupMappingService;
    private readonly companyMappingService;
    private readonly streamImageService;
    constructor(apiService: TimeTrackerApiService, employeeMappingService: EmployeeMappingService, groupMappingService: GroupMappingService, companyMappingService: CompanyMappingService, streamImageService: TimeTrackerStreamImgService);
    createProject(payload: CreateProjectBodyDto, options: GeneralOptions): Promise<ProjectResponseDto>;
    addNewAssigneeToProject(companyId: number, payload: {
        payload: AddNewAssigneeDto;
        projectId: string;
    }, options: GeneralOptions): Promise<ProjectStatusResponseDto>;
    removeMultipleEmployeesAssigneeOfProject(companyId: number, payload: {
        payload: RemoveAssigneesDto;
        projectId: string;
    }, options: GeneralOptions): Promise<ProjectStatusResponseDto>;
    updateProjectInfo(payload: {
        body: UpdateProjectInfoDto;
        file: IMulterFileUploaded;
        projectId: string;
    }, options: GeneralOptions): Promise<ProjectResponseDto>;
    deleteProjectById(projectId: string, options: GeneralOptions): Promise<ProjectResponseDto>;
    deleteMultipleProjects(payload: DeleteProjectsDto, options: GeneralOptions): Promise<ProjectResponseDto>;
    getAllProjectsByCompanyId(companyId: number, options: GeneralOptions, query: PaginationQueryDto): Promise<{
        data: {
            assigneeEmployees: {
                employeeId: number | undefined;
                employee: {
                    id: number | undefined;
                    companyId: string;
                    workScheduleId: string;
                    groupWorkScheduleId: string;
                    userId: string;
                    roleId: string;
                    roleName: import("../../common").RoleName;
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
                    isDeleted: boolean;
                    createdBy: string;
                    createdOn: Date;
                    updatedBy?: string;
                    updatedOn?: Date;
                };
                projectId: string;
                project: ProjectResponseDto;
                id: string;
                isDeleted: boolean;
                companyId?: string;
                createdBy: string;
                createdOn: Date;
                updatedBy?: string;
                updatedOn?: Date;
            }[];
            assigneeGroups: {
                groupId: number | undefined;
                group: {
                    id: number | undefined;
                    workScheduleId: string;
                    name: string;
                    description: string;
                    active: boolean;
                    members: import("../member/dtos").MemberResponseDto[];
                    isDeleted: boolean;
                    companyId?: string;
                    createdBy: string;
                    createdOn: Date;
                    updatedBy?: string;
                    updatedOn?: Date;
                };
                projectId: string;
                project: ProjectResponseDto;
                id: string;
                isDeleted: boolean;
                companyId?: string;
                createdBy: string;
                createdOn: Date;
                updatedBy?: string;
                updatedOn?: Date;
            }[];
            name: string;
            logo: string;
            description: string;
            code: string;
            active: boolean;
            clientId: string;
            locationId: string;
            id: number;
            isDeleted: boolean;
            companyId: number;
            createdBy: string;
            createdOn: Date;
            updatedBy?: string;
            updatedOn?: Date;
        }[];
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    }>;
    getAllEmployeeAssigneesByProjectId(companyId: number, projectId: string, options: GeneralOptions, paginationQueryDto: AssigneesProjectQueryDto): Promise<{
        data: {
            id: string;
            roleName: string;
            email: string;
            firstName: string;
            lastName: string;
            groupId?: string;
            groupName?: string;
        }[] | {
            id: number | undefined;
            roleName: string;
            email: string;
            firstName: string;
            lastName: string;
            groupId?: string;
            groupName?: string;
        }[];
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    }>;
    getAllGroupAssigneesByProjectId(companyId: number, projectId: string, options: GeneralOptions, paginationQueryDto: AssigneesProjectQueryDto): Promise<{
        data: {
            id: string;
            name: string;
            parentName?: string;
        }[] | {
            id: number | undefined;
            name: string;
            parentName?: string;
        }[];
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    }>;
    getProjectById(companyId: number, projectId: string, options: GeneralOptions): Promise<{
        logo: string | null;
        assigneeEmployees: {
            employeeId: string | number;
            employee: {
                id: string | number;
                companyId: string;
                workScheduleId: string;
                groupWorkScheduleId: string;
                userId: string;
                roleId: string;
                roleName: import("../../common").RoleName;
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
                isDeleted: boolean;
                createdBy: string;
                createdOn: Date;
                updatedBy?: string;
                updatedOn?: Date;
            };
            projectId: string;
            project: ProjectResponseDto;
            id: string;
            isDeleted: boolean;
            companyId?: string;
            createdBy: string;
            createdOn: Date;
            updatedBy?: string;
            updatedOn?: Date;
        }[];
        assigneeGroups: {
            groupId: string | number;
            group: {
                id: string | number;
                workScheduleId: string;
                name: string;
                description: string;
                active: boolean;
                members: import("../member/dtos").MemberResponseDto[];
                isDeleted: boolean;
                companyId?: string;
                createdBy: string;
                createdOn: Date;
                updatedBy?: string;
                updatedOn?: Date;
            };
            projectId: string;
            project: ProjectResponseDto;
            id: string;
            isDeleted: boolean;
            companyId?: string;
            createdBy: string;
            createdOn: Date;
            updatedBy?: string;
            updatedOn?: Date;
        }[];
        name: string;
        description: string;
        code: string;
        active: boolean;
        clientId: string;
        locationId: string;
        id: number;
        isDeleted: boolean;
        companyId: number;
        createdBy: string;
        createdOn: Date;
        updatedBy?: string;
        updatedOn?: Date;
    }>;
    getAllProjectsByEmployeeIds({ companyId, employeeIds, }: {
        companyId: number;
        employeeIds: number[];
    }): Promise<any>;
    getProjectByEmployeeId(args: {
        employeeId: number;
        companyId: number;
    }): Promise<any>;
}

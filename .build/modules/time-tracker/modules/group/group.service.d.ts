import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto';
import { OrganizationStructureEntity } from '../../../../core/database';
import { OrganizationStructureService } from '../../../../modules/general/modules/organization-structure/organization-structure.service';
import { OrganizationStructureDto } from '../../../general/modules/organization-structure/dtos/organization-structure.dto';
import { CompanyUserRoleService } from '../../../user/modules/company-user-role';
import { EmployeeService } from '../../../user/modules/employee/employee.service';
import { GeneralOptions } from '../../common';
import { TimeTrackerApiService } from '../../libs/api/api.service';
import { CompanyMappingService } from '../company-mapping/company-mapping.service';
import { EmployeeMappingService } from '../employee-mapping/employee-mapping.service';
import { TimeTrackerEmployeeService } from '../employee/employee.service';
import { GroupMappingService } from '../group-mapping/group-mapping.service';
import { MemberResponseDto } from '../member/dtos';
import { WorkScheduleService } from '../work-schedule';
import { WorkScheduleAssignmentService } from '../work-schedule-assignment/work-schedule-assignment.service';
import { AddMembersToGroupBodyDto, AdminMappingDto, AssignActivitiesToGroupDto, CreateGroupPayloadMappingDto, DeleteMultiGroupsPayloadDto, DeleteMultiGroupsResponseDto, GroupStatusResponseDto, MoveMembersToAnotherGroupBodyDto, PaginationGroupMembersQueryDto, PaginationGroupQueryDto, RemoveMembersToGroupBodyDto, UnassignActivitiesToGroupDto, UpdateGroupSettingBodyDto } from './dtos';
import { AssignWorkScheduleToGroupsDto, UnassignWorkScheduleToGroupsDto } from './dtos/assign-work-schedule.dto';
import { CreateGroupDto } from './dtos/create-group.dto';
import { GroupResponseDto } from './dtos/group-response.dto';
export declare class GroupService {
    readonly orgRepository: Repository<OrganizationStructureEntity>;
    private readonly apiService;
    private readonly orgStructureService;
    private readonly groupMappingService;
    private readonly employeeService;
    private readonly employeeMappingService;
    private readonly companyUserRoleService;
    private readonly ttEmployeeService;
    private readonly companyMappingService;
    private readonly workScheduleService;
    private readonly workScheduleAssignmentService;
    constructor(orgRepository: Repository<OrganizationStructureEntity>, apiService: TimeTrackerApiService, orgStructureService: OrganizationStructureService, groupMappingService: GroupMappingService, employeeService: EmployeeService, employeeMappingService: EmployeeMappingService, companyUserRoleService: CompanyUserRoleService, ttEmployeeService: TimeTrackerEmployeeService, companyMappingService: CompanyMappingService, workScheduleService: WorkScheduleService, workScheduleAssignmentService: WorkScheduleAssignmentService);
    getAdminWithFullAccessOfCompany(companyId: number, timeTrackerCompanyId: string): Promise<string[]>;
    getAllAdminOfOrganizations(companyId: number, timeTrackerCompanyId: string): Promise<AdminMappingDto[]>;
    syncGroupsToTimeTracker(companyId: number, timeTrackerCompanyId: string): Promise<{
        message: string;
    } | undefined>;
    organizationTree(companyId: number, timeTrackerCompanyId: string, groups: OrganizationStructureDto[]): Promise<OrganizationStructureDto | null>;
    createGroup(createGroupDto: CreateGroupDto, options: GeneralOptions): Promise<GroupResponseDto>;
    syncAGroup(payload: CreateGroupPayloadMappingDto, options: GeneralOptions, companyId: number): Promise<{
        message: string;
    }>;
    getManagersOfGroup(groupId: string, options: GeneralOptions, companyId: number): Promise<any[]>;
    getMembersOfGroup(groupId: string, companyId: number, options: GeneralOptions, query: PaginationGroupMembersQueryDto): Promise<{
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        data: {
            employeeId: number | undefined;
            employee: {
                id: number | undefined;
                workScheduleId: string;
                userId: string;
                roleId: string;
                roleName: string;
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
                workSchedule: import("../work-schedule/dtos").WorkScheduleResponseDto;
                members: MemberResponseDto[];
                isDeleted: boolean;
                companyId?: string;
                createdBy: string;
                createdOn: Date;
                updatedBy?: string;
                updatedOn?: Date;
            };
            groupId: string;
            role: import("../../common").RoleGroup;
            group: GroupResponseDto;
            id: string;
            isDeleted: boolean;
            companyId?: string;
            createdBy: string;
            createdOn: Date;
            updatedBy?: string;
            updatedOn?: Date;
        }[];
    }>;
    getGroupById(groupId: string, companyId: number, options: GeneralOptions): Promise<{
        id: number;
        companyId: number;
        workScheduleId: string;
        name: string;
        description: string;
        active: boolean;
        members: MemberResponseDto[];
        isDeleted: boolean;
        createdBy: string;
        createdOn: Date;
        updatedBy?: string;
        updatedOn?: Date;
    }>;
    getAllGroupsByCompanyId(companyId: number, options: GeneralOptions, query: PaginationGroupQueryDto): Promise<PaginationResponseDto<any>>;
    addMembersToGroup(addMembersToGroupDto: AddMembersToGroupBodyDto, options: GeneralOptions, timeTrackerGroupId: string, companyId: number): Promise<GroupStatusResponseDto>;
    removeMembersFromGroup(groupId: string, removeMembersToGroupDto: RemoveMembersToGroupBodyDto, options: GeneralOptions, companyId: number): Promise<GroupStatusResponseDto>;
    moveMembersToAnotherGroup(moveMembersDto: MoveMembersToAnotherGroupBodyDto, options: GeneralOptions, companyId: number): Promise<GroupStatusResponseDto>;
    assignWorkScheduleToGroup(groupId: string, workScheduleId: string, options: GeneralOptions): Promise<GroupStatusResponseDto>;
    getAllEmployeesInGroupAndSubGroups(companyId: number, orgPaths: string[]): Promise<import("../../../../core/database").EmployeeEntity[]>;
    assignWorkScheduleToGroups({ companyId, body, workScheduleId, options, userEmail, }: {
        companyId: number;
        body: AssignWorkScheduleToGroupsDto;
        workScheduleId: number;
        options: GeneralOptions;
        userEmail: string;
    }): Promise<{
        message: string;
        orgIds: number[];
    }>;
    assignWorkScheduleToGroupsLeave({ companyId, body, workScheduleId, userEmail, }: {
        companyId: number;
        body: AssignWorkScheduleToGroupsDto;
        workScheduleId: number;
        userEmail: string;
    }): Promise<{
        message: string;
        orgIds: number[];
    }>;
    unAssignWorkScheduleToGroups({ companyId, body, options, userEmail, }: {
        companyId: number;
        body: UnassignWorkScheduleToGroupsDto;
        options: GeneralOptions;
        userEmail: string;
    }): Promise<{
        message: string;
        orgIds: number[];
    }>;
    unAssignWorkScheduleToGroupsLeave({ companyId, body, userEmail, }: {
        companyId: number;
        body: UnassignWorkScheduleToGroupsDto;
        userEmail: string;
    }): Promise<{
        message: string;
        orgIds: number[];
    }>;
    assignHolidayPolicyGroup(payload: {
        groupId: string;
        holidayId: string;
    }, options: GeneralOptions): Promise<GroupStatusResponseDto>;
    assignActivitiesToGroup(groupId: string, assignActivitiesToGroupDto: AssignActivitiesToGroupDto, options: GeneralOptions): Promise<GroupStatusResponseDto>;
    assignActivityToGroups(activityId: string, groupIds: number[], companyId: number, options: GeneralOptions): Promise<any>;
    unassignActivityToGroups(activityId: string, groupIds: number[], companyId: number, options: GeneralOptions): Promise<any>;
    unassignActivitiesToGroup(groupId: string, unassignActivitiesToGroupDto: UnassignActivitiesToGroupDto, options: GeneralOptions): Promise<GroupStatusResponseDto>;
    unassignWorkScheduleToGroup(groupId: string, options: GeneralOptions): Promise<GroupStatusResponseDto>;
    unassignHolidayPolicyGroup(payload: {
        groupId: string;
    }, options: GeneralOptions): Promise<GroupStatusResponseDto>;
    updateGroupSetting(groupId: string, updateGroupSettingDto: UpdateGroupSettingBodyDto, options: GeneralOptions, companyId: number): Promise<GroupStatusResponseDto>;
    deleteGroupById(groupId: string, options: GeneralOptions): Promise<GroupStatusResponseDto>;
    deleteMultipleGroups(deleteMultiGroupsDto: DeleteMultiGroupsPayloadDto, options: GeneralOptions, companyId: number): Promise<DeleteMultiGroupsResponseDto>;
}

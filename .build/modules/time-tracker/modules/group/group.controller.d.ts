import { BaseParamDto } from '../../../../common/dto';
import { IActiveUserData } from '../../../../core/iam';
import { OrganizationStructureService } from '../../../../modules/general/modules/organization-structure/organization-structure.service';
import { TimeTrackerMapping } from '../../common/decorators/type';
import { MemberResponseDto } from '../member/dtos';
import { AddMembersToGroupBodyDto, AssignActivityToGroupsDto, CreateGroupPayloadMappingDto, DeleteMultiGroupsPayloadDto, DeleteMultiGroupsResponseDto, GroupResponseDto, GroupStatusResponseDto, MoveMembersToAnotherGroupBodyDto, PaginationGroupMembersQueryDto, PaginationGroupQueryDto, RemoveMembersToGroupBodyDto, UnassignActivitiesToGroupDto, UpdateGroupSettingBodyDto } from './dtos';
import { AssignWorkScheduleToGroupsDto, UnassignWorkScheduleToGroupsDto } from './dtos/assign-work-schedule.dto';
import { GroupService } from './group.service';
import { WorkScheduleService } from '../work-schedule';
export declare class GroupController {
    private groupService;
    private readonly orgService;
    private readonly workScheduleService;
    constructor(groupService: GroupService, orgService: OrganizationStructureService, workScheduleService: WorkScheduleService);
    syncGroups({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        message: string;
    } | undefined>;
    syncAGroup(createGroupPayloadDto: CreateGroupPayloadMappingDto, { companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        message: string;
    }>;
    getAllManagersByGroupId(groupId: number, { companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping): Promise<any[]>;
    getAllOrganizationsWithRelation({ companyId }: BaseParamDto, paginationQueryDto: PaginationGroupQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<import("../../../../core/database").OrganizationStructureEntity>>;
    getGroupMembersByGroupId(groupId: number, { companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping, paginationQueryDto: PaginationGroupMembersQueryDto): Promise<{
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
    getAllWorkScheduleOfGroupByOrgId({ companyId }: BaseParamDto, groupId: number): Promise<({
        workScheduleId: number;
        workScheduleName: string;
        state: import("../work-schedule/enums/work-schedule-state.enum").EWorkScheduleState;
        parentId: number | undefined;
        parentGroupName: string | null | undefined;
    } | null)[]>;
    getGroupById({ companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping, groupId: number): Promise<{
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
    addMembersToGroup({ companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping, groupId: number, addMembersToGroupDto: AddMembersToGroupBodyDto): Promise<GroupStatusResponseDto>;
    removeMembersFromGroup({ companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping, groupId: number, removeMembersToGroupDto: RemoveMembersToGroupBodyDto): Promise<GroupStatusResponseDto>;
    moveMembersToAnotherGroup({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, moveMembersDto: MoveMembersToAnotherGroupBodyDto): Promise<GroupStatusResponseDto>;
    assignWorkScheduleToGroups({ companyId }: BaseParamDto, workScheduleId: number, body: AssignWorkScheduleToGroupsDto, { timeTrackerCompanyId }: TimeTrackerMapping, { userEmail }: IActiveUserData): Promise<{
        message: string;
        orgIds: number[];
    }>;
    unAssignWorkScheduleToGroups({ companyId }: BaseParamDto, body: UnassignWorkScheduleToGroupsDto, { timeTrackerCompanyId }: TimeTrackerMapping, { userEmail }: IActiveUserData): Promise<{
        message: string;
        orgIds: number[];
    }>;
    assignActivityToGroups({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, activityId: string, { orgIds }: AssignActivityToGroupsDto): Promise<any>;
    unassignActivityToGroups({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, activityId: string, { orgIds }: AssignActivityToGroupsDto): Promise<any>;
    unassignActivitiesToGroup({ companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping, groupId: number, unassignActivitiesToGroupDto: UnassignActivitiesToGroupDto): Promise<GroupStatusResponseDto>;
    unassignWorkScheduleToGroup({ companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping, groupId: number): Promise<GroupStatusResponseDto>;
    updateGroupSetting({ companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping, groupId: number, updateGroupSettingDto: UpdateGroupSettingBodyDto): Promise<GroupStatusResponseDto>;
    deleteGroupById({ companyId }: BaseParamDto, { timeTrackerCompanyId, timeTrackerGroupId }: TimeTrackerMapping, groupId: number): Promise<GroupStatusResponseDto>;
    deleteMultipleGroups({ companyId }: BaseParamDto, { timeTrackerCompanyId }: TimeTrackerMapping, deleteMultiGroupsDto: DeleteMultiGroupsPayloadDto): Promise<DeleteMultiGroupsResponseDto>;
}

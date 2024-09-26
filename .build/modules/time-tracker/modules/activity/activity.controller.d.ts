import { ActivityService } from './activity.service';
import { AddNewActivityAssigneeDto, ArchivedActivity, CreateActivityDto, UpdateActivityBodyDto } from './dtos';
import { TimeTrackerMapping } from '../../common/decorators/type';
import { PaginationQueryDto } from '../../common';
import { AssigneesProjectQueryDto } from '../project/dtos';
import { BaseParamDto } from '../../../../common/dto';
import { RemoveActivityAssigneesDto } from './dtos/remove-assignees.dto';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    getAllActivities(companyId: number, query: PaginationQueryDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        data: {
            id: number;
            createdBy: string;
            createdOn: Date;
            updatedBy: string | undefined;
            name: string;
            activityCode: string;
            description: string;
            color: string;
            assigneeGroups: {
                id: string;
                companyId: number;
                groupId: string;
                activityId: string;
                group: import("../group/dtos").GroupResponseDto;
            }[];
        }[];
        page: number;
        take: number;
        itemCount: number;
        pageCount: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    }>;
    getAllGroupAssigneesByActivity(companyId: number, activityId: string, { timeTrackerCompanyId }: TimeTrackerMapping, paginationQueryDto: AssigneesProjectQueryDto): Promise<{
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
    getActivityDetail(companyId: number, activityId: string, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<{
        activityGroups: {
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
            id: string;
            companyId: number;
            activityId: string;
        }[];
        name: string;
        activityCode: string;
        description: string;
        color: string;
        id: number;
        isDeleted: boolean;
        companyId: number;
        createdBy: string;
        createdOn: Date;
        updatedBy?: string;
        updatedOn?: Date;
    }>;
    createActivity(companyId: number, createActivity: CreateActivityDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<import("./activity.entity").ActivityEntity>;
    archivedActivity(companyId: number, body: ArchivedActivity, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<import("./activity.entity").ActivityEntity[]>;
    addNewAssignee({ companyId }: BaseParamDto, activityId: string, addNewAssigneeDto: AddNewActivityAssigneeDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    removeMultipleAssignees({ companyId }: BaseParamDto, activityId: string, removeAssigneesDto: RemoveActivityAssigneesDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<any>;
    updateActivity(companyId: number, activityId: string, updateActivity: UpdateActivityBodyDto, { timeTrackerCompanyId }: TimeTrackerMapping): Promise<import("./activity.entity").ActivityEntity>;
}

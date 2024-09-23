import { TimeTrackerApiService } from '../../libs/api/api.service';
import { GeneralOptions } from '../../common/types';
import { ActivityEntity } from './activity.entity';
import { ArchivedActivity, CreateActivityDto, UpdateActivityBodyDto } from './dtos';
import { PaginationQueryDto } from '../../common';
import { GroupMappingService } from '../group-mapping/group-mapping.service';
import { AssigneesProjectQueryDto } from '../project/dtos';
import { EmployeeMappingService } from '../employee-mapping/employee-mapping.service';
import { CompanyMappingService } from '../company-mapping/company-mapping.service';
export declare class ActivityService {
    private readonly apiService;
    private readonly groupMappingService;
    private readonly employeeMappingService;
    private readonly companyMappingService;
    constructor(apiService: TimeTrackerApiService, groupMappingService: GroupMappingService, employeeMappingService: EmployeeMappingService, companyMappingService: CompanyMappingService);
    getAllActivities(options: GeneralOptions, query: PaginationQueryDto): Promise<{
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
    createActivity(payload: CreateActivityDto, options: GeneralOptions): Promise<ActivityEntity>;
    archivedActivities(payload: ArchivedActivity, options: GeneralOptions): Promise<ActivityEntity[]>;
    updateActivity(payload: {
        body: UpdateActivityBodyDto;
        activityId: string;
    }, options: GeneralOptions): Promise<ActivityEntity>;
    getActivityDetail(activityId: string, companyId: number, options: GeneralOptions): Promise<{
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
    getAllGroupAssigneesByActivityId(companyId: number, activityId: string, options: GeneralOptions, paginationQueryDto: AssigneesProjectQueryDto): Promise<{
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
    getActivityByEmployeeId(args: {
        companyId: number;
        employeeId: number;
    }): Promise<any>;
}

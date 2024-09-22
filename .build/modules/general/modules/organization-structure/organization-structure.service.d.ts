import { Repository } from 'typeorm';
import { PaginationResponseDto } from '../../../../common/dto';
import { EmployeeEntity, OrganizationStructureEntity } from '../../../../core/database/entities';
import { LegacyBaseService } from '../../../../core/database/services';
import { TimeTrackerApiService } from '../../../time-tracker/libs/api/api.service';
import { CompanyMappingService } from '../../../time-tracker/modules/company-mapping/company-mapping.service';
import { GroupMappingService } from '../../../time-tracker/modules/group-mapping/group-mapping.service';
import { OrganizationStructureDto } from './dtos/organization-structure.dto';
import { PaginationGroupQueryDto } from '../../../time-tracker/modules/group/dtos';
export declare class OrganizationStructureService extends LegacyBaseService<OrganizationStructureEntity> {
    readonly orgStructureRepository: Repository<OrganizationStructureEntity>;
    readonly employeeRepository: Repository<EmployeeEntity>;
    private readonly groupMappingService;
    private readonly companyMappingService;
    private readonly apiService;
    constructor(orgStructureRepository: Repository<OrganizationStructureEntity>, employeeRepository: Repository<EmployeeEntity>, groupMappingService: GroupMappingService, companyMappingService: CompanyMappingService, apiService: TimeTrackerApiService);
    getAllGroups(companyId: number): Promise<OrganizationStructureDto[]>;
    getAllOrganizationsWithRelation({ companyId, paginationQueryDto, }: {
        companyId: number;
        paginationQueryDto: PaginationGroupQueryDto;
    }): Promise<PaginationResponseDto<OrganizationStructureEntity>>;
    getGroupByIds({ companyId, orgIds, }: {
        companyId: number;
        orgIds: number[];
    }): Promise<OrganizationStructureEntity[]>;
    getGroupById({ companyId, orgId, }: {
        companyId: number;
        orgId: number;
    }): Promise<OrganizationStructureEntity>;
    buildTree(data: OrganizationStructureDto[]): OrganizationStructureDto | null;
    getGroupWorkScheduleForEmployee(employeeId: number, companyId: number): Promise<number | null>;
    getSubOrgsByIds({ orgIds, companyId, }: {
        orgIds: number[];
        companyId: number;
    }): Promise<{
        parentGroupName: string | null;
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
        workSchedule: import("../../../../core/database").WorkScheduleEntity;
        createdOn: Date;
        updatedOn: Date;
        isDeleted: boolean;
        createdBy: string;
        updatedBy: string;
    }[]>;
}

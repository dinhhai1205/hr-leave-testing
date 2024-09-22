import { GroupMappingEntity } from '../../../../core/database/entities/group-mapping.entity';
import { TypeOrmBaseService } from '../../../../core/database/services/typeorm-base.service';
import { Repository } from 'typeorm';
export declare class GroupMappingService extends TypeOrmBaseService<GroupMappingEntity> {
    private readonly groupMappingRepository;
    constructor(groupMappingRepository: Repository<GroupMappingEntity>);
    createManyGroupMappings(groupMappings: {
        organizationStructureId: number;
        timeTrackerGroupId: string;
        companyId: number;
    }[]): Promise<GroupMappingEntity[]>;
    getGroupMapping(organizationStructureId: number, companyId: number): Promise<string | null>;
    getGroupMappingByTTGroupIds({ ttGroupIds, companyId, }: {
        ttGroupIds: string[];
        companyId: number;
    }): Promise<GroupMappingEntity[]>;
    getGroupMappings(orgIds: number[], companyId: number): Promise<GroupMappingEntity[]>;
    deleteManyGroupMapping({ companyId, timeTrackerIds, }: {
        companyId: number;
        timeTrackerIds: string[];
    }): Promise<never[] | import("typeorm").UpdateResult>;
    getOrgByGroupId({ ttGroupId, companyId, }: {
        ttGroupId: string;
        companyId: number;
    }): Promise<GroupMappingEntity | null>;
    getTimeTrackerGroupId(companyId: number, organizationStructureId: number): Promise<GroupMappingEntity | null>;
    deleteLinkedTtData(companyId: number): Promise<void>;
}

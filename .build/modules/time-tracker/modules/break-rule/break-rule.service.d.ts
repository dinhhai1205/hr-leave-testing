import { BreakRuleEntity, TypeOrmBaseService } from '../../../../core/database';
import { Repository } from 'typeorm';
import { CreateBreakRuleDTO, UpdateBreakRuleDTO } from './dtos';
import { DeleteBreakRuleDTO } from './dtos/delete-break-rule.dto';
import { PaginationQueryDto } from '../../../../common/dto';
export declare class BreakRuleService extends TypeOrmBaseService<BreakRuleEntity> {
    private breakRuleRepository;
    constructor(breakRuleRepository: Repository<BreakRuleEntity>);
    getBreakByWorkScheduleId(workScheduleId: number): Promise<BreakRuleEntity[]>;
    getBreaksByWorkScheduleIdWithPagination(workScheduleId: number, companyId: number, paginationQueryDto: PaginationQueryDto): Promise<import("../../../../common/dto").PaginationResponseDto<BreakRuleEntity>>;
    createBreakRule(createBreakRuleDTO: CreateBreakRuleDTO, companyId: number, workScheduleId: number, userEmail: string): Promise<BreakRuleEntity>;
    createManyBreakRules(listCreateBreakRuleDTOs: CreateBreakRuleDTO[], companyId: number, workScheduleId: number, userEmail: string): Promise<BreakRuleEntity[]>;
    updateBreakRule(updateBreakRuleDTO: UpdateBreakRuleDTO, userEmail: string, companyId: number): Promise<BreakRuleEntity>;
    updateManyBreakRule(listBreakRule: UpdateBreakRuleDTO[], userEmail: string, companyId: number, workScheduleId: number): Promise<BreakRuleEntity[]>;
    updateBreakRuleByWorkScheduleId(workScheduleId: number, updateBreakRuleDTO: UpdateBreakRuleDTO, userEmail: string): Promise<import("typeorm").UpdateResult>;
    updateManyBreakRuleByWorkScheduleId(workScheduleId: number, updateBreakRuleDTO: UpdateBreakRuleDTO[], userEmail: string): Promise<import("typeorm").UpdateResult[]>;
    deleteBreakRule(breakRuleId: number, deleteBreakRuleDTO: DeleteBreakRuleDTO): Promise<BreakRuleEntity | import("typeorm").DeleteResult>;
    mapIdsToUUIDs(ids: number[]): Promise<string[]>;
    mapIdoUUIDInDto(dto: UpdateBreakRuleDTO): Promise<UpdateBreakRuleDTO | {
        id: string;
        name: string;
        allowToBeTakenFromTo: boolean;
        duration: number;
        from: string;
        to: string;
        unitTime: import("../../common").UnitTime;
    }>;
    mapIdsToUUIDsInDtosV2(dtos: UpdateBreakRuleDTO[]): Promise<{
        [key: string]: string;
    }>;
    mapUUIdsToIdsInDtos(dtos: UpdateBreakRuleDTO[] | [{
        id: string;
    }]): Promise<{
        [key: string]: number;
    }>;
    mapTtIdsInDtos(dtos: UpdateBreakRuleDTO[], ttIds: string[]): Promise<{
        ttBreakRuleId: string;
        id: number;
        name: string;
        allowToBeTakenFromTo: boolean;
        duration: number;
        from: string;
        to: string;
        unitTime: import("../../common").UnitTime;
    }[]>;
    updateTtRuleId(breakId: number, ttRuleId: string): Promise<import("typeorm").UpdateResult>;
    deleteLinkedTtByCompanyId(workScheduleId: number, companyId: number): Promise<void>;
}

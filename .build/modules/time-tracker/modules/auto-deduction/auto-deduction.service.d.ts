import { AutoDeductionEntity, TypeOrmBaseService } from '../../../../core/database';
import { Repository } from 'typeorm';
import { UnitTime } from '../../common';
import { CreateAutoDeductionDTO, DeleteAutoDeductionDTO, UpdateAutoDeductionDto } from './dtos';
export declare class AutoDeductionService extends TypeOrmBaseService<AutoDeductionEntity> {
    private autoDeductionRepository;
    constructor(autoDeductionRepository: Repository<AutoDeductionEntity>);
    getAutoDeductionByWorkScheduleId(workScheduleId: number): Promise<{
        workScheduleId: number;
        deductionList: AutoDeductionEntity[];
    }>;
    createAutoDeduction(createAutoDeductionDTO: CreateAutoDeductionDTO, workScheduleId: number, companyId: number, userEmail: string): Promise<AutoDeductionEntity>;
    createManyAutoDeduction(listCreateAutoDeductionDTOs: CreateAutoDeductionDTO[], companyId: number, workScheduleId: number, userEmail: string): Promise<AutoDeductionEntity[]>;
    updateAutoDeduction(updateAutoDeductionDTO: UpdateAutoDeductionDto, userEmail: string, companyId: number): Promise<AutoDeductionEntity>;
    updateManyAutoDeduction(listEntityUpdated: UpdateAutoDeductionDto[], userEmail: string, companyId: number, workScheduleId: number): Promise<AutoDeductionEntity[]>;
    deleteAutoDeduction(id: number, deleteAutoDeductionDTO: DeleteAutoDeductionDTO): Promise<AutoDeductionEntity | import("typeorm").DeleteResult>;
    mapIdsToUUIDs(ids: number[]): Promise<string[]>;
    mapIdoUUIDInDto(dto: UpdateAutoDeductionDto): Promise<UpdateAutoDeductionDto | {
        id: string;
        name: string;
        ttAutoDeductionId?: string;
        duration: number;
        threshold: number;
        unitTime: UnitTime;
    }>;
    mapIdsToUUIDsInDtos(dtos: UpdateAutoDeductionDto[]): Promise<(UpdateAutoDeductionDto | {
        id: string;
        name: string;
        ttAutoDeductionId?: string;
        duration: number;
        threshold: number;
        unitTime: UnitTime;
    })[]>;
    mapIdsToUUIDsInDtosV2(dtos: UpdateAutoDeductionDto[]): Promise<{
        [key: string]: string;
    }>;
    mapUUIdsToIdsInDtos(dtos: UpdateAutoDeductionDto[] | [{
        id: string;
    }]): Promise<{
        [key: string]: number;
    }>;
    mapTtIdsInDtos(dtos: UpdateAutoDeductionDto[], ttIds: string[]): Promise<{
        ttBreakRuleId: string;
        id: number;
        name: string;
        ttAutoDeductionId?: string;
        duration: number;
        threshold: number;
        unitTime: UnitTime;
    }[]>;
    updateTtAutoDeduction(autoDeductionId: number, ttId: string): Promise<import("typeorm").UpdateResult>;
    deleteLinkedTtByCompanyId(workScheduleId: number, companyId: number): Promise<void>;
}

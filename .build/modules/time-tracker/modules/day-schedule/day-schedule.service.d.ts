import { Repository } from 'typeorm';
import { DayScheduleEntity, TypeOrmBaseService } from '../../../../core/database';
import { CreateDayScheduleDTO, DeleteDayScheduleDTO, UpdateDayScheduleDTO } from './dtos';
import { DayType } from '../../common';
export declare class DayScheduleService extends TypeOrmBaseService<DayScheduleEntity> {
    private dayScheduleRepository;
    constructor(dayScheduleRepository: Repository<DayScheduleEntity>);
    createDaySchedule(createDayScheduleDto: CreateDayScheduleDTO, companyId: number, workScheduleId: number, userEmail: string): Promise<DayScheduleEntity>;
    createManyDaySchedule(listCreateDayScheduleDtos: CreateDayScheduleDTO[], companyId: number, userEmail: string, workScheduleId: number): Promise<DayScheduleEntity[]>;
    updateDayScheduleByWorkScheduleId(workScheduleId: number, updateDayScheduleDto: UpdateDayScheduleDTO): Promise<import("typeorm").UpdateResult>;
    updateManyDayScheduleByWorkScheduleId(workScheduleId: number, updateDayScheduleDto: UpdateDayScheduleDTO[]): Promise<import("typeorm").UpdateResult[]>;
    updateDaySchedule(updateDayScheduleDto: UpdateDayScheduleDTO, userEmail: string, companyId: number): Promise<DayScheduleEntity>;
    updateManyDaySchedule(listUpdated: UpdateDayScheduleDTO[], userEmail: string, companyId: number, workScheduleId: number): Promise<DayScheduleEntity[]>;
    getDayScheduleByWorkScheduleIdDay(workScheduleId: number, daySchedule: DayType): Promise<DayScheduleEntity | null>;
    getDayScheduleByWorkScheduleId(workScheduleId: number): Promise<DayScheduleEntity[]>;
    deleteDaySchedule(id: number, deleteDayScheduleDTO: DeleteDayScheduleDTO): Promise<import("typeorm").DeleteResult>;
    mapIdsToUUIDs(ids: number[]): Promise<string[]>;
    mapIdoUUIDInDto(dto: UpdateDayScheduleDTO): Promise<UpdateDayScheduleDTO | {
        id: string;
        day: DayType;
        ttDayScheduleId?: string;
        from: string;
        to: string;
        duration: number;
        unitTime: import("../../common").UnitTime;
    }>;
    mapIdsToUUIDsInDtos(dtos: UpdateDayScheduleDTO[]): Promise<(UpdateDayScheduleDTO | {
        id: string;
        day: DayType;
        ttDayScheduleId?: string;
        from: string;
        to: string;
        duration: number;
        unitTime: import("../../common").UnitTime;
    })[]>;
    mapIdsToUUIDsInDtosV2(dtos: UpdateDayScheduleDTO[]): Promise<{
        [key: string]: string;
    }>;
    mapUUIdsToIdsInDtos(dtos: UpdateDayScheduleDTO[] | [{
        id: string;
    }]): Promise<{
        [key: string]: number;
    }>;
    mapTtIdsInDtos(dtos: UpdateDayScheduleDTO[], ttIds: string[]): Promise<{
        ttBreakRuleId: string;
        id: number;
        day: DayType;
        ttDayScheduleId?: string;
        from: string;
        to: string;
        duration: number;
        unitTime: import("../../common").UnitTime;
    }[]>;
    updateTtIds(dayScheduleIds: number, ttIds: string): Promise<import("typeorm").UpdateResult>;
    deleteLinkedTtByCompanyId(workScheduleId: number, companyId: number): Promise<void>;
}

import { Repository } from 'typeorm';
import { LocationEntity, LocationWorkScheduleEntity, TypeOrmBaseService, WorkScheduleEntity } from '../../../../core/database';
import { CreateLocationWorkScheduleDto, LocationWorkScheduleDto, UpdateLocationWorkScheduleDto } from './dtos';
export declare class LocationWorkScheduleService extends TypeOrmBaseService<LocationWorkScheduleEntity> {
    protected readonly locationWorkScheduleRepository: Repository<LocationWorkScheduleEntity>;
    private readonly locationRepository;
    private readonly WorkScheduleRepository;
    constructor(locationWorkScheduleRepository: Repository<LocationWorkScheduleEntity>, locationRepository: Repository<LocationEntity>, WorkScheduleRepository: Repository<WorkScheduleEntity>);
    assignLocationForWorkSchedule(createLocationWorkScheduleDto: CreateLocationWorkScheduleDto, companyId: number, userEmail: string): Promise<LocationWorkScheduleDto>;
    assignMultipleLocationForWorkSchedules(createLocationWorkScheduleDtos: CreateLocationWorkScheduleDto[], companyId: number, userEmail: string): Promise<LocationWorkScheduleDto[]>;
    archiveLocationWorkSchedule(locationId: number, workScheduleId: number, companyId: number, userEmail: string): Promise<LocationWorkScheduleDto>;
    removeLocationWorkSchedule(locationId: number, workScheduleId: number, companyId: number): Promise<LocationWorkScheduleDto>;
    updateMultipleLocationWorkSchedule(updateLocationWorkScheduleDtos: UpdateLocationWorkScheduleDto[], companyId: number, userEmail: string): Promise<LocationWorkScheduleDto[]>;
    getLocationsOfWorkSchedule(workScheduleId: number, companyId: number): Promise<LocationWorkScheduleDto[]>;
    getLocationWorkScheduleById(workScheduleId: number, companyId: number, locationId: number): Promise<LocationWorkScheduleEntity | null>;
    mapIdsToUUIDs(ids: number[]): Promise<string[]>;
    mapIdsToUUIDsInDto(dto: UpdateLocationWorkScheduleDto): Promise<{
        locationId: string | number | undefined;
        workScheduleId: string | number | undefined;
        isDeleted?: boolean;
    }>;
    mapIdsToUUIDsInDtos(dtos: UpdateLocationWorkScheduleDto[]): Promise<Promise<{
        locationId: string | number | undefined;
        workScheduleId: string | number | undefined;
        isDeleted?: boolean;
    }>[]>;
}

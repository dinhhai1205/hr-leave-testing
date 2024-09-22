"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationWorkScheduleService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const typeorm_1 = require("typeorm");
const database_1 = require("../../../../core/database");
const typeorm_2 = require("@nestjs/typeorm");
let LocationWorkScheduleService = class LocationWorkScheduleService extends database_1.TypeOrmBaseService {
    constructor(locationWorkScheduleRepository, locationRepository, WorkScheduleRepository) {
        super(locationWorkScheduleRepository);
        this.locationWorkScheduleRepository = locationWorkScheduleRepository;
        this.locationRepository = locationRepository;
        this.WorkScheduleRepository = WorkScheduleRepository;
    }
    async assignLocationForWorkSchedule(createLocationWorkScheduleDto, companyId, userEmail) {
        const { locationId, workScheduleId } = createLocationWorkScheduleDto;
        const location = await this.locationRepository.findOne({
            where: {
                id: locationId,
                companyId,
            },
        });
        if (!location)
            throw new common_1.NotFoundException('Location not found');
        const WorkSchedule = await this.WorkScheduleRepository.findOne({
            where: {
                id: workScheduleId,
                companyId: companyId,
            },
        });
        if (!WorkSchedule)
            throw new common_1.NotFoundException('WorkSchedule not found');
        const locationWorkScheduleExisted = await this.getOne({
            where: {
                locationId,
                workScheduleId,
                companyId,
            },
        });
        if (locationWorkScheduleExisted)
            throw new common_1.ConflictException('Location existed in this WorkSchedule');
        const locationWorkSchedule = await this.create({
            locationId,
            workScheduleId,
        }, { userEmail, companyId });
        return locationWorkSchedule;
    }
    async assignMultipleLocationForWorkSchedules(createLocationWorkScheduleDtos, companyId, userEmail) {
        for (const createLocationWorkScheduleDto of createLocationWorkScheduleDtos) {
            const { locationId, workScheduleId } = createLocationWorkScheduleDto;
            const location = await this.locationRepository.findOne({
                where: {
                    id: locationId,
                    companyId,
                },
            });
            if (!location)
                throw new common_1.NotFoundException('Location not found');
            const WorkSchedule = await this.WorkScheduleRepository.findOne({
                where: {
                    id: workScheduleId,
                    companyId: companyId,
                },
            });
            if (!WorkSchedule)
                throw new common_1.NotFoundException('WorkSchedule not found');
            const locationWorkScheduleExisted = await this.getOne({
                where: {
                    locationId,
                    workScheduleId,
                    companyId,
                },
            });
            if (locationWorkScheduleExisted)
                throw new common_1.ConflictException('Location existed in this WorkSchedule');
        }
        return this.createMulti(createLocationWorkScheduleDtos, {
            userEmail,
            companyId,
        });
    }
    async archiveLocationWorkSchedule(locationId, workScheduleId, companyId, userEmail) {
        const locationWorkSchedule = await this.getOne({
            where: {
                workScheduleId,
                locationId,
                companyId,
            },
        });
        if (!locationWorkSchedule)
            throw new common_1.NotFoundException('Location WorkSchedule not found');
        return this.delete(locationWorkSchedule.id, {
            userEmail,
            companyId,
        });
    }
    async removeLocationWorkSchedule(locationId, workScheduleId, companyId) {
        const locationWorkSchedule = await this.getOne({
            where: {
                workScheduleId,
                locationId,
                companyId,
            },
        });
        if (!locationWorkSchedule)
            throw new common_1.NotFoundException('Location WorkSchedule not found');
        await this.locationWorkScheduleRepository.delete({
            workScheduleId,
            locationId,
            companyId,
        });
        return {
            ...locationWorkSchedule,
            isDeleted: true,
        };
    }
    async updateMultipleLocationWorkSchedule(updateLocationWorkScheduleDtos, companyId, userEmail) {
        const result = [];
        for (const updateLocationWorkScheduleDto of updateLocationWorkScheduleDtos) {
            const { locationId, workScheduleId, ...updatePayload } = updateLocationWorkScheduleDto;
            const findCriteria = { companyId };
            if (locationId)
                findCriteria.locationId = locationId;
            if (workScheduleId)
                findCriteria.workScheduleId = workScheduleId;
            const locationWorkSchedules = await this.locationWorkScheduleRepository.find({
                where: findCriteria,
            });
            if (locationWorkSchedules.length === 0)
                throw new common_1.NotFoundException('Location WorkSchedule not found');
            await this.locationWorkScheduleRepository.update(findCriteria, {
                updatedBy: userEmail,
                updatedOn: moment.utc().toDate(),
                ...updatePayload,
            });
            result.push(...locationWorkSchedules.map(locationWorkSchedule => ({
                ...locationWorkSchedule,
                ...updatePayload,
            })));
        }
        return result;
    }
    async getLocationsOfWorkSchedule(workScheduleId, companyId) {
        const userLocations = await this.locationWorkScheduleRepository.find({
            where: {
                workScheduleId,
                companyId,
            },
        });
        return userLocations;
    }
    async getLocationWorkScheduleById(workScheduleId, companyId, locationId) {
        const locationEntity = await this.locationWorkScheduleRepository.findOne({
            where: {
                locationId,
                workScheduleId,
                companyId,
            },
        });
        return locationEntity;
    }
    async mapIdsToUUIDs(ids) {
        const locations = await this.locationRepository.find({
            where: { id: (0, typeorm_1.In)(ids) },
        });
        return locations.map(location => location.ttLocationId);
    }
    async mapIdsToUUIDsInDto(dto) {
        const { locationId, workScheduleId } = dto;
        if (!locationId && !workScheduleId)
            throw new common_1.NotFoundException('Location WorkSchedule not found');
        const temp = {};
        if (locationId) {
            const location = await this.locationRepository.findOne({
                where: {
                    id: locationId,
                },
            });
            if (!location)
                throw new common_1.NotFoundException('Location not found');
            temp.locationId = location.ttLocationId;
        }
        if (workScheduleId) {
            const workSchedule = await this.WorkScheduleRepository.findOne({
                where: {
                    id: workScheduleId,
                },
            });
            if (!workSchedule)
                throw new common_1.NotFoundException('Work schedule not found');
            temp.workScheduleId = workSchedule.ttWorkScheduleId;
        }
        return {
            ...dto,
            locationId: temp.locationId ? temp.locationId : dto.locationId,
            workScheduleId: temp.workScheduleId
                ? temp.workScheduleId
                : dto.workScheduleId,
        };
    }
    async mapIdsToUUIDsInDtos(dtos) {
        const result = await dtos.map(dto => this.mapIdsToUUIDsInDto(dto));
        return result;
    }
};
exports.LocationWorkScheduleService = LocationWorkScheduleService;
exports.LocationWorkScheduleService = LocationWorkScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(database_1.LocationWorkScheduleEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(database_1.LocationEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(database_1.WorkScheduleEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], LocationWorkScheduleService);
//# sourceMappingURL=location-work-schedule.service.js.map
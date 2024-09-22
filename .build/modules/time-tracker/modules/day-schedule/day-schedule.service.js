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
exports.DayScheduleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const database_1 = require("../../../../core/database");
const typeorm_2 = require("@nestjs/typeorm");
const common_2 = require("../../common");
const moment = require("moment");
let DayScheduleService = class DayScheduleService extends database_1.TypeOrmBaseService {
    constructor(dayScheduleRepository) {
        super(dayScheduleRepository);
        this.dayScheduleRepository = dayScheduleRepository;
    }
    createDaySchedule(createDayScheduleDto, companyId, workScheduleId, userEmail) {
        return this.create({
            ...createDayScheduleDto,
            company: { id: companyId },
            companyId: companyId,
            workSchedule: { id: workScheduleId },
            duration: (0, common_2.convertTimeToMinuteUnitTime)(createDayScheduleDto.duration, createDayScheduleDto.unitTime),
        }, {
            userEmail: userEmail,
            companyId: companyId,
        });
    }
    async createManyDaySchedule(listCreateDayScheduleDtos, companyId, userEmail, workScheduleId) {
        const listEntity = listCreateDayScheduleDtos.map(item => {
            return this.createDaySchedule(item, companyId, workScheduleId, userEmail);
        });
        const response = await Promise.all(listEntity);
        return response;
    }
    async updateDayScheduleByWorkScheduleId(workScheduleId, updateDayScheduleDto) {
        const { day, from, to, duration, unitTime } = updateDayScheduleDto;
        const updatedDuration = (0, common_2.convertTimeToMinuteUnitTime)(duration, unitTime);
        return this.dayScheduleRepository.update({ workSchedule: { id: workScheduleId } }, {
            day,
            from,
            to,
            duration: updatedDuration,
        });
    }
    async updateManyDayScheduleByWorkScheduleId(workScheduleId, updateDayScheduleDto) {
        const updatedEnties = updateDayScheduleDto.map(item => {
            return this.updateDayScheduleByWorkScheduleId(workScheduleId, item);
        });
        const response = await Promise.all(updatedEnties);
        return response;
    }
    updateDaySchedule(updateDayScheduleDto, userEmail, companyId) {
        const { day, from, to, duration, unitTime } = updateDayScheduleDto;
        return this.update(updateDayScheduleDto.id, {
            day,
            from,
            to,
            duration: (0, common_2.convertTimeToMinuteUnitTime)(duration, unitTime),
        }, { userEmail: userEmail, companyId: companyId });
    }
    async updateManyDaySchedule(listUpdated, userEmail, companyId, workScheduleId) {
        const updatedEnties = listUpdated.map(async (item) => {
            if (item?.id) {
                const updatedDaySchedule = await this.dayScheduleRepository.find({
                    select: {
                        id: true,
                    },
                    where: {
                        workScheduleId,
                    },
                });
                const findItem = updatedDaySchedule.find(daySchedule => daySchedule.id === item.id);
                if (!findItem) {
                    throw new common_1.BadRequestException('DaySchedule does not belong to WorkSchedule');
                }
                return this.updateDaySchedule(item, userEmail, companyId);
            }
            return this.createDaySchedule(item, companyId, workScheduleId, userEmail);
        });
        const response = await Promise.all(updatedEnties);
        return response;
    }
    getDayScheduleByWorkScheduleIdDay(workScheduleId, daySchedule) {
        return this.dayScheduleRepository.findOne({
            select: {
                day: true,
                from: true,
                to: true,
                duration: true,
                unitTime: true,
                workSchedule: {
                    id: true,
                },
                companyId: true,
            },
            where: {
                workSchedule: {
                    id: workScheduleId,
                },
                day: daySchedule,
            },
        });
    }
    getDayScheduleByWorkScheduleId(workScheduleId) {
        return this.dayScheduleRepository.find({
            select: {
                id: true,
                day: true,
                from: true,
                to: true,
                duration: true,
                unitTime: true,
                workSchedule: {
                    id: true,
                },
                companyId: true,
            },
            where: {
                workSchedule: {
                    id: workScheduleId,
                },
            },
        });
    }
    deleteDaySchedule(id, deleteDayScheduleDTO) {
        if (deleteDayScheduleDTO.option === common_2.OptionDelete.Permanent) {
            return this.dayScheduleRepository.delete(id);
        }
        return this.dayScheduleRepository.update(id, {
            updatedBy: deleteDayScheduleDTO.userEmail,
            isDeleted: true,
            updatedOn: moment.utc().toDate(),
        });
    }
    async mapIdsToUUIDs(ids) {
        const daySchedules = await this.dayScheduleRepository.find({
            where: { id: (0, typeorm_1.In)(ids) },
        });
        return daySchedules.map(daySchedule => daySchedule.ttDayScheduleId);
    }
    async mapIdoUUIDInDto(dto) {
        if (!dto.id)
            return dto;
        const temp = await this.dayScheduleRepository.find({
            where: { id: dto.id },
        });
        return {
            ...dto,
            id: temp[0].ttDayScheduleId,
        };
    }
    async mapIdsToUUIDsInDtos(dtos) {
        return Promise.all(dtos.map(async (dto) => this.mapIdoUUIDInDto(dto)));
    }
    async mapIdsToUUIDsInDtosV2(dtos) {
        const ids = dtos.map(dt => dt.id);
        const temp = await this.dayScheduleRepository.find({
            where: { id: (0, typeorm_1.In)(ids) },
        });
        const mappedObject = temp.reduce((acc, obj) => {
            acc[String(obj.id)] = obj.ttDayScheduleId;
            return acc;
        }, {});
        return mappedObject;
    }
    async mapUUIdsToIdsInDtos(dtos) {
        const ids = dtos.map(dt => dt.id);
        const temp = await this.dayScheduleRepository.find({
            where: { ttDayScheduleId: (0, typeorm_1.In)(ids) },
        });
        const mappedObject = temp.reduce((acc, obj) => {
            acc[obj.ttDayScheduleId] = obj.id;
            return acc;
        }, {});
        return mappedObject;
    }
    async mapTtIdsInDtos(dtos, ttIds) {
        return dtos.map((dto, i) => {
            return {
                ...dto,
                ttBreakRuleId: ttIds[i],
            };
        });
    }
    async updateTtIds(dayScheduleIds, ttIds) {
        return this.dayScheduleRepository.update(dayScheduleIds, {
            ttDayScheduleId: ttIds,
        });
    }
    async deleteLinkedTtByCompanyId(workScheduleId, companyId) {
        const daySchedules = await this.getDayScheduleByWorkScheduleId(workScheduleId);
        await Promise.all([
            daySchedules.map(item => {
                return this.dayScheduleRepository.update(item.id, {
                    ttDayScheduleId: '',
                    updatedOn: moment.utc().toDate(),
                });
            }),
        ]);
    }
};
exports.DayScheduleService = DayScheduleService;
exports.DayScheduleService = DayScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(database_1.DayScheduleEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DayScheduleService);
//# sourceMappingURL=day-schedule.service.js.map
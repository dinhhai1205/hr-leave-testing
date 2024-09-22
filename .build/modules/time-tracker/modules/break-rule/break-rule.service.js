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
exports.BreakRuleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../../../../core/database");
const typeorm_2 = require("typeorm");
const common_2 = require("../../common");
const moment = require("moment");
let BreakRuleService = class BreakRuleService extends database_1.TypeOrmBaseService {
    constructor(breakRuleRepository) {
        super(breakRuleRepository);
        this.breakRuleRepository = breakRuleRepository;
    }
    async getBreakByWorkScheduleId(workScheduleId) {
        return this.breakRuleRepository.find({
            select: {
                id: true,
                name: true,
                allowToBeTakenFromTo: true,
                duration: true,
                from: true,
                to: true,
                unitTime: true,
            },
            where: {
                workSchedule: {
                    id: workScheduleId,
                },
            },
        });
    }
    async getBreaksByWorkScheduleIdWithPagination(workScheduleId, companyId, paginationQueryDto) {
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const breakAlias = database_1.ETableName.BREAK;
        const queryBuilder = this.breakRuleRepository
            .createQueryBuilder(breakAlias)
            .leftJoinAndSelect(`${breakAlias}.workSchedule`, workScheduleAlias, `${breakAlias}.isDeleted = :isDeleted AND ${breakAlias}.work_schedule_id = ${workScheduleAlias}.id`, { isDeleted: false })
            .where(`${workScheduleAlias}.id = :workScheduleId`, { workScheduleId })
            .andWhere(`${breakAlias}.company_id = :companyId`, { companyId });
        const result = await this.getEntitiesByQuery({
            queryBuilder,
            paginationQueryDto,
        });
        if (result.data) {
            result.data = result.data.map(item => {
                item.from = moment
                    .utc(item.from, 'HH:mm:ss')
                    .utcOffset(item.workSchedule.utcOffset)
                    .format('HH:mm:ssZ');
                item.to = moment
                    .utc(item.to, 'HH:mm:ss')
                    .utcOffset(item.workSchedule.utcOffset * 60)
                    .format('HH:mm:ssZ');
                return item;
            });
        }
        return result;
    }
    async createBreakRule(createBreakRuleDTO, companyId, workScheduleId, userEmail) {
        return this.create({
            ...createBreakRuleDTO,
            duration: (0, common_2.convertTimeToMinuteUnitTime)(createBreakRuleDTO.duration, createBreakRuleDTO.unitTime),
            company: { id: companyId },
            workSchedule: { id: workScheduleId },
            companyId: companyId,
        }, {
            userEmail: userEmail,
        });
    }
    async createManyBreakRules(listCreateBreakRuleDTOs, companyId, workScheduleId, userEmail) {
        const listEntity = listCreateBreakRuleDTOs.map(item => {
            return this.createBreakRule(item, companyId, workScheduleId, userEmail);
        });
        const response = await Promise.all(listEntity);
        return response;
    }
    async updateBreakRule(updateBreakRuleDTO, userEmail, companyId) {
        const { name, allowToBeTakenFromTo, duration, from, to, unitTime } = updateBreakRuleDTO;
        return this.update(updateBreakRuleDTO.id, {
            name,
            allowToBeTakenFromTo,
            duration: (0, common_2.convertTimeToMinuteUnitTime)(duration, unitTime),
            from,
            to,
        }, {
            userEmail: userEmail,
            companyId: companyId,
        });
    }
    async updateManyBreakRule(listBreakRule, userEmail, companyId, workScheduleId) {
        const updatedEntities = listBreakRule.map(async (item) => {
            if (item?.id) {
                const updatedBreakRule = await this.breakRuleRepository.find({
                    select: {
                        id: true,
                    },
                    where: {
                        workSchedule: {
                            id: workScheduleId,
                        },
                    },
                });
                const findItem = updatedBreakRule.find(breakRule => breakRule.id === item.id);
                if (!findItem) {
                    throw new common_1.BadRequestException('BreakRule does not belong to WorkSchedule');
                }
                return this.updateBreakRule(item, userEmail, companyId);
            }
            return this.createBreakRule(item, companyId, workScheduleId, userEmail);
        });
        const response = await Promise.all(updatedEntities);
        return response;
    }
    async updateBreakRuleByWorkScheduleId(workScheduleId, updateBreakRuleDTO, userEmail) {
        const { name, allowToBeTakenFromTo, duration, from, to, unitTime } = updateBreakRuleDTO;
        const result = await this.breakRuleRepository.update({ workSchedule: { id: workScheduleId } }, {
            name,
            allowToBeTakenFromTo,
            duration: (0, common_2.convertTimeToMinuteUnitTime)(duration, unitTime),
            from,
            to,
            updatedBy: userEmail,
        });
        return result;
    }
    async updateManyBreakRuleByWorkScheduleId(workScheduleId, updateBreakRuleDTO, userEmail) {
        const updatedEntities = updateBreakRuleDTO.map(item => {
            return this.updateBreakRuleByWorkScheduleId(workScheduleId, item, userEmail);
        });
        const response = await Promise.all(updatedEntities);
        return response;
    }
    async deleteBreakRule(breakRuleId, deleteBreakRuleDTO) {
        if (deleteBreakRuleDTO.option === common_2.OptionDelete.Permanent) {
            return this.breakRuleRepository.delete(breakRuleId);
        }
        return this.delete(breakRuleId, {
            userEmail: deleteBreakRuleDTO.userEmail,
        });
    }
    async mapIdsToUUIDs(ids) {
        const breakRules = await this.breakRuleRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
        });
        return breakRules.map(breakRule => breakRule.ttBreakRuleId);
    }
    async mapIdoUUIDInDto(dto) {
        if (!dto.id)
            return dto;
        const breakRule = await this.breakRuleRepository.find({
            where: { id: dto.id },
        });
        return {
            ...dto,
            id: breakRule[0].ttBreakRuleId,
        };
    }
    async mapIdsToUUIDsInDtosV2(dtos) {
        const ids = dtos.map(dt => dt.id);
        const breakRules = await this.breakRuleRepository.find({
            where: { id: (0, typeorm_2.In)(ids) },
        });
        const mappedObject = breakRules.reduce((acc, obj) => {
            acc[String(obj.id)] = obj.ttBreakRuleId;
            return acc;
        }, {});
        return mappedObject;
    }
    async mapUUIdsToIdsInDtos(dtos) {
        const ids = dtos.map(dt => dt.id);
        const breakRules = await this.breakRuleRepository.find({
            where: { ttBreakRuleId: (0, typeorm_2.In)(ids) },
        });
        const mappedObject = breakRules.reduce((acc, obj) => {
            acc[obj.ttBreakRuleId] = obj.id;
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
    async updateTtRuleId(breakId, ttRuleId) {
        return this.breakRuleRepository.update(breakId, {
            ttBreakRuleId: ttRuleId,
        });
    }
    async deleteLinkedTtByCompanyId(workScheduleId, companyId) {
        const breakRules = await this.getBreakByWorkScheduleId(workScheduleId);
        await Promise.all([
            breakRules.map(item => {
                return this.breakRuleRepository.update(item.id, {
                    ttBreakRuleId: '',
                    updatedOn: moment.utc().toDate(),
                });
            }),
        ]);
    }
};
exports.BreakRuleService = BreakRuleService;
exports.BreakRuleService = BreakRuleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.BreakRuleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BreakRuleService);
//# sourceMappingURL=break-rule.service.js.map
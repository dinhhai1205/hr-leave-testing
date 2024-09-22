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
exports.AutoDeductionService = void 0;
const common_1 = require("@nestjs/common");
const database_1 = require("../../../../core/database");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const common_2 = require("../../common");
const moment = require("moment");
let AutoDeductionService = class AutoDeductionService extends database_1.TypeOrmBaseService {
    constructor(autoDeductionRepository) {
        super(autoDeductionRepository);
        this.autoDeductionRepository = autoDeductionRepository;
    }
    async getAutoDeductionByWorkScheduleId(workScheduleId) {
        const listAutoDeduction = await this.autoDeductionRepository.find({
            select: common_2.COMMON_SELECT,
            where: {
                workSchedule: {
                    id: workScheduleId,
                },
            },
        });
        return {
            workScheduleId: workScheduleId,
            deductionList: listAutoDeduction,
        };
    }
    async createAutoDeduction(createAutoDeductionDTO, workScheduleId, companyId, userEmail) {
        createAutoDeductionDTO.duration = (0, common_2.convertTimeToMinuteUnitTime)(createAutoDeductionDTO.duration, createAutoDeductionDTO.unitTime);
        createAutoDeductionDTO.unitTime = common_2.UnitTime.MINUTE;
        const result = await this.create({
            ...createAutoDeductionDTO,
            workSchedule: { id: workScheduleId },
            company: { id: companyId },
            companyId: companyId,
        }, {
            userEmail: userEmail,
        });
        return result;
    }
    async createManyAutoDeduction(listCreateAutoDeductionDTOs, companyId, workScheduleId, userEmail) {
        const listEntity = listCreateAutoDeductionDTOs.map(item => {
            return this.createAutoDeduction(item, workScheduleId, companyId, userEmail);
        });
        const response = await Promise.all(listEntity);
        return response;
    }
    async updateAutoDeduction(updateAutoDeductionDTO, userEmail, companyId) {
        const response = await this.update(updateAutoDeductionDTO.id, {
            name: updateAutoDeductionDTO?.name,
            duration: updateAutoDeductionDTO?.duration,
            threshold: updateAutoDeductionDTO?.threshold,
        }, { userEmail: userEmail, companyId: companyId });
        return response;
    }
    async updateManyAutoDeduction(listEntityUpdated, userEmail, companyId, workScheduleId) {
        const listUpdated = listEntityUpdated.map(async (item) => {
            if (item?.id) {
                const updatedAutoDeduction = await this.autoDeductionRepository.find({
                    select: {
                        id: true,
                    },
                    where: {
                        workSchedule: {
                            id: workScheduleId,
                        },
                    },
                });
                const findItem = updatedAutoDeduction.find(autoDeduction => autoDeduction.id === item?.id);
                if (!findItem) {
                    throw new common_1.BadRequestException('AutoDeduction does not belong to workSchedule');
                }
                return this.updateAutoDeduction(item, userEmail, companyId);
            }
            return this.createAutoDeduction(item, workScheduleId, companyId, userEmail);
        });
        const response = await Promise.all(listUpdated);
        return response;
    }
    async deleteAutoDeduction(id, deleteAutoDeductionDTO) {
        if (deleteAutoDeductionDTO.option === common_2.OptionDelete.Permanent) {
            const result = await this.autoDeductionRepository.delete(id);
            return result;
        }
        const response = await this.delete(id, {
            userEmail: deleteAutoDeductionDTO.userEmail,
        });
        return response;
    }
    async mapIdsToUUIDs(ids) {
        const autoDeductions = await this.autoDeductionRepository.find({
            where: { id: (0, typeorm_1.In)(ids) },
        });
        return autoDeductions.map(autoDeduction => autoDeduction.ttAutoDeductionId);
    }
    async mapIdoUUIDInDto(dto) {
        if (!dto.id)
            return dto;
        const temp = await this.autoDeductionRepository.find({
            where: { id: dto.id },
        });
        return {
            ...dto,
            id: temp[0].ttAutoDeductionId,
        };
    }
    async mapIdsToUUIDsInDtos(dtos) {
        return Promise.all(dtos.map(async (dto) => this.mapIdoUUIDInDto(dto)));
    }
    async mapIdsToUUIDsInDtosV2(dtos) {
        const ids = dtos.map(dt => dt.id);
        const temp = await this.autoDeductionRepository.find({
            where: { id: (0, typeorm_1.In)(ids) },
        });
        const mappedObject = temp.reduce((acc, obj) => {
            acc[String(obj.id)] = obj.ttAutoDeductionId;
            return acc;
        }, {});
        return mappedObject;
    }
    async mapUUIdsToIdsInDtos(dtos) {
        const ids = dtos.map(dt => dt.id);
        const temp = await this.autoDeductionRepository.find({
            where: { ttAutoDeductionId: (0, typeorm_1.In)(ids) },
        });
        const mappedObject = temp.reduce((acc, obj) => {
            acc[obj.ttAutoDeductionId] = obj.id;
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
    async updateTtAutoDeduction(autoDeductionId, ttId) {
        return this.autoDeductionRepository.update(autoDeductionId, {
            ttAutoDeductionId: ttId,
        });
    }
    async deleteLinkedTtByCompanyId(workScheduleId, companyId) {
        const autoDeducts = await this.getAutoDeductionByWorkScheduleId(workScheduleId);
        await Promise.all([
            autoDeducts.deductionList.map(item => {
                return this.autoDeductionRepository.update(item.id, {
                    ttAutoDeductionId: '',
                    updatedOn: moment.utc().toDate(),
                });
            }),
        ]);
    }
};
exports.AutoDeductionService = AutoDeductionService;
exports.AutoDeductionService = AutoDeductionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(database_1.AutoDeductionEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AutoDeductionService);
//# sourceMappingURL=auto-deduction.service.js.map
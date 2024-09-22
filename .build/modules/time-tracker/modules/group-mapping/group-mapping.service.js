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
exports.GroupMappingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const group_mapping_entity_1 = require("../../../../core/database/entities/group-mapping.entity");
const typeorm_base_service_1 = require("../../../../core/database/services/typeorm-base.service");
const typeorm_2 = require("typeorm");
const moment = require("moment");
let GroupMappingService = class GroupMappingService extends typeorm_base_service_1.TypeOrmBaseService {
    constructor(groupMappingRepository) {
        super(groupMappingRepository);
        this.groupMappingRepository = groupMappingRepository;
    }
    async createManyGroupMappings(groupMappings) {
        const entities = groupMappings.map(groupMapping => {
            const entity = this.groupMappingRepository.create();
            entity.organizationStructureId = groupMapping.organizationStructureId;
            entity.timeTrackerGroupId = groupMapping.timeTrackerGroupId;
            entity.companyId = groupMapping.companyId;
            entity.createdBy = 'system_generated@hrforte.com';
            return entity;
        });
        return this.groupMappingRepository.save(entities);
    }
    async getGroupMapping(organizationStructureId, companyId) {
        const mappingGroup = await this.groupMappingRepository.findOne({
            where: {
                organizationStructureId,
                isDeleted: false,
                companyId,
            },
        });
        return mappingGroup ? mappingGroup.timeTrackerGroupId : null;
    }
    async getGroupMappingByTTGroupIds({ ttGroupIds, companyId, }) {
        if (ttGroupIds.length === 0) {
            return [];
        }
        const groupMapping = await this.groupMappingRepository.find({
            where: {
                timeTrackerGroupId: (0, typeorm_2.In)(ttGroupIds),
                companyId,
                isDeleted: false,
            },
        });
        return groupMapping;
    }
    async getGroupMappings(orgIds, companyId) {
        const mappingGroups = await this.groupMappingRepository.find({
            where: {
                organizationStructureId: (0, typeorm_2.In)(orgIds),
                isDeleted: false,
                companyId,
            },
        });
        return mappingGroups;
    }
    async deleteManyGroupMapping({ companyId, timeTrackerIds, }) {
        if (timeTrackerIds.length === 0) {
            return [];
        }
        const employeeMappings = await this.groupMappingRepository.update({
            companyId,
            timeTrackerGroupId: (0, typeorm_2.In)(timeTrackerIds),
            isDeleted: false,
        }, { isDeleted: true, createdOn: moment.utc().toDate() });
        return employeeMappings;
    }
    async getOrgByGroupId({ ttGroupId, companyId, }) {
        return this.groupMappingRepository.findOne({
            where: {
                timeTrackerGroupId: ttGroupId,
                companyId,
                isDeleted: false,
            },
            select: {
                organizationStructureId: true,
                companyId: true,
                timeTrackerGroupId: true,
            },
        });
    }
    async getTimeTrackerGroupId(companyId, organizationStructureId) {
        return this.groupMappingRepository.findOne({
            where: {
                companyId,
                organizationStructureId,
                isDeleted: false,
            },
            select: {
                timeTrackerGroupId: true,
            },
        });
    }
    async deleteLinkedTtData(companyId) {
        const groupMappings = await this.groupMappingRepository.find({
            where: {
                companyId: companyId,
                isDeleted: false,
            },
        });
        await Promise.all([
            groupMappings.map(group => {
                return this.groupMappingRepository.update(group.id, {
                    isDeleted: true,
                    updatedOn: moment.utc().toDate(),
                });
            }),
        ]);
    }
};
exports.GroupMappingService = GroupMappingService;
exports.GroupMappingService = GroupMappingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_mapping_entity_1.GroupMappingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GroupMappingService);
//# sourceMappingURL=group-mapping.service.js.map
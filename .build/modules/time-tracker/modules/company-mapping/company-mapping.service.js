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
exports.CompanyMappingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const company_mapping_entity_1 = require("../../../../core/database/entities/company-mapping.entity");
const services_1 = require("../../../../core/database/services");
const moment = require("moment");
let CompanyMappingService = class CompanyMappingService extends services_1.TypeOrmBaseService {
    constructor(companyMappingRepository) {
        super(companyMappingRepository);
        this.companyMappingRepository = companyMappingRepository;
    }
    async getTimeTrackerCompanyByHrfCompanyId(hrfCompanyId) {
        return this.companyMappingRepository.findOne({
            where: { companyId: hrfCompanyId, isDeleted: false },
        });
    }
    async createManyCompanyMappings(companyMappings) {
        const entities = companyMappings.map(companyMapping => {
            const entity = this.companyMappingRepository.create();
            entity.companyId = companyMapping.companyId;
            entity.timeTrackerCompanyId = companyMapping.timeTrackerCompanyId;
            entity.apiKey = companyMapping.apiKey;
            entity.createdBy = 'system_generated@hrforte.com';
            return entity;
        });
        return this.companyMappingRepository.save(entities);
    }
    async findCompanyMapping(companyId) {
        return this.companyMappingRepository.findOne({
            where: { companyId, isDeleted: false },
        });
    }
    async deleteLinkedTtData(companyId) {
        const companyMapping = await this.companyMappingRepository.find({
            where: { companyId, isDeleted: false },
        });
        await Promise.all([
            companyMapping.map(item => {
                return this.companyMappingRepository.update(item.id, {
                    isDeleted: true,
                    updatedOn: moment.utc().toDate(),
                });
            }),
        ]);
    }
};
exports.CompanyMappingService = CompanyMappingService;
exports.CompanyMappingService = CompanyMappingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_mapping_entity_1.CompanyMappingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyMappingService);
//# sourceMappingURL=company-mapping.service.js.map
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
exports.CountryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const country_entity_1 = require("../../../../core/database/entities/country.entity");
const services_1 = require("../../../../core/database/services");
const company_parameter_service_1 = require("../company-parameter/company-parameter.service");
let CountryService = class CountryService extends services_1.LegacyBaseService {
    constructor(countryRepo, companyParameterService) {
        super(countryRepo);
        this.countryRepo = countryRepo;
        this.companyParameterService = companyParameterService;
    }
    async getCountry(id) {
        const countryAlias = this.entityName;
        return this.countryRepo
            .createQueryBuilder(countryAlias)
            .select(`${countryAlias}.id`, 'id')
            .addSelect(`${countryAlias}.code`, 'countryCode')
            .addSelect(`${countryAlias}.name`, 'countryName')
            .addSelect(`${countryAlias}.currencyCode`, 'currencyCode')
            .where(`${countryAlias}.isDeleted = :isDeleted`, { isDeleted: false })
            .andWhere(`${countryAlias}.id = :id`, { id })
            .getRawOne();
    }
    async getAllCountries(clientIds, codes = []) {
        const baseCountryIds = (await this.companyParameterService.getAllBaseCountryIds(clientIds)).map(companyParameter => +companyParameter.baseCountryId);
        if (!baseCountryIds.length)
            return [];
        const countryAlias = this.entityName;
        const queryBuilder = this.countryRepo
            .createQueryBuilder(countryAlias)
            .select(`${countryAlias}.code`, `countryCode`)
            .addSelect(`${countryAlias}.name`, `countryName`)
            .addSelect(`${countryAlias}.currencyCode`, `currencyCode`)
            .where(`${countryAlias}.isDeleted = :isDeleted`, this.essentialConditions)
            .andWhere(`${countryAlias}.id IN (:...baseCountryIds)`, {
            baseCountryIds,
        });
        if (codes.length) {
            queryBuilder.andWhere(`${countryAlias}.code IN (:...codes)`, { codes });
        }
        return queryBuilder.getRawMany();
    }
    async getTotalCountries(clientIds) {
        const baseCountryIds = (await this.companyParameterService.getAllBaseCountryIds(clientIds)).map(companyParameter => +companyParameter.baseCountryId);
        if (!baseCountryIds.length)
            return 0;
        return this.countryRepo.countBy({
            id: (0, typeorm_2.In)(baseCountryIds),
            ...this.essentialConditions,
        });
    }
};
exports.CountryService = CountryService;
exports.CountryService = CountryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(country_entity_1.CountryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        company_parameter_service_1.CompanyParameterService])
], CountryService);
//# sourceMappingURL=country.service.js.map
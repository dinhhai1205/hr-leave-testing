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
exports.CompanyParameterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const company_parameter_entity_1 = require("../../../../core/database/entities/company-parameter.entity");
const services_1 = require("../../../../core/database/services");
let CompanyParameterService = class CompanyParameterService extends services_1.LegacyBaseService {
    constructor(companyParameterRepo) {
        super(companyParameterRepo);
        this.companyParameterRepo = companyParameterRepo;
    }
    async isEncryptedFile(companyId) {
        const result = await this.companyParameterRepo.findOne({
            where: { companyId, isDeleted: false },
            select: { clientEncryptFile: true },
        });
        if (!result) {
            throw new common_1.NotFoundException(constants_1.ERR_MSG.NOT_FOUND('company', 'companyId'));
        }
        return result?.clientEncryptFile ? true : false;
    }
    async getAllBaseCountryIds(clientIds) {
        if (!clientIds.length)
            return [];
        const companyParameterAlias = company_parameter_entity_1.CompanyParameterEntity.name;
        const queryBuilder = this.companyParameterRepo
            .createQueryBuilder(companyParameterAlias)
            .select(`${companyParameterAlias}.baseCountryId`, 'baseCountryId')
            .where(`${companyParameterAlias}.isDeleted = :isDeleted`, this.essentialConditions)
            .andWhere(`${companyParameterAlias}.companyId IN (:...clientIds)`, {
            clientIds,
        })
            .groupBy(`${companyParameterAlias}.baseCountryId`);
        return queryBuilder.getRawMany();
    }
    async getLocalCurrencyOfCompany(companyId) {
        const companyParameterAlias = company_parameter_entity_1.CompanyParameterEntity.name;
        const countryAlias = 'country';
        const queryBuilder = this.companyParameterRepo
            .createQueryBuilder(companyParameterAlias)
            .select(`${countryAlias}.currencyCode`, 'currencyCode')
            .leftJoin(`${companyParameterAlias}.country`, countryAlias, `${countryAlias}.isDeleted = :isDeleted`, { isDeleted: false })
            .where(`${companyParameterAlias}.isDeleted = :isDeleted`, this.essentialConditions)
            .andWhere(`${companyParameterAlias}.companyId = :companyId`, {
            companyId,
        });
        const companyParameter = await queryBuilder.getRawOne();
        return companyParameter?.currencyCode ? companyParameter.currencyCode : '';
    }
};
exports.CompanyParameterService = CompanyParameterService;
exports.CompanyParameterService = CompanyParameterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_parameter_entity_1.CompanyParameterEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyParameterService);
//# sourceMappingURL=company-parameter.service.js.map
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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../../../core/database/entities");
const enums_1 = require("../../../../core/database/enums");
const services_1 = require("../../../../core/database/services");
let CompanyService = class CompanyService extends services_1.LegacyBaseService {
    constructor(companyRepository) {
        super(companyRepository);
        this.companyRepository = companyRepository;
    }
    async getCompany(companyId) {
        const companyAlias = this.entityName;
        const queryBuilder = this.companyRepository
            .createQueryBuilder(companyAlias)
            .select(`${companyAlias}.id`)
            .addSelect(`${companyAlias}.name`)
            .addSelect(`${companyAlias}.code`, `companyCode`)
            .where(`${companyAlias}.isDeleted = :isDeleted`, this.essentialConditions)
            .andWhere(`${companyAlias}.active = :active`, { active: true })
            .andWhere(`${companyAlias}.id = :companyId`, { companyId });
        return queryBuilder.getOne();
    }
    async getAllClientIds(code) {
        return (await this.companyRepository.find({
            where: {
                active: true,
                isDeleted: false,
                code: (0, typeorm_2.And)((0, typeorm_2.Like)(`${code}.%`), (0, typeorm_2.Not)((0, typeorm_2.Like)(`${code}.%.%`))),
            },
            select: { id: true },
        })).map(client => client.id);
    }
    async getAllClients(code, countryCodes = []) {
        const findQuery = {
            active: true,
            isDeleted: false,
            code: (0, typeorm_2.And)((0, typeorm_2.Like)(`${code}.%`), (0, typeorm_2.Not)((0, typeorm_2.Like)(`${code}.%.%`))),
        };
        if (countryCodes.length) {
            findQuery['companyParameter'] = {
                country: { code: (0, typeorm_2.In)(countryCodes) },
            };
        }
        return this.companyRepository.find({
            where: findQuery,
            relations: ['companyParameter', 'companyParameter.country'],
            select: {
                id: true,
                companyParameter: {
                    id: true,
                    country: {
                        code: true,
                        name: true,
                        id: true,
                        currencyCode: true,
                        currencyName: true,
                    },
                },
            },
        });
    }
    async getAllClientWithPayroll(code) {
        const alias = this.entityName;
        const prAlias = entities_1.PrtrxHdrEntity.name;
        return this.companyRepository
            .createQueryBuilder(alias)
            .select(`${alias}.id`, 'companyId')
            .addSelect(`${prAlias}.id`, 'payrollHeaderId')
            .innerJoin(enums_1.ETableName.PRTRX_HDR, prAlias, `${prAlias}.companyId = "${alias}"."id"
        AND ${prAlias}.isDeleted = :isDeleted`, { isDeleted: false })
            .where(`${alias}.isDeleted = :isDeleted
        AND ${alias}.active = :active
        AND ${alias}.code LIKE :codeLike
        AND ${alias}.code NOT LIKE :codeNotLike`, {
            isDeleted: false,
            active: true,
            codeLike: `${code}.%`,
            codeNotLike: `${code}.%.%`,
        })
            .getRawMany();
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.CompanyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyService);
//# sourceMappingURL=company.service.js.map
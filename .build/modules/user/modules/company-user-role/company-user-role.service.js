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
exports.CompanyUserRoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const company_user_role_entity_1 = require("../../../../core/database/entities/company-user-role.entity");
const role_header_entity_1 = require("../../../../core/database/entities/role-header.entity");
const enums_2 = require("../../../../core/database/enums");
const services_1 = require("../../../../core/database/services");
const where_condition_builder_util_1 = require("../../../../core/database/utils/where-condition-builder.util");
let CompanyUserRoleService = class CompanyUserRoleService extends services_1.LegacyBaseService {
    constructor(companyUserRoleRepository) {
        super(companyUserRoleRepository);
        this.companyUserRoleRepository = companyUserRoleRepository;
    }
    getAdminOrganizationPaths(orgElementListJson) {
        const orgElementList = (0, utils_1.safeJsonParse)({
            text: orgElementListJson,
            defaultValueReturn: [],
        });
        let memoPaths = {};
        for (const { OrgPath } of orgElementList) {
            if (OrgPath === '' || OrgPath === '/') {
                memoPaths = {};
                break;
            }
            const prefix = OrgPath.split('/')[1];
            if (!prefix)
                continue;
            if (!memoPaths[prefix]) {
                memoPaths[prefix] = OrgPath;
                continue;
            }
            if (OrgPath.split('/').length < memoPaths[prefix].split('/').length) {
                memoPaths[prefix] = OrgPath;
            }
        }
        const organizationPaths = Object.keys(memoPaths).map(prefix => memoPaths[prefix]);
        return organizationPaths;
    }
    async getCompanyUserRole(args) {
        const currentDate = moment.utc();
        const { companyId, email } = args;
        const companyUserRoleAlias = company_user_role_entity_1.CompanyUserRoleEntity.name;
        const roleHeaderAlias = role_header_entity_1.RoleHeaderEntity.name;
        const companyUserRoleWhereConditionBuilder = new where_condition_builder_util_1.WhereConditionBuilder(companyUserRoleAlias);
        const roleHeaderWhereConditionBuilder = new where_condition_builder_util_1.WhereConditionBuilder(roleHeaderAlias);
        const queryBuilder = this.companyUserRoleRepository.createQueryBuilder(companyUserRoleAlias);
        const { condition, parameters } = roleHeaderWhereConditionBuilder
            .andIsDeletedFalse()
            .andWhereRaw(`${roleHeaderAlias}.id = ${companyUserRoleAlias}.roleHeaderId `)
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .buildSql();
        queryBuilder.innerJoin(enums_2.ETableName.ROLE_HEADER, roleHeaderAlias, condition, parameters);
        const { condition: whereCondition, parameters: whereParameter } = companyUserRoleWhereConditionBuilder
            .andIsDeletedFalse()
            .andActiveTrue()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhere({ field: 'email', operator: '=', value: email })
            .andWhere({
            field: 'effDateFrom',
            operator: '<=',
            value: currentDate.format(constants_1.DATE_STRING),
            variable: 'currentDate',
        })
            .andWhere({
            field: 'effDateTo',
            operator: '>=',
            value: currentDate.format(constants_1.DATE_STRING),
            variable: 'currentDate',
        })
            .buildSql();
        queryBuilder.andWhere(whereCondition, whereParameter);
        queryBuilder
            .select(`${companyUserRoleAlias}.id`, 'companyUserRoleId')
            .addSelect(`${companyUserRoleAlias}.orgElementListJson`, 'orgElementListJson')
            .addSelect(`${roleHeaderAlias}.id`, 'roleHeaderId')
            .addSelect(`${roleHeaderAlias}.leave`, 'leave')
            .addSelect(`${roleHeaderAlias}.approval`, 'approval')
            .addSelect(`${roleHeaderAlias}.payroll`, 'payroll');
        const permissions = await queryBuilder.getRawOne();
        return permissions;
    }
    async getAdminDataOfCompany(args) {
        const currentDate = moment.utc().format(constants_1.DATE_STRING);
        const { companyId, apiModuleMode } = args;
        const companyUserRoleAlias = company_user_role_entity_1.CompanyUserRoleEntity.name;
        const roleHeaderAlias = role_header_entity_1.RoleHeaderEntity.name;
        const companyUserRoleWhereConditionBuilder = new where_condition_builder_util_1.WhereConditionBuilder(companyUserRoleAlias);
        const roleHeaderWhereConditionBuilder = new where_condition_builder_util_1.WhereConditionBuilder(roleHeaderAlias);
        const queryBuilder = this.companyUserRoleRepository.createQueryBuilder(companyUserRoleAlias);
        const { condition, parameters } = roleHeaderWhereConditionBuilder
            .andIsDeletedFalse()
            .andWhereRaw(`${roleHeaderAlias}.id = ${companyUserRoleAlias}.roleHeaderId `)
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .buildSql();
        queryBuilder.innerJoin(enums_2.ETableName.ROLE_HEADER, roleHeaderAlias, condition, parameters);
        queryBuilder.andWhere(companyUserRoleWhereConditionBuilder
            .andIsDeletedFalse()
            .andActiveTrue()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhere({
            field: 'effDateFrom',
            operator: '<=',
            value: currentDate,
            variable: 'currentDate',
        })
            .andWhere({
            field: 'effDateTo',
            operator: '>=',
            value: currentDate,
            variable: 'currentDate',
        })
            .buildBracket());
        queryBuilder
            .select(`${companyUserRoleAlias}.id`, 'companyUserRoleId')
            .addSelect(`${companyUserRoleAlias}.orgElementListJson`, 'orgElementListJson')
            .addSelect(`${companyUserRoleAlias}.email`, 'email')
            .addSelect(`${roleHeaderAlias}.id`, 'roleHeaderId');
        if (apiModuleMode &&
            enums_1.EApiModuleMode[(0, utils_1.capitalized)(apiModuleMode)]) {
            queryBuilder.addSelect(`${roleHeaderAlias}.${apiModuleMode}`, apiModuleMode);
        }
        else {
            Object.values(enums_1.EApiModuleMode).forEach(module => {
                queryBuilder.addSelect(`${roleHeaderAlias}.${module}`, module);
            });
        }
        return queryBuilder.getRawMany();
    }
    async getAdminData(args) {
        const currentDate = moment.utc().format(constants_1.DATE_STRING);
        const { companyId, userEmail, apiModuleMode } = args;
        const companyUserRoleAlias = company_user_role_entity_1.CompanyUserRoleEntity.name;
        const roleHeaderAlias = role_header_entity_1.RoleHeaderEntity.name;
        const companyUserRoleWhereConditionBuilder = new where_condition_builder_util_1.WhereConditionBuilder(companyUserRoleAlias);
        const roleHeaderWhereConditionBuilder = new where_condition_builder_util_1.WhereConditionBuilder(roleHeaderAlias);
        const queryBuilder = this.companyUserRoleRepository.createQueryBuilder(companyUserRoleAlias);
        const { condition, parameters } = roleHeaderWhereConditionBuilder
            .andIsDeletedFalse()
            .andWhereRaw(`${roleHeaderAlias}.id = ${companyUserRoleAlias}.roleHeaderId `)
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .buildSql();
        queryBuilder.innerJoin(enums_2.ETableName.ROLE_HEADER, roleHeaderAlias, condition, parameters);
        queryBuilder.andWhere(companyUserRoleWhereConditionBuilder
            .andIsDeletedFalse()
            .andActiveTrue()
            .andWhere({ field: 'companyId', operator: '=', value: companyId })
            .andWhere({ field: 'email', operator: '=', value: userEmail })
            .andWhere({
            field: 'effDateFrom',
            operator: '<=',
            value: currentDate,
            variable: 'currentDate',
        })
            .andWhere({
            field: 'effDateTo',
            operator: '>=',
            value: currentDate,
            variable: 'currentDate',
        })
            .buildBracket());
        queryBuilder
            .select(`${companyUserRoleAlias}.id`, 'companyUserRoleId')
            .addSelect(`${companyUserRoleAlias}.orgElementListJson`, 'orgElementListJson')
            .addSelect(`${roleHeaderAlias}.id`, 'roleHeaderId');
        if (apiModuleMode &&
            enums_1.EApiModuleMode[(0, utils_1.capitalized)(apiModuleMode)]) {
            queryBuilder.addSelect(`${roleHeaderAlias}.${apiModuleMode}`, apiModuleMode);
        }
        else {
            Object.values(enums_1.EApiModuleMode).forEach(module => {
                queryBuilder.addSelect(`${roleHeaderAlias}.${module}`, module);
            });
        }
        return queryBuilder.getRawOne();
    }
    async findAdminsExistWithEmails(companyId, emails) {
        const currentDate = moment.utc().format(constants_1.DATE_STRING);
        const companyUserRoles = await this.companyUserRoleRepository.find({
            where: {
                companyId,
                isDeleted: false,
                active: true,
                email: (0, typeorm_2.In)(emails),
                effDateFrom: (0, typeorm_2.LessThanOrEqual)(currentDate),
                effDateTo: (0, typeorm_2.MoreThanOrEqual)(currentDate),
            },
            select: { id: true, email: true },
        });
        if (!companyUserRoles.length)
            return [];
        return companyUserRoles.map(({ email }) => email);
    }
};
exports.CompanyUserRoleService = CompanyUserRoleService;
exports.CompanyUserRoleService = CompanyUserRoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(company_user_role_entity_1.CompanyUserRoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CompanyUserRoleService);
//# sourceMappingURL=company-user-role.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPluginQueryBuilder = createPluginQueryBuilder;
class TypeOrmPluginQueryBuilderPlugin {
    constructor(queryBuilder) {
        this.queryBuilder = queryBuilder;
        this.aliasEntity = queryBuilder.alias;
    }
    getQueryBuilder() {
        return this.queryBuilder;
    }
    andDeletedIs(isDeleted) {
        this.queryBuilder.andWhere(`${this.aliasEntity}.isDeleted = :isDeleted`, {
            isDeleted,
        });
        return this;
    }
    andActiveIs(active) {
        this.queryBuilder.andWhere(`${this.aliasEntity}.active = :active`, {
            active,
        });
        return this;
    }
    andCompanyIdIs(companyId) {
        this.queryBuilder.andWhere(`${this.aliasEntity}.companyId = :companyId`, {
            companyId,
        });
        return this;
    }
    andWherePlugin(opts) {
        return this.whereCondition('and', opts);
    }
    orWherePlugin(opts) {
        return this.whereCondition('or', opts);
    }
    whereCondition(condition, opts) {
        const { field, value, variable, operator } = opts;
        const variableName = variable || String(field);
        if (operator === 'IN' || operator === 'NOT IN') {
            if (!Array.isArray(value) || !value.length) {
                return this;
            }
            this.queryBuilder[`${condition}Where`](`${this.aliasEntity}.${String(field)} ${operator} (:...${variableName})`, { [variableName]: value });
        }
        else {
            let copiedValue = value;
            if (operator === 'LIKE')
                copiedValue = `%${copiedValue}%`;
            if (value === null) {
                this.queryBuilder[`${condition}Where`](`${this.aliasEntity}.${String(field)} IS NULL`);
            }
            else {
                this.queryBuilder[`${condition}Where`](`${this.aliasEntity}.${String(field)} ${operator} :${variableName}`, { [variableName]: copiedValue });
            }
        }
        return this;
    }
}
function createPluginQueryBuilder(alias, repository) {
    const queryBuilder = repository.createQueryBuilder(alias);
    return new TypeOrmPluginQueryBuilderPlugin(queryBuilder);
}
//# sourceMappingURL=typeorm-querybuilder-plugin.util.js.map
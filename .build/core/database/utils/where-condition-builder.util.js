"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereConditionBuilder = void 0;
const typeorm_1 = require("typeorm");
const is_first_index_util_1 = require("../../../common/utils/is-first-index.util");
class WhereConditionBuilder {
    constructor(alias) {
        this.alias = alias;
        this.conditions = [];
    }
    andIsDeletedFalse() {
        this.conditions.push({
            whereCondition: `AND ${this.alias}.isDeleted = :isDeleted`,
            parameter: { isDeleted: false },
        });
        return this;
    }
    andActiveTrue() {
        this.conditions.push({
            whereCondition: `AND ${this.alias}.active = :active`,
            parameter: { active: true },
        });
        return this;
    }
    whereCondition(condition, opts) {
        const { field, value, variable, operator } = opts;
        const variableName = variable || String(field);
        const fields = field.split('.');
        const fieldIsAQueryPath = fields.length > 1;
        const fieldToQuery = fieldIsAQueryPath
            ? `${fields[0]}.${fields[1]}`
            : `${this.alias}.${String(field)}`;
        if (operator === 'IN') {
            if (!Array.isArray(value) || !value.length) {
                return this;
            }
            this.conditions.push({
                whereCondition: `${condition} ${fieldToQuery} IN (:...${variableName})`,
                parameter: { [variableName]: value },
            });
        }
        else {
            let copiedValue = value;
            let copiedField = fieldToQuery;
            if (operator === 'LIKE') {
                copiedValue = `%${copiedValue}%`.toUpperCase();
                copiedField = `UPPER(${copiedField})`;
            }
            this.conditions.push({
                whereCondition: `${condition} ${copiedField} ${operator} :${variableName}`,
                parameter: { [variableName]: copiedValue },
            });
        }
        return this;
    }
    andWhere(opts) {
        return this.whereCondition('AND', opts);
    }
    orWhere(opts) {
        return this.whereCondition('OR', opts);
    }
    andWhereRaw(query) {
        this.conditions.push({ whereCondition: `AND ${query}`, parameter: {} });
        return this;
    }
    buildSql() {
        const parameters = {};
        const sqlQuery = this.conditions.reduce((prev, curr, index) => {
            const { parameter, whereCondition } = curr;
            if ((0, is_first_index_util_1.isFirstIndex)(index)) {
                const condition = whereCondition.split(' ');
                condition.shift();
                prev += condition.join(' ');
            }
            else {
                prev += ` ${whereCondition}`;
            }
            Object.assign(parameters, parameter);
            return prev;
        }, '');
        this.resetConditions();
        return { condition: sqlQuery, parameters };
    }
    buildBracket() {
        const { condition, parameters } = this.buildSql();
        return new typeorm_1.Brackets(qb => {
            qb.andWhere(condition, parameters);
        });
    }
    resetConditions() {
        this.conditions = [];
        return this;
    }
}
exports.WhereConditionBuilder = WhereConditionBuilder;
//# sourceMappingURL=where-condition-builder.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmBaseService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const dto_1 = require("../../../common/dto");
const enums_1 = require("../../../common/enums");
const where_condition_builder_util_1 = require("../utils/where-condition-builder.util");
class TypeOrmBaseService {
    constructor(repository) {
        this.repository = repository;
        this.entityName = this.repository.metadata.name;
    }
    async create(createDto, opts = {}) {
        const entity = this.createEntity(createDto, opts);
        const newDoc = await this.repository.save(entity);
        return newDoc;
    }
    async createMulti(createDto, opts = {}) {
        const entities = createDto.map(dto => this.createEntity(dto, opts));
        const newDoc = await this.repository.save(entities);
        return newDoc;
    }
    createEntity(createDto, opts = {}) {
        const { userEmail, companyId } = opts;
        const entity = this.repository.create(createDto);
        entity.createdOn = moment.utc().toDate();
        entity.createdBy = userEmail || enums_1.EDefaultEmail.SYSTEM_GENERATED;
        entity.isDeleted = false;
        if (companyId)
            Object.assign(entity, { companyId });
        return entity;
    }
    async getEntitiesByQuery(args) {
        const { paginationQueryDto, queryBuilder, querySearchFields, selectColumns, } = args;
        const { page, take, q: querySearchString, isDeleted = false, ids, sorts, createdFrom, createdTo, sort, isSelectAll, order, countTotalEntities = true, } = paginationQueryDto;
        const alias = queryBuilder.alias;
        const sqlBuilder = new where_condition_builder_util_1.WhereConditionBuilder(alias);
        queryBuilder.andWhere(sqlBuilder
            .andWhere({
            field: 'isDeleted',
            operator: '=',
            value: isDeleted,
        })
            .buildBracket());
        if (querySearchFields?.length && querySearchString) {
            for (const field of querySearchFields) {
                sqlBuilder.orWhere({
                    field,
                    operator: 'LIKE',
                    value: querySearchString.trim(),
                    variable: 'querySearchFields',
                });
            }
            const bracket = sqlBuilder.buildBracket();
            queryBuilder.andWhere(bracket);
        }
        if (ids?.length) {
            queryBuilder.andWhereInIds(ids);
        }
        if (createdFrom) {
            queryBuilder.andWhere(sqlBuilder
                .andWhere({
                field: 'createdOn',
                operator: '>=',
                value: createdFrom,
            })
                .buildBracket());
        }
        if (createdTo) {
            queryBuilder.andWhere(sqlBuilder
                .andWhere({
                field: 'createdOn',
                operator: '<=',
                value: createdTo,
            })
                .buildBracket());
        }
        const allOrderBys = new Object(queryBuilder.expressionMap?.allOrderBys || {});
        queryBuilder.orderBy();
        if (sorts?.length) {
            for (const sort of sorts) {
                const sortSplit = sort.split('.');
                const sortOrder = sortSplit.pop();
                const field = sortSplit.join('.');
                if (sortSplit.length > 2) {
                    queryBuilder.addOrderBy(field, sortOrder);
                }
                else {
                    queryBuilder.addOrderBy(`${alias}.${field}`, sortOrder);
                }
            }
        }
        else if (!sort) {
            queryBuilder.addOrderBy(`${alias}.createdOn`, 'DESC');
        }
        for (const [key, value] of Object.entries(allOrderBys)) {
            queryBuilder.addOrderBy(key, value);
        }
        if (selectColumns) {
            const selectColumnsSet = new Set(selectColumns);
            selectColumnsSet.add(`${alias}.createdOn`);
            queryBuilder.select(Array.from(selectColumnsSet));
        }
        if (sort) {
            queryBuilder.addOrderBy(`${sort.includes('.') ? sort : `${alias}.${sort}`}`, order);
        }
        if (isSelectAll !== true) {
            queryBuilder.take(take).skip((page - 1) * take);
        }
        const [entities, count] = countTotalEntities
            ? await queryBuilder.getManyAndCount()
            : [await queryBuilder.getMany(), 0];
        return new dto_1.PaginationResponseDto({
            paginationDto: paginationQueryDto,
            itemCount: count,
            data: entities,
        });
    }
    async getOne(findOneOptions) {
        return this.repository.findOne({
            ...findOneOptions,
            where: {
                ...findOneOptions.where,
                isDeleted: false,
            },
        });
    }
    async getOneOrFail(findOneOptions, opts = {}) {
        const entity = await this.getOne(findOneOptions);
        if (!entity) {
            throw new common_1.NotFoundException(opts.errMsg || `[${this.entityName}] Not found`);
        }
        return entity;
    }
    async update(id, updateDto, opts = {}) {
        const { companyId, existingEntity, userEmail } = opts;
        let entity = existingEntity;
        const deletedRelationship = {};
        if (!entity) {
            const findOpts = { id, isDeleted: false };
            if (companyId) {
                Object.assign(findOpts, { companyId: opts.companyId });
            }
            entity = await this.getOneOrFail({
                where: findOpts,
                select: { id: true },
            });
        }
        else {
            Object.entries(entity).forEach(([key, value]) => {
                if (!this.isAllowedType(value) &&
                    entity !== undefined &&
                    entity !== null) {
                    deletedRelationship[key] = value;
                    delete entity[key];
                }
            });
        }
        if (updateDto.id)
            delete updateDto.id;
        if (updateDto.createdOn)
            delete updateDto.createdOn;
        if (updateDto.createdBy)
            delete updateDto.createdBy;
        const updateQuery = {
            ...entity,
            ...updateDto,
            updatedOn: moment.utc().toDate(),
            updatedBy: userEmail || enums_1.EDefaultEmail.SYSTEM_GENERATED,
        };
        const updatedEntity = await this.repository.save(updateQuery);
        Object.assign(updatedEntity, deletedRelationship);
        return updatedEntity;
    }
    isAllowedType(value) {
        return (typeof value === 'bigint' ||
            typeof value === 'boolean' ||
            typeof value === 'number' ||
            typeof value === 'string' ||
            Object.prototype.toString.call(value) === '[object Date]' ||
            Object.prototype.toString.call(value) === '[object Undefined]' ||
            Object.prototype.toString.call(value) === '[object Null]');
    }
    async delete(id, opts = {}) {
        return this.update(id, { isDeleted: true }, opts);
    }
}
exports.TypeOrmBaseService = TypeOrmBaseService;
//# sourceMappingURL=typeorm-base.service.js.map
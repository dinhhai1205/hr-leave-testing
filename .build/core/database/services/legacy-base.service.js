"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyBaseService = void 0;
const common_1 = require("@nestjs/common");
const moment = require("moment");
const pagination_response_dto_1 = require("../../../common/dto/pagination-response.dto");
const enums_1 = require("../../../common/enums");
class LegacyBaseService {
    constructor(repository) {
        this.repository = repository;
        this.essentialConditions = {
            isDeleted: false,
        };
        this.entityName = this.repository.metadata.name;
    }
    checkAuthIsActionAccessLeave(action, appMode, authRoleDetails) {
        if (appMode === enums_1.EApiAppMode.ADMIN) {
            if (authRoleDetails?.[enums_1.EPermissionActions.FULL_ACCESS])
                return true;
            if (authRoleDetails?.[enums_1.EPermissionActions.NO_ACCESS])
                return false;
            return authRoleDetails?.[action] || false;
        }
        return true;
    }
    checkAuthIsActionAccessLeaveType(action, appMode, authRoleDetails) {
        if (appMode === enums_1.EApiAppMode.ADMIN) {
            if (authRoleDetails?.[enums_1.EPermissionActions.FULL_ACCESS])
                return true;
            if (authRoleDetails?.[enums_1.EPermissionActions.NO_ACCESS])
                return false;
            return authRoleDetails?.[action] || false;
        }
        return false;
    }
    async handleTransactionAndRelease(queryRunner, callback) {
        try {
            await callback();
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            await queryRunner.release();
        }
    }
    async checkExist(condition) {
        const existRecord = Object.keys(condition).includes('where')
            ? await this.repository.findOne(condition)
            : await this.repository.findOneBy(condition);
        if (!existRecord)
            throw new common_1.NotFoundException({
                message: `[${this.repository.metadata.name}] Not found`,
                statusCode: common_1.HttpStatus.NOT_FOUND,
            });
        return existRecord;
    }
    createBaseQueryBuilder(payload) {
        const { createdFrom, createdTo, ids } = payload;
        const queryBuilder = this.repository.createQueryBuilder(this.entityName);
        if (ids?.length) {
            queryBuilder.whereInIds(ids);
        }
        if (createdFrom || createdTo) {
            queryBuilder
                .andWhere(`${this.entityName}.createdOn >= :createdFrom`, {
                createdFrom: createdFrom ? moment(createdFrom) : new Date(1945, 1, 1),
            })
                .andWhere(`${this.entityName}.createdOn < :createdTo`, {
                createdTo: createdTo
                    ? moment(createdTo)
                    : moment().format('YYYY-MM-DD'),
            });
        }
        queryBuilder.andWhere(`${this.entityName}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        return queryBuilder;
    }
    async getEntitiesByQuery(payload, callback) {
        const { order, isSelectAll: selectAll, take, page, sort } = payload;
        const queryBuilder = callback();
        if (sort) {
            queryBuilder.addOrderBy(`${sort.includes('.') ? sort : `${this.entityName}.${sort}`}`, order);
        }
        else {
            queryBuilder.addOrderBy(`${this.entityName}.createdOn`, order);
        }
        if (!selectAll) {
            queryBuilder.take(take).skip((page - 1) * take);
        }
        const [entities, count] = await queryBuilder.getManyAndCount();
        return new pagination_response_dto_1.PaginationResponseDto({
            paginationDto: payload,
            itemCount: count,
            data: entities,
        });
    }
    async getRawByQuery(payload, callback) {
        const { order, isSelectAll: selectAll, take, page, sort } = payload;
        const queryBuilder = callback();
        if (sort) {
            queryBuilder.addOrderBy(`${sort.includes('.') ? sort : `${this.entityName}.${sort}`}`, order);
        }
        else {
            queryBuilder.addOrderBy(`${this.entityName}.createdOn`, order);
        }
        if (!selectAll)
            queryBuilder.take(take).skip((page - 1) * take);
        return queryBuilder.getRawMany();
    }
}
exports.LegacyBaseService = LegacyBaseService;
//# sourceMappingURL=legacy-base.service.js.map
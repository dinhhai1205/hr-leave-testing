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
exports.SubLeaveTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment_1 = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../../common/constants");
const enums_1 = require("../../../../../common/enums");
const utils_1 = require("../../../../../common/utils");
const database_1 = require("../../../../../core/database");
const create_select_condition_util_1 = require("../../../../../core/database/utils/create-select-condition.util");
const leave_trx_service_1 = require("../../leave-trx/leave-trx.service");
const base_select_all_leave_type_constant_1 = require("../constants/base-select-all-leave-type.constant");
const get_lt_querybuilder_for_leave_record_action_util_1 = require("../utils/get-lt-querybuilder-for-leave-record-action.util");
let SubLeaveTypeService = class SubLeaveTypeService extends database_1.TypeOrmBaseService {
    constructor(leaveTypeRepository, leaveTrxService) {
        super(leaveTypeRepository);
        this.leaveTypeRepository = leaveTypeRepository;
        this.leaveTrxService = leaveTrxService;
    }
    joinAndSelectParentsOrSubLeaveType(queryBuilder, opts = {}) {
        const { isParent = enums_1.EBoolean.TRUE, filterParentId = false, filterActive, } = opts;
        const alias = queryBuilder.alias;
        const parentLeaveTypeAlias = 'parentLeaveType';
        const childLeaveTypeAlias = 'subLeaveType';
        const addSelectConditions = (alias) => {
            const selectConditions = (0, create_select_condition_util_1.buildSelectCondition)(base_select_all_leave_type_constant_1.BASE_SELECT_ALL_LEAVE_TYPE, alias);
            queryBuilder.addSelect(selectConditions);
        };
        const whereConditionAndParameterBuild = (alias) => {
            const condition = {
                whereCondition: `${alias}.isDeleted = :isDeleted`,
                parameter: { isDeleted: false },
            };
            if (filterActive === true) {
                condition.whereCondition += ` AND ${alias}.active = :active`;
                Object.assign(condition.parameter, { active: filterActive });
            }
            return condition;
        };
        if (isParent === enums_1.EBoolean.TRUE) {
            filterParentId && queryBuilder.andWhere(`${alias}.parentId IS NULL`);
            const { whereCondition, parameter } = whereConditionAndParameterBuild(childLeaveTypeAlias);
            queryBuilder.leftJoin(`${alias}.children`, childLeaveTypeAlias, whereCondition, parameter);
            addSelectConditions(childLeaveTypeAlias);
        }
        else {
            filterParentId && queryBuilder.andWhere(`${alias}.parentId IS NOT NULL`);
            const { whereCondition, parameter } = whereConditionAndParameterBuild(parentLeaveTypeAlias);
            queryBuilder.leftJoin(`${alias}.parent`, parentLeaveTypeAlias, whereCondition, parameter);
            addSelectConditions(parentLeaveTypeAlias);
        }
        return { queryBuilder, parentLeaveTypeAlias, childLeaveTypeAlias };
    }
    async checkSubLeaveTypeCanAttachToParentLeaveType(subLeaveType) {
        if (subLeaveType.parentId)
            return;
        await this.checkExistLeaveRecordUsedSubTypes([subLeaveType.id]);
        return;
    }
    async checkValidParentLeaveType(parentLeaveTypeId) {
        const parentLeaveType = await this.repository.findOne({
            where: { id: parentLeaveTypeId, isDeleted: false },
            select: {
                id: true,
                name: true,
                code: true,
                parentId: true,
            },
        });
        if (!parentLeaveType) {
            throw new common_1.NotFoundException(`Not found the leave type #${parentLeaveTypeId}`);
        }
        const { parentId, name, code } = parentLeaveType;
        if (parentId) {
            throw new common_1.BadRequestException(`The leave type is not parent and it belongs to leave type #${name} (${code})`);
        }
        return parentLeaveType;
    }
    async checkExistLeaveRecordUsedSubTypes(subLeaveTypeIds) {
        if (!subLeaveTypeIds)
            return;
        const subLeaveTypes = await this.leaveTypeRepository.find({
            where: { id: (0, typeorm_2.In)(subLeaveTypeIds), isDeleted: false },
            select: {
                id: true,
                leaves: { id: true, isDeleted: true },
            },
            relations: { leaves: true },
        });
        if (!subLeaveTypes.length)
            return;
        for (const subType of subLeaveTypes) {
            const { leaves } = subType;
            if (leaves.length && leaves.some(({ isDeleted }) => !isDeleted)) {
                throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.EXIST_LEAVE_RECORDS);
            }
        }
        return;
    }
    async updateSubLeaveType(payload) {
        const { parentLeaveTypeId, bodyDto, userEmail } = payload;
        const parentLeaveType = await this.leaveTypeRepository.findOne({
            where: { id: parentLeaveTypeId, isDeleted: false },
            select: { id: true },
        });
        if (!parentLeaveType) {
            throw new common_1.NotFoundException(`The parent leave type ${parentLeaveTypeId} dose not exist.`);
        }
        const { linkSubLeaveTypeIds = [], unlinkSubLeaveTypeIds = [] } = bodyDto;
        if (!linkSubLeaveTypeIds.length && !unlinkSubLeaveTypeIds.length) {
            return;
        }
        await this.checkExistLeaveRecordUsedSubTypes((0, utils_1.uniqueArray)([...linkSubLeaveTypeIds, ...unlinkSubLeaveTypeIds]));
        const linkSubLeaveTypeDtos = [];
        const unlinkSubLeaveTypeDtos = [];
        if (linkSubLeaveTypeIds.length) {
            const commonLinkDto = {
                updatedBy: userEmail,
                updatedOn: moment_1.default.utc().toDate(),
                parentId: parentLeaveTypeId,
            };
            for (const id of linkSubLeaveTypeIds) {
                linkSubLeaveTypeDtos.push({
                    ...commonLinkDto,
                    id,
                });
            }
        }
        if (unlinkSubLeaveTypeIds.length) {
            const commonLinkDto = {
                updatedBy: userEmail,
                updatedOn: moment_1.default.utc().toDate(),
                parentId: null,
            };
            for (const id of unlinkSubLeaveTypeIds) {
                unlinkSubLeaveTypeDtos.push({
                    ...commonLinkDto,
                    id,
                });
            }
        }
        await this.leaveTypeRepository.save([
            ...linkSubLeaveTypeDtos,
            ...unlinkSubLeaveTypeDtos,
        ]);
        return;
    }
    async getAllAvailableSubLeaveTypes(companyId) {
        const subLeaveTypes = await this.leaveTypeRepository.find({
            where: { companyId, isDeleted: false, active: true, parentId: (0, typeorm_2.IsNull)() },
            select: { id: true, name: true, code: true, color: true },
            order: { code: 'ASC', id: 'ASC' },
        });
        if (!subLeaveTypes.length)
            return [];
        const subLeaveTypeIds = subLeaveTypes.map(({ id }) => id);
        const leaveTrxs = await this.leaveTrxService.repository.find({
            where: { companyId, isDeleted: false, leaveTypeId: (0, typeorm_2.In)(subLeaveTypeIds) },
            select: { id: true, leaveTypeId: true },
            order: { id: 'ASC' },
        });
        if (!leaveTrxs.length)
            return subLeaveTypes;
        const trxTables = leaveTrxs.reduce((table, trx) => {
            table[trx.leaveTypeId] = trx;
            return table;
        }, {});
        const result = [];
        for (const subLeaveType of subLeaveTypes) {
            const trx = trxTables[subLeaveType.id];
            if (!trx)
                result.push(subLeaveType);
        }
        return result;
    }
    async replaceConfigIfLeaveTypeHaveParent(leaveType) {
        const parentLeaveTypeId = leaveType.parentId;
        let parentLeaveType = leaveType.parent;
        if (!parentLeaveTypeId || !parentLeaveType)
            return leaveType;
        if (parentLeaveTypeId && !parentLeaveType) {
            parentLeaveType = await (0, get_lt_querybuilder_for_leave_record_action_util_1.buildQueryBuilderForActionLeaveRecord)({
                ltQueryBuilder: this.repository.createQueryBuilder(database_1.ETableName.LEAVE_TYPE),
                ltId: parentLeaveTypeId,
            }).getOne();
            if (!parentLeaveType)
                return leaveType;
        }
        const { allowApplyExceed, includeNonWorkingDay, includePublicHoliday, cfRoundTo, leaveTypeAssignment, } = parentLeaveType;
        Object.assign(leaveType, {
            allowApplyExceed,
            includeNonWorkingDay,
            includePublicHoliday,
            cfRoundTo,
            leaveTypeAssignment,
        });
        return leaveType;
    }
};
exports.SubLeaveTypeService = SubLeaveTypeService;
exports.SubLeaveTypeService = SubLeaveTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(database_1.LeaveTypeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        leave_trx_service_1.LeaveTrxService])
], SubLeaveTypeService);
//# sourceMappingURL=sub-leave-type.service.js.map
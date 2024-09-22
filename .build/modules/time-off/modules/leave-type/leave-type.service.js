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
exports.LeaveTypeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const ExcelJS = require("exceljs");
const moment = require("moment");
const stream_1 = require("stream");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const database_1 = require("../../../../core/database");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
const create_select_condition_util_1 = require("../../../../core/database/utils/create-select-condition.util");
const company_1 = require("../../../general/modules/company");
const company_parameter_service_1 = require("../../../general/modules/company-parameter/company-parameter.service");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const leave_type_balance_service_1 = require("../leave-type-balance/leave-type-balance.service");
const base_select_all_leave_type_constant_1 = require("./constants/base-select-all-leave-type.constant");
const leave_type_helper_1 = require("./helpers/leave-type.helper");
const sub_leave_type_service_1 = require("./sub-leave-type/sub-leave-type.service");
const leave_type_fields_for_dropdown_mode_util_1 = require("./utils/leave-type-fields-for-dropdown-mode.util");
let LeaveTypeService = class LeaveTypeService extends services_1.LegacyBaseService {
    constructor(leaveTypeRepository, leaveTypeHelper, employeeService, companyService, companyParameterService, subLeaveTypeService, leaveTypeBalanceService) {
        super(leaveTypeRepository);
        this.leaveTypeRepository = leaveTypeRepository;
        this.leaveTypeHelper = leaveTypeHelper;
        this.employeeService = employeeService;
        this.companyService = companyService;
        this.companyParameterService = companyParameterService;
        this.subLeaveTypeService = subLeaveTypeService;
        this.leaveTypeBalanceService = leaveTypeBalanceService;
        this.SPECIAL_LEAVE_TYPE_CODES = {
            AL: true,
            UL: true,
            SL: true,
        };
    }
    async createLeaveType(companyId, payload, authInfo) {
        const leaveTypeExist = await this.checkLeaveTypeCodeExist({
            companyId,
            code: payload.code,
        });
        if (leaveTypeExist.exist) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.IS_EXIST(`Leave type`));
        }
        if (payload.parentId) {
            await this.subLeaveTypeService.checkValidParentLeaveType(payload.parentId);
        }
        const createQuery = {
            ...payload,
            companyId,
            isDeleted: false,
            createdBy: authInfo.authEmail,
            createdOn: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        };
        if (!payload?.startDate) {
            createQuery.startDate = new Date('1800-01-01');
        }
        if (!payload?.endDate) {
            createQuery.endDate = new Date('2999-12-31');
        }
        const leaveType = await this.repository.save(createQuery);
        return leaveType;
    }
    async getLeaveTypesByQuery(companyId, query, authInfo) {
        const { appMode } = authInfo;
        const { q, active, calendarView, isParent, isDropDownMode, isSpecial } = query;
        const baseQueryBuilder = this.createBaseQueryBuilder(query);
        const alias = baseQueryBuilder.alias;
        baseQueryBuilder.select([]);
        const { childLeaveTypeAlias, parentLeaveTypeAlias } = this.subLeaveTypeService.joinAndSelectParentsOrSubLeaveType(baseQueryBuilder, { isParent, filterParentId: true, filterActive: active });
        if (isDropDownMode === true) {
            const selectFields = (0, leave_type_fields_for_dropdown_mode_util_1.leaveTypeFieldsForDropdownMode)(alias);
            if (query.sort) {
                selectFields.push(`${alias}.${query.sort}`);
            }
            baseQueryBuilder.select((0, utils_1.uniqueArray)(selectFields));
            baseQueryBuilder.where('');
        }
        else {
            const leaveTypeSelects = (0, create_select_condition_util_1.buildSelectCondition)(base_select_all_leave_type_constant_1.BASE_SELECT_ALL_LEAVE_TYPE, alias);
            baseQueryBuilder.addSelect(leaveTypeSelects);
        }
        if (query?.sort === enums_1.ESortLeaveTypeFields.remark) {
            baseQueryBuilder.addOrderBy(`${alias}.remark`, query.order, 'NULLS LAST');
            delete query.sort;
        }
        const pagination = await this.getEntitiesByQuery({ ...query }, () => {
            baseQueryBuilder.andWhere(`${alias}.isDeleted = :isDeleted 
          AND ${alias}.companyId = :companyId
          `, { isDeleted: false, companyId });
            if ((0, class_validator_1.isDefined)(isSpecial)) {
                baseQueryBuilder.andWhere(`${alias}.isSpecial = :isSpecial`, {
                    isSpecial,
                });
                let querySpecialCodes = `${alias}.code IN (:...specialCodes)`;
                if (isSpecial === false) {
                    querySpecialCodes = querySpecialCodes.replace('IN', 'NOT IN');
                }
                baseQueryBuilder.andWhere(querySpecialCodes, {
                    specialCodes: Object.keys(this.SPECIAL_LEAVE_TYPE_CODES),
                });
            }
            if (q) {
                baseQueryBuilder.andWhere(`(${alias}.name LIKE :q OR ${alias}.code LIKE :q)`, { q: `%${q}%` });
            }
            if (active !== undefined && active !== null) {
                if (active === true) {
                    baseQueryBuilder.andWhere(`${alias}.active = :active`, {
                        active: true,
                    });
                }
                else if (active === false) {
                    const filterActiveAlias = isParent === enums_1.EBoolean.TRUE
                        ? childLeaveTypeAlias
                        : parentLeaveTypeAlias;
                    baseQueryBuilder.andWhere(`(
                ${alias}.active = :active              
                OR ${filterActiveAlias}.active = :active
              )`, { active: false });
                }
            }
            if (appMode === enums_1.EApiAppMode.ESS && !calendarView) {
                baseQueryBuilder.andWhere(`${alias}.activeForEss = :activeForEss`, {
                    activeForEss: true,
                });
            }
            if (query?.isSelectAll) {
                baseQueryBuilder.orderBy(`LOWER(${alias}.name)`, 'ASC');
            }
            return baseQueryBuilder;
        });
        return pagination;
    }
    async getLeaveTypeDetail(id, authInfo, isParent) {
        const { appMode } = authInfo;
        const leaveTypeAlias = database_1.ETableName.LEAVE_TYPE;
        const policyAlias = database_1.ETableName.LEAVE_TYPE_POLICY;
        const queryBuilder = this.repository.createQueryBuilder(leaveTypeAlias);
        const leaveTypeSelects = (0, database_1.getColumnNamesEntity)(entities_1.LeaveTypeEntity.prototype, {
            withPrefix: leaveTypeAlias,
            providedId: false,
        });
        queryBuilder.select(leaveTypeSelects);
        queryBuilder.leftJoin(`${leaveTypeAlias}.leaveTypePolicies`, policyAlias, `${policyAlias}.isDeleted = :isDeleted`, { isDeleted: false });
        const policySelects = (0, database_1.getColumnNamesEntity)(entities_1.LeaveTypePolicyEntity.prototype, { withPrefix: policyAlias });
        queryBuilder.addSelect(policySelects);
        this.subLeaveTypeService.joinAndSelectParentsOrSubLeaveType(queryBuilder, {
            isParent,
            filterParentId: false,
        });
        queryBuilder
            .andWhere(`${leaveTypeAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .andWhere(`${leaveTypeAlias}.id = :id`, { id });
        const leavesCountAlias = 'leaveRecordsCount';
        queryBuilder.loadRelationCountAndMap(`${leaveTypeAlias}.leaveRecordsCount`, `${leaveTypeAlias}.leaves`, leavesCountAlias, qb => qb.andWhere(`${leavesCountAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        }));
        if (appMode === enums_1.EApiAppMode.ESS) {
            queryBuilder.andWhere(`${leaveTypeAlias}.activeForEss = :activeForEss`, {
                activeForEss: true,
            });
        }
        const leaveType = await queryBuilder.getOne();
        if (!leaveType) {
            throw new common_1.NotFoundException(constants_1.ERR_MSG.NOT_FOUND('Leave type', `id ${id}`));
        }
        return leaveType;
    }
    async updateLeaveType(companyId, leaveTypeId, body, authInfo) {
        const { authEmail } = authInfo;
        const leaveType = await this.repository.findOne({
            where: { companyId, id: leaveTypeId, isDeleted: false },
        });
        if (!leaveType) {
            throw new common_1.NotFoundException(constants_1.ERR_MSG.NOT_FOUND('Leave type', `id ${leaveTypeId}`));
        }
        if (body.parentId) {
            if (leaveType.parentId && leaveType.parentId !== body.parentId) {
                await Promise.all([
                    this.subLeaveTypeService.checkValidParentLeaveType(body.parentId),
                    this.subLeaveTypeService.checkExistLeaveRecordUsedSubTypes([
                        leaveType.id,
                    ]),
                ]);
            }
            else {
                await this.subLeaveTypeService.checkSubLeaveTypeCanAttachToParentLeaveType(leaveType);
            }
        }
        else {
            if (leaveType.parentId) {
                await this.subLeaveTypeService.checkExistLeaveRecordUsedSubTypes([
                    leaveType.id,
                ]);
            }
        }
        const isChangeCode = body.code && body.code !== leaveType.code;
        const isSpecialLeaveType = leaveType.isSpecial || this.SPECIAL_LEAVE_TYPE_CODES[leaveType.code];
        if (isChangeCode && isSpecialLeaveType)
            delete body.code;
        await this.disableSubLeaveTypesWhenParentIsDisabled(leaveType, authEmail, body.active, body.activeForEss);
        const updateQuery = {
            ...leaveType,
            ...body,
            updatedBy: authEmail,
            updatedOn: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        };
        if (!leaveType?.createdBy) {
            updateQuery.createdBy = authEmail;
        }
        if (!leaveType?.startDate) {
            updateQuery.startDate = new Date('1800-01-01');
        }
        if (!leaveType?.endDate) {
            updateQuery.endDate = new Date('2999-12-31');
        }
        return this.repository.save(updateQuery);
    }
    async disableSubLeaveTypesWhenParentIsDisabled(leaveType, userEmail, active, activeForEss) {
        const { id: parentId, active: parentActive, activeForEss: parentActiveForEss, } = leaveType;
        const commonUpdateQuery = {
            updatedBy: userEmail,
            updatedOn: moment.utc().toDate(),
        };
        const isParentLeaveType = !leaveType.parentId;
        const updatePromises = [];
        if (isParentLeaveType && parentActive === true && active === false) {
            updatePromises.push(this.leaveTypeRepository.update({ isDeleted: false, parentId, active: true }, { ...commonUpdateQuery, active: false }));
        }
        if (isParentLeaveType &&
            parentActiveForEss === true &&
            activeForEss === false) {
            updatePromises.push(this.leaveTypeRepository.update({ isDeleted: false, parentId, activeForEss: true }, { ...commonUpdateQuery, activeForEss: false }));
        }
        return Promise.all(updatePromises);
    }
    async updateMultipleActiveStatusLeaveType(input = {}, authInfo) {
        const { active = undefined, activeForEss = undefined, ids = [] } = input;
        if (!ids.length)
            return;
        const { authEmail } = authInfo;
        const commonUpdateQuery = {
            updatedBy: authEmail,
            updatedOn: moment.utc().toDate(),
        };
        const updateParentPromises = [];
        if (typeof active === 'boolean') {
            updateParentPromises.push(this.repository.update({ isDeleted: false, id: (0, typeorm_2.In)(ids), active: !active }, { ...commonUpdateQuery, active }));
        }
        if (typeof activeForEss === 'boolean') {
            updateParentPromises.push(this.repository.update({ isDeleted: false, id: (0, typeorm_2.In)(ids), activeForEss: !activeForEss }, { ...commonUpdateQuery, activeForEss }));
        }
        await Promise.all(updateParentPromises);
        const updateSubTypePromises = [];
        if (active === false) {
            updateSubTypePromises.push(this.repository.update({ isDeleted: false, parentId: (0, typeorm_2.In)(ids), active: true }, { ...commonUpdateQuery, active: false }));
        }
        if (activeForEss === false) {
            updateSubTypePromises.push(this.repository.update({ isDeleted: false, parentId: (0, typeorm_2.In)(ids), activeForEss: true }, { ...commonUpdateQuery, activeForEss: false }));
        }
        await Promise.all(updateSubTypePromises);
        return;
    }
    async deleteLeaveType(companyId, ids = [], authInfo) {
        const { authEmail } = authInfo;
        if (!ids.length) {
            throw new common_1.BadRequestException({ message: 'No record is selected' });
        }
        const leaveTypes = await this.leaveTypeRepository.find({
            where: { id: (0, typeorm_2.In)(ids), isDeleted: false },
            select: {
                id: true,
                isSpecial: true,
                leaves: { id: true, isDeleted: true },
                name: true,
                code: true,
                children: {
                    id: true,
                    leaves: { id: true, isDeleted: true },
                },
            },
            relations: { leaves: true, children: { leaves: true } },
            order: { isSpecial: 'DESC', leaves: { isDeleted: 'ASC' } },
        });
        if (!leaveTypes.length)
            return false;
        for (const type of leaveTypes) {
            const { leaves = [], isSpecial, name, code, children: subTypes } = type;
            const leaveTypeName = `${name} (${code}).`;
            if (isSpecial === true) {
                throw new common_1.BadRequestException(`${constants_1.ERR_MSG.LEAVE_TYPE.SPECIAL_TYPE_ERROR}. ${leaveTypeName}`);
            }
            if (leaves?.length && leaves.some(({ isDeleted }) => !isDeleted)) {
                throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.EXIST_LEAVE_RECORDS);
            }
            for (const subType of subTypes) {
                if (subType?.leaves?.length &&
                    subType.leaves.some(({ isDeleted }) => !isDeleted)) {
                    throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE.EXIST_LEAVE_RECORDS);
                }
                ids.push(subType.id);
            }
        }
        const commonDeleteQuery = {
            isDeleted: true,
            updatedBy: authEmail,
            updatedOn: moment.utc().toDate(),
        };
        await this.repository.update(ids, commonDeleteQuery);
        await this.leaveTypeBalanceService.repository.update({ isDeleted: false, leaveTypeId: (0, typeorm_2.In)(ids) }, commonDeleteQuery);
        return true;
    }
    async generateLeaveBalanceIfNeeded(payload, listEmployeeIds) {
        const { authInfo, companyId, query } = payload;
        const { authEmail } = authInfo;
        const baseQueryBuilder = this.employeeService.createBaseQueryBuilder(query);
        const empAlias = this.employeeService.entityName;
        const ltbAlias = entities_1.LeaveTypeBalanceEntity.name;
        const ltAlias = entities_1.LeaveTypeEntity.name;
        baseQueryBuilder.leftJoinAndMapMany(`${empAlias}.leaveTypes`, entities_1.LeaveTypeEntity, ltAlias, `
        ${ltAlias}.isDeleted = :isDeleted 
        AND ${ltAlias}.companyId = ${empAlias}.companyId 
        AND ${ltAlias}.parentId IS NULL
      `);
        baseQueryBuilder.leftJoinAndMapOne(`${empAlias}.leaveTypeBalances`, entities_1.LeaveTypeBalanceEntity, ltbAlias, `${ltbAlias}.employeeId = "${empAlias}"."id"
      AND ${ltbAlias}.leaveTypeId = "${ltAlias}"."id"`);
        baseQueryBuilder.andWhere(`
      ${empAlias}.isDeleted = :isDeleted
      AND ${empAlias}.companyId = :companyId
      AND ${empAlias}.active = :active

      AND ${ltAlias}.isDeleted = :isDeleted
      AND ${ltAlias}.active = :active
      AND ${ltAlias}.companyId = :companyId

      AND (
        ${ltbAlias}.employeeId IS NULL 
        OR ${ltbAlias}.leaveTypeId IS NULL
      )
    `, { companyId, isDeleted: false, active: true });
        if (listEmployeeIds?.length) {
            baseQueryBuilder.andWhere(`${empAlias}.id IN (:...listEmployeeIds)`, {
                listEmployeeIds,
            });
        }
        baseQueryBuilder.select([`${empAlias}.id`, `${ltAlias}.id`]);
        const { order, isSelectAll: selectAll, take, page, sort } = query;
        if (sort) {
            baseQueryBuilder.addOrderBy(`${sort.includes('.') ? sort : `${empAlias}.${sort}`}`, order);
        }
        else {
            baseQueryBuilder.addOrderBy(`${empAlias}.createdOn`, order);
        }
        if (!selectAll)
            baseQueryBuilder.take(take).skip((page - 1) * take);
        const employeeLeaveTypeList = await baseQueryBuilder.getRawMany();
        const lengthList = employeeLeaveTypeList.length;
        if (lengthList < 1)
            return [];
        const batchSize = 100;
        const totalBatches = Math.ceil(lengthList / batchSize);
        const insertLeaveTypeBalances = [];
        for (let index = 0; index < totalBatches; index++) {
            const start = index * batchSize;
            const end = start + batchSize;
            const batch = employeeLeaveTypeList.slice(start, end).map(empLt => ({
                leaveTypeId: Number(empLt['LeaveTypeEntity_id']),
                companyId,
                employeeId: Number(empLt['EmployeeEntity_id']),
                isDeleted: false,
                balance: 0,
                createdBy: authEmail,
                createdOn: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            }));
            insertLeaveTypeBalances.push(this.leaveTypeBalanceService.repository.save(batch));
        }
        return Promise.all(insertLeaveTypeBalances);
    }
    async getLeaveBalancesForWeb(payload) {
        const { companyId, query, authInfo, option } = payload;
        const { authEmployeeId, appMode, organizationPaths } = authInfo;
        const { employeeIds } = query;
        const listEmployeeIds = appMode === enums_1.EApiAppMode.ESS && authEmployeeId
            ? [authEmployeeId]
            : employeeIds;
        await this.generateLeaveBalanceIfNeeded(payload, listEmployeeIds);
        const baseQueryBuilder2 = this.employeeService.createBaseQueryBuilder(query);
        const employeeAlias = this.employeeService.entityName;
        const pagination2 = await this.employeeService.getEntitiesByQuery({ ...query }, () => {
            baseQueryBuilder2
                .leftJoinAndSelect(`${employeeAlias}.leaveTypeBalances`, 'leaveTypeBalances', `leaveTypeBalances.isDeleted = :isDeleted`)
                .andWhere(`${employeeAlias}.active = :active
            AND ${employeeAlias}.companyId = :companyId
            AND ${employeeAlias}.isDeleted = :isDeleted` +
                this.employeeService.startWithOrgPathCondition(employeeAlias, organizationPaths), { active: true, companyId, isDeleted: false });
            if (listEmployeeIds?.length) {
                baseQueryBuilder2.andWhere(`${employeeAlias}.id IN (:...employeeIds)`, { employeeIds: listEmployeeIds });
            }
            if (option?.joinLeaveType) {
                baseQueryBuilder2.leftJoinAndSelect(`leaveTypeBalances.leaveType`, 'leaveType', `leaveType.isDeleted = :isDeleted and leaveType.active = :active`, { isDeleted: false, active: true });
            }
            if (option?.orderLeaveType) {
                baseQueryBuilder2.addOrderBy('leaveType.name', 'ASC');
            }
            if (option?.selection?.length) {
                baseQueryBuilder2.select(option.selection);
            }
            return baseQueryBuilder2;
        });
        return pagination2;
    }
    async getLeaveTypeBalancesByQuery(payload) {
        const { authInfo, companyId, query } = payload;
        const { authEmployeeId, appMode } = authInfo;
        const { employeeIds, leaveTypeIds } = query;
        const listEmployeeIds = appMode === enums_1.EApiAppMode.ESS && authEmployeeId
            ? [authEmployeeId]
            : employeeIds;
        await this.generateLeaveBalanceIfNeeded(payload, listEmployeeIds);
        const baseQueryBuilder = this.leaveTypeBalanceService.createBaseQueryBuilder(query);
        const leaveTypeBalanceName = this.leaveTypeBalanceService.entityName;
        const leaveTypeName = entities_1.LeaveTypeEntity.name;
        const queryLeaveType = {
            condition: `${leaveTypeName}.isDeleted = :isDeleted AND ${leaveTypeName}.companyId = ${companyId}`,
            parameter: { isDeleted: false },
        };
        const { q: searchTerm, active = undefined, activeForEss = undefined, } = query;
        if (searchTerm?.length) {
            queryLeaveType.condition += ` AND ${leaveTypeName}.name LIKE '%${searchTerm}%'`;
        }
        if (active !== undefined) {
            queryLeaveType.condition += ` AND ${leaveTypeName}.active = :active`;
            queryLeaveType.parameter = { ...queryLeaveType.parameter, active };
        }
        if (activeForEss !== undefined) {
            queryLeaveType.condition += ` AND ${leaveTypeName}.activeForEss = :activeForEss`;
            queryLeaveType.parameter = { ...queryLeaveType.parameter, activeForEss };
        }
        baseQueryBuilder.innerJoinAndSelect(`${leaveTypeBalanceName}.leaveType`, leaveTypeName, queryLeaveType.condition, queryLeaveType.parameter);
        baseQueryBuilder.orderBy(`${leaveTypeName}.name`, 'ASC');
        const pagination = await this.leaveTypeBalanceService.getEntitiesByQuery({ ...query }, () => {
            baseQueryBuilder.andWhere(`${this.leaveTypeBalanceService.entityName}.companyId = :companyId`, { companyId });
            if (listEmployeeIds?.length) {
                baseQueryBuilder.andWhere(`${this.leaveTypeBalanceService.entityName}.employeeId IN (:...employeeIds)`, { employeeIds: listEmployeeIds });
            }
            if (leaveTypeIds?.length) {
                baseQueryBuilder.andWhere(`${this.leaveTypeBalanceService.entityName}.leaveTypeId IN (:...leaveTypeIds)`, { leaveTypeIds });
            }
            return baseQueryBuilder;
        });
        return pagination;
    }
    async checkLeaveTypeCodeExist(filter) {
        const emptyProps = (0, utils_1.hasUndefinedOrNullObjV2)(filter);
        if (emptyProps)
            throw new common_1.BadRequestException(constants_1.ERR_MSG.EMPTY(emptyProps));
        const { code, companyId } = filter;
        const leaveType = await this.repository.findOne({
            where: { companyId, code, isDeleted: false },
            select: { id: true },
        });
        if (!leaveType) {
            return { exist: false, leaveTypeId: 0 };
        }
        return { exist: true, leaveTypeId: leaveType.id };
    }
    async getAndGenerateMissingLeaveTypeBalance(companyId, authInfo) {
        const { authEmployeeId: employeeId } = authInfo;
        if (!employeeId)
            return [];
        await this.generateLeaveBalanceIfNeeded({
            authInfo,
            companyId,
            query: { order: 'DESC', page: 1, take: 20 },
        }, [employeeId]);
        return this.leaveTypeBalanceService.getLeaveTypeBalanceByLeaveType(companyId, authInfo);
    }
    async exportLeaveTypeBalance(response, payload) {
        const { authInfo, companyId, query, excelFileType } = payload;
        if (excelFileType !== enums_1.EExcelFileType.CSV &&
            excelFileType !== enums_1.EExcelFileType.XLSX) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.INVALID(`excel file type "${excelFileType}"`));
        }
        const ltAlias = entities_1.LeaveTypeEntity.name;
        const leaveTypeQueryBuilder = this.repository.createQueryBuilder(ltAlias);
        const [listLeaveType, employees, company] = await Promise.all([
            leaveTypeQueryBuilder
                .select(`${ltAlias}.id`, 'id')
                .addSelect(`${ltAlias}.name`, 'name')
                .andWhere(`${ltAlias}.isDeleted = :isDeleted
          AND ${ltAlias}.active = :active
          AND ${ltAlias}.companyId = :companyId
          AND ${ltAlias}.parentId IS NULL`, { isDeleted: false, active: true, companyId })
                .orderBy('LOWER(name)', 'ASC')
                .getRawMany(),
            this.employeeService.getRawEmpLtBalances({ authInfo, companyId, query }),
            this.companyService.checkExist({
                where: { id: companyId, isDeleted: false },
                select: { name: true },
            }),
        ]);
        if (!listLeaveType.length || !employees) {
            throw new common_1.NotFoundException(constants_1.ERR_MSG.EMPTY('Leave type'));
        }
        if (employees.length < 1) {
            throw new common_1.NotFoundException(constants_1.ERR_MSG.EMPTY('Employee'));
        }
        return excelFileType === enums_1.EExcelFileType.XLSX
            ? this.processXlsxExport({
                response,
                listLeaveType: (0, utils_1.sortArrObjCaseSensitiveBy)(listLeaveType, 'name'),
                employees,
                companyName: company.name,
            })
            : this.processCsvExport({
                response,
                listLeaveType: (0, utils_1.sortArrObjCaseSensitiveBy)(listLeaveType, 'name'),
                employees,
                companyName: company.name,
            });
    }
    async processXlsxExport(payload) {
        const { employees, listLeaveType, companyName, response } = payload;
        response.attachment(`${companyName}-leave-type-balance period_${new Date().getFullYear()}.xlsx`);
        response.contentType(constants_1.CONTENT_TYPE.XLSX);
        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
            stream: response,
        });
        const worksheet = workbook.addWorksheet(companyName);
        const { headerRow, leaveTypeColumnIndex } = this.leaveTypeHelper.buildHeaderRowLeaveTypeBalance(listLeaveType);
        worksheet.addRow(headerRow);
        if (!employees.length) {
            await workbook.commit();
            return;
        }
        this.leaveTypeHelper.pushRowDataLeaveTypeBalance({
            employees,
            leaveTypeColumnIndex,
            provider: worksheet,
        });
        await workbook.commit();
    }
    processCsvExport(payload) {
        const { employees, listLeaveType, companyName, response } = payload;
        const inStream = new stream_1.Readable({ read() { } });
        const { headerRow, leaveTypeColumnIndex } = this.leaveTypeHelper.buildHeaderRowLeaveTypeBalance(listLeaveType);
        inStream.push(`${headerRow.slice(0, headerRow.length - 1)}\n`);
        this.leaveTypeHelper.pushRowDataLeaveTypeBalance({
            employees,
            leaveTypeColumnIndex,
            provider: inStream,
        });
        inStream.push(null);
        const filename = `${companyName}-leave-type-balance period_${new Date().getFullYear()}.csv`;
        response.attachment(filename);
        response.contentType(constants_1.CONTENT_TYPE.CSV);
        return new common_1.StreamableFile(inStream, {
            disposition: `attachment; filename="${filename}"`,
            type: constants_1.CONTENT_TYPE.CSV,
            length: inStream.readableLength,
        });
    }
    async importLeaveTypeBalanceFromExcel(payload) {
        const { companyId, file, authInfo, excelFileType = enums_1.EExcelFileType.XLSX, } = payload;
        const { authEmail } = authInfo;
        const { listEmployeeRef, listLeaveTypeName, hashTable, } = excelFileType === enums_1.EExcelFileType.XLSX
            ? await this.leaveTypeHelper.readExcelFile(file)
            : await this.leaveTypeHelper.readCsvFile(file);
        await this.leaveTypeBalanceService.updateLeaveTypeBalanceImport({
            companyId,
            authEmail,
            hashTable,
            listEmployeeRef,
            listLeaveTypeName,
        });
    }
    async dashboardLeaveType(companyId, authMail) {
        const leaveTypeName = this.entityName;
        const companyName = entities_1.CompanyEntity.name;
        const leaveTrxName = entities_1.LeaveTrxEntity.name;
        const leaveTypeBalanceName = this.leaveTypeBalanceService.entityName;
        const policyName = entities_1.LeaveTypePolicyEntity.name;
        const { authEmployeeId: employeeId } = authMail;
        const queryBuilder = this.repository.createQueryBuilder(leaveTypeName);
        if (!employeeId) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.MISSING('Employee id'));
        }
        queryBuilder.innerJoin(`${leaveTypeName}.company`, companyName, `${companyName}.isDeleted = :isDeleted AND ${companyName}.active = :active`, { isDeleted: false, active: true });
        queryBuilder.leftJoinAndSelect(`${leaveTypeName}.leaveTransactions`, leaveTrxName, `${leaveTrxName}.isDeleted = :isDeleted
        AND ${leaveTrxName}.unit >= 0
        AND ${leaveTrxName}.companyId = :companyId
        AND ${leaveTrxName}.employeeId = :employeeId
        AND ${leaveTrxName}.date >= :currentYear
        AND ${leaveTrxName}.type IN (:...historyType)
        AND ${leaveTrxName}.sign = :historySign`, {
            isDeleted: false,
            policyStableDate: new Date('2023-06-24'),
            currentYear: new Date(`${new Date().getUTCFullYear()}-01-01`),
            historyType: [
                enums_1.EHistoryType.CARRY_FORWARD,
                enums_1.EHistoryType.CREDIT,
                enums_1.EHistoryType.CREDIT_PRORATE,
                enums_1.EHistoryType.USE,
            ],
            historySign: enums_1.EHistorySign.ADD,
            companyId,
            employeeId,
        });
        queryBuilder.leftJoinAndSelect(`${leaveTrxName}.policy`, policyName, `${policyName}.isDeleted = :isDeleted`, { isDeleted: false });
        queryBuilder.innerJoinAndSelect(`${leaveTypeName}.leaveTypeBalances`, leaveTypeBalanceName, `${leaveTypeBalanceName}.isDeleted = :isDeleted
      AND ${leaveTypeBalanceName}.employeeId = :employeeId
      AND ${leaveTypeBalanceName}.companyId = :companyId`, { isDeleted: false, companyId, employeeId });
        queryBuilder.select([
            `${leaveTypeName}.id`,
            `${leaveTypeName}.color`,
            `${leaveTypeName}.name`,
            `${leaveTypeName}.code`,
            `${leaveTypeBalanceName}.balance`,
            `${leaveTrxName}.unit`,
            `${leaveTrxName}.type`,
            `${leaveTrxName}.date`,
            `${leaveTrxName}.leaveTypeId`,
            `${policyName}.entitlement`,
        ]);
        queryBuilder.andWhere(`${leaveTypeName}.isDeleted = :isDeleted 
          AND ${leaveTypeName}.companyId = :companyId
          AND ${leaveTypeName}.active = :active
          AND ${leaveTypeName}.activeForEss = :activeForEss
          AND ${leaveTypeName}.parentId IS NULL`, { isDeleted: false, companyId, active: true, activeForEss: true });
        queryBuilder.addOrderBy(`${leaveTrxName}.date`, 'DESC');
        const leaveTypes = await queryBuilder.getMany();
        const leaveTypeIdOccurrences = new Map();
        const results = leaveTypes.map(leaveType => {
            const { color, id, name, code, leaveTransactions, leaveTypeBalances } = leaveType;
            let creditedThisYear = 0;
            let carriedForwardFromLastYear = 0;
            const choosePolicyList = [];
            for (const trx of leaveTransactions) {
                const { leaveTypeId, unit, type, policy } = trx;
                if (type === enums_1.EHistoryType.CARRY_FORWARD) {
                    carriedForwardFromLastYear = (0, utils_1.roundUp2Decimals)(carriedForwardFromLastYear + unit);
                }
                else if (enums_1.EHistoryType.CREDIT && enums_1.EHistoryType.CREDIT_PRORATE) {
                    creditedThisYear = (0, utils_1.roundUp2Decimals)(creditedThisYear + unit);
                }
                if (type !== enums_1.EHistoryType.USE && !choosePolicyList.length) {
                    choosePolicyList.push(policy);
                }
                if (type === enums_1.EHistoryType.USE) {
                    leaveTypeIdOccurrences.set(leaveTypeId, (leaveTypeIdOccurrences.get(leaveTypeId) || 0) + 1);
                }
            }
            return {
                name,
                code,
                color,
                id,
                creditedThisYear,
                carriedForwardFromLastYear,
                maxEntitlement: choosePolicyList[0]?.entitlement || 0,
                balance: leaveTypeBalances[0]?.balance || 0,
            };
        });
        return results.sort((a, b) => {
            const countA = leaveTypeIdOccurrences.get(a.id) || 0;
            const countB = leaveTypeIdOccurrences.get(b.id) || 0;
            if (countA === countB) {
                const nameA = a.name.toLocaleLowerCase();
                const nameB = b.name.toLocaleLowerCase();
                return nameA.localeCompare(nameB);
            }
            return countB - countA;
        });
    }
};
exports.LeaveTypeService = LeaveTypeService;
exports.LeaveTypeService = LeaveTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LeaveTypeEntity)),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => leave_type_balance_service_1.LeaveTypeBalanceService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        leave_type_helper_1.LeaveTypeHelper,
        employee_service_1.EmployeeService,
        company_1.CompanyService,
        company_parameter_service_1.CompanyParameterService,
        sub_leave_type_service_1.SubLeaveTypeService,
        leave_type_balance_service_1.LeaveTypeBalanceService])
], LeaveTypeService);
//# sourceMappingURL=leave-type.service.js.map
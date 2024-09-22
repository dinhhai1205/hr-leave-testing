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
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const dto_1 = require("../../../../common/dto");
const enums_1 = require("../../../../common/enums");
const contract_type_enum_1 = require("../../../../common/enums/contract-type.enum");
const utils_1 = require("../../../../common/utils");
const database_1 = require("../../../../core/database");
const approval_user_entity_1 = require("../../../../core/database/entities/approval-user.entity");
const asp_net_users_entity_1 = require("../../../../core/database/entities/asp-net-users.entity");
const company_entity_1 = require("../../../../core/database/entities/company.entity");
const employee_entity_1 = require("../../../../core/database/entities/employee.entity");
const leave_type_balance_entity_1 = require("../../../../core/database/entities/leave-type-balance.entity");
const leave_type_policy_credit_entity_1 = require("../../../../core/database/entities/leave-type-policy-credit.entity");
const leave_type_entity_1 = require("../../../../core/database/entities/leave-type.entity");
const payroll_group_entity_1 = require("../../../../core/database/entities/payroll-group.entity");
const services_1 = require("../../../../core/database/services");
const payroll_group_fieds_for_calculate_day_leaveutil_1 = require("../../../payroll/modules/payroll-group/utils/payroll-group-fieds-for-calculate-day-leaveutil");
const get_all_employee_policy_credit_selection_constant_1 = require("./constants/get-all-employee-policy-credit-selection.constant");
const employee_fields_for_assignment_util_1 = require("./utils/employee-fields-for-assignment.util");
const employee_module_type_enum_1 = require("../../../time-tracker/modules/employee/enums/employee-module-type.enum");
let EmployeeService = class EmployeeService extends services_1.LegacyBaseService {
    constructor(employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
        this.availableEmployeeCondition = {
            active: true,
            isDeleted: false,
        };
        this.getEmployeeByIds = async (employeeIds) => {
            return this.employeeRepository.find({
                where: { id: (0, typeorm_2.In)(employeeIds) },
                relations: ['workSchedule'],
            });
        };
        this.getEmployeeByIdsWithoutRelations = async (employeeIds) => {
            return this.employeeRepository.find({
                where: { id: (0, typeorm_2.In)(employeeIds) },
            });
        };
    }
    async getAllEmployeeForPolicyCredit(filterEmployee = {}, { batchSize, skip } = {}, leaveTypeId) {
        const employeeAlias = (0, utils_1.aliasEntity)(employee_entity_1.EmployeeEntity);
        const companyAlias = (0, utils_1.aliasEntity)(company_entity_1.CompanyEntity);
        const leaveTypeAlias = (0, utils_1.aliasEntity)(leave_type_entity_1.LeaveTypeEntity);
        const balanceAlias = (0, utils_1.aliasEntity)(leave_type_balance_entity_1.LeaveTypeBalanceEntity);
        const policyAlias = (0, utils_1.aliasEntity)(database_1.LeaveTypePolicyEntity);
        const policyCreditAlias = (0, utils_1.aliasEntity)(leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity);
        const aspUserAlias = (0, utils_1.aliasEntity)(asp_net_users_entity_1.AspNetUsersEntity);
        const creditTrxAlias = (0, utils_1.aliasEntity)(database_1.LeaveTypePolicyCreditTrxEntity);
        const queryBuilder = this.employeeRepository.createQueryBuilder(employeeAlias);
        queryBuilder.innerJoin(`${employeeAlias}.company`, companyAlias, `
        ${companyAlias}.isDeleted = :isDeleted 
        AND ${companyAlias}.active = :active
      `, { isDeleted: false, active: true });
        queryBuilder
            .leftJoinAndMapMany(`${employeeAlias}.leaveTypes`, leave_type_entity_1.LeaveTypeEntity, leaveTypeAlias, `
          ${leaveTypeAlias}.isDeleted = :isDeleted 
          AND ${leaveTypeAlias}.companyId = ${employeeAlias}.companyId 
          AND ${leaveTypeAlias}.parentId IS NULL
          ${leaveTypeId ? `AND ${leaveTypeAlias}.id = :leaveTypeId` : ''} 
        `, { leaveTypeId })
            .leftJoin(`${leaveTypeAlias}.employeeLeaveTypeBalance`, balanceAlias, `
          ${balanceAlias}.isDeleted = :isDeleted
          AND ${balanceAlias}.employeeId = ${employeeAlias}.id
        `)
            .innerJoin(`${leaveTypeAlias}.leaveTypePolicies`, policyAlias, `
          ${policyAlias}.isDeleted = :isDeleted
        `, { isDeleted: false })
            .leftJoin(`${policyAlias}.employeePolicyCredit`, policyCreditAlias, `
          ${policyCreditAlias}.isDeleted = :isDeleted
          AND ${policyCreditAlias}.employeeId = ${employeeAlias}.id
        `, { isDeleted: false })
            .leftJoinAndMapMany(`${policyCreditAlias}.creditTrxs`, database_1.LeaveTypePolicyCreditTrxEntity, creditTrxAlias, `
          ${creditTrxAlias}.leaveTypePolicyCreditUUID = "${policyCreditAlias}"."uuid"
          AND (
            ${leaveTypeAlias}.isDeleted = :isDeleted
            AND ${creditTrxAlias}.type IN (:...trxTypes)
          )
        `, {
            isDeleted: false,
            trxTypes: [
                enums_1.EHistoryType.CREDIT,
                enums_1.EHistoryType.CREDIT_PRORATE,
                enums_1.EHistoryType.CARRY_FORWARD,
                enums_1.EHistoryType.CARRY_FORWARD_EXPIRES,
            ],
        });
        queryBuilder.leftJoinAndMapOne(`${employeeAlias}.aspNetUsers`, asp_net_users_entity_1.AspNetUsersEntity, aspUserAlias, `
        ${aspUserAlias}.Email = ${employeeAlias}.email
      `);
        this.filterEmployee(queryBuilder, filterEmployee);
        queryBuilder.andWhere(`
        ${employeeAlias}.isDeleted = :isDeleted
        AND ${employeeAlias}.active = :active
      `, { isDeleted: false, active: true });
        queryBuilder.select((0, get_all_employee_policy_credit_selection_constant_1.GET_ALL_EMPLOYEES_POLICY_CREDIT_SELECTION)({
            employeeAlias,
            leaveTypeAlias,
            balanceAlias,
            policyAlias,
            policyCreditAlias,
            aspUserAlias,
            creditTrxAlias,
        }));
        if ((skip !== null || skip !== undefined) &&
            (batchSize !== null || batchSize !== undefined)) {
            queryBuilder.take(batchSize).skip(skip);
        }
        const employees = await queryBuilder.getMany();
        return employees;
    }
    getAllEmployeesQueryBuilder(filterEmployee = {}) {
        const empEntityName = this.entityName;
        const companyEntityName = company_entity_1.CompanyEntity.name;
        const balanceEntityName = leave_type_balance_entity_1.LeaveTypeBalanceEntity.name;
        const creditEntityName = leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity.name;
        const aspNetUserName = asp_net_users_entity_1.AspNetUsersEntity.name;
        const empContractAlias = database_1.ETableName.EMPLOYEE_CONTRACT;
        const queryBuilder = this.employeeRepository.createQueryBuilder(empEntityName);
        queryBuilder.innerJoin(`${empEntityName}.company`, companyEntityName, `
        ${companyEntityName}.isDeleted = :isDeleted 
        AND ${companyEntityName}.active = :active
      `, { isDeleted: false, active: true });
        queryBuilder.leftJoin(`${empEntityName}.leaveTypeBalances`, balanceEntityName, `${balanceEntityName}.isDeleted = :isDeleted`, { isDeleted: false });
        queryBuilder.leftJoin(`${empEntityName}.leaveTypePolicyCredits`, creditEntityName, `${creditEntityName}.isDeleted = :isDeleted`, { isDeleted: false });
        queryBuilder.leftJoinAndMapOne(`${empEntityName}.aspNetUsers`, asp_net_users_entity_1.AspNetUsersEntity, aspNetUserName, `${aspNetUserName}.Email = ${empEntityName}.email`);
        queryBuilder.leftJoinAndMapMany(`${empEntityName}.empContracts`, database_1.EmployeeContractEntity, empContractAlias, `${empContractAlias}.employeeId = "${empEntityName}"."id"
      AND ${empContractAlias}.referenceNo = "${empEntityName}"."contract_reference_no"
      AND ${empContractAlias}.isDeleted = FALSE
      AND ${empContractAlias}.active = TRUE
      AND ${empContractAlias}.contractType IN (:...contractTypes)
      `, { contractTypes: [contract_type_enum_1.EContractType.DEFINITE, contract_type_enum_1.EContractType.INDEFINITE] });
        queryBuilder.andWhere(`${empEntityName}.isDeleted = :isDeleted AND ${empEntityName}.active = :active`, { isDeleted: false, active: true });
        this.filterEmployee(queryBuilder, filterEmployee);
        queryBuilder.select([
            `${empEntityName}.id`,
            `${empEntityName}.companyId`,
            `${empEntityName}.joinDate`,
            `${empEntityName}.confirmDate`,
            `${empEntityName}.seniorityDate`,
            `${empEntityName}.employeeRef`,
            `${empEntityName}.contractDateFrom`,
            `${empEntityName}.contractType`,
            ...(0, employee_fields_for_assignment_util_1.employeeFieldsForAssignment)(empEntityName),
            `${creditEntityName}.id`,
            `${creditEntityName}.companyId`,
            `${creditEntityName}.employeeId`,
            `${creditEntityName}.leavePolicyId`,
            `${creditEntityName}.credit`,
            `${creditEntityName}.creditRemaining`,
            `${creditEntityName}.creditedOn`,
            `${creditEntityName}.carryForwardRemaining`,
            `${creditEntityName}.carryForwardOn`,
            `${creditEntityName}.expiresOn`,
            `${creditEntityName}.uuid`,
            `${creditEntityName}.carryToLtId`,
            `${balanceEntityName}.id`,
            `${balanceEntityName}.companyId`,
            `${balanceEntityName}.employeeId`,
            `${balanceEntityName}.leaveTypeId`,
            `${balanceEntityName}.balance`,
            `${aspNetUserName}.id`,
            `${aspNetUserName}.utcOffset`,
            `${empContractAlias}.id`,
            `${empContractAlias}.dateFrom`,
        ]);
        queryBuilder.orderBy(`${empEntityName}.joinDate`, 'ASC');
        return queryBuilder;
    }
    filterEmployee(queryBuilder, filterEmployee = {}) {
        const employeeAlias = queryBuilder.alias;
        Object.keys(filterEmployee).forEach(key => {
            const element = filterEmployee[key];
            if (element) {
                const queryCondition = {};
                if (key.endsWith('Arr')) {
                    if (Array.isArray(element) && element.length !== 0) {
                        const cutArrCharacter = key.substring(0, key.length - 3);
                        queryCondition[cutArrCharacter] = element;
                        queryBuilder.andWhere(`${employeeAlias}.${cutArrCharacter} IN (:...${cutArrCharacter})`, queryCondition);
                    }
                }
                else {
                    queryCondition[key] = element;
                    queryBuilder.andWhere(`${employeeAlias}.${key} = :${key}`, queryCondition);
                }
            }
        });
    }
    async getAllEmployees(filterEmployee = {}, { batchSize, skip } = {}) {
        const queryBuilder = this.getAllEmployeesQueryBuilder(filterEmployee);
        if ((skip !== null || skip !== undefined) &&
            (batchSize !== null || batchSize !== undefined)) {
            queryBuilder.take(batchSize).skip(skip);
        }
        const employees = await queryBuilder.getMany();
        return employees;
    }
    async getWorkingDayOfAnEmployee(filter = {}) {
        const { companyId = null, employeeId = null } = filter;
        const hasEmptyProps = (0, utils_1.hasUndefinedOrNullObjV2)(filter);
        if (hasEmptyProps) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.EMPTY(hasEmptyProps));
        }
        const employeeAlias = this.entityName;
        const payrollGroupAlias = payroll_group_entity_1.PayrollGroupEntity.name;
        const queryBuilder = this.employeeRepository.createQueryBuilder(employeeAlias);
        queryBuilder.innerJoinAndSelect(`${employeeAlias}.payrollGroups`, payrollGroupAlias, `${payrollGroupAlias}.companyId = :companyId 
      AND ${payrollGroupAlias}.isDeleted = :isDeleted`, { companyId, employeeId, isDeleted: false });
        queryBuilder.where(`${employeeAlias}.id = :employeeId
      AND ${employeeAlias}.companyId = :companyId 
      AND ${employeeAlias}.isDeleted = :isDeleted
      AND ${employeeAlias}.active = :active`, { companyId, employeeId, isDeleted: false, active: true });
        const employeeSelectedFields = [
            'id',
            'employeeNo',
            'employeeRef',
            'fullNameEn',
            'fullNameLocal',
        ];
        const payrollGroupSelectedFields = [
            'id',
            'code',
            'name',
            'mon',
            'tue',
            'wed',
            'thu',
            'fri',
            'sat',
            'sun',
        ];
        queryBuilder.select([
            ...employeeSelectedFields.map(field => `${employeeAlias}.${field}`),
            ...payrollGroupSelectedFields.map(field => `${payrollGroupAlias}.${field}`),
        ]);
        return queryBuilder.getMany();
    }
    async getRawEmpLtBalances(payload) {
        const { authInfo, companyId, query } = payload;
        const { authEmployeeId, appMode, organizationPaths } = authInfo;
        const { employeeIds, sort, order } = query;
        const listEmployeeIds = appMode === enums_1.EApiAppMode.ESS && authEmployeeId
            ? [authEmployeeId]
            : employeeIds;
        const ltbAlias = leave_type_balance_entity_1.LeaveTypeBalanceEntity.name;
        const ltAlias = leave_type_entity_1.LeaveTypeEntity.name;
        const employeeAlias = employee_entity_1.EmployeeEntity.name;
        const employeeQueryBuilder = this.createBaseQueryBuilder(query);
        return this.getRawByQuery({ ...query }, () => {
            employeeQueryBuilder.leftJoinAndMapMany(`${employeeAlias}.leaveTypes`, leave_type_entity_1.LeaveTypeEntity, ltAlias, `${ltAlias}.companyId = ${employeeAlias}.companyId`);
            employeeQueryBuilder.leftJoinAndMapOne(`${employeeAlias}.leaveTypeBalances`, leave_type_balance_entity_1.LeaveTypeBalanceEntity, ltbAlias, `${ltbAlias}.employeeId = "${employeeAlias}"."id"
        AND ${ltbAlias}.leaveTypeId = "${ltAlias}"."id"`);
            employeeQueryBuilder.andWhere(`${employeeAlias}.isDeleted = :isDeleted
        AND ${employeeAlias}.active = :active
        AND ${employeeAlias}.companyId = :companyId
  
        AND ${ltAlias}.isDeleted = :isDeleted
        AND ${ltAlias}.active = :active
        AND ${ltAlias}.companyId = :companyId` +
                this.startWithOrgPathCondition(employeeAlias, organizationPaths), { companyId, isDeleted: false, active: true });
            if (listEmployeeIds?.length) {
                employeeQueryBuilder.andWhere(`${employeeAlias}.id IN (:...listEmployeeIds)`, { listEmployeeIds });
            }
            employeeQueryBuilder
                .select(`${employee_entity_1.EmployeeEntity.name}.id`, 'id')
                .addSelect(`${employee_entity_1.EmployeeEntity.name}.fullNameLocal`, 'fullNameLocal')
                .addSelect(`${employee_entity_1.EmployeeEntity.name}.fullNameEn`, 'fullNameEn')
                .addSelect(`${employee_entity_1.EmployeeEntity.name}.employeeRef`, 'employeeRef')
                .addSelect(`${ltbAlias}.balance`, 'ltBalance')
                .addSelect(`${ltAlias}.id`, 'ltId')
                .addSelect(`${ltAlias}.name`, 'ltName');
            employeeQueryBuilder.addOrderBy(`${employee_entity_1.EmployeeEntity.name}.${sort}`, order);
            employeeQueryBuilder.addOrderBy(`LOWER(${ltAlias}.name)`, 'ASC');
            return employeeQueryBuilder;
        });
    }
    async getEmployeeWithApprovalUsers(companyId, employeeId) {
        const employeeAlias = (0, utils_1.aliasEntity)(employee_entity_1.EmployeeEntity);
        const approvalUserAlias = (0, utils_1.aliasEntity)(approval_user_entity_1.ApprovalUserEntity);
        const payrollGroupAlias = database_1.ETableName.PAYROLL_GROUP;
        const queryBuilder = this.employeeRepository.createQueryBuilder(employeeAlias);
        queryBuilder
            .where(`${employeeAlias}.id = :employeeId`, { employeeId })
            .select([
            `${employeeAlias}.payrollGroupId`,
            ...(0, employee_fields_for_assignment_util_1.employeeFieldsForAssignment)(employeeAlias),
        ])
            .leftJoinAndMapOne(`${employeeAlias}.approvalUsers`, approval_user_entity_1.ApprovalUserEntity, approvalUserAlias, `(
          ${approvalUserAlias}.orgEleId = "${employeeAlias}"."organization_element_id"
          OR ${approvalUserAlias}.orgEleId = 0
        )
          AND ${approvalUserAlias}.isDeleted = :isDeleted
          AND ${approvalUserAlias}.moduleId = :moduleId
          AND ${approvalUserAlias}.companyId = :companyId`, { moduleId: enums_1.EMainModuleNumber.LEAVE, companyId, isDeleted: false })
            .leftJoin(`${employeeAlias}.payrollGroups`, payrollGroupAlias)
            .addSelect((0, payroll_group_fieds_for_calculate_day_leaveutil_1.payrollGroupFieldsForCalculateDayLeave)(payrollGroupAlias));
        return queryBuilder.getOne();
    }
    startWithOrgPathCondition(alias, organizationPaths = []) {
        let result = '';
        switch (organizationPaths.length) {
            case 0:
                result = '';
                break;
            case 1:
                result = ` AND ${alias}.orgPath LIKE '${organizationPaths[0]}%'`;
                break;
            default:
                result = organizationPaths.reduce((prev, curr, i) => {
                    const prefix = i === 0 ? `(` : ` OR`;
                    const query = ` ${prefix} ${alias}.orgPath LIKE '${curr}%'`;
                    const endQuery = i + 1 === organizationPaths.length ? ')' : '';
                    return (prev += query + endQuery);
                }, ` AND`);
        }
        return result;
    }
    async getTotalEmployees(companyIds, filter = {}) {
        return this.employeeRepository.countBy({
            ...this.availableEmployeeCondition,
            companyId: (0, typeorm_2.In)(companyIds),
            ...filter,
        });
    }
    async getTotalJoinerEmployees(input) {
        const { companyIds, currentDate } = input;
        const startDateOfMonth = currentDate.clone().startOf('month').toDate();
        const endDateOfMonth = currentDate.clone().endOf('month').toDate();
        return this.employeeRepository.countBy({
            ...this.availableEmployeeCondition,
            companyId: (0, typeorm_2.In)(companyIds),
            joinDate: (0, typeorm_2.Between)(startDateOfMonth, endDateOfMonth),
        });
    }
    async getTotalLeaverEmployees(input) {
        const { companyIds, currentDate } = input;
        const startDateOfMonth = currentDate.clone().startOf('month').toDate();
        const endDateOfMonth = currentDate.clone().endOf('month').toDate();
        return this.employeeRepository.countBy({
            ...this.availableEmployeeCondition,
            companyId: (0, typeorm_2.In)(companyIds),
            lastWorkingDate: (0, typeorm_2.Between)(startDateOfMonth, endDateOfMonth),
        });
    }
    async getEmployeeAuth(args) {
        const { companyId, email } = args;
        const empAlias = employee_entity_1.EmployeeEntity.name;
        const aspNetUserAlias = asp_net_users_entity_1.AspNetUsersEntity.name;
        const empQueryBuilder = this.employeeRepository
            .createQueryBuilder(empAlias)
            .leftJoinAndMapOne(`${empAlias}.aspNetUsers`, asp_net_users_entity_1.AspNetUsersEntity, aspNetUserAlias, `${aspNetUserAlias}.Email = ${empAlias}.email`)
            .where(`${empAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${empAlias}.email = :email`, { email })
            .andWhere(`${empAlias}.isDeleted = :isDeleted`, { isDeleted: false })
            .andWhere(`${empAlias}.isEssEnabled = :isEssEnabled`, {
            isEssEnabled: true,
        });
        const selectEmployee = ['EmployeeEntity.id'];
        const selectAspNetUser = ['AspNetUsersEntity.utcOffset'];
        empQueryBuilder.select([...selectEmployee, ...selectAspNetUser]);
        return empQueryBuilder.getOne();
    }
    async getEmployeeIdsHaveContract(companyIds, contractTypes) {
        const filterQuery = {
            ...this.availableEmployeeCondition,
            companyId: (0, typeorm_2.In)(companyIds),
            contractType: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
        };
        if (contractTypes.length) {
            filterQuery['contractType'] = (0, typeorm_2.In)(contractTypes);
        }
        const employees = await this.employeeRepository.find({
            where: filterQuery,
            select: { id: true },
        });
        if (!employees.length)
            return [];
        return employees.map(employee => employee.id);
    }
    async getTotalEmployeeByContract(companyIds, contractTypes = Object.values(enums_1.EEmployeeContractType)) {
        if (!contractTypes.length) {
            contractTypes = Object.values(enums_1.EEmployeeContractType);
        }
        const currentDate = moment.utc().format(constants_1.DATE_STRING);
        const alias = this.entityName;
        const queryBuilder = this.employeeRepository
            .createQueryBuilder(alias)
            .select(`${alias}.contractType`, 'contractType')
            .addSelect('COUNT(*)', 'countPerContract')
            .where(`${alias}.companyId IN (:...companyIds)`, { companyIds })
            .andWhere(`${alias}.isDeleted = :isDeleted`, { isDeleted: false })
            .andWhere(`${alias}.active = :active`, { active: true })
            .andWhere(`${alias}.contractType IS NOT NULL`)
            .andWhere(`${alias}.contractType != ''`)
            .andWhere(`${alias}.contractDateFrom <= :currentDate`, { currentDate })
            .andWhere(`${alias}.contractDateTo >= :currentDate`, { currentDate })
            .groupBy(`${alias}.contractType`)
            .andWhere(`${alias}.contractType IN (:...contractTypes)`, {
            contractTypes,
        });
        const result = await queryBuilder.getRawMany();
        return result.reduce((prev, curr) => {
            prev[curr.contractType] = curr.countPerContract;
            return prev;
        }, {});
    }
    async getEssData(filter, select) {
        const { companyId, userEmail } = filter;
        return this.employeeRepository.findOne({
            where: {
                isDeleted: false,
                active: true,
                isEssEnabled: true,
                email: userEmail,
                companyId: +companyId,
            },
            select: select || {},
        });
    }
    async getManyEssData(filter, select) {
        const { companyId, ids } = filter;
        if (ids.length === 0) {
            return [];
        }
        return this.employeeRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids),
                isDeleted: false,
                companyId: +companyId,
            },
            select: select || {},
        });
    }
    async getAllEmployeesByCompanyIdWithElementIds(filter, select) {
        const { companyId, organizationElementIds } = filter;
        if (organizationElementIds && organizationElementIds?.length > 0) {
            return this.employeeRepository.find({
                where: {
                    isDeleted: false,
                    active: true,
                    organizationElementId: (0, typeorm_2.In)(organizationElementIds),
                    companyId: +companyId,
                },
                select: select || {},
            });
        }
        return [];
    }
    async getAllEmployeesByCompanyId(filter, select) {
        const { companyId } = filter;
        const employees = await this.employeeRepository.find({
            where: {
                isDeleted: false,
                companyId: +companyId,
            },
            select: select || {},
        });
        return employees;
    }
    async getAllEmployeesWithWorkSchedule({ companyId, paginationQueryDto, }) {
        const { moduleType, workScheduleIds } = paginationQueryDto;
        const employeeAlias = database_1.ETableName.EMPLOYEE;
        const workScheduleAlias = database_1.ETableName.WORK_SCHEDULE;
        const queryBuilder = this.employeeRepository
            .createQueryBuilder(employeeAlias)
            .where(`${employeeAlias}.companyId = :companyId`, { companyId })
            .andWhere(`${employeeAlias}.isDeleted = :isDeleted`, {
            isDeleted: false,
        })
            .andWhere(`${employeeAlias}.active = :active`, {
            active: true,
        })
            .leftJoinAndSelect(`${employeeAlias}.workSchedule`, workScheduleAlias, `${workScheduleAlias}.isDeleted = :isDeleted AND ${workScheduleAlias}.companyId = :companyId`, { isDeleted: false, companyId });
        if (moduleType === employee_module_type_enum_1.EEmployeeModuleType.WORK_SCHEDULE &&
            workScheduleIds?.length) {
            queryBuilder.andWhere(`(NOT EXISTS (
            SELECT 1
            FROM ${workScheduleAlias}
            WHERE ${workScheduleAlias}.id IN (:...workScheduleIds)
            AND ${workScheduleAlias}.assignees ? ${employeeAlias}.id::text
          ))`, { workScheduleIds });
        }
        const querySearchFields = [
            'email',
            'employeeRef',
            'fullNameEn',
            'fullNameLocal',
        ];
        const { page, take, q: querySearchString, isDeleted = false, ids, createdFrom, isSelectAll, } = paginationQueryDto;
        const alias = queryBuilder.alias;
        const sqlBuilder = new database_1.WhereConditionBuilder(alias);
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
        queryBuilder.select([
            `${employeeAlias}.id`,
            `${employeeAlias}.companyId`,
            `${employeeAlias}.email`,
            `${employeeAlias}.employeeRef`,
            `${employeeAlias}.employeeNo`,
            `${employeeAlias}.fullNameLocal`,
            `${employeeAlias}.fullNameEn`,
            `${employeeAlias}.organizationElementId`,
            `${employeeAlias}.gender`,
            `${employeeAlias}.active`,
            `${employeeAlias}.isDeleted`,
            `${employeeAlias}.isEssEnabled`,
            `${employeeAlias}.workScheduleId`,
            `${employeeAlias}.createdOn`,
            `${workScheduleAlias}.end_work_day_at`,
            `${workScheduleAlias}.id`,
            `${workScheduleAlias}.name`,
            `${workScheduleAlias}.utcOffset`,
            `${workScheduleAlias}.workArrangement`,
            `${workScheduleAlias}.breakType`,
            `${workScheduleAlias}.default`,
            `${workScheduleAlias}.weeklyHours`,
            `${workScheduleAlias}.unitTime`,
            `${workScheduleAlias}.excludeEarlyClockIn`,
            `${workScheduleAlias}.overtimeId`,
            `${workScheduleAlias}.endWorkDayAt`,
            `${workScheduleAlias}.companyId`,
            `${workScheduleAlias}.color`,
            `${workScheduleAlias}.startDate`,
            `${workScheduleAlias}.endDate`,
            `${workScheduleAlias}.state`,
            `${workScheduleAlias}.threshold`,
            `${workScheduleAlias}.ttWorkScheduleId`,
        ]);
        queryBuilder.take(take).skip((page - 1) * take);
        const [entities, count] = await queryBuilder.getManyAndCount();
        return new dto_1.PaginationResponseDto({
            paginationDto: {
                page: page,
                take: take,
                isSelectAll: isSelectAll,
            },
            itemCount: count,
            data: entities,
        });
    }
    async getAllEmployeesWithWorkScheduleDefault(companyId) {
        const employees = await this.employeeRepository.find({
            where: {
                companyId,
                isDeleted: false,
                workScheduleId: (0, typeorm_2.IsNull)(),
            },
        });
        return employees;
    }
    async findEmployeesExistWithEmails(companyId, email) {
        const employees = await this.employeeRepository.find({
            where: {
                companyId,
                isDeleted: false,
                active: true,
                isEssEnabled: true,
                email: (0, typeorm_2.In)(email),
            },
            select: { id: true, email: true },
        });
        if (!employees.length)
            return [];
        return employees.map(({ email }) => email);
    }
    async getEmployeeById(companyId, employeeId) {
        return this.employeeRepository.findOne({
            where: {
                id: employeeId,
                companyId,
                isDeleted: false,
                active: true,
            },
        });
    }
    async getEmployeeByEmployeeRef(companyId, employeeRefs) {
        const employees = this.employeeRepository.find({
            relations: {
                orgStructure: true,
                costCenter: true,
                payrollGroups: true,
                payrollTimeSheets: {
                    prtrxHdr: {
                        prtrxEmps: true,
                    },
                },
            },
            select: {
                id: true,
                organizationElementId: true,
                fullNameEn: true,
                fullNameLocal: true,
                employeeRef: true,
                orgStructure: {
                    id: true,
                    name: true,
                },
                costCenter: {
                    id: true,
                    code: true,
                    name: true,
                },
                payrollGroups: {
                    id: true,
                    code: true,
                },
                payrollTimeSheets: {
                    id: true,
                    prtrxHdrId: true,
                    prtrxHdr: {
                        id: true,
                        prtrxEmps: {
                            id: true,
                            included: true,
                            employeeId: true,
                        },
                    },
                },
            },
            where: { employeeRef: (0, typeorm_2.In)(employeeRefs), companyId },
        });
        return employees;
    }
    async getPayrollTimesheetOfEmployeeByPrtrxHdr(employeeId, hdrId, companyId) {
        const employeeAlias = 'employee';
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const queryBuilder = await this.employeeRepository
            .createQueryBuilder(employeeAlias)
            .leftJoinAndSelect(`${employeeAlias}.payrollTimeSheets`, payrollAlias, `${payrollAlias}.employee_id = ${employeeAlias}.id AND ${payrollAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.prtrx_hdr_id = :prtrxHdrId AND ${payrollAlias}.employee_id = :employeeId`, { prtrxHdrId: hdrId, companyId, employeeId })
            .getOne();
        return queryBuilder?.payrollTimeSheets[0];
    }
    async getPayrollGroupByEmployeeId(employeeId, companyId) {
        const employee = await this.employeeRepository.findOne({
            where: { id: employeeId, companyId, isDeleted: false, active: true },
            relations: { payrollGroups: true },
        });
        if (!employee?.payrollGroups)
            throw new common_1.NotFoundException('Not found payroll groups for employee');
        return employee?.payrollGroups;
    }
    async getPayrollGroupsByEmployeeIds(employeeIds, companyId) {
        const employees = await this.employeeRepository.find({
            where: { id: (0, typeorm_2.In)(employeeIds), companyId, isDeleted: false, active: true },
            relations: { payrollGroups: true },
        });
        return employees.map(employee => employee.payrollGroups);
    }
    async getEmployeeByPayrollTimesheetId(payrollId, companyId) {
        const employeeAlias = 'employee';
        const payrollAlias = database_1.ETableName.PAYROLL_TIME_SHEET;
        const queryBuilder = this.employeeRepository
            .createQueryBuilder(employeeAlias)
            .leftJoinAndSelect(`${employeeAlias}.payrollTimeSheets`, payrollAlias, `${payrollAlias}.employee_id = ${employeeAlias}.id AND ${payrollAlias}.is_deleted = :isDeleted`, { isDeleted: false })
            .where(`${payrollAlias}.company_id = :companyId AND ${payrollAlias}.id = :payrollId`, { companyId, payrollId })
            .getOne();
        return queryBuilder;
    }
    async getAllEmployeeByCompanyId(companyId) {
        return this.employeeRepository.find({
            where: {
                companyId,
                isDeleted: false,
            },
            select: {
                employeeRef: true,
                fullNameLocal: true,
                fullNameEn: true,
                id: true,
            },
        });
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.EmployeeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeeService);
//# sourceMappingURL=employee.service.js.map
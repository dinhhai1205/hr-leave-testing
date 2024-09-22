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
var LeaveTypePolicyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypePolicyService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const typeorm_2 = require("typeorm");
const constants_1 = require("../../../../common/constants");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
const producers_1 = require("../../../../core/queue/producers");
const employee_service_1 = require("../../../user/modules/employee/employee.service");
const leave_trx_service_1 = require("../leave-trx/leave-trx.service");
const leave_type_balance_service_1 = require("../leave-type-balance/leave-type-balance.service");
const leave_type_policy_credit_trx_service_1 = require("../leave-type-policy-credit-trx/leave-type-policy-credit-trx.service");
const leave_type_policy_credit_service_1 = require("../leave-type-policy-credit/leave-type-policy-credit.service");
const leave_type_policy_helper_1 = require("./helpers/leave-type-policy.helper");
let LeaveTypePolicyService = LeaveTypePolicyService_1 = class LeaveTypePolicyService extends services_1.LegacyBaseService {
    constructor(leaveTypePolicyRepository, leaveBalanceService, leaveTypePolicyCreditService, employeeService, leaveTrxService, leaveTypePolicyCreditTrxService, leaveTypePolicyHelper, leaveTypePolicyProducer) {
        super(leaveTypePolicyRepository);
        this.leaveTypePolicyRepository = leaveTypePolicyRepository;
        this.leaveBalanceService = leaveBalanceService;
        this.leaveTypePolicyCreditService = leaveTypePolicyCreditService;
        this.employeeService = employeeService;
        this.leaveTrxService = leaveTrxService;
        this.leaveTypePolicyCreditTrxService = leaveTypePolicyCreditTrxService;
        this.leaveTypePolicyHelper = leaveTypePolicyHelper;
        this.leaveTypePolicyProducer = leaveTypePolicyProducer;
    }
    async createLeaveTypePolicy(input) {
        const { effAfterUnit, effAfterUOM, effAfterType, companyId, ltId } = input;
        await this.existingLeaveTypePolicy({
            effAfterUnit,
            effAfterType,
            effAfterUOM,
            companyId: companyId,
            ltId: ltId,
        });
        return this.leaveTypePolicyRepository.save({
            ...input,
            createdOn: new Date(),
        });
    }
    async updateLeaveTypePolicy(param, input) {
        const { updatedBy, companyId, leaveTypeId } = param;
        const leaveTypePolicies = await this.getLeaveTypePolicies({
            id: input.id,
            ltId: leaveTypeId,
            companyId,
        });
        if (!leaveTypePolicies.length) {
            throw new common_1.NotFoundException(constants_1.ERR_MSG.NOT_FOUND('Leave type policy', `id ${input.id}`));
        }
        const leaveTypePolicy = leaveTypePolicies[0];
        const cloneLeaveTypePolicy = Object.assign({}, leaveTypePolicy);
        delete cloneLeaveTypePolicy.previousPolicySetting;
        const previousLeaveTypePolicy = JSON.stringify(cloneLeaveTypePolicy);
        leaveTypePolicy.updatedBy = updatedBy;
        leaveTypePolicy.previousPolicySetting = previousLeaveTypePolicy;
        const newLeaveTypePolicy = {
            ...leaveTypePolicy,
            ...input,
        };
        await this.existingLeaveTypePolicy({
            id: newLeaveTypePolicy.id,
            effAfterUnit: newLeaveTypePolicy.effAfterUnit,
            effAfterType: newLeaveTypePolicy.effAfterType,
            effAfterUOM: newLeaveTypePolicy.effAfterUOM,
            companyId: companyId,
            ltId: leaveTypeId,
        });
        return this.leaveTypePolicyRepository.save(newLeaveTypePolicy);
    }
    async existingLeaveTypePolicy(params) {
        const existLeaveTypePolicy = await this.leaveTypePolicyRepository.countBy({
            ...params,
            isDeleted: false,
            id: params?.id ? (0, typeorm_2.Not)(params.id) : undefined,
        });
        if (existLeaveTypePolicy) {
            throw new common_1.BadRequestException(constants_1.ERR_MSG.LEAVE_TYPE_POLICY.DUPLICATE_EFFECTIVE);
        }
    }
    async deleteLeaveTypePolicy(params) {
        const { ids, leaveTypeId, companyId, updatedBy } = params;
        const leaveTypePolicies = await this.leaveTypePolicyRepository.find({
            where: { isDeleted: false, companyId, ltId: leaveTypeId, id: (0, typeorm_2.In)(ids) },
            select: { id: true },
        });
        if (!leaveTypePolicies.length)
            return;
        const updatedIds = leaveTypePolicies.map(policy => policy.id);
        return this.leaveTypePolicyRepository.update(updatedIds, {
            isDeleted: true,
            updatedBy,
        });
    }
    async getLeaveTypePolicies(filterLeaveTypePolicy = {}, orderBy = {}, addWhere, select, joinToAssignment) {
        const leaveTypePolicyName = entities_1.LeaveTypePolicyEntity.name;
        const leaveTypeName = entities_1.LeaveTypeEntity.name;
        const ltAssignmentAlias = entities_1.LeaveTypeAssignmentEntity.name;
        const queryBuilder = this.leaveTypePolicyRepository.createQueryBuilder(`${leaveTypePolicyName}`);
        queryBuilder
            .innerJoin(`${leaveTypePolicyName}.leaveType`, leaveTypeName, `
        ${leaveTypeName}.isDeleted = :isDeleted 
        AND ${leaveTypeName}.active = :active
        AND ${leaveTypeName}.parentId IS NULL
      `, { isDeleted: false, active: true })
            .addSelect(`${leaveTypeName}.id`);
        if (joinToAssignment) {
            queryBuilder.leftJoin(`${leaveTypeName}.leaveTypeAssignment`, ltAssignmentAlias, `
          ${ltAssignmentAlias}.isDeleted = :isDeleted
        `, { isDeleted: false });
            queryBuilder.addSelect([
                `${ltAssignmentAlias}.id`,
                `${ltAssignmentAlias}.genderIds`,
                `${ltAssignmentAlias}.mariStsIds`,
                `${ltAssignmentAlias}.jobGradeIds`,
                `${ltAssignmentAlias}.orgEleIds`,
                `${ltAssignmentAlias}.contractTypeIds`,
                `${ltAssignmentAlias}.employeeIds`,
            ]);
        }
        queryBuilder.andWhere(`${leaveTypePolicyName}.isDeleted = :isDeleted`, {
            isDeleted: false,
        });
        for (const [key, value] of Object.entries(filterLeaveTypePolicy)) {
            if (value) {
                const queryCondition = {
                    [key]: value,
                };
                queryBuilder.andWhere(`${leaveTypePolicyName}.${key} = :${key}`, queryCondition);
            }
        }
        if (addWhere) {
            queryBuilder.andWhere(addWhere.where, addWhere.parameter);
        }
        Object.keys(orderBy).forEach(key => {
            queryBuilder.addOrderBy(`${leaveTypePolicyName}.${key}`, orderBy[key]);
        });
        if (select && select.length) {
            queryBuilder.addSelect(select);
        }
        return queryBuilder.getMany();
    }
    async runCreditAlgorithmCronjobBatchEveryDay() {
        common_1.Logger.log(`The credit algorithm has started running...`, LeaveTypePolicyService_1.name);
        const currentDateNoTime = moment.utc().format('YYYY-MM-DD');
        const totalCountSeedEmployee = await this.employeeService
            .getAllEmployeesQueryBuilder()
            .getCount();
        const batchSize = 500;
        const totalBatches = Math.ceil(totalCountSeedEmployee / batchSize);
        common_1.Logger.log(`Total employee will processing: ${totalCountSeedEmployee}` +
            ' - ' +
            `Total batches: ${totalBatches}` +
            ' - ' +
            `Batches size: ${batchSize}`, LeaveTypePolicyService_1.name);
        const creditJobPromises = [];
        for (let index = 0; index < totalBatches; index++) {
            const skip = index * batchSize;
            const creditJob = this.leaveTypePolicyProducer.addCreditJob({
                currentDateNoTime,
                index,
                batchSize,
                skip,
            });
            creditJobPromises.push(creditJob);
        }
        const promiseResults = await Promise.allSettled(creditJobPromises);
        const failedAddedJobs = promiseResults.filter(result => result.status === 'rejected').length;
        common_1.Logger.log(`Success added jobs: ${totalBatches - failedAddedJobs}` +
            ' - ' +
            `Fail added jobs: ${failedAddedJobs}\n` +
            `The credit algorithm has ended.`, LeaveTypePolicyService_1.name);
        return promiseResults;
    }
    async leaveTypePolicyCreditAlgorithm(filter = {}, { batchSize, skip } = {}) {
        const { companyId = undefined, leaveTypeId = undefined, employeeIds = undefined, payrollGroupIds = undefined, authMail = enums_1.EDefaultEmail.CRON_JOB, date, } = filter;
        const seedEmployees = await this.employeeService.getAllEmployees({ companyId, idArr: employeeIds, payrollGroupIdArr: payrollGroupIds }, { batchSize, skip });
        if (!seedEmployees.length)
            return;
        const companyIds = seedEmployees.map(({ companyId }) => companyId);
        const joinToAssignment = true;
        const seedLeaveTypePolicies = await this.getLeaveTypePolicies({ ltId: leaveTypeId }, {
            companyId: 'ASC',
            ltId: 'ASC',
            effAfterUOM: 'ASC',
            effAfterUnit: 'ASC',
        }, {
            where: `
          ${entities_1.LeaveTypePolicyEntity.name}.companyId IN (:...companyIds)
          AND ${entities_1.LeaveTypePolicyEntity.name}.effAfterUnit IS NOT NULL
          AND ${entities_1.LeaveTypePolicyEntity.name}.effAfterUnit > 0
          AND ${entities_1.LeaveTypePolicyEntity.name}.effAfterType IS NOT NULL
          AND ${entities_1.LeaveTypePolicyEntity.name}.effAfterUOM IS NOT NULL
          AND ${entities_1.LeaveTypePolicyEntity.name}.entitlement IS NOT NULL
          AND ${entities_1.LeaveTypePolicyEntity.name}.entitlement > 0
        `,
            parameter: { companyIds },
        }, undefined, joinToAssignment);
        if (!seedLeaveTypePolicies)
            return;
        const currentDate = date ? moment.utc(date) : moment.utc();
        const insertLeaveTrx = [];
        const insertLeaveTypePolicyCreditTrx = [];
        const updateLeaveTypeBalances = [];
        const updateLeaveTypePolicyCredits = [];
        const initLeaveTypeBalanceParams = [];
        const initLeaveTypePolicyCreditParams = [];
        const employees = seedEmployees.filter(employee => {
            const utcOffset = employee?.aspNetUsers?.utcOffset ?? 0;
            const currentDateOffset = currentDate.clone().utcOffset(utcOffset);
            const possiblePolicy = this.leaveTypePolicyHelper.findPossiblePoliciesWithEmployee({
                utcOffset,
                currentDate: currentDateOffset,
                employee,
                policies: seedLeaveTypePolicies,
            });
            if ((0, utils_1.isEmptyObject)(possiblePolicy))
                return false;
            const { possiblePolicy: latestPossiblePolicy, balanceNeedInitial, creditNeedInitial, } = this.leaveTypePolicyHelper.findBalanceAndCreditOfEmployeeForPossiblePolicy({ possiblePolicy, employee, authMail });
            employee.possiblePolicy = latestPossiblePolicy;
            initLeaveTypeBalanceParams.push(...balanceNeedInitial);
            initLeaveTypePolicyCreditParams.push(...creditNeedInitial);
            return true;
        });
        const [initiatedBalances, initiatedCredits] = await Promise.all([
            this.leaveBalanceService.initialNewRecords(initLeaveTypeBalanceParams),
            this.leaveTypePolicyCreditService.initialNewRecords(initLeaveTypePolicyCreditParams),
        ]);
        for (const employee of employees) {
            const utcOffset = employee?.aspNetUsers?.utcOffset ?? 0;
            const currentDateOffset = currentDate.clone().utcOffset(utcOffset);
            const { possiblePolicy } = employee;
            if (!possiblePolicy)
                continue;
            for (const [, element] of Object.entries(possiblePolicy)) {
                const { closestPolicy: leaveTypePolicy, closestEffectiveDate: effectiveDate, } = element;
                const { companyId } = leaveTypePolicy;
                const balanceInfo = this.leaveTypePolicyHelper.reFindBalanceAndCredit({
                    employee,
                    initiatedBalances,
                    initiatedCredits,
                    leaveTypePolicy,
                    leaveTypeBalance: element?.leaveTypeBalance,
                    cfLeaveTypeBalance: element?.cfLeaveTypeBalance,
                    leaveTypePolicyCredit: element?.leaveTypePolicyCredit,
                });
                let { leaveTypePolicyCredit, leaveTypeBalance, cfLeaveTypeBalance } = balanceInfo;
                if (!leaveTypeBalance || !leaveTypePolicyCredit)
                    continue;
                if (this.leaveTypePolicyHelper.policyHasCarryForwardSetting(leaveTypePolicy) &&
                    !cfLeaveTypeBalance) {
                    continue;
                }
                let hasChangesCreditBalance = false;
                const renewalMoment = this.leaveTypePolicyHelper.getRenewalMoment({
                    currentYear: currentDate.year(),
                    utcOffset: utcOffset,
                    renewYearly: leaveTypePolicy.renewYearly,
                    renewType: leaveTypePolicy.renewType,
                    renewOnDay: leaveTypePolicy.renewOnDay,
                    renewOnMonth: leaveTypePolicy.renewOnMonth,
                    contractStartDate: employee.contractDateFrom,
                });
                const expires = this.expiresAlgorithm({
                    authMail,
                    companyId,
                    renewalMoment,
                    currentDate: currentDateOffset,
                    effectiveDate,
                    utcOffset,
                    employee,
                    leaveTypePolicy,
                    leaveTypeBalance,
                    leaveTypePolicyCredit,
                });
                if (expires) {
                    hasChangesCreditBalance = true;
                    leaveTypePolicyCredit = expires.leaveTypePolicyCredit;
                    leaveTypeBalance = expires.leaveTypeBalance;
                    insertLeaveTrx.push(expires.leaveTrx);
                    insertLeaveTypePolicyCreditTrx.push(expires.leaveTypePolicyCreditTrx);
                }
                const cloneLeaveTypeBalance = structuredClone(leaveTypeBalance);
                const carryForward = this.carryForwardAlgorithm({
                    authMail,
                    companyId,
                    renewalMoment,
                    currentDate: currentDateOffset,
                    effectiveDate,
                    utcOffset,
                    employee,
                    leaveTypePolicy,
                    leaveTypeBalance: cloneLeaveTypeBalance,
                    cfLeaveTypeBalance,
                    leaveTypePolicyCredit,
                });
                if (carryForward) {
                    hasChangesCreditBalance = true;
                    if (carryForward.detectedCfToNewLeaveType) {
                        updateLeaveTypeBalances.push(carryForward.leaveTypeBalance);
                        leaveTypeBalance.balance = 0;
                    }
                    else {
                        leaveTypeBalance = carryForward.leaveTypeBalance;
                    }
                    leaveTypePolicyCredit = carryForward.leaveTypePolicyCredit;
                    insertLeaveTrx.push(carryForward.leaveTrx);
                    insertLeaveTypePolicyCreditTrx.push(carryForward.leaveTypePolicyCreditTrx);
                }
                const renewalYearly = this.renewalYearlyAlgorithm({
                    authMail,
                    companyId,
                    renewalMoment,
                    currentDate: currentDateOffset,
                    effectiveDate,
                    utcOffset,
                    employee,
                    leaveTypePolicy,
                    leaveTypeBalance: structuredClone(leaveTypeBalance),
                    leaveTypePolicyCredit,
                });
                if (renewalYearly) {
                    leaveTypePolicyCredit = renewalYearly.leaveTypePolicyCredit;
                    leaveTypeBalance = renewalYearly.leaveTypeBalance;
                    insertLeaveTypePolicyCreditTrx.push(renewalYearly.leaveTypePolicyCreditTrx);
                    insertLeaveTrx.push(renewalYearly.leaveTrx);
                }
                const credit = this.creditAlgorithm({
                    authMail,
                    companyId,
                    currentDate: currentDateOffset,
                    effectiveDate,
                    utcOffset,
                    employee,
                    leaveTypePolicy,
                    leaveTypeBalance,
                    leaveTypePolicyCredit,
                });
                if (credit) {
                    hasChangesCreditBalance = true;
                    leaveTypePolicyCredit = credit.leaveTypePolicyCredit;
                    leaveTypeBalance = credit.leaveTypeBalance;
                    insertLeaveTrx.push(credit.leaveTrx);
                    insertLeaveTypePolicyCreditTrx.push(credit.leaveTypePolicyCreditTrx);
                }
                if (hasChangesCreditBalance) {
                    updateLeaveTypeBalances.push(leaveTypeBalance);
                    updateLeaveTypePolicyCredits.push(leaveTypePolicyCredit);
                }
            }
        }
        await Promise.all([
            this.leaveTrxService.repository.save(insertLeaveTrx),
            this.leaveTypePolicyCreditTrxService.repository.save(insertLeaveTypePolicyCreditTrx),
            this.leaveTypePolicyCreditService.repository.save(updateLeaveTypePolicyCredits),
            this.leaveBalanceService.repository.save(updateLeaveTypeBalances),
        ]);
        return {
            insertLeaveTrx,
            insertLeaveTypePolicyCreditTrx,
            updateLeaveTypePolicyCredits,
            updateLeaveTypeBalances,
        };
    }
    creditAlgorithm({ companyId, currentDate, effectiveDate, leaveTypePolicy, leaveTypePolicyCredit, leaveTypeBalance, authMail, employee, utcOffset, }) {
        if (!leaveTypePolicy.prorateEntitlement &&
            leaveTypePolicyCredit.creditedOn) {
            return null;
        }
        const originalCredit = {
            creditRemaining: leaveTypePolicyCredit.creditRemaining,
            carryForwardRemaining: leaveTypePolicyCredit.carryForwardRemaining,
        };
        const originalBalance = leaveTypeBalance.balance;
        const enabledProrateEntitlement = leaveTypePolicy.prorateEntitlement;
        const maxEntitlement = leaveTypePolicy.entitlement;
        let creditLeaves = enabledProrateEntitlement
            ? this.leaveTypePolicyHelper.prorateLeaveMonthByMonth({
                currentDate,
                utcOffset,
                leaveTypePolicy,
                leaveTypePolicyCredit,
            })
            : maxEntitlement;
        creditLeaves = Math.min(creditLeaves, maxEntitlement);
        const creditDiff = enabledProrateEntitlement
            ? creditLeaves - leaveTypePolicyCredit.creditRemaining
            : creditLeaves - leaveTypePolicyCredit.credit;
        if (!creditDiff)
            return null;
        if (enabledProrateEntitlement || !leaveTypePolicyCredit.creditedOn) {
            leaveTypePolicyCredit.creditedOn = currentDate.clone().toDate();
        }
        leaveTypePolicyCredit.credit = Math.min(leaveTypePolicyCredit.credit + creditDiff, maxEntitlement);
        leaveTypePolicyCredit.creditRemaining += creditDiff;
        leaveTypePolicyCredit.updatedBy = authMail;
        leaveTypeBalance.balance += creditDiff;
        leaveTypeBalance.updatedBy = authMail;
        leaveTypePolicyCredit.creditRemaining = (0, utils_1.roundUp2Decimals)(leaveTypePolicyCredit.creditRemaining);
        leaveTypePolicyCredit.carryForwardRemaining = (0, utils_1.roundUp2Decimals)(leaveTypePolicyCredit.carryForwardRemaining);
        leaveTypeBalance.balance = (0, utils_1.roundUp2Decimals)(leaveTypeBalance.balance);
        const { leaveTrx, leaveTypePolicyCreditTrx } = this.generateTransactions({
            authMail,
            currentDate,
            companyId,
            effectiveDate,
            employee,
            leaveTypeBalance,
            leaveTypePolicy,
            leaveTypePolicyCredit,
            type: enabledProrateEntitlement
                ? enums_1.EHistoryType.CREDIT_PRORATE
                : enums_1.EHistoryType.CREDIT,
            originalCredit,
            originalBalance,
            utcOffset,
        });
        return {
            leaveTypeBalance,
            leaveTypePolicyCredit,
            leaveTrx,
            leaveTypePolicyCreditTrx,
        };
    }
    carryForwardAlgorithm({ companyId, renewalMoment, effectiveDate, currentDate, leaveTypePolicy, leaveTypeBalance, cfLeaveTypeBalance, leaveTypePolicyCredit, employee, authMail, utcOffset, }) {
        if (!renewalMoment)
            return null;
        let detectedCfToNewLeaveType = false;
        if (!leaveTypePolicy.cfType)
            return null;
        if (leaveTypePolicy.cfType !== enums_1.EPolicyCarryForwardType.ALL &&
            !leaveTypePolicy.cfUnit) {
            return null;
        }
        if (!leaveTypePolicyCredit)
            return null;
        if (!leaveTypePolicyCredit.creditedOn)
            return null;
        if (!leaveTypePolicyCredit.creditRemaining)
            return null;
        if (leaveTypePolicyCredit.carryForwardOn) {
            const carryForwardOnClone = moment
                .utc(leaveTypePolicyCredit.carryForwardOn)
                .clone()
                .utcOffset(utcOffset);
            if (currentDate.isSame(carryForwardOnClone, 'date'))
                return null;
        }
        if (renewalMoment.isBefore(effectiveDate))
            return null;
        if (renewalMoment.isAfter(currentDate))
            return null;
        if (!renewalMoment.isSame(currentDate, 'date'))
            return null;
        const unusedLeaves = Math.max(leaveTypeBalance.balance, 0);
        if (leaveTypePolicy.cfLtId &&
            leaveTypePolicy.ltId !== leaveTypePolicy.cfLtId) {
            detectedCfToNewLeaveType = true;
            leaveTypeBalance = cfLeaveTypeBalance;
        }
        const originalCredit = {
            creditRemaining: leaveTypePolicyCredit.creditRemaining,
            carryForwardRemaining: leaveTypePolicyCredit.carryForwardRemaining,
        };
        const originalBalance = leaveTypeBalance.balance;
        const carryForwardBalance = this.leaveTypePolicyHelper.getCarryForwardBalance({
            unusedLeaves,
            cfUnit: leaveTypePolicy.cfUnit,
            cfType: leaveTypePolicy.cfType,
            maxEntitlement: leaveTypePolicy.entitlement,
        });
        leaveTypePolicyCredit.creditRemaining = 0;
        leaveTypePolicyCredit.carryForwardRemaining = carryForwardBalance;
        leaveTypePolicyCredit.updatedBy = authMail;
        leaveTypeBalance.balance = carryForwardBalance;
        leaveTypeBalance.updatedBy = authMail;
        leaveTypePolicyCredit.creditRemaining = (0, utils_1.roundUp2Decimals)(leaveTypePolicyCredit.creditRemaining);
        leaveTypePolicyCredit.carryForwardRemaining = (0, utils_1.roundUp2Decimals)(leaveTypePolicyCredit.carryForwardRemaining);
        leaveTypeBalance.balance = (0, utils_1.roundUp2Decimals)(leaveTypeBalance.balance);
        const { leaveTrx, leaveTypePolicyCreditTrx } = this.generateTransactions({
            authMail,
            currentDate,
            companyId,
            effectiveDate,
            employee,
            leaveTypeBalance,
            leaveTypePolicy,
            leaveTypePolicyCredit,
            type: enums_1.EHistoryType.CARRY_FORWARD,
            originalCredit,
            originalBalance,
            utcOffset,
        });
        return {
            leaveTypeBalance,
            leaveTypePolicyCredit,
            leaveTrx,
            leaveTypePolicyCreditTrx,
            detectedCfToNewLeaveType,
        };
    }
    expiresAlgorithm({ companyId, renewalMoment, effectiveDate, leaveTypePolicy, currentDate, leaveTypeBalance, leaveTypePolicyCredit, employee, authMail, utcOffset, }) {
        if (!renewalMoment)
            return null;
        if (!leaveTypePolicyCredit)
            return null;
        if (!leaveTypePolicyCredit.carryForwardRemaining)
            return null;
        if (!leaveTypePolicyCredit.carryForwardOn)
            return null;
        if (leaveTypePolicyCredit.expiresOn) {
            const expiresOnClone = moment
                .utc(leaveTypePolicyCredit.expiresOn)
                .clone()
                .utcOffset(utcOffset);
            if (currentDate.isSame(expiresOnClone, 'date'))
                return null;
        }
        const expiresMoment = this.leaveTypePolicyHelper.getExpiresMoment({
            currentYear: currentDate.year(),
            utcOffset,
            expireType: leaveTypePolicy.expireType,
            expireOnDay: leaveTypePolicy.expireOnDay,
            expireOnMonth: leaveTypePolicy.expireOnMonth,
            expireInDays: leaveTypePolicy.expireInDays,
            expireInFrom: leaveTypePolicy.expireInFrom,
            renewalMoment,
        });
        if (!expiresMoment)
            return null;
        if (expiresMoment.isBefore(effectiveDate))
            return null;
        if (expiresMoment.isAfter(currentDate))
            return null;
        if (!expiresMoment.isSame(currentDate, 'date'))
            return null;
        const originalCredit = {
            creditRemaining: leaveTypePolicyCredit.creditRemaining,
            carryForwardRemaining: leaveTypePolicyCredit.carryForwardRemaining,
        };
        const originalBalance = leaveTypeBalance.balance;
        const { carryForwardRemaining } = leaveTypePolicyCredit;
        leaveTypePolicyCredit.carryForwardRemaining = 0;
        leaveTypePolicyCredit.expiresOn = currentDate.toDate();
        leaveTypePolicyCredit.updatedBy = authMail;
        leaveTypeBalance.balance -= carryForwardRemaining;
        leaveTypeBalance.updatedBy = authMail;
        leaveTypePolicyCredit.creditRemaining = (0, utils_1.roundUp2Decimals)(leaveTypePolicyCredit.creditRemaining);
        leaveTypePolicyCredit.carryForwardRemaining = (0, utils_1.roundUp2Decimals)(leaveTypePolicyCredit.carryForwardRemaining);
        leaveTypeBalance.balance = (0, utils_1.roundUp2Decimals)(leaveTypeBalance.balance);
        const { leaveTrx, leaveTypePolicyCreditTrx } = this.generateTransactions({
            authMail,
            currentDate,
            companyId,
            effectiveDate,
            employee,
            leaveTypeBalance,
            leaveTypePolicy,
            leaveTypePolicyCredit,
            type: enums_1.EHistoryType.CARRY_FORWARD_EXPIRES,
            originalCredit,
            originalBalance,
            utcOffset,
        });
        return {
            leaveTypeBalance,
            leaveTypePolicyCredit,
            leaveTrx,
            leaveTypePolicyCreditTrx,
        };
    }
    renewalYearlyAlgorithm({ companyId, renewalMoment, effectiveDate, currentDate, leaveTypePolicy, leaveTypeBalance, leaveTypePolicyCredit, employee, authMail, utcOffset, }) {
        if (!renewalMoment)
            return null;
        if (!leaveTypePolicyCredit)
            return null;
        if (leaveTypePolicyCredit.carryForwardOn) {
            const carryForwardOnClone = moment
                .utc(leaveTypePolicyCredit.carryForwardOn)
                .clone()
                .utcOffset(utcOffset);
            if (currentDate.isSame(carryForwardOnClone, 'date'))
                return null;
        }
        if (!renewalMoment.isSame(currentDate, 'date'))
            return null;
        const originalBalance = Number(leaveTypeBalance.balance).valueOf();
        const originalCredit = Number(leaveTypePolicyCredit.credit).valueOf();
        const originalCreditRemaining = Number(leaveTypePolicyCredit.creditRemaining).valueOf();
        const isProratePolicy = leaveTypePolicy.prorateEntitlement;
        let renewalCredit = originalCredit;
        if (isProratePolicy) {
            delete leaveTypePolicyCredit.creditedOn;
            leaveTypePolicyCredit.credit = 0;
            leaveTypePolicyCredit.creditRemaining = 0;
            renewalCredit = 0;
        }
        else {
            renewalCredit = leaveTypePolicy.entitlement;
        }
        leaveTypeBalance.balance += renewalCredit;
        leaveTypeBalance.balance = (0, utils_1.roundUp2Decimals)(leaveTypeBalance.balance);
        leaveTypeBalance.updatedBy = authMail;
        leaveTypePolicyCredit.carryForwardOn = currentDate.toDate();
        const { leaveTrx, leaveTypePolicyCreditTrx } = this.generateTransactions({
            authMail,
            currentDate,
            companyId,
            effectiveDate,
            employee,
            leaveTypeBalance,
            leaveTypePolicy,
            leaveTypePolicyCredit,
            type: enums_1.EHistoryType.RENEWAL_YEARLY,
            originalCredit: {
                carryForwardRemaining: leaveTypePolicyCredit.carryForwardRemaining,
                creditRemaining: originalCreditRemaining,
            },
            originalBalance,
            utcOffset,
        });
        return {
            leaveTypeBalance,
            leaveTrx,
            leaveTypePolicyCredit,
            leaveTypePolicyCreditTrx,
        };
    }
    generateTransactions(args) {
        const { currentDate, authMail, companyId, employee, leaveTypeBalance, leaveTypePolicy, type, leaveTypePolicyCredit, originalBalance, originalCredit, utcOffset, } = args;
        const effDate = new Date(args.effectiveDate.clone().format('YYYY-MM-DD'));
        const diffBalance = leaveTypeBalance.balance - originalBalance;
        const diffCredit = type === enums_1.EHistoryType.CREDIT || type === enums_1.EHistoryType.CREDIT_PRORATE
            ? leaveTypePolicyCredit.creditRemaining - originalCredit.creditRemaining
            : leaveTypePolicyCredit.carryForwardRemaining -
                originalCredit.carryForwardRemaining;
        return {
            leaveTrx: this.leaveTrxService.initialLeaveTrx({
                authMail,
                currentDate: currentDate.clone().utcOffset(utcOffset).toDate(),
                companyId,
                effDate,
                employeeId: employee.id,
                employeeRef: employee.employeeRef,
                leaveTypeId: leaveTypeBalance.leaveTypeId,
                leaveTypePolicy: leaveTypePolicy,
                leavePolicyId: leaveTypePolicy.id,
                previousPolicySetting: leaveTypePolicy?.previousPolicySetting,
                joinDate: leaveTypePolicy.effAfterType === enums_1.EPolicyEffectiveType.JOINING_DATE
                    ? employee.joinDate
                    : employee.confirmDate,
                type,
                sign: diffBalance >= 0 ? enums_1.EHistorySign.ADD : enums_1.EHistorySign.MINUS,
                unit: Math.abs(diffBalance),
                balance: leaveTypeBalance.balance,
            }),
            leaveTypePolicyCreditTrx: this.leaveTypePolicyCreditTrxService.initialTrx({
                authMail,
                currentDate: currentDate.clone().utcOffset(utcOffset).toDate(),
                companyId,
                employeeId: employee.id,
                leaveId: undefined,
                leaveTypePolicyCreditUUID: leaveTypePolicyCredit.uuid,
                leaveTypePolicy,
                previousPolicySetting: leaveTypePolicy?.previousPolicySetting,
                type,
                sign: diffCredit >= 0 ? enums_1.EHistorySign.ADD : enums_1.EHistorySign.MINUS,
                unit: Math.abs(diffCredit),
                creditRemaining: leaveTypePolicyCredit.creditRemaining,
                carryForwardRemaining: leaveTypePolicyCredit.carryForwardRemaining,
                leaveTypeId: leaveTypePolicy.ltId,
                leaveTypePolicyId: leaveTypePolicy.id,
            }),
        };
    }
    async deductLeaveTypePolicyCredit(filter) {
        const { leaveTypeId = 0, leaveId = 0, companyId = 0, employeeId = 0, amountLeaveDeduct = 0, authMail = enums_1.EDefaultEmail.CRON_JOB, } = filter;
        if (!leaveId || !leaveTypeId || !amountLeaveDeduct)
            return;
        const latestTrx = await this.leaveTrxService.repository.findOne({
            where: {
                companyId,
                employeeId,
                leaveTypeId,
                isDeleted: false,
                type: (0, typeorm_2.In)([enums_1.EHistoryType.CREDIT, enums_1.EHistoryType.CREDIT_PRORATE]),
            },
            order: { id: 'DESC' },
            select: { id: true, policyId: true },
            relations: ['policy'],
        });
        if (!latestTrx || !latestTrx.policy)
            return;
        const policy = latestTrx.policy;
        const leavePolicyCredit = await this.leaveTypePolicyCreditService.repository.findOne({
            where: {
                employeeId,
                companyId,
                isDeleted: false,
                leavePolicyId: policy.id,
            },
        });
        if (!leavePolicyCredit)
            return;
        const currentDate = new Date();
        const insertLeaveTypePolicyCreditTrx = [];
        const { creditRemaining, carryForwardRemaining } = leavePolicyCredit;
        let deductAmount = new Number(amountLeaveDeduct).valueOf();
        if (carryForwardRemaining > 0) {
            const deductCarryForwardDiff = (0, utils_1.roundUp2Decimals)(carryForwardRemaining - deductAmount);
            deductAmount = Math.abs(deductCarryForwardDiff);
            leavePolicyCredit.carryForwardRemaining = Math.max(0, deductCarryForwardDiff);
            insertLeaveTypePolicyCreditTrx.push(this.leaveTypePolicyCreditTrxService.initialTrx({
                authMail,
                companyId,
                currentDate,
                employeeId,
                leaveId,
                leaveTypePolicyCreditUUID: leavePolicyCredit.uuid,
                leaveTypePolicy: policy,
                previousPolicySetting: policy?.previousPolicySetting,
                type: enums_1.EHistoryType.DEDUCT_CARRY_FORWARD,
                sign: enums_1.EHistorySign.MINUS,
                unit: (0, utils_1.roundUp2Decimals)(carryForwardRemaining - leavePolicyCredit.carryForwardRemaining),
                creditRemaining,
                carryForwardRemaining: leavePolicyCredit.carryForwardRemaining,
                leaveTypeId: policy.ltId,
                leaveTypePolicyId: policy.id,
            }));
        }
        if (creditRemaining > 0 && deductAmount > 0) {
            leavePolicyCredit.creditRemaining = Math.max(0, (0, utils_1.roundUp2Decimals)(creditRemaining - deductAmount));
            insertLeaveTypePolicyCreditTrx.push(this.leaveTypePolicyCreditTrxService.initialTrx({
                authMail,
                companyId,
                currentDate,
                employeeId,
                leaveId,
                leaveTypePolicyCreditUUID: leavePolicyCredit.uuid,
                leaveTypePolicy: policy,
                previousPolicySetting: policy?.previousPolicySetting,
                type: enums_1.EHistoryType.DEDUCT_CREDIT,
                sign: enums_1.EHistorySign.MINUS,
                unit: (0, utils_1.roundUp2Decimals)(creditRemaining - leavePolicyCredit.creditRemaining),
                creditRemaining: leavePolicyCredit.creditRemaining,
                carryForwardRemaining: leavePolicyCredit.carryForwardRemaining,
                leaveTypeId: policy.ltId,
                leaveTypePolicyId: policy.id,
            }));
        }
        await Promise.all([
            this.leaveTypePolicyCreditService.repository.save(leavePolicyCredit),
            this.leaveTypePolicyCreditTrxService.repository.save(insertLeaveTypePolicyCreditTrx),
        ]);
    }
    async revertLeaveTypePolicyCredit(filter) {
        const { leaveId = 0, companyId = 0, employeeId = 0, authMail = enums_1.EDefaultEmail.CRON_JOB, } = filter;
        if (!leaveId)
            return;
        const deductionTrx = await this.leaveTypePolicyCreditTrxService.repository.find({
            where: {
                companyId,
                employeeId,
                leaveId,
                isDeleted: false,
                sign: enums_1.EHistorySign.MINUS,
            },
            order: { type: 'ASC' },
        });
        if (!deductionTrx.length)
            return;
        const leavePolicyCreditUUID = deductionTrx[0].leaveTypePolicyCreditUUID;
        const leavePolicyCredit = await this.leaveTypePolicyCreditService.repository.findOne({
            where: { uuid: leavePolicyCreditUUID, isDeleted: false },
            relations: ['leavePolicy'],
        });
        if (!leavePolicyCredit)
            return;
        const currentDate = new Date();
        const insertLeaveTypePolicyCreditTrx = [];
        const { leavePolicy, uuid, creditRemaining, carryForwardRemaining } = leavePolicyCredit;
        for (const trx of deductionTrx) {
            if (trx.type === enums_1.EHistoryType.DEDUCT_CREDIT) {
                leavePolicyCredit.creditRemaining += trx.unit;
                insertLeaveTypePolicyCreditTrx.push(this.leaveTypePolicyCreditTrxService.initialTrx({
                    authMail,
                    companyId,
                    currentDate,
                    employeeId,
                    leaveId,
                    leaveTypePolicyCreditUUID: uuid,
                    leaveTypePolicy: leavePolicy,
                    previousPolicySetting: leavePolicy?.previousPolicySetting,
                    type: enums_1.EHistoryType.REVERT_DEDUCT_CREDIT,
                    sign: enums_1.EHistorySign.ADD,
                    unit: leavePolicyCredit.creditRemaining - creditRemaining,
                    creditRemaining: leavePolicyCredit.creditRemaining,
                    carryForwardRemaining: leavePolicyCredit.carryForwardRemaining,
                    leaveTypeId: leavePolicy.ltId,
                    leaveTypePolicyId: leavePolicy.id,
                }));
            }
            else if (trx.type === enums_1.EHistoryType.DEDUCT_CARRY_FORWARD) {
                leavePolicyCredit.carryForwardRemaining += trx.unit;
                insertLeaveTypePolicyCreditTrx.push(this.leaveTypePolicyCreditTrxService.initialTrx({
                    authMail,
                    companyId,
                    currentDate,
                    employeeId,
                    leaveId,
                    leaveTypePolicyCreditUUID: uuid,
                    leaveTypePolicy: leavePolicy,
                    previousPolicySetting: leavePolicy?.previousPolicySetting,
                    type: enums_1.EHistoryType.REVERT_DEDUCT_CARRY_FORWARD,
                    sign: enums_1.EHistorySign.ADD,
                    unit: leavePolicyCredit.carryForwardRemaining - carryForwardRemaining,
                    creditRemaining: leavePolicyCredit.creditRemaining,
                    carryForwardRemaining: leavePolicyCredit.carryForwardRemaining,
                    leaveTypeId: leavePolicy.ltId,
                    leaveTypePolicyId: leavePolicy.id,
                }));
            }
        }
        await Promise.all([
            this.leaveTypePolicyCreditService.repository.save(leavePolicyCredit),
            this.leaveTypePolicyCreditTrxService.repository.save(insertLeaveTypePolicyCreditTrx),
        ]);
    }
};
exports.LeaveTypePolicyService = LeaveTypePolicyService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM, { utcOffset: 8 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeaveTypePolicyService.prototype, "runCreditAlgorithmCronjobBatchEveryDay", null);
exports.LeaveTypePolicyService = LeaveTypePolicyService = LeaveTypePolicyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LeaveTypePolicyEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        leave_type_balance_service_1.LeaveTypeBalanceService,
        leave_type_policy_credit_service_1.LeaveTypePolicyCreditService,
        employee_service_1.EmployeeService,
        leave_trx_service_1.LeaveTrxService,
        leave_type_policy_credit_trx_service_1.LeaveTypePolicyCreditTrxService,
        leave_type_policy_helper_1.LeaveTypePolicyHelper,
        producers_1.LeaveTypePolicyProducer])
], LeaveTypePolicyService);
//# sourceMappingURL=leave-type-policy.service.js.map
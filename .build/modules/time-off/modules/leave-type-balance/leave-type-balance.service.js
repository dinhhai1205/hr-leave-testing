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
exports.LeaveTypeBalanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../../../common/enums");
const utils_1 = require("../../../../common/utils");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
const leave_trx_service_1 = require("../leave-trx/leave-trx.service");
let LeaveTypeBalanceService = class LeaveTypeBalanceService extends services_1.LegacyBaseService {
    constructor(leaveTypeBalanceRepository, leaveTrxService) {
        super(leaveTypeBalanceRepository);
        this.leaveTypeBalanceRepository = leaveTypeBalanceRepository;
        this.leaveTrxService = leaveTrxService;
    }
    async getLeaveTypeBalanceOrInitial(companyId, employeeId, leaveTypeId, leaveTypeBalanceMemo, authMail) {
        const memoKey = `${companyId}:${employeeId}:${leaveTypeId}`;
        const memoValue = leaveTypeBalanceMemo[memoKey];
        if (memoValue) {
            return memoValue;
        }
        let leaveTypeBalance = await this.repository.findOne({
            where: { isDeleted: false, companyId, employeeId, leaveTypeId },
        });
        if (!leaveTypeBalance) {
            leaveTypeBalance = await this.repository.save({
                companyId,
                employeeId,
                leaveTypeId,
                balance: 0,
                createdBy: authMail,
            });
        }
        return leaveTypeBalance;
    }
    async manualUpdateLeaveTypeBalance(companyId = 0, inputs = [], authMail) {
        if (!inputs.length)
            return;
        inputs = this.removeDuplicate(inputs);
        await Promise.all(inputs.map(input => this.insertTrx(companyId, input, authMail)));
    }
    async insertTrx(companyId, input, authMail) {
        const { date, employeeId, leaveTypeId, newBalance } = input;
        const [{ balance, transactions }, leaveTypeBalance] = await Promise.all([
            this.calBalanceUpTo({
                employeeId,
                leaveTypeId,
                date: new Date(date),
                authMail,
            }),
            this.leaveTypeBalanceRepository.findOne({
                where: { companyId, employeeId, leaveTypeId, isDeleted: false },
            }),
        ]);
        if (!leaveTypeBalance)
            throw new common_1.BadRequestException();
        const currentDate = new Date();
        const initNewTrx = {
            companyId,
            employeeId,
            createdBy: authMail,
            createdOn: currentDate,
            leaveTypeId,
            date: date,
            type: enums_1.EHistoryType.MANUAL,
            unit: Math.abs(newBalance - balance),
            sign: newBalance - balance < 0 ? enums_1.EHistorySign.MINUS : enums_1.EHistorySign.ADD,
            balance: 0,
        };
        initNewTrx.balance = newBalance;
        transactions.push(initNewTrx);
        const { balance: lastBalance, transactions: transactionsFrom } = await this.calBalanceFrom({
            employeeId,
            leaveTypeId,
            date: new Date(date),
            authMail,
            lastBalance: initNewTrx.balance,
        });
        leaveTypeBalance.balance = lastBalance;
        leaveTypeBalance.updatedBy = authMail;
        leaveTypeBalance.updatedOn = currentDate;
        await Promise.all([
            this.leaveTypeBalanceRepository.save(leaveTypeBalance),
            this.leaveTrxService.repository.save([
                ...transactions,
                ...transactionsFrom,
            ]),
        ]);
    }
    async calBalanceUpTo(filter) {
        const { employeeId, leaveTypeId, date, authMail } = filter;
        let balance = 0;
        const transactions = await this.leaveTrxService.repository.find({
            where: {
                isDeleted: false,
                employeeId,
                leaveTypeId,
                date: (0, typeorm_2.LessThanOrEqual)(date),
            },
            order: { date: 'ASC', id: 'ASC' },
        });
        for (const transaction of transactions) {
            const { sign, unit } = transaction;
            balance = balance + Number(sign) * Number(unit);
            transaction.balance = balance;
            transaction.updatedBy = authMail;
            transaction.updatedOn = new Date();
        }
        return { balance, transactions };
    }
    async calBalanceFrom(filter) {
        const { employeeId, leaveTypeId, date, authMail, lastBalance } = filter;
        let balance = Number(lastBalance).valueOf();
        const transactions = await this.leaveTrxService.repository.find({
            where: {
                isDeleted: false,
                employeeId,
                leaveTypeId,
                date: (0, typeorm_2.MoreThan)(date),
            },
            order: { date: 'ASC', id: 'ASC' },
        });
        for (const transaction of transactions) {
            const { sign, unit } = transaction;
            balance = balance + Number(sign) * Number(unit);
            transaction.balance = balance;
            transaction.updatedBy = authMail;
            transaction.updatedOn = new Date();
        }
        return { balance, transactions };
    }
    removeFirstMatch(str, word) {
        const index = str.indexOf(word);
        if (index === -1) {
            return str;
        }
        return str.slice(0, index) + str.slice(index + word.length);
    }
    removeDuplicate(inputs = []) {
        return inputs.filter((obj, index, self) => {
            return (index ===
                self.findIndex(t => t.employeeId === obj.employeeId &&
                    t.leaveTypeId === obj.leaveTypeId));
        });
    }
    initialSeedParam(param) {
        return {
            companyId: param.companyId,
            employeeId: param.employeeId,
            leaveTypeId: param.leaveTypeId,
            balance: 0,
            createdBy: param.createdBy,
        };
    }
    async initialNewRecords(params = []) {
        if (params.length) {
            return this.repository.save(params);
        }
        return [];
    }
    async getLeaveTypeBalanceByLeaveType(companyId, authInfo) {
        const ltBalanceName = this.entityName;
        const leaveTypeName = entities_1.LeaveTypeEntity.name;
        const { authEmployeeId: employeeId } = authInfo;
        if (!employeeId)
            return [];
        const queryBuilder = this.repository.createQueryBuilder(ltBalanceName);
        queryBuilder.select([
            `${ltBalanceName}.balance`,
            `${ltBalanceName}.id`,
            `${ltBalanceName}.leaveTypeId`,
            `${leaveTypeName}.color`,
            `${leaveTypeName}.name`,
            `${leaveTypeName}.code`,
            `${leaveTypeName}.remark`,
        ]);
        queryBuilder.innerJoin(`${ltBalanceName}.leaveType`, leaveTypeName, `${leaveTypeName}.companyId = :companyId
      AND ${leaveTypeName}.active = :active
      AND ${leaveTypeName}.isDeleted = :isDeleted`, { isDeleted: false, companyId, active: true });
        queryBuilder
            .andWhere(`${ltBalanceName}.isDeleted = :isDeleted`, { isDeleted: false })
            .andWhere(`${ltBalanceName}.companyId = :companyId`, { companyId })
            .andWhere(`${ltBalanceName}.employeeId = :employeeId`, { employeeId });
        return queryBuilder.getMany();
    }
    async updateLeaveTypeBalanceImport(args) {
        const { companyId, authEmail, listEmployeeRef, listLeaveTypeName, hashTable, skip, batchSizes, } = args;
        const ltbAlias = entities_1.LeaveTypeBalanceEntity.name;
        const ltAlias = entities_1.LeaveTypeEntity.name;
        const empAlias = entities_1.EmployeeEntity.name;
        const ltbQueryBuilder = this.leaveTypeBalanceRepository
            .createQueryBuilder(ltbAlias)
            .innerJoin(`${ltbAlias}.employee`, empAlias, `${empAlias}.isDeleted = :isDeleted AND ${empAlias}.active = :active`, { isDeleted: false, active: true })
            .innerJoin(`${ltbAlias}.leaveType`, ltAlias, `${ltAlias}.isDeleted = :isDeleted AND ${ltAlias}.active = :active`, { isDeleted: false, active: true })
            .andWhere(`${ltbAlias}.isDeleted = :isDeleted 
        AND ${ltbAlias}.companyId = :companyId
        AND ${empAlias}.employeeRef IN (:...listEmployeeRef)
        AND ${ltAlias}.name IN (:...listLeaveTypeName)
        `, { isDeleted: false, companyId, listEmployeeRef, listLeaveTypeName })
            .select([
            `${ltbAlias}.id`,
            `${ltbAlias}.balance`,
            `${ltbAlias}.updatedBy`,
            `${ltbAlias}.updatedOn`,
            `${empAlias}.id`,
            `${empAlias}.employeeRef`,
            `${ltAlias}.id`,
            `${ltAlias}.name`,
        ])
            .orderBy(`${empAlias}.employeeRef`)
            .addOrderBy(`${ltAlias}.name`);
        if ((skip !== null || skip !== undefined) &&
            (batchSizes !== null || batchSizes !== undefined)) {
            ltbQueryBuilder.take(batchSizes).skip(skip);
        }
        const leaveTypeBalances = await ltbQueryBuilder.getMany();
        const insertTrxs = [];
        const updateBalances = [];
        for (const ltb of leaveTypeBalances) {
            const { balance: currBalance, employee, leaveType } = ltb;
            const { employeeRef, id: employeeId } = employee;
            const { name: ltName, id: leaveTypeId } = leaveType;
            const newBalance = Number(hashTable[`${employeeRef}:${ltName}`]);
            if (isNaN(newBalance) || currBalance === newBalance)
                continue;
            const sign = newBalance >= currBalance ? enums_1.EHistorySign.ADD : enums_1.EHistorySign.MINUS;
            const unit = Math.abs((0, utils_1.roundUp2Decimals)(newBalance - currBalance));
            insertTrxs.push(this.leaveTrxService.initialLeaveTrx({
                companyId,
                authMail: authEmail,
                balance: (0, utils_1.roundUp2Decimals)(newBalance),
                type: enums_1.EHistoryType.IMPORT,
                sign,
                unit,
                currentDate: new Date(),
                leaveTypeId,
                employeeId,
                employeeRef,
                joinDate: new Date('1800-01-01'),
                effDate: new Date('1800-01-01'),
                leavePolicyId: 0,
            }));
            ltb.balance = (0, utils_1.roundUp2Decimals)(newBalance);
            ltb.updatedBy = authEmail;
            ltb.updatedOn = new Date();
            updateBalances.push(ltb);
        }
        await Promise.all([
            this.leaveTypeBalanceRepository.save(updateBalances),
            this.leaveTrxService.repository.save(insertTrxs),
        ]);
    }
};
exports.LeaveTypeBalanceService = LeaveTypeBalanceService;
exports.LeaveTypeBalanceService = LeaveTypeBalanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LeaveTypeBalanceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        leave_trx_service_1.LeaveTrxService])
], LeaveTypeBalanceService);
//# sourceMappingURL=leave-type-balance.service.js.map
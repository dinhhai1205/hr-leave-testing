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
exports.LeaveTypePolicyCreditTrxService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const enums_1 = require("../../../../common/enums");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
let LeaveTypePolicyCreditTrxService = class LeaveTypePolicyCreditTrxService extends services_1.LegacyBaseService {
    constructor(leaveTypePolicyCreditTrxRepository) {
        super(leaveTypePolicyCreditTrxRepository);
        this.leaveTypePolicyCreditTrxRepository = leaveTypePolicyCreditTrxRepository;
    }
    async getLeaveTypesPolicyCreditTrxByQuery(companyId, query) {
        const { q, runningBySystem, employeeIds, types, leaveTypePolicyCreditUUIDs, startDate, endDate, } = query;
        const baseQueryBuilder = this.createBaseQueryBuilder(query);
        const pagination = await this.getEntitiesByQuery({ ...query }, () => {
            baseQueryBuilder
                .andWhere(`${this.entityName}.companyId = :companyId`, {
                companyId,
            })
                .andWhere(`${this.entityName}.isDeleted = :isDeleted`, {
                isDeleted: false,
            });
            if (q) {
                baseQueryBuilder.andWhere(`(${this.entityName}.name LIKE :q
            OR code LIKE :q)`, { q: `%${q}%` });
            }
            if (runningBySystem) {
                baseQueryBuilder.andWhere(`${this.entityName}.createdBy = :createdBy`, { createdBy: enums_1.EDefaultEmail.CRON_JOB });
            }
            if (employeeIds?.length) {
                baseQueryBuilder.andWhere(`${this.entityName}.employeeId IN (:...employeeIds)`, { employeeIds });
            }
            if (types?.length) {
                baseQueryBuilder.andWhere(`${this.entityName}.type IN (:...types)`, {
                    types,
                });
            }
            if (leaveTypePolicyCreditUUIDs?.length) {
                baseQueryBuilder.andWhere(`${this.entityName}.leaveTypePolicyCreditUUID IN (:...leaveTypePolicyCreditUUIDs)`, {
                    leaveTypePolicyCreditUUIDs,
                });
            }
            if (startDate || endDate) {
                baseQueryBuilder
                    .andWhere(`${this.entityName}.date >= :startDate`, {
                    startDate: startDate ? new Date(startDate) : new Date(1945, 1, 1),
                })
                    .andWhere(`${this.entityName}.date <= :endDate`, {
                    endDate: endDate ? new Date(endDate) : new Date(),
                });
            }
            return baseQueryBuilder;
        });
        return pagination;
    }
    initialTrx(args) {
        const { companyId, employeeId, leaveTypePolicy, type, sign, unit, creditRemaining, carryForwardRemaining, leaveId, leaveTypePolicyCreditUUID, authMail, leaveTypeId, leaveTypePolicyId, } = args;
        let previousPolicySetting = args?.previousPolicySetting || undefined;
        delete leaveTypePolicy?.previousPolicySetting;
        if (!previousPolicySetting) {
            previousPolicySetting = JSON.stringify(leaveTypePolicy);
        }
        return {
            companyId,
            employeeId,
            leaveTypePolicyCreditUUID,
            leaveId,
            type,
            sign,
            unit,
            creditRemaining,
            carryForwardRemaining,
            date: new Date(),
            previousPolicySetting,
            currentPolicySetting: JSON.stringify(leaveTypePolicy),
            createdBy: authMail,
            leaveTypeId,
            leaveTypePolicyId,
        };
    }
};
exports.LeaveTypePolicyCreditTrxService = LeaveTypePolicyCreditTrxService;
exports.LeaveTypePolicyCreditTrxService = LeaveTypePolicyCreditTrxService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LeaveTypePolicyCreditTrxEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeaveTypePolicyCreditTrxService);
//# sourceMappingURL=leave-type-policy-credit-trx.service.js.map
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
exports.LeaveTypePolicyCreditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
const leave_type_policy_credit_entity_1 = require("../../../../core/database/entities/leave-type-policy-credit.entity");
const services_1 = require("../../../../core/database/services");
let LeaveTypePolicyCreditService = class LeaveTypePolicyCreditService extends services_1.LegacyBaseService {
    constructor(leaveTypePolicyCreditRepository) {
        super(leaveTypePolicyCreditRepository);
        this.leaveTypePolicyCreditRepository = leaveTypePolicyCreditRepository;
    }
    async getLeaveTypesPolicyCreditByQuery(companyId, query) {
        const { q, leavePolicyIds, employeeIds } = query;
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
            if (employeeIds?.length) {
                baseQueryBuilder.andWhere(`${this.entityName}.employeeId IN (:...employeeIds)`, { employeeIds });
            }
            if (leavePolicyIds?.length) {
                baseQueryBuilder.andWhere(`${this.entityName}.leavePolicyId IN (:...leavePolicyIds)`, { leavePolicyIds });
            }
            return baseQueryBuilder;
        });
        return pagination;
    }
    initialSeedParam(param) {
        return {
            uuid: (0, crypto_1.randomUUID)(),
            companyId: param.companyId,
            employeeId: param.employeeId,
            leavePolicyId: param.leavePolicyId,
            credit: 0,
            creditRemaining: 0,
            carryForwardRemaining: 0,
            createdBy: param.createdBy,
        };
    }
    async initialNewRecords(params = []) {
        if (params.length) {
            return this.repository.save(params);
        }
        return [];
    }
};
exports.LeaveTypePolicyCreditService = LeaveTypePolicyCreditService;
exports.LeaveTypePolicyCreditService = LeaveTypePolicyCreditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeaveTypePolicyCreditService);
//# sourceMappingURL=leave-type-policy-credit.service.js.map
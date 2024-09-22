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
exports.LeaveTrxService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../../../core/database/entities");
const services_1 = require("../../../../core/database/services");
let LeaveTrxService = class LeaveTrxService extends services_1.LegacyBaseService {
    constructor(leaveTrxRepository) {
        super(leaveTrxRepository);
        this.leaveTrxRepository = leaveTrxRepository;
    }
    initialLeaveTrx(args) {
        const { companyId, employeeId, leavePolicyId, leaveTypeId, leaveTypePolicy, type, sign, unit, balance, effDate, employeeRef, joinDate, authMail, } = args;
        let previousPolicySetting = args?.previousPolicySetting || undefined;
        delete leaveTypePolicy?.previousPolicySetting;
        if (!previousPolicySetting) {
            previousPolicySetting = JSON.stringify(leaveTypePolicy);
        }
        return {
            companyId,
            employeeId,
            type,
            sign,
            unit,
            balance,
            date: new Date(),
            effDate,
            employeeRef,
            joinDate,
            previousPolicySetting,
            currentPolicySetting: JSON.stringify(leaveTypePolicy),
            leaveTypeId,
            policyId: leavePolicyId,
            createdBy: authMail,
        };
    }
};
exports.LeaveTrxService = LeaveTrxService;
exports.LeaveTrxService = LeaveTrxService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.LeaveTrxEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LeaveTrxService);
//# sourceMappingURL=leave-trx.service.js.map
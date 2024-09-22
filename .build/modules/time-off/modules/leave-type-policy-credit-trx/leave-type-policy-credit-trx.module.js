"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypePolicyCreditTrxModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../../../core/database/entities");
const leave_type_policy_credit_trx_controller_1 = require("./leave-type-policy-credit-trx.controller");
const leave_type_policy_credit_trx_service_1 = require("./leave-type-policy-credit-trx.service");
let LeaveTypePolicyCreditTrxModule = class LeaveTypePolicyCreditTrxModule {
};
exports.LeaveTypePolicyCreditTrxModule = LeaveTypePolicyCreditTrxModule;
exports.LeaveTypePolicyCreditTrxModule = LeaveTypePolicyCreditTrxModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.LeaveTypePolicyCreditTrxEntity])],
        providers: [leave_type_policy_credit_trx_service_1.LeaveTypePolicyCreditTrxService],
        exports: [leave_type_policy_credit_trx_service_1.LeaveTypePolicyCreditTrxService],
        controllers: [leave_type_policy_credit_trx_controller_1.LeaveTypePolicyCreditTrxController],
    })
], LeaveTypePolicyCreditTrxModule);
//# sourceMappingURL=leave-type-policy-credit-trx.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypePolicyCreditModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leave_type_policy_credit_entity_1 = require("../../../../core/database/entities/leave-type-policy-credit.entity");
const leave_type_policy_credit_controller_1 = require("./leave-type-policy-credit.controller");
const leave_type_policy_credit_service_1 = require("./leave-type-policy-credit.service");
let LeaveTypePolicyCreditModule = class LeaveTypePolicyCreditModule {
};
exports.LeaveTypePolicyCreditModule = LeaveTypePolicyCreditModule;
exports.LeaveTypePolicyCreditModule = LeaveTypePolicyCreditModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([leave_type_policy_credit_entity_1.LeaveTypePolicyCreditEntity])],
        providers: [leave_type_policy_credit_service_1.LeaveTypePolicyCreditService],
        exports: [leave_type_policy_credit_service_1.LeaveTypePolicyCreditService],
        controllers: [leave_type_policy_credit_controller_1.LeaveTypePolicyCreditController],
    })
], LeaveTypePolicyCreditModule);
//# sourceMappingURL=leave-type-policy-credit.module.js.map
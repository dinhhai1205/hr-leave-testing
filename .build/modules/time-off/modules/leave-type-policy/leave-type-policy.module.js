"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypePolicyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leave_type_policy_entity_1 = require("../../../../core/database/entities/leave-type-policy.entity");
const queue_1 = require("../../../../core/queue");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const leave_trx_module_1 = require("../leave-trx/leave-trx.module");
const leave_type_assigment_module_1 = require("../leave-type-assigment/leave-type-assigment.module");
const leave_type_balance_module_1 = require("../leave-type-balance/leave-type-balance.module");
const leave_type_policy_credit_trx_module_1 = require("../leave-type-policy-credit-trx/leave-type-policy-credit-trx.module");
const leave_type_policy_credit_module_1 = require("../leave-type-policy-credit/leave-type-policy-credit.module");
const leave_type_policy_helper_1 = require("./helpers/leave-type-policy.helper");
const leave_type_policy_controller_1 = require("./leave-type-policy.controller");
const leave_type_policy_service_1 = require("./leave-type-policy.service");
const leave_type_policy_consumer_1 = require("./queues/leave-type-policy.consumer");
let LeaveTypePolicyModule = class LeaveTypePolicyModule {
};
exports.LeaveTypePolicyModule = LeaveTypePolicyModule;
exports.LeaveTypePolicyModule = LeaveTypePolicyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([leave_type_policy_entity_1.LeaveTypePolicyEntity]),
            (0, common_1.forwardRef)(() => leave_type_balance_module_1.LeaveTypeBalanceModule),
            leave_type_policy_credit_module_1.LeaveTypePolicyCreditModule,
            employee_module_1.EmployeeModule,
            leave_trx_module_1.LeaveTrxModule,
            leave_type_policy_credit_trx_module_1.LeaveTypePolicyCreditTrxModule,
            leave_type_assigment_module_1.LeaveTypeAssignmentModule,
            queue_1.QueueModule.register({ queues: ['LEAVE_TYPE_POLICY'] }),
        ],
        providers: [
            leave_type_policy_service_1.LeaveTypePolicyService,
            leave_type_policy_helper_1.LeaveTypePolicyHelper,
            leave_type_policy_consumer_1.LeaveTypePolicyProcessor,
        ],
        exports: [leave_type_policy_service_1.LeaveTypePolicyService],
        controllers: [leave_type_policy_controller_1.LeaveTypePolicyController],
    })
], LeaveTypePolicyModule);
//# sourceMappingURL=leave-type-policy.module.js.map
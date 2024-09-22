"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const leave_type_entity_1 = require("../../../../core/database/entities/leave-type.entity");
const company_1 = require("../../../general/modules/company");
const company_parameter_module_1 = require("../../../general/modules/company-parameter/company-parameter.module");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const leave_trx_module_1 = require("../leave-trx/leave-trx.module");
const leave_type_assigment_module_1 = require("../leave-type-assigment/leave-type-assigment.module");
const leave_type_balance_module_1 = require("../leave-type-balance/leave-type-balance.module");
const leave_type_policy_credit_trx_module_1 = require("../leave-type-policy-credit-trx/leave-type-policy-credit-trx.module");
const leave_type_policy_credit_module_1 = require("../leave-type-policy-credit/leave-type-policy-credit.module");
const leave_type_policy_module_1 = require("../leave-type-policy/leave-type-policy.module");
const leave_type_helper_1 = require("./helpers/leave-type.helper");
const leave_type_controller_1 = require("./leave-type.controller");
const leave_type_service_1 = require("./leave-type.service");
const sub_leave_type_service_1 = require("./sub-leave-type/sub-leave-type.service");
let LeaveTypeModule = class LeaveTypeModule {
};
exports.LeaveTypeModule = LeaveTypeModule;
exports.LeaveTypeModule = LeaveTypeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([leave_type_entity_1.LeaveTypeEntity]),
            employee_module_1.EmployeeModule,
            company_1.CompanyModule,
            company_parameter_module_1.CompanyParameterModule,
            (0, common_1.forwardRef)(() => leave_type_balance_module_1.LeaveTypeBalanceModule),
            leave_type_assigment_module_1.LeaveTypeAssignmentModule,
            leave_type_policy_module_1.LeaveTypePolicyModule,
            leave_type_policy_credit_module_1.LeaveTypePolicyCreditModule,
            leave_type_policy_credit_trx_module_1.LeaveTypePolicyCreditTrxModule,
            leave_trx_module_1.LeaveTrxModule,
        ],
        providers: [leave_type_service_1.LeaveTypeService, leave_type_helper_1.LeaveTypeHelper, sub_leave_type_service_1.SubLeaveTypeService],
        exports: [leave_type_service_1.LeaveTypeService, sub_leave_type_service_1.SubLeaveTypeService],
        controllers: [leave_type_controller_1.LeaveTypeController],
    })
], LeaveTypeModule);
//# sourceMappingURL=leave-type.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffModule = void 0;
const common_1 = require("@nestjs/common");
const leave_attachment_module_1 = require("./modules/leave-attachment/leave-attachment.module");
const leave_type_assigment_module_1 = require("./modules/leave-type-assigment/leave-type-assigment.module");
const leave_type_balance_module_1 = require("./modules/leave-type-balance/leave-type-balance.module");
const leave_type_policy_credit_trx_module_1 = require("./modules/leave-type-policy-credit-trx/leave-type-policy-credit-trx.module");
const leave_type_policy_credit_module_1 = require("./modules/leave-type-policy-credit/leave-type-policy-credit.module");
const leave_type_policy_module_1 = require("./modules/leave-type-policy/leave-type-policy.module");
const leave_type_module_1 = require("./modules/leave-type/leave-type.module");
const leave_module_1 = require("./modules/leave/leave.module");
const public_holiday_module_1 = require("./modules/public-holiday/public-holiday.module");
let TimeOffModule = class TimeOffModule {
};
exports.TimeOffModule = TimeOffModule;
exports.TimeOffModule = TimeOffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            leave_module_1.LeaveModule.forRootAsync(),
            leave_attachment_module_1.LeaveAttachmentModule,
            leave_type_module_1.LeaveTypeModule,
            leave_type_assigment_module_1.LeaveTypeAssignmentModule,
            leave_type_balance_module_1.LeaveTypeBalanceModule,
            leave_type_policy_module_1.LeaveTypePolicyModule,
            leave_type_policy_credit_module_1.LeaveTypePolicyCreditModule,
            leave_type_policy_credit_trx_module_1.LeaveTypePolicyCreditTrxModule,
            public_holiday_module_1.PublicHolidayModule,
        ],
    })
], TimeOffModule);
//# sourceMappingURL=time-off.module.js.map
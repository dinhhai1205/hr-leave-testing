"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollModule = void 0;
const common_1 = require("@nestjs/common");
const cycle_period_detail_1 = require("./modules/cycle-period-detail");
const payroll_group_wd_module_1 = require("./modules/payroll-group-wd/payroll-group-wd.module");
const payroll_group_module_1 = require("./modules/payroll-group/payroll-group.module");
const payroll_report_module_1 = require("./modules/payroll-report/payroll-report.module");
const prtrx_emp_module_1 = require("./modules/prtrx-emp/prtrx-emp.module");
const prtrx_hdr_module_1 = require("./modules/prtrx-hdr/prtrx-hdr.module");
let PayrollModule = class PayrollModule {
};
exports.PayrollModule = PayrollModule;
exports.PayrollModule = PayrollModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cycle_period_detail_1.CyclePeriodDetailModule,
            payroll_group_module_1.PayrollGroupModule,
            payroll_group_wd_module_1.PayrollGroupWdModule,
            payroll_report_module_1.PayrollReportModule,
            prtrx_hdr_module_1.PrtrxHdrModule,
            prtrx_emp_module_1.PrtrxEmpModule,
        ],
    })
], PayrollModule);
//# sourceMappingURL=payroll.module.js.map
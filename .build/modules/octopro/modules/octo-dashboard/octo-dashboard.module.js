"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OctoDashboardModule = void 0;
const common_1 = require("@nestjs/common");
const company_1 = require("../../../general/modules/company");
const company_parameter_1 = require("../../../general/modules/company-parameter");
const country_1 = require("../../../general/modules/country");
const usd_forex_module_1 = require("../../../general/modules/usd-forex/usd-forex.module");
const payroll_report_module_1 = require("../../../payroll/modules/payroll-report/payroll-report.module");
const prtrx_hdr_module_1 = require("../../../payroll/modules/prtrx-hdr/prtrx-hdr.module");
const employee_contract_module_1 = require("../../../user/modules/employee-contract/employee-contract.module");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const octo_company_module_1 = require("../octo-company/octo-company.module");
const octo_task_module_1 = require("../octo-task/octo-task.module");
const octo_dashboard_controller_1 = require("./octo-dashboard.controller");
const octo_dashboard_service_1 = require("./octo-dashboard.service");
let OctoDashboardModule = class OctoDashboardModule {
};
exports.OctoDashboardModule = OctoDashboardModule;
exports.OctoDashboardModule = OctoDashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            country_1.CountryModule,
            octo_task_module_1.OctoTaskModule,
            employee_module_1.EmployeeModule,
            prtrx_hdr_module_1.PrtrxHdrModule,
            employee_contract_module_1.EmployeeContractModule,
            company_parameter_1.CompanyParameterModule,
            payroll_report_module_1.PayrollReportModule,
            octo_company_module_1.OctoCompanyModule,
            company_1.CompanyModule,
            usd_forex_module_1.UsdForexModule,
        ],
        providers: [octo_dashboard_service_1.OctoDashboardService],
        controllers: [octo_dashboard_controller_1.OctoDashboardController],
    })
], OctoDashboardModule);
//# sourceMappingURL=octo-dashboard.module.js.map
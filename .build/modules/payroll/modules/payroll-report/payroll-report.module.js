"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollReportModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const employee_module_1 = require("../../../user/modules/employee/employee.module");
const prtrx_hdr_module_1 = require("../prtrx-hdr/prtrx-hdr.module");
const payroll_report_helper_1 = require("./helpers/payroll-report.helper");
const payroll_report_controller_1 = require("./payroll-report.controller");
const payroll_report_service_1 = require("./payroll-report.service");
const payroll_report_schema_1 = require("./schema/payroll-report.schema");
let PayrollReportModule = class PayrollReportModule {
};
exports.PayrollReportModule = PayrollReportModule;
exports.PayrollReportModule = PayrollReportModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: 'PayrollReport',
                    collection: 'PayrollReportMongoModel',
                    useFactory: () => {
                        const schema = payroll_report_schema_1.PayrollReportSchema;
                        schema.index({ EmployeeRef: 1 }, { name: 'z_EmployeeRef_1' });
                        schema.index({ FullNameLocal: 1 }, { name: 'z_FullNameLocal_1' });
                        schema.index({
                            CompanyId: 1,
                            PayrollHeaderId: 1,
                            'PayrollHeader.CountryCode': 1,
                            EmployeeRef: 1,
                            FullNameLocal: 1,
                            EmployeeId: 1,
                        }, {
                            name: 'z_CompanyId_1_PayrollHeaderId_1_PayrollHeader.CountryCode_1_EmployeeRef_1_FullNameLocal_1_EmployeeId_1',
                        });
                        schema.index({
                            'Company.CountryCode': 1,
                            'Company.CurrencyCode': 1,
                            'PayrollHeader.DateFrom': 1,
                            'PayrollHeader.DateTo': -1,
                        }, {
                            name: `z_Company.CountryCode_1_Company.CurrencyCode_1_PayrollHeader.DateFrom_1_PayrollHeader.DateTo_-1`,
                        });
                        schema.index({ 'Employee.FullNameEn': 1 }, { name: `z_Employee.FullNameEn_1` });
                        return schema;
                    },
                },
            ]),
            prtrx_hdr_module_1.PrtrxHdrModule,
            employee_module_1.EmployeeModule,
        ],
        controllers: [payroll_report_controller_1.PayrollReportController],
        providers: [payroll_report_service_1.PayrollReportService, payroll_report_helper_1.PayrollReportHelper],
        exports: [payroll_report_service_1.PayrollReportService],
    })
], PayrollReportModule);
//# sourceMappingURL=payroll-report.module.js.map
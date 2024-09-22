"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeTrackerCompanyModule = void 0;
const common_1 = require("@nestjs/common");
const company_1 = require("../../../general/modules/company");
const api_module_1 = require("../../libs/api/api.module");
const company_mapping_module_1 = require("../company-mapping/company-mapping.module");
const employee_mapping_module_1 = require("../employee-mapping/employee-mapping.module");
const employee_module_1 = require("../employee/employee.module");
const group_mapping_module_1 = require("../group-mapping/group-mapping.module");
const company_controller_1 = require("./company.controller");
const company_service_1 = require("./company.service");
const work_schedule_1 = require("../work-schedule");
let TimeTrackerCompanyModule = class TimeTrackerCompanyModule {
};
exports.TimeTrackerCompanyModule = TimeTrackerCompanyModule;
exports.TimeTrackerCompanyModule = TimeTrackerCompanyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.TimeTrackerApiModule,
            company_mapping_module_1.CompanyMappingModule,
            company_1.CompanyModule,
            employee_mapping_module_1.EmployeeMappingModule,
            employee_module_1.TimeTrackerEmployeeModule,
            group_mapping_module_1.GroupMappingModule,
            work_schedule_1.WorkScheduleModule,
        ],
        controllers: [company_controller_1.CompanyController],
        providers: [company_service_1.TimeTrackerCompanyService],
        exports: [company_service_1.TimeTrackerCompanyService],
    })
], TimeTrackerCompanyModule);
//# sourceMappingURL=company.module.js.map
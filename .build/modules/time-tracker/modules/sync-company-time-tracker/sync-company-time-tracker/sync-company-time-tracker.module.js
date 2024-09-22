"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncCompanyTimeTrackerModule = void 0;
const common_1 = require("@nestjs/common");
const company_module_1 = require("../../company/company.module");
const employee_module_1 = require("../../employee/employee.module");
const group_module_1 = require("../../group/group.module");
const sync_company_time_tracker_controller_1 = require("./sync-company-time-tracker.controller");
const sync_company_time_tracker_service_1 = require("./sync-company-time-tracker.service");
const work_schedule_1 = require("../../work-schedule");
const company_mapping_module_1 = require("../../company-mapping/company-mapping.module");
const employee_mapping_module_1 = require("../../employee-mapping/employee-mapping.module");
const group_mapping_module_1 = require("../../group-mapping/group-mapping.module");
const api_module_1 = require("../../../libs/api/api.module");
let SyncCompanyTimeTrackerModule = class SyncCompanyTimeTrackerModule {
};
exports.SyncCompanyTimeTrackerModule = SyncCompanyTimeTrackerModule;
exports.SyncCompanyTimeTrackerModule = SyncCompanyTimeTrackerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            company_module_1.TimeTrackerCompanyModule,
            employee_module_1.TimeTrackerEmployeeModule,
            group_module_1.GroupModule,
            work_schedule_1.WorkScheduleModule,
            company_mapping_module_1.CompanyMappingModule,
            employee_mapping_module_1.EmployeeMappingModule,
            group_mapping_module_1.GroupMappingModule,
            api_module_1.TimeTrackerApiModule,
        ],
        controllers: [sync_company_time_tracker_controller_1.SyncCompanyTimeTrackerController],
        providers: [sync_company_time_tracker_service_1.SyncCompanyTimeTrackerService],
        exports: [sync_company_time_tracker_service_1.SyncCompanyTimeTrackerService],
    })
], SyncCompanyTimeTrackerModule);
//# sourceMappingURL=sync-company-time-tracker.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedGuardModule = void 0;
const common_1 = require("@nestjs/common");
const company_mapping_service_1 = require("./company-mapping/company-mapping.service");
const api_service_1 = require("../libs/api/api.service");
const employee_mapping_service_1 = require("./employee-mapping/employee-mapping.service");
const group_mapping_service_1 = require("./group-mapping/group-mapping.service");
const time_tracker_emp_guard_1 = require("../common/guards/time-tracker-emp.guard");
const company_mapping_module_1 = require("./company-mapping/company-mapping.module");
const employee_mapping_module_1 = require("./employee-mapping/employee-mapping.module");
const group_mapping_module_1 = require("./group-mapping/group-mapping.module");
const api_module_1 = require("../libs/api/api.module");
const typeorm_1 = require("@nestjs/typeorm");
const database_1 = require("../../../core/database");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const time_tracker_config_1 = require("../../../config/time-tracker.config");
const dashboard_module_1 = require("./dashboard/dashboard.module");
let SharedGuardModule = class SharedGuardModule {
};
exports.SharedGuardModule = SharedGuardModule;
exports.SharedGuardModule = SharedGuardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                database_1.CompanyMappingEntity,
                database_1.EmployeeMappingEntity,
                database_1.GroupMappingEntity,
            ]),
            axios_1.HttpModule,
            config_1.ConfigModule.forFeature(time_tracker_config_1.timeTrackerConfig),
            company_mapping_module_1.CompanyMappingModule,
            api_module_1.TimeTrackerApiModule,
            employee_mapping_module_1.EmployeeMappingModule,
            group_mapping_module_1.GroupMappingModule,
            dashboard_module_1.DashboardModule,
        ],
        providers: [
            time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard,
            company_mapping_service_1.CompanyMappingService,
            employee_mapping_service_1.EmployeeMappingService,
            group_mapping_service_1.GroupMappingService,
            api_service_1.TimeTrackerApiService,
        ],
        exports: [
            time_tracker_emp_guard_1.TimeTrackerEmployeeInfoGuard,
            company_mapping_service_1.CompanyMappingService,
            employee_mapping_service_1.EmployeeMappingService,
            group_mapping_service_1.GroupMappingService,
            api_service_1.TimeTrackerApiService,
        ],
    })
], SharedGuardModule);
//# sourceMappingURL=share-guard-service.module.js.map